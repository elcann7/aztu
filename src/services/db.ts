// ============================================================================
// 6326A2 Real Database & Persistence Service
// Hybrid Storage: IndexedDB (for binary Files) + LocalStorage (for Relational Data)
// Includes server-side style validation and strict permission checks
// ============================================================================

export interface Course {
  id: string;
  code: string;
  name: string;
  slug: string;
  lecturer: string;
  department: string;
  credits: number;
}

export interface Material {
  id: string;
  title: string;
  courseId: string;
  type: 'file' | 'link';
  description?: string;
  fileName?: string;
  fileSize?: string;
  fileMime?: string;
  linkUrl?: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}

export type NoteCategory = 'teacher_said' | 'exam_colloquium' | 'seminar' | 'general';

export interface GroupNote {
  id: string;
  courseId: string;
  content: string;
  category: NoteCategory;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Deadline {
  id: string;
  title: string;
  courseId: string;
  description?: string;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  points?: number;
  isCompleted?: boolean;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Question {
  id: string;
  title: string;
  details?: string;
  courseId: string;
  acceptedAnswerId?: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Answer {
  id: string;
  questionId: string;
  content: string;
  isAccepted: boolean;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface PollOption {
  id: string;
  text: string;
}

export interface Poll {
  id: string;
  question: string;
  courseId?: string;
  options: PollOption[];
  authorId: string;
  authorName: string;
  createdAt: string;
  isClosed?: boolean;
}

export interface Vote {
  id: string;
  pollId: string;
  optionId: string;
  userId: string;
  createdAt: string;
}

// 6 Real University Courses for 6326A2 (1-ci Semestr)
export const REAL_COURSES: Course[] = [
  {
    id: 'math',
    code: 'MATH-101',
    name: 'Riyazi analiz-1',
    slug: 'math-analysis',
    lecturer: 'Dos. Nizami Şıxəliyev / Müəl. Şamil Talıblı',
    department: 'Ali Riyaziyyat kafedrası',
    credits: 6,
  },
  {
    id: 'algebra',
    code: 'MATH-102',
    name: 'Xətti cəbr',
    slug: 'linear-algebra',
    lecturer: 'Dos. Rəna Əmirova',
    department: 'Ali Riyaziyyat kafedrası',
    credits: 5,
  },
  {
    id: 'phys',
    code: 'PHYS-101',
    name: 'Fizika',
    slug: 'physics',
    lecturer: 'Dos. Sürəyya Məmmədova',
    department: 'Mühəndislik fizikası və elektronika kafedrası',
    credits: 5,
  },
  {
    id: 'prog',
    code: 'CS-101',
    name: 'Proqramlaşdırmanın əsasları-1',
    slug: 'programming',
    lecturer: 'Dos. Fizuli Əzimov / Müəl. Şəbnəm İsgəndərli / Müəl. Ayxan Həsənov',
    department: 'Kompüter Mühəndisliyi kafedrası',
    credits: 6,
  },
  {
    id: 'eng',
    code: 'ENG-101',
    name: 'Xarici dildə işgüzar və akademik kommunikasiya -1',
    slug: 'english',
    lecturer: 'Müəl. Dilarə Həmidova',
    department: 'Xarici dillər kafedrası',
    credits: 4,
  },
  {
    id: 'aze',
    code: 'AZE-101',
    name: 'Azərbaycan dilində işgüzar və akademik kommunikasiya',
    slug: 'azerbaijani',
    lecturer: 'Müəl. Nərmin İsayeva',
    department: 'Azərbaycan dili və pedaqogika kafedrası',
    credits: 4,
  },
];

// Storage keys
const KEY_MATERIALS = 'aztu_real_materials';
const KEY_NOTES = 'aztu_real_notes';
const KEY_DEADLINES = 'aztu_real_deadlines';
const KEY_QUESTIONS = 'aztu_real_questions';
const KEY_ANSWERS = 'aztu_real_answers';
const KEY_POLLS = 'aztu_real_polls';
const KEY_VOTES = 'aztu_real_votes';

// IndexedDB setup for real file blob uploads
const IDB_NAME = 'AzTu_6326A2_FileStore';
const IDB_STORE_FILES = 'material_blobs';

function openFileDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB dəstəklənmir.'));
    }
    const request = indexedDB.open(IDB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(IDB_STORE_FILES)) {
        db.createObjectStore(IDB_STORE_FILES);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function saveFileToIndexedDB(fileId: string, file: File): Promise<void> {
  const db = await openFileDatabase();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(IDB_STORE_FILES, 'readwrite');
    const store = tx.objectStore(IDB_STORE_FILES);
    const req = store.put(file, fileId);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getFileFromIndexedDB(fileId: string): Promise<Blob | null> {
  try {
    const db = await openFileDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_FILES, 'readonly');
      const store = tx.objectStore(IDB_STORE_FILES);
      const req = store.get(fileId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

async function deleteFileFromIndexedDB(fileId: string): Promise<void> {
  try {
    const db = await openFileDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE_FILES, 'readwrite');
      const store = tx.objectStore(IDB_STORE_FILES);
      const req = store.delete(fileId);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    // ignore
  }
}

// Helper: load/save JSON from localStorage
function loadList<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveList<T>(key: string, list: T[]): void {
  localStorage.setItem(key, JSON.stringify(list));
}

// ============================================================================
// DATABASE OPERATIONS WITH VALIDATION & PERMISSIONS
// ============================================================================

export const dbService = {
  // --------------------------------------------------------------------------
  // COURSES
  // --------------------------------------------------------------------------
  getCourses(): Course[] {
    return REAL_COURSES;
  },

  getCourseBySlug(slug: string): Course | undefined {
    return REAL_COURSES.find((c) => c.slug === slug);
  },

  getCourseById(id: string): Course | undefined {
    return REAL_COURSES.find((c) => c.id === id);
  },

  // --------------------------------------------------------------------------
  // MATERIALS
  // --------------------------------------------------------------------------
  getMaterials(courseId?: string): Material[] {
    const all = loadList<Material>(KEY_MATERIALS);
    const sorted = all.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (courseId) {
      return sorted.filter((m) => m.courseId === courseId);
    }
    return sorted;
  },

  async createMaterial(params: {
    id?: string;
    title: string;
    courseId: string;
    type: 'file' | 'link';
    description?: string;
    file?: File;
    linkUrl?: string;
    authorId: string;
    authorName: string;
  }): Promise<Material> {
    const cleanTitle = params.title?.trim();
    if (!cleanTitle) {
      throw new Error('Materialın başlığı mütləq daxil edilməlidir.');
    }
    if (!params.courseId) {
      throw new Error('Fənn seçilməlidir.');
    }

    const id = params.id || `mat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    let fileName: string | undefined;
    let fileSize: string | undefined;
    let fileMime: string | undefined;
    let cleanLink: string | undefined;

    if (params.type === 'file') {
      if (!params.file) {
        throw new Error('Yükləmək üçün fayl seçilməlidir.');
      }
      if (params.file.size > 25 * 1024 * 1024) {
        throw new Error('Faylın həcmi maksimum 25 MB ola bilər.');
      }
      await saveFileToIndexedDB(id, params.file);
      fileName = params.file.name;
      fileMime = params.file.type || 'application/octet-stream';
      const bytes = params.file.size;
      fileSize =
        bytes > 1024 * 1024
          ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.round(bytes / 1024)} KB`;
    } else {
      cleanLink = params.linkUrl?.trim();
      if (!cleanLink) {
        throw new Error('Link ünvanı daxil edilməlidir.');
      }
      try {
        const url = new URL(cleanLink);
        if (!['https:', 'http:'].includes(url.protocol)) throw new Error('unsupported protocol');
      } catch {
        throw new Error('Düzgün http və ya https linki daxil edin.');
      }
    }

    const material: Material = {
      id,
      title: cleanTitle,
      courseId: params.courseId,
      type: params.type,
      description: params.description?.trim(),
      fileName,
      fileSize,
      fileMime,
      linkUrl: cleanLink,
      authorId: params.authorId,
      authorName: params.authorName,
      createdAt: new Date().toISOString(),
    };

    const all = loadList<Material>(KEY_MATERIALS);
    all.push(material);
    saveList(KEY_MATERIALS, all);
    return material;
  },

  async deleteMaterial(id: string, userId: string): Promise<void> {
    const all = loadList<Material>(KEY_MATERIALS);
    const target = all.find((m) => m.id === id);
    if (!target) return;

    if (target.authorId !== userId) {
      throw new Error('Yalnız öz paylaşdığınız materialı silə bilərsiniz.');
    }

    if (target.type === 'file') {
      await deleteFileFromIndexedDB(id);
    }

    const filtered = all.filter((m) => m.id !== id);
    saveList(KEY_MATERIALS, filtered);
  },

  // --------------------------------------------------------------------------
  // GROUP NOTES
  // --------------------------------------------------------------------------
  getNotes(courseId?: string): GroupNote[] {
    const all = loadList<GroupNote>(KEY_NOTES);
    const sorted = all.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (courseId) {
      return sorted.filter((n) => n.courseId === courseId);
    }
    return sorted;
  },

  createNote(params: {
    id?: string;
    courseId: string;
    content: string;
    category: NoteCategory;
    authorId: string;
    authorName: string;
  }): GroupNote {
    const cleanContent = params.content?.trim();
    if (!cleanContent) {
      throw new Error('Qeyd mətni daxil edilməlidir.');
    }
    if (!params.courseId) {
      throw new Error('Fənn seçilməlidir.');
    }

    const id = params.id || `note_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const note: GroupNote = {
      id,
      courseId: params.courseId,
      content: cleanContent,
      category: params.category || 'general',
      authorId: params.authorId,
      authorName: params.authorName,
      createdAt: new Date().toISOString(),
    };

    const all = loadList<GroupNote>(KEY_NOTES);
    all.push(note);
    saveList(KEY_NOTES, all);
    return note;
  },

  deleteNote(id: string, userId: string): void {
    const all = loadList<GroupNote>(KEY_NOTES);
    const target = all.find((n) => n.id === id);
    if (!target) return;

    if (target.authorId !== userId) {
      throw new Error('Yalnız öz əlavə etdiyiniz qeydi silə bilərsiniz.');
    }

    const filtered = all.filter((n) => n.id !== id);
    saveList(KEY_NOTES, filtered);
  },

  // --------------------------------------------------------------------------
  // DEADLINES / TASKS
  // --------------------------------------------------------------------------
  getDeadlines(courseId?: string): Deadline[] {
    const all = loadList<Deadline>(KEY_DEADLINES);
    // Sort by dueDate ascending (nearest first)
    const sorted = all.sort((a, b) => {
      const timeA = new Date(`${a.dueDate}T${a.dueTime || '23:59'}`).getTime();
      const timeB = new Date(`${b.dueDate}T${b.dueTime || '23:59'}`).getTime();
      return timeA - timeB;
    });
    if (courseId) {
      return sorted.filter((d) => d.courseId === courseId);
    }
    return sorted;
  },

  createDeadline(params: {
    title: string;
    courseId: string;
    description?: string;
    dueDate: string;
    dueTime?: string;
    points?: number;
    authorId: string;
    authorName: string;
  }): Deadline {
    const cleanTitle = params.title?.trim();
    if (!cleanTitle) {
      throw new Error('Tapşırığın başlığı daxil edilməlidir.');
    }
    if (!params.courseId) {
      throw new Error('Fənn seçilməlidir.');
    }
    if (!params.dueDate) {
      throw new Error('Son təhvil tarixi daxil edilməlidir.');
    }

    const id = `dl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const deadline: Deadline = {
      id,
      title: cleanTitle,
      courseId: params.courseId,
      description: params.description?.trim(),
      dueDate: params.dueDate,
      dueTime: params.dueTime || '23:59',
      points: params.points ? Number(params.points) : undefined,
      isCompleted: false,
      authorId: params.authorId,
      authorName: params.authorName,
      createdAt: new Date().toISOString(),
    };

    const all = loadList<Deadline>(KEY_DEADLINES);
    all.push(deadline);
    saveList(KEY_DEADLINES, all);
    return deadline;
  },

  toggleDeadlineCompletion(id: string): Deadline | null {
    const all = loadList<Deadline>(KEY_DEADLINES);
    const index = all.findIndex((d) => d.id === id);
    if (index === -1) return null;

    all[index].isCompleted = !all[index].isCompleted;
    saveList(KEY_DEADLINES, all);
    return all[index];
  },

  deleteDeadline(id: string, userId: string): void {
    const all = loadList<Deadline>(KEY_DEADLINES);
    const target = all.find((d) => d.id === id);
    if (!target) return;

    if (target.authorId !== userId) {
      throw new Error('Yalnız öz yaratdığınız tapşırığı silə bilərsiniz.');
    }

    const filtered = all.filter((d) => d.id !== id);
    saveList(KEY_DEADLINES, filtered);
  },

  // --------------------------------------------------------------------------
  // POLLS & VOTING (One vote per user per poll enforced)
  // --------------------------------------------------------------------------
  getPolls(courseId?: string): Poll[] {
    const all = loadList<Poll>(KEY_POLLS);
    const sorted = all.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (courseId) {
      return sorted.filter((p) => p.courseId === courseId);
    }
    return sorted;
  },

  getPollVotes(pollId: string): Vote[] {
    const allVotes = loadList<Vote>(KEY_VOTES);
    return allVotes.filter((v) => v.pollId === pollId);
  },

  getUserVote(pollId: string, userId: string): Vote | undefined {
    const allVotes = loadList<Vote>(KEY_VOTES);
    return allVotes.find((v) => v.pollId === pollId && v.userId === userId);
  },

  createPoll(params: {
    question: string;
    courseId?: string;
    options: string[];
    authorId: string;
    authorName: string;
  }): Poll {
    const cleanQuestion = params.question?.trim();
    if (!cleanQuestion) {
      throw new Error('Sorğu sualı daxil edilməlidir.');
    }
    const cleanOptions = params.options
      .map((o) => o.trim())
      .filter((o) => o.length > 0);

    if (cleanOptions.length < 2) {
      throw new Error('Sorğu üçün ən azı 2 fərqli variant daxil edilməlidir.');
    }

    const id = `poll_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const optionEntities: PollOption[] = cleanOptions.map((text, idx) => ({
      id: `opt_${id}_${idx + 1}`,
      text,
    }));

    const poll: Poll = {
      id,
      question: cleanQuestion,
      courseId: params.courseId || undefined,
      options: optionEntities,
      authorId: params.authorId,
      authorName: params.authorName,
      createdAt: new Date().toISOString(),
    };

    const all = loadList<Poll>(KEY_POLLS);
    all.push(poll);
    saveList(KEY_POLLS, all);
    return poll;
  },

  voteInPoll(pollId: string, optionId: string, userId: string): Vote {
    const allVotes = loadList<Vote>(KEY_VOTES);
    const existing = allVotes.find((v) => v.pollId === pollId && v.userId === userId);
    if (existing) {
      throw new Error('Siz artıq bu sorğuda səs vermisiniz.');
    }

    const vote: Vote = {
      id: `vote_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      pollId,
      optionId,
      userId,
      createdAt: new Date().toISOString(),
    };

    allVotes.push(vote);
    saveList(KEY_VOTES, allVotes);
    return vote;
  },

  deletePoll(id: string, userId: string): void {
    const all = loadList<Poll>(KEY_POLLS);
    const target = all.find((p) => p.id === id);
    if (!target) return;

    if (target.authorId !== userId) {
      throw new Error('Yalnız öz yaratdığınız sorğunu silə bilərsiniz.');
    }

    const filteredPolls = all.filter((p) => p.id !== id);
    saveList(KEY_POLLS, filteredPolls);

    // Delete associated votes
    const allVotes = loadList<Vote>(KEY_VOTES);
    const filteredVotes = allVotes.filter((v) => v.pollId !== id);
    saveList(KEY_VOTES, filteredVotes);
  },

  // --------------------------------------------------------------------------
  // QUESTIONS & ANSWERS (Q&A)
  // --------------------------------------------------------------------------
  getQuestions(courseId?: string): Question[] {
    const all = loadList<Question>(KEY_QUESTIONS);
    const sorted = all.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    if (courseId) {
      return sorted.filter((q) => q.courseId === courseId);
    }
    return sorted;
  },

  getAnswers(questionId: string): Answer[] {
    const all = loadList<Answer>(KEY_ANSWERS);
    return all
      .filter((a) => a.questionId === questionId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },

  createQuestion(params: {
    id?: string;
    title: string;
    details?: string;
    courseId: string;
    authorId: string;
    authorName: string;
  }): Question {
    const cleanTitle = params.title?.trim();
    if (!cleanTitle) {
      throw new Error('Sual mətni daxil edilməlidir.');
    }
    if (!params.courseId) {
      throw new Error('Fənn seçilməlidir.');
    }

    const id = params.id || `q_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const question: Question = {
      id,
      title: cleanTitle,
      details: params.details?.trim(),
      courseId: params.courseId,
      authorId: params.authorId,
      authorName: params.authorName,
      createdAt: new Date().toISOString(),
    };

    const all = loadList<Question>(KEY_QUESTIONS);
    all.push(question);
    saveList(KEY_QUESTIONS, all);
    return question;
  },

  createAnswer(params: {
    id?: string;
    questionId: string;
    content: string;
    authorId: string;
    authorName: string;
  }): Answer {
    const cleanContent = params.content?.trim();
    if (!cleanContent) {
      throw new Error('Cavab mətni daxil edilməlidir.');
    }

    const id = params.id || `ans_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const answer: Answer = {
      id,
      questionId: params.questionId,
      content: cleanContent,
      isAccepted: false,
      authorId: params.authorId,
      authorName: params.authorName,
      createdAt: new Date().toISOString(),
    };

    const all = loadList<Answer>(KEY_ANSWERS);
    all.push(answer);
    saveList(KEY_ANSWERS, all);
    return answer;
  },

  setAcceptedAnswer(questionId: string, answerId: string | undefined, userId: string): void {
    const allQuestions = loadList<Question>(KEY_QUESTIONS);
    const qIndex = allQuestions.findIndex((q) => q.id === questionId);
    if (qIndex === -1) return;

    if (allQuestions[qIndex].authorId !== userId) {
      throw new Error('Yalnız sualı verən şəxs cavabı təsdiq edə bilər.');
    }

    allQuestions[qIndex].acceptedAnswerId = answerId;
    saveList(KEY_QUESTIONS, allQuestions);

    const allAnswers = loadList<Answer>(KEY_ANSWERS);
    allAnswers.forEach((ans) => {
      if (ans.questionId === questionId) {
        ans.isAccepted = ans.id === answerId;
      }
    });
    saveList(KEY_ANSWERS, allAnswers);
  },

  deleteQuestion(id: string, userId: string): void {
    const all = loadList<Question>(KEY_QUESTIONS);
    const target = all.find((q) => q.id === id);
    if (!target) return;

    if (target.authorId !== userId) {
      throw new Error('Yalnız öz verdiyiniz sualı silə bilərsiniz.');
    }

    const filteredQuestions = all.filter((q) => q.id !== id);
    saveList(KEY_QUESTIONS, filteredQuestions);

    // Delete associated answers
    const allAnswers = loadList<Answer>(KEY_ANSWERS);
    const filteredAnswers = allAnswers.filter((a) => a.questionId !== id);
    saveList(KEY_ANSWERS, filteredAnswers);
  },

  deleteAnswer(id: string, userId: string): void {
    const allAnswers = loadList<Answer>(KEY_ANSWERS);
    const target = allAnswers.find((a) => a.id === id);
    if (!target) return;

    if (target.authorId !== userId) {
      throw new Error('Yalnız öz yazdığınız cavabı silə bilərsiniz.');
    }

    const filtered = allAnswers.filter((a) => a.id !== id);
    saveList(KEY_ANSWERS, filtered);
  },
};

// ============================================================================
// DYNAMIC DEADLINE RELATIVE STATUS HELPER
// ============================================================================
export interface DeadlineTimeStatus {
  label: string;
  isOverdue: boolean;
  isUrgent: boolean;
}

export function computeDeadlineStatus(dueDate: string, dueTime?: string): DeadlineTimeStatus {
  const targetStr = dueTime ? `${dueDate}T${dueTime}:00` : `${dueDate}T23:59:59`;
  const targetDate = new Date(targetStr);
  const now = new Date();

  // Diff in milliseconds
  const diffMs = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffMs < 0) {
    return { label: 'Gecikib', isOverdue: true, isUrgent: true };
  }

  // Same calendar day
  const isToday =
    targetDate.getFullYear() === now.getFullYear() &&
    targetDate.getMonth() === now.getMonth() &&
    targetDate.getDate() === now.getDate();

  if (isToday) {
    return { label: 'Bu gün', isOverdue: false, isUrgent: true };
  }

  if (diffDays === 1) {
    return { label: 'Sabah', isOverdue: false, isUrgent: true };
  }

  if (diffDays <= 3) {
    return { label: `${diffDays} gün qalıb`, isOverdue: false, isUrgent: true };
  }

  return { label: `${diffDays} gün qalıb`, isOverdue: false, isUrgent: false };
}
