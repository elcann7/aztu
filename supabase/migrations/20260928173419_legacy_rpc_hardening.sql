-- Immediate hardening that is safe while the legacy client is still live.
-- Trigger and event-trigger invocations continue to work; Data API callers
-- must not execute these privileged functions directly.
do $$
begin
  if to_regprocedure('public.handle_new_user()') is not null then
    revoke all on function public.handle_new_user() from public, anon, authenticated;
  end if;
  if to_regprocedure('public.rls_auto_enable()') is not null then
    revoke all on function public.rls_auto_enable() from public, anon, authenticated;
  end if;
end $$;
