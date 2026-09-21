import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import type {
  Course,
  Material,
  GroupNote,
  Deadline,
  Question,
  Answer,
  Poll,
  Vote,
  NoteCategory,
} from '../services/db';
import {
  dbService,
  getFileFromIndexedDB,
} from '../services/db';
import { useAuth } from './AuthContext';
import { isSupabaseConfigured, supabase } from '../services/supabase';

interface DatabaseContextType {
  courses: Course[];
  materials: Material[];
  notes: GroupNote[];
  deadlines: Deadline[];
  polls: Poll[];
  questions: Question[];
  refreshData: () => void;

  // Materials
  createMaterial: (params: {
    title: string;
    courseId: string;
    type: 'file' | 'link';
    description?: string;
    file?: File;
    linkUrl?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  deleteMaterial: (id: string) => Promise<{ success: boolean; error?: string }>;
  downloadMaterialFile: (materialOrId: Material | string) => Promise<void>;

  // Notes
  createNote: (params: {
    courseId: string;
    content: string;
    category: NoteCategory;
  }) => { success: boolean; error?: string };
  deleteNote: (id: string) => { success: boolean; error?: string };

  // Deadlines
  createDeadline: (params: {
    title: string;
    courseId: string;
    description?: string;
    dueDate: string;
    dueTime?: string;
    points?: number;
  }) => { success: boolean; error?: string };
  toggleDeadline: (id: string) => void;
  deleteDeadline: (id: string) => { success: boolean; error?: string };

  // Polls & Voting
  createPoll: (params: {
    question: string;
    courseId?: string;
    options: string[];
  }) => { success: boolean; error?: string };
  voteInPoll: (pollId: string, optionId: string) => { success: boolean; error?: string };
  deletePoll: (id: string) => { success: boolean; error?: string };
  getVotesForPoll: (pollId: string) => Vote[];
  hasUserVotedInPoll: (pollId: string) => boolean;

  // Questions & Answers
  createQuestion: (params: {
    title: string;
    details?: string;
    courseId: string;
  }) => { success: boolean; error?: string };
  deleteQuestion: (id: string) => { success: boolean; error?: string };
  getAnswersForQuestion: (questionId: string) => Answer[];
  createAnswer: (
    paramsOrQuestionId: { questionId: string; content: string } | string,
    maybeContent?: string
  ) => { success: boolean; error?: string };
  toggleAcceptedAnswer: (answerId: string, questionId?: string) => { success: boolean; error?: string };
  deleteAnswer: (id: string) => { success: boolean; error?: string };
}

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [notes, setNotes] = useState<GroupNote[]>([]);
  const [deadlines, setDeadlines] = useState<Deadline[]>([]);
  const [polls, setPolls] = useState<Poll[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [votes, setVotes] = useState<Vote[]>([]);
  const [version, setVersion] = useState<number>(0);

  const courses = useMemo(() => dbService.getCourses(), []);

  // Fetch all live data from Supabase
  const fetchCloudData = useCallback(async () => {
    if (!isSupabaseConfigured() || !supabase) return false;

    try {
      const [
        notesRes,
        materialsRes,
        deadlinesRes,
        questionsRes,
        answersRes,
        pollsRes,
        votesRes,
      ] = await Promise.all([
        supabase.from('notes').select('*').order('created_at', { ascending: false }),
        supabase.from('materials').select('*').order('created_at', { ascending: false }),
        supabase.from('deadlines').select('*').order('due_date', { ascending: true }),
        supabase.from('questions').select('*').order('created_at', { ascending: false }),
        supabase.from('answers').select('*').order('created_at', { ascending: true }),
        supabase.from('polls').select('*, poll_options(*)').order('created_at', { ascending: false }),
        supabase.from('poll_votes').select('*'),
      ]);

      if (notesRes.data) {
        setNotes(
          notesRes.data.map((r) => ({
            id: r.id,
            courseId: r.course_id,
            content: r.content,
            category: r.category as NoteCategory,
            authorId: r.author_id,
            authorName: r.author_name,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
          }))
        );
      }

      if (materialsRes.data) {
        setMaterials(
          materialsRes.data.map((r) => ({
            id: r.id,
            title: r.title,
            courseId: r.course_id,
            type: r.type as 'file' | 'link',
            description: r.description || undefined,
            fileName: r.file_name || undefined,
            fileSize: r.file_size || undefined,
            fileMime: r.file_mime || undefined,
            linkUrl: r.link_url || undefined,
            authorId: r.author_id,
            authorName: r.author_name,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
          }))
        );
      }

      if (deadlinesRes.data) {
        setDeadlines(
          deadlinesRes.data.map((r) => ({
            id: r.id,
            title: r.title,
            courseId: r.course_id,
            description: r.description || undefined,
            dueDate: r.due_date,
            dueTime: r.due_time || undefined,
            points: r.points || 10,
            isCompleted: r.is_completed,
            authorId: r.author_id,
            authorName: r.author_name,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
          }))
        );
      }

      if (questionsRes.data) {
        setQuestions(
          questionsRes.data.map((r) => ({
            id: r.id,
            title: r.title,
            details: r.details || undefined,
            courseId: r.course_id,
            acceptedAnswerId: r.accepted_answer_id || undefined,
            authorId: r.author_id,
            authorName: r.author_name,
            createdAt: r.created_at,
            updatedAt: r.updated_at,
          }))
        );
      }

      if (answersRes.data) {
        setAnswers(
          answersRes.data.map((r) => ({
            id: r.id,
            questionId: r.question_id,
            content: r.content,
            isAccepted: r.is_accepted,
            authorId: r.author_id,
            authorName: r.author_name,
            createdAt: r.created_at,
          }))
        );
      }

      if (pollsRes.data) {
        setPolls(
          pollsRes.data.map((r) => ({
            id: r.id,
            question: r.question,
            courseId: r.course_id || undefined,
            authorId: r.author_id,
            authorName: r.author_name,
            isClosed: r.is_closed,
            createdAt: r.created_at,
            options: (r.poll_options || []).map((o: { id: string; text: string }) => ({
              id: o.id,
              text: o.text,
            })),
          }))
        );
      }

      if (votesRes.data) {
        setVotes(
          votesRes.data.map((r) => ({
            id: r.id,
            pollId: r.poll_id,
            optionId: r.option_id,
            userId: r.user_id,
            createdAt: r.created_at,
          }))
        );
      }

      setVersion((v) => v + 1);
      return true;
    } catch (err) {
      console.warn('Supabase fetch failed, falling back to local database:', err);
      return false;
    }
  }, []);

  const refreshData = useCallback(() => {
    // If Supabase is available, sync cloud data
    if (isSupabaseConfigured() && supabase) {
      fetchCloudData().catch(() => {});
    }

    // Always keep local database in sync
    setMaterials(dbService.getMaterials());
    setNotes(dbService.getNotes());
    setDeadlines(dbService.getDeadlines());
    setPolls(dbService.getPolls());
    setQuestions(dbService.getQuestions());
    setVersion((v) => v + 1);
  }, [fetchCloudData]);

  // Initial load and Realtime subscriptions
  useEffect(() => {
    refreshData();

    // Setup Supabase Realtime channel for live synchronization across all 30 students
    if (isSupabaseConfigured() && supabase) {
      const channel = supabase
        .channel('public:aztu_realtime_workspace')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'notes' },
          () => {
            fetchCloudData();
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'materials' },
          () => {
            fetchCloudData();
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'deadlines' },
          () => {
            fetchCloudData();
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'questions' },
          () => {
            fetchCloudData();
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'answers' },
          () => {
            fetchCloudData();
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'polls' },
          () => {
            fetchCloudData();
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'poll_options' },
          () => {
            fetchCloudData();
          }
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'poll_votes' },
          () => {
            fetchCloudData();
          }
        )
        .subscribe();

      return () => {
        if (supabase) {
          supabase.removeChannel(channel);
        }
      };
    }
  }, [refreshData, fetchCloudData]);

  // Materials methods
  const createMaterial = useCallback(
    async (params: {
      title: string;
      courseId: string;
      type: 'file' | 'link';
      description?: string;
      file?: File;
      linkUrl?: string;
    }) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        const materialId = `mat_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
        let publicFileUrl: string | undefined = params.linkUrl;

        // If file upload and Supabase is configured, upload to Supabase Storage bucket 'materials'
        if (params.type === 'file' && params.file && isSupabaseConfigured() && supabase) {
          const safeName = `${Date.now()}_${params.file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
          const { error: uploadError } = await supabase.storage
            .from('materials')
            .upload(safeName, params.file, { upsert: true });

          if (!uploadError) {
            const { data: urlData } = supabase.storage.from('materials').getPublicUrl(safeName);
            publicFileUrl = urlData.publicUrl;
          } else {
            console.warn('Supabase storage upload error:', uploadError);
          }
        }

        // Write to Supabase table
        if (isSupabaseConfigured() && supabase) {
          await supabase.from('materials').insert({
            id: materialId,
            title: params.title,
            course_id: params.courseId,
            type: params.type,
            description: params.description || null,
            file_name: params.file?.name || null,
            file_size: params.file ? `${(params.file.size / (1024 * 1024)).toFixed(2)} MB` : null,
            file_mime: params.file?.type || null,
            link_url: publicFileUrl || null,
            author_id: user.id,
            author_name: `${user.firstName} ${user.lastName}`,
          });
        }

        // Also save locally in IndexedDB/LocalStorage for offline resilience
        await dbService.createMaterial({
          ...params,
          linkUrl: publicFileUrl,
          authorId: user.id,
          authorName: `${user.firstName} ${user.lastName}`,
        });

        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Material əlavə edilərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const deleteMaterial = useCallback(
    async (id: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        if (isSupabaseConfigured() && supabase) {
          await supabase.from('materials').delete().eq('id', id);
        }
        await dbService.deleteMaterial(id, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Material silinərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const downloadMaterialFile = useCallback(async (materialOrId: Material | string) => {
    let material: Material | undefined;
    if (typeof materialOrId === 'string') {
      material = materials.find((m) => m.id === materialOrId) || dbService.getMaterials().find((m) => m.id === materialOrId);
    } else {
      material = materialOrId;
    }
    if (!material) return;

    if (material.linkUrl) {
      window.open(material.linkUrl, '_blank');
      return;
    }

    const blob = await getFileFromIndexedDB(material.id);
    if (!blob) {
      alert('Fayl tapılmadı və ya silinib.');
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = material.fileName || 'material.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }, [materials]);

  // Notes methods
  const createNote = useCallback(
    (params: { courseId: string; content: string; category: NoteCategory }) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        const noteId = `note_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(
            supabase.from('notes').insert({
              id: noteId,
              course_id: params.courseId,
              content: params.content,
              category: params.category,
              author_id: user.id,
              author_name: `${user.firstName} ${user.lastName}`,
            })
          ).catch((err) => console.error('Cloud note sync error:', err));
        }

        dbService.createNote({
          ...params,
          authorId: user.id,
          authorName: `${user.firstName} ${user.lastName}`,
        });

        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Qeyd əlavə edilərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const deleteNote = useCallback(
    (id: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(supabase.from('notes').delete().eq('id', id)).catch((err) =>
            console.error('Cloud delete note error:', err)
          );
        }
        dbService.deleteNote(id, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Qeyd silinərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  // Deadlines methods
  const createDeadline = useCallback(
    (params: {
      title: string;
      courseId: string;
      description?: string;
      dueDate: string;
      dueTime?: string;
      points?: number;
    }) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        const dlId = `dl_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(
            supabase.from('deadlines').insert({
              id: dlId,
              title: params.title,
              course_id: params.courseId,
              description: params.description || null,
              due_date: params.dueDate,
              due_time: params.dueTime || null,
              points: params.points || 10,
              is_completed: false,
              author_id: user.id,
              author_name: `${user.firstName} ${user.lastName}`,
            })
          ).catch((err) => console.error('Cloud deadline sync error:', err));
        }

        dbService.createDeadline({
          ...params,
          authorId: user.id,
          authorName: `${user.firstName} ${user.lastName}`,
        });

        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Tapşırıq əlavə edilərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const toggleDeadline = useCallback(
    (id: string) => {
      const current = deadlines.find((d) => d.id === id);
      const nextCompleted = current ? !current.isCompleted : true;

      if (isSupabaseConfigured() && supabase) {
        Promise.resolve(
          supabase.from('deadlines').update({ is_completed: nextCompleted }).eq('id', id)
        ).catch((err) => console.error('Cloud toggle deadline error:', err));
      }
      dbService.toggleDeadlineCompletion(id);
      refreshData();
    },
    [deadlines, refreshData]
  );

  const deleteDeadline = useCallback(
    (id: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(supabase.from('deadlines').delete().eq('id', id)).catch((err) =>
            console.error('Cloud delete deadline error:', err)
          );
        }
        dbService.deleteDeadline(id, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Tapşırıq silinərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  // Polls methods
  const createPoll = useCallback(
    (params: { question: string; courseId?: string; options: string[] }) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        const pollId = `poll_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

        const client = supabase;
        if (isSupabaseConfigured() && client) {
          Promise.resolve(
            client
              .from('polls')
              .insert({
                id: pollId,
                question: params.question,
                course_id: params.courseId || null,
                author_id: user.id,
                author_name: `${user.firstName} ${user.lastName}`,
                is_closed: false,
              })
              .then(() => {
                const optionRows = params.options.map((optText, idx) => ({
                  id: `opt_${pollId}_${idx}`,
                  poll_id: pollId,
                  text: optText,
                }));
                return client.from('poll_options').insert(optionRows);
              })
          ).catch((err) => console.error('Cloud poll sync error:', err));
        }

        dbService.createPoll({
          ...params,
          authorId: user.id,
          authorName: `${user.firstName} ${user.lastName}`,
        });

        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Sorğu yaradılarkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const voteInPoll = useCallback(
    (pollId: string, optionId: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        if (isSupabaseConfigured() && supabase) {
          const voteId = `vote_${pollId}_${user.id}`;
          Promise.resolve(
            supabase.from('poll_votes').upsert({
              id: voteId,
              poll_id: pollId,
              option_id: optionId,
              user_id: user.id,
            })
          ).catch((err) => console.error('Cloud vote sync error:', err));
        }

        dbService.voteInPoll(pollId, optionId, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Səsvermə zamanı xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const deletePoll = useCallback(
    (id: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(supabase.from('polls').delete().eq('id', id)).catch((err) =>
            console.error('Cloud delete poll error:', err)
          );
        }
        dbService.deletePoll(id, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Sorğu silinərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const getVotesForPoll = useCallback(
    (pollId: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      version;
      const cloudVotes = votes.filter((v) => v.pollId === pollId);
      if (cloudVotes.length > 0) return cloudVotes;
      return dbService.getPollVotes(pollId);
    },
    [version, votes]
  );

  const hasUserVotedInPoll = useCallback(
    (pollId: string) => {
      if (!user) return false;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      version;
      const cloudVoted = votes.some((v) => v.pollId === pollId && v.userId === user.id);
      if (cloudVoted) return true;
      return !!dbService.getUserVote(pollId, user.id);
    },
    [user, version, votes]
  );

  // Q&A methods
  const createQuestion = useCallback(
    (params: { title: string; details?: string; courseId: string }) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        const qId = `q_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(
            supabase.from('questions').insert({
              id: qId,
              title: params.title,
              details: params.details || null,
              course_id: params.courseId,
              author_id: user.id,
              author_name: `${user.firstName} ${user.lastName}`,
            })
          ).catch((err) => console.error('Cloud question sync error:', err));
        }

        dbService.createQuestion({
          ...params,
          authorId: user.id,
          authorName: `${user.firstName} ${user.lastName}`,
        });

        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Sual verilərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const deleteQuestion = useCallback(
    (id: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(supabase.from('questions').delete().eq('id', id)).catch((err) =>
            console.error('Cloud delete question error:', err)
          );
        }
        dbService.deleteQuestion(id, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Sual silinərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const getAnswersForQuestion = useCallback(
    (questionId: string) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      version;
      const cloudAns = answers.filter((a) => a.questionId === questionId);
      if (cloudAns.length > 0) return cloudAns;
      return dbService.getAnswers(questionId);
    },
    [version, answers]
  );

  const createAnswer = useCallback(
    (
      paramsOrQuestionId: { questionId: string; content: string } | string,
      maybeContent?: string
    ) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        const questionId = typeof paramsOrQuestionId === 'string' ? paramsOrQuestionId : paramsOrQuestionId.questionId;
        const content = typeof paramsOrQuestionId === 'string' ? (maybeContent || '') : paramsOrQuestionId.content;
        const ansId = `ans_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;

        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(
            supabase.from('answers').insert({
              id: ansId,
              question_id: questionId,
              content,
              is_accepted: false,
              author_id: user.id,
              author_name: `${user.firstName} ${user.lastName}`,
            })
          ).catch((err) => console.error('Cloud answer sync error:', err));
        }

        dbService.createAnswer({
          questionId,
          content,
          authorId: user.id,
          authorName: `${user.firstName} ${user.lastName}`,
        });

        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Cavab yazılarkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const toggleAcceptedAnswer = useCallback(
    (answerId: string, questionId?: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        let qId = questionId;
        if (!qId) {
          const allQuestions = questions.length > 0 ? questions : dbService.getQuestions();
          for (const q of allQuestions) {
            const ansList = getAnswersForQuestion(q.id);
            if (ansList.some((a) => a.id === answerId)) {
              qId = q.id;
              break;
            }
          }
        }
        if (!qId) return { success: false, error: 'Sual tapılmadı.' };

        const allQuestions = questions.length > 0 ? questions : dbService.getQuestions();
        const q = allQuestions.find((item) => item.id === qId);
        const nextId = q?.acceptedAnswerId === answerId ? null : answerId;

        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(
            Promise.all([
              supabase.from('questions').update({ accepted_answer_id: nextId }).eq('id', qId),
              supabase.from('answers').update({ is_accepted: nextId === answerId }).eq('id', answerId),
            ])
          ).catch((err) => console.error('Cloud toggle answer error:', err));
        }

        dbService.setAcceptedAnswer(qId, nextId || undefined, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Cavab təsdiqlənərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, questions, getAnswersForQuestion, refreshData]
  );

  const deleteAnswer = useCallback(
    (id: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
        if (isSupabaseConfigured() && supabase) {
          Promise.resolve(supabase.from('answers').delete().eq('id', id)).catch((err) =>
            console.error('Cloud delete answer error:', err)
          );
        }
        dbService.deleteAnswer(id, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Cavab silinərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const value = useMemo(
    () => ({
      courses,
      materials,
      notes,
      deadlines,
      polls,
      questions,
      refreshData,
      createMaterial,
      deleteMaterial,
      downloadMaterialFile,
      createNote,
      deleteNote,
      createDeadline,
      toggleDeadline,
      deleteDeadline,
      createPoll,
      voteInPoll,
      deletePoll,
      getVotesForPoll,
      hasUserVotedInPoll,
      createQuestion,
      deleteQuestion,
      getAnswersForQuestion,
      createAnswer,
      toggleAcceptedAnswer,
      deleteAnswer,
    }),
    [
      courses,
      materials,
      notes,
      deadlines,
      polls,
      questions,
      refreshData,
      createMaterial,
      deleteMaterial,
      downloadMaterialFile,
      createNote,
      deleteNote,
      createDeadline,
      toggleDeadline,
      deleteDeadline,
      createPoll,
      voteInPoll,
      deletePoll,
      getVotesForPoll,
      hasUserVotedInPoll,
      createQuestion,
      deleteQuestion,
      getAnswersForQuestion,
      createAnswer,
      toggleAcceptedAnswer,
      deleteAnswer,
    ]
  );

  return <DatabaseContext.Provider value={value}>{children}</DatabaseContext.Provider>;
};

export const useDatabase = (): DatabaseContextType => {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error('useDatabase must be used within a DatabaseProvider');
  }
  return context;
};
