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
  const [version, setVersion] = useState<number>(0);

  const courses = useMemo(() => dbService.getCourses(), []);

  const refreshData = useCallback(() => {
    setMaterials(dbService.getMaterials());
    setNotes(dbService.getNotes());
    setDeadlines(dbService.getDeadlines());
    setPolls(dbService.getPolls());
    setQuestions(dbService.getQuestions());
    setVersion((v) => v + 1);
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

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
        await dbService.createMaterial({
          ...params,
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
      material = dbService.getMaterials().find((m) => m.id === materialOrId);
    } else {
      material = materialOrId;
    }
    if (!material) return;

    if (material.type === 'link' && material.linkUrl) {
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
  }, []);

  // Notes methods
  const createNote = useCallback(
    (params: { courseId: string; content: string; category: NoteCategory }) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
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
      dbService.toggleDeadlineCompletion(id);
      refreshData();
    },
    [refreshData]
  );

  const deleteDeadline = useCallback(
    (id: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
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
      version; // reactive dependency
      return dbService.getPollVotes(pollId);
    },
    [version]
  );

  const hasUserVotedInPoll = useCallback(
    (pollId: string) => {
      if (!user) return false;
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      version; // reactive dependency
      return !!dbService.getUserVote(pollId, user.id);
    },
    [user, version]
  );

  // Q&A methods
  const createQuestion = useCallback(
    (params: { title: string; details?: string; courseId: string }) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
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
      return dbService.getAnswers(questionId);
    },
    [version]
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
          // Find question containing this answer
          const allQuestions = dbService.getQuestions();
          for (const q of allQuestions) {
            const answers = dbService.getAnswers(q.id);
            if (answers.some((a) => a.id === answerId)) {
              qId = q.id;
              break;
            }
          }
        }
        if (!qId) return { success: false, error: 'Sual tapılmadı.' };

        const q = dbService.getQuestions().find((item) => item.id === qId);
        const nextId = q?.acceptedAnswerId === answerId ? undefined : answerId;
        dbService.setAcceptedAnswer(qId, nextId, user.id);
        refreshData();
        return { success: true };
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Cavab təsdiqlənərkən xəta baş verdi.';
        return { success: false, error: msg };
      }
    },
    [user, refreshData]
  );

  const deleteAnswer = useCallback(
    (id: string) => {
      if (!user) return { success: false, error: 'Daxil olmamısınız.' };
      try {
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
