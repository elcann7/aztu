-- Apply before deploying the matching AuthContext/API release.
-- Legacy profile IDs stay intact because content rows refer to them as author_id.
-- The previous auth trigger created a profile for every signup, bypassing group verification.
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
revoke all on function public.rls_auto_enable() from public, anon, authenticated;

alter table public.profiles add column if not exists auth_user_id uuid unique references auth.users(id) on delete set null;
create index if not exists profiles_auth_user_id_idx on public.profiles(auth_user_id);

-- The old trigger's count was race-prone. Serialize profile creation, including service-role writes.
create or replace function public.check_max_students_limit()
returns trigger language plpgsql set search_path = '' as $$
begin
  perform pg_advisory_xact_lock(hashtext('aztu_6326a2_profile_quota'));
  if (select count(*) from public.profiles) >= 30 then
    raise exception 'AzTU 6326A2: 30 nəfərlik kvota dolmuşdur';
  end if;
  if new.group_name is distinct from '6326A2' then
    raise exception 'Yanlış qrup';
  end if;
  return new;
end;
$$;

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

create or replace function private.member_profile_id()
returns text language sql stable security definer set search_path = '' as $$
  select id::text from public.profiles
  where auth_user_id = (select auth.uid()) and group_name = '6326A2'
  limit 1;
$$;
revoke all on function private.member_profile_id() from public, anon;
grant execute on function private.member_profile_id() to authenticated;

create or replace function private.is_group_member()
returns boolean language sql stable security definer set search_path = '' as $$
  select private.member_profile_id() is not null;
$$;
revoke all on function private.is_group_member() from public, anon;
grant execute on function private.is_group_member() to authenticated;

-- A client may supply author_id, but cannot choose the displayed author name.
create or replace function private.set_author_name()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  select coalesce(nullif(full_name, ''), concat_ws(' ', first_name, last_name))
    into new.author_name from public.profiles where id::text = new.author_id;
  if new.author_name is null then raise exception 'Müəllif profili tapılmadı'; end if;
  return new;
end;
$$;
revoke all on function private.set_author_name() from public, anon, authenticated;
do $$
declare table_name text;
begin
  foreach table_name in array array['notes','questions','answers','polls','materials','deadlines'] loop
    execute format('drop trigger if exists set_author_name on public.%I', table_name);
    execute format('create trigger set_author_name before insert on public.%I for each row execute function private.set_author_name()', table_name);
  end loop;
end $$;

-- Remove every old policy on these application tables. The prior policy names vary by environment.
do $$
declare p record;
begin
  for p in select schemaname, tablename, policyname from pg_policies
    where schemaname = 'public' and tablename = any(array[
      'courses','profiles','notes','questions','answers','polls','poll_options',
      'poll_votes','materials','deadlines'])
  loop
    execute format('drop policy %I on %I.%I', p.policyname, p.schemaname, p.tablename);
  end loop;
end $$;

alter table public.courses enable row level security;
alter table public.profiles enable row level security;
alter table public.notes enable row level security;
alter table public.questions enable row level security;
alter table public.answers enable row level security;
alter table public.polls enable row level security;
alter table public.poll_options enable row level security;
alter table public.poll_votes enable row level security;
alter table public.materials enable row level security;
alter table public.deadlines enable row level security;

revoke all on public.courses, public.profiles, public.notes, public.questions,
  public.answers, public.polls, public.poll_options, public.poll_votes,
  public.materials, public.deadlines from public, anon, authenticated;
grant select on public.courses to anon, authenticated;
create policy courses_read on public.courses for select to anon, authenticated using (true);

-- Column grants keep legacy password hashes out of every browser response.
do $$
declare cols text;
begin
  select string_agg(format('%I', column_name), ', ') into cols
  from information_schema.columns
  where table_schema = 'public' and table_name = 'profiles' and column_name <> 'password_hash';
  execute format('grant select (%s) on public.profiles to authenticated', cols);
end $$;
grant update (avatar_url, bio, student_id_number, specialty, telegram, phone, github, updated_at)
  on public.profiles to authenticated;
create policy profiles_read_self on public.profiles for select to authenticated
  using (auth_user_id = (select auth.uid()) and group_name = '6326A2');
create policy profiles_update_self on public.profiles for update to authenticated
  using (auth_user_id = (select auth.uid()) and group_name = '6326A2')
  with check (auth_user_id = (select auth.uid()) and group_name = '6326A2');

grant select, insert, delete on public.notes to authenticated;
create policy notes_read on public.notes for select to authenticated using ((select private.is_group_member()));
create policy notes_insert on public.notes for insert to authenticated
  with check (author_id = (select private.member_profile_id()));
create policy notes_delete on public.notes for delete to authenticated
  using (author_id = (select private.member_profile_id()));

grant select, insert, delete on public.materials to authenticated;
create policy materials_read on public.materials for select to authenticated using ((select private.is_group_member()));
create policy materials_insert on public.materials for insert to authenticated
  with check (author_id = (select private.member_profile_id()));
create policy materials_delete on public.materials for delete to authenticated
  using (author_id = (select private.member_profile_id()));

grant select, insert, delete on public.questions to authenticated;
grant update (accepted_answer_id) on public.questions to authenticated;
create policy questions_read on public.questions for select to authenticated using ((select private.is_group_member()));
create policy questions_insert on public.questions for insert to authenticated
  with check (
    (questions.author_id = (select private.member_profile_id())
      and (questions.details is null or questions.details not like '__aztu_discussion__:%'))
    or (questions.details like '__aztu_discussion__:%' and questions.accepted_answer_id is null and (
      exists (select 1 from public.notes n where questions.id = 'discussion_note_' || n.id
        and questions.details = '__aztu_discussion__:note:' || n.id
        and questions.course_id = n.course_id and questions.author_id = n.author_id)
      or exists (select 1 from public.materials m where questions.id = 'discussion_material_' || m.id
        and questions.details = '__aztu_discussion__:material:' || m.id
        and questions.course_id = m.course_id and questions.author_id = m.author_id)
    ))
  );
create policy questions_update on public.questions for update to authenticated
  using (author_id = (select private.member_profile_id()))
  with check (author_id = (select private.member_profile_id()) and
    (accepted_answer_id is null or exists (
      select 1 from public.answers a where a.id = questions.accepted_answer_id and a.question_id = questions.id
    )));
create policy questions_delete on public.questions for delete to authenticated
  using (author_id = (select private.member_profile_id()));

grant select, insert, delete on public.answers to authenticated;
grant update (is_accepted) on public.answers to authenticated;
create policy answers_read on public.answers for select to authenticated using ((select private.is_group_member()));
create policy answers_insert on public.answers for insert to authenticated
  with check (author_id = (select private.member_profile_id()) and is_accepted = false and (
    answers.content not like E'__aztu_revision__\n%'
    or exists (select 1 from public.questions q join public.notes n
      on q.id = 'discussion_note_' || n.id and q.details = '__aztu_discussion__:note:' || n.id
      where q.id = answers.question_id and n.author_id = (select private.member_profile_id()))
  ));
create policy answers_update on public.answers for update to authenticated
  using (exists (select 1 from public.questions q where q.id = question_id and q.author_id = (select private.member_profile_id())))
  with check (exists (select 1 from public.questions q where q.id = question_id and q.author_id = (select private.member_profile_id())));
create policy answers_delete on public.answers for delete to authenticated
  using (author_id = (select private.member_profile_id()));

grant select, insert, delete on public.polls to authenticated;
create policy polls_read on public.polls for select to authenticated using ((select private.is_group_member()));
create policy polls_insert on public.polls for insert to authenticated
  with check (author_id = (select private.member_profile_id()));
create policy polls_delete on public.polls for delete to authenticated
  using (author_id = (select private.member_profile_id()));

grant select, insert on public.poll_options to authenticated;
create policy poll_options_read on public.poll_options for select to authenticated using ((select private.is_group_member()));
create policy poll_options_insert on public.poll_options for insert to authenticated
  with check (exists (select 1 from public.polls p where p.id = poll_id and p.author_id = (select private.member_profile_id())));

grant select, insert, update on public.poll_votes to authenticated;
create policy poll_votes_read on public.poll_votes for select to authenticated using ((select private.is_group_member()));
create policy poll_votes_insert on public.poll_votes for insert to authenticated
  with check (user_id = (select private.member_profile_id()) and exists (
    select 1 from public.poll_options o join public.polls p on p.id = o.poll_id
    where o.id = poll_votes.option_id and o.poll_id = poll_votes.poll_id and not p.is_closed
  ));
create policy poll_votes_update on public.poll_votes for update to authenticated
  using (user_id = (select private.member_profile_id()))
  with check (user_id = (select private.member_profile_id()) and exists (
    select 1 from public.poll_options o join public.polls p on p.id = o.poll_id
    where o.id = poll_votes.option_id and o.poll_id = poll_votes.poll_id and not p.is_closed
  ));

grant select, insert, delete on public.deadlines to authenticated;
grant update (is_completed) on public.deadlines to authenticated;
create policy deadlines_read on public.deadlines for select to authenticated using ((select private.is_group_member()));
create policy deadlines_insert on public.deadlines for insert to authenticated
  with check (author_id = (select private.member_profile_id()));
create policy deadlines_update on public.deadlines for update to authenticated
  using ((select private.is_group_member())) with check ((select private.is_group_member()));
create policy deadlines_delete on public.deadlines for delete to authenticated
  using (author_id = (select private.member_profile_id()));

-- Existing uploaded files stop being available through permanent public URLs.
update storage.buckets set public = false where id = 'materials';
drop policy if exists aztu_materials_read_guard on storage.objects;
drop policy if exists aztu_materials_insert_guard on storage.objects;
drop policy if exists aztu_materials_update_guard on storage.objects;
drop policy if exists aztu_materials_delete_guard on storage.objects;
drop policy if exists aztu_materials_anon_guard on storage.objects;
create policy aztu_materials_anon_guard on storage.objects as restrictive for all to anon
  using (bucket_id <> 'materials') with check (bucket_id <> 'materials');
create policy aztu_materials_read_guard on storage.objects as restrictive for select to authenticated
  using (bucket_id <> 'materials' or (select private.is_group_member()));
create policy aztu_materials_insert_guard on storage.objects as restrictive for insert to authenticated
  with check (bucket_id <> 'materials' or (select private.is_group_member()) and split_part(name, '/', 1) = (select private.member_profile_id()));
create policy aztu_materials_update_guard on storage.objects as restrictive for update to authenticated
  using (bucket_id <> 'materials' or false) with check (bucket_id <> 'materials' or false);
create policy aztu_materials_delete_guard on storage.objects as restrictive for delete to authenticated
  using (bucket_id <> 'materials' or split_part(name, '/', 1) = (select private.member_profile_id()));
-- Restrictive policies need a permissive path. Older bucket policies may differ.
create policy aztu_materials_member_read on storage.objects for select to authenticated
  using (bucket_id = 'materials' and (select private.is_group_member()));
create policy aztu_materials_member_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'materials' and split_part(name, '/', 1) = (select private.member_profile_id()));
create policy aztu_materials_member_delete on storage.objects for delete to authenticated
  using (bucket_id = 'materials' and split_part(name, '/', 1) = (select private.member_profile_id()));
