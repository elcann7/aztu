# AzTU 6326A2 — Verilənlər Modelləri və Sxemlər (Data Models & Schemas)

Bu sənəd **AzTU 6326A2 Vahid Akademik İş Sahəsi** platformasındakı bütün verilənlər strukturlarını, TypeScript interfeyslərini, sahə tələblərini və `localStorage` yaddaş açarlarını əhatə edir.

---

## 1. Yaddaş Açarları (Storage Keys)

Bütün verilənlər brauzerin yerli yaddaşında xüsusi prefikslərlə təhlükəsiz şəkildə saxlanılır:

| Yaddaş Açarı (Key) | Növü | Təsviri |
| :--- | :--- | :--- |
| `aztu_6326a2_session` | `User` | Cari aktiv sessiyada daxil olmuş tələbənin profili |
| `aztu_6326a2_users` | `StoredAccount[]` | Qeydiyyatdan keçmiş bütün tələbələrin siyahısı (maksimum 30) |
| `aztu_6326a2_courses` | `Course[]` | Akademik fənlərin siyahısı və kreditləri |
| `aztu_6326a2_notes` | `GroupNote[]` | Qrup mühazirə və müəllim qeydləri |
| `aztu_6326a2_questions` | `Question[]` | Sual-Cavab forumundakı suallar |
| `aztu_6326a2_answers` | `Answer[]` | Suallara verilən cavablar |
| `aztu_6326a2_polls` | `Poll[]` | Qrupdaxili aktiv və tamamlanmış sorğular |
| `aztu_6326a2_votes` | `Vote[]` | Sorğularda verilmiş tələbə səsləri |
| `aztu_6326a2_materials` | `Material[]` | Yüklənmiş dərs materialları və təqdimatlar |
| `aztu_6326a2_deadlines` | `Deadline[]` | Kolloqvium və tapşırıq tarixləri |

---

## 2. İstifadəçi və Profil Modelləri

### 2.1. `User` (Tələbə İdentikliyi)
```typescript
export interface User {
  id: string;                 // Unikal tələbə identifikatoru (məs: 'usr_6326a2_...')
  firstName: string;          // LOCKED: Dəyişdirilə bilməz, universitet qeydiyyatı ilə təsdiqlənir
  lastName: string;           // LOCKED: Dəyişdirilə bilməz, universitet qeydiyyatı ilə təsdiqlənir
  email: string;              // Universitet və ya Google e-poçt ünvanı
  group: string;              // LOCKED: Həmişə '6326A2'
  avatarInitials: string;     // Ad və soyadın baş hərfləri (məs: 'EN')
  avatarUrl?: string;         // Profil şəkli (Base64 data URI, HTTP URL və ya Emoji)
  bio?: string;               // Fərdi tələbə statusu / bioqrafiya
  studentIdNumber?: string;   // Tələbə bilet / kart nömrəsi
  specialty?: string;         // Təhsil aldığı ixtisas (məs: 'Kompüter Mühəndisliyi')
  telegram?: string;          // Telegram istifadəçi adı (məs: '@elcan_dev')
  phone?: string;             // Əlaqə nömrəsi
  github?: string;            // GitHub profil linki
  createdAt: string;          // Qeydiyyat tarixi (ISO 8601)
  authProvider?: 'password' | 'google'; // Autentifikasiya metodu
}
```

### 2.2. `StoredAccount`
```typescript
interface StoredAccount {
  user: User;
  passwordHash?: string;      // Web Crypto SHA-256 + Salt heşi (yalnız e-poçt/şifrə hesabı üçün)
}
```

### 2.3. `ProfileUpdateData`
Tələbə tərəfindən profil modalında redaktə edilə bilən fərdi sahələr:
```typescript
export interface ProfileUpdateData {
  avatarUrl?: string;
  bio?: string;
  studentIdNumber?: string;
  specialty?: string;
  telegram?: string;
  phone?: string;
  github?: string;
}
```

---

## 3. Fənn Modeli (`Course`)

```typescript
export interface Course {
  id: string;                 // Fənn ID-si (məs: 'math-analysis')
  code: string;               // Fənn kodu (məs: 'MATH-101')
  name: string;               // Rəsmi adı (məs: 'Riyazi analiz')
  slug: string;               // URL üçün slug (məs: 'math-analysis')
  lecturer: string;           // Mühazirəçi müəllimin adı
  department: string;         // Kafedra (məs: 'Kompüter Mühəndisliyi')
  credits: number;            // Kredit sayı (məs: 6)
}
```

---

## 4. Qrup Qeydləri Modeli (`GroupNote`)

```typescript
export type NoteCategory = 'teacher_said' | 'exam_colloquium' | 'seminar' | 'general';

export interface GroupNote {
  id: string;                 // Unikal qeyd ID-si
  courseId: string;           // Əlaqəli fənn ID-si
  content: string;            // Qeydin əsas mətni
  category: NoteCategory;     // 'teacher_said' | 'exam_colloquium' | 'seminar' | 'general'
  authorId: string;           // Qeydi yazan tələbənin ID-si
  authorName: string;         // Qeydi yazan tələbənin Adı və Soyadı
  createdAt: string;          // Yaradılma vaxtı (ISO 8601)
  updatedAt?: string;         // Son yenilənmə vaxtı
}
```

---

## 5. Sual-Cavab Forumu Modelləri (`Question` və `Answer`)

### 5.1. `Question`
```typescript
export interface Question {
  id: string;                 // Unikal sual ID-si
  title: string;              // Sualın başlığı
  details?: string;           // Ətraflı izahat və ya kod
  courseId: string;           // Aid olduğu fənn
  acceptedAnswerId?: string;  // Təsdiqlənmiş doğru cavabın ID-si
  authorId: string;           // Sualı verən tələbə
  authorName: string;         // Tələbənin adı
  createdAt: string;          // Tarix
  updatedAt?: string;
}
```

### 5.2. `Answer`
```typescript
export interface Answer {
  id: string;                 // Cavab ID-si
  questionId: string;         // Aid olduğu sualın ID-si
  content: string;            // Cavab mətni
  isAccepted: boolean;        // Doğru cavab kimi seçilibmi?
  authorId: string;           // Cavab yazan tələbə
  authorName: string;
  createdAt: string;
}
```

---

## 6. Qrup Sorğuları Modelləri (`Poll` və `Vote`)

### 6.1. `PollOption` & `Poll`
```typescript
export interface PollOption {
  id: string;                 // Variant ID-si
  text: string;               // Variant mətni
}

export interface Poll {
  id: string;                 // Sorğu ID-si
  question: string;           // Sorğu sualı
  courseId?: string;          // İstəyə bağlı aid olduğu fənn
  options: PollOption[];      // Variantlar siyahısı
  authorId: string;           // Sorğunu başladan tələbə
  authorName: string;
  createdAt: string;
  isClosed?: boolean;         // Səsvermə dayandırılıbmı?
}
```

### 6.2. `Vote`
```typescript
export interface Vote {
  id: string;                 // Səs ID-si
  pollId: string;             // Aid olduğu sorğu
  optionId: string;           // Seçilən variant
  userId: string;             // Səs verən tələbə (təkrar səsvermənin qarşısını almaq üçün)
  createdAt: string;
}
```

---

## 7. Akademik Materiallar Modeli (`Material`)

```typescript
export interface Material {
  id: string;                 // Material ID-si
  title: string;              // Faylın və ya keçidin adı
  courseId: string;           // Fənn ID-si
  type: 'file' | 'link';      // Fayl və ya Xarici Resurs linki
  description?: string;       // Qısa təsvir
  fileName?: string;          // Orijinal fayl adı (məs: 'lab_1_hesabat.pdf')
  fileSize?: string;          // Faylın ölçüsü (məs: '2.4 MB')
  fileMime?: string;          // MIME tipi (məs: 'application/pdf')
  linkUrl?: string;           // Xarici keçid URL-i
  authorId: string;           // Paylaşan tələbə
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}
```

---

## 8. Deadline və Tapşırıqlar Modeli (`Deadline`)

```typescript
export interface Deadline {
  id: string;                 // Deadline ID-si
  title: string;              // Tapşırığın adı (məs: 'Laboratoriya işi №3')
  courseId: string;           // Fənn ID-si
  description?: string;       // Tələblər və izahat
  dueDate: string;            // Son tarix (YYYY-MM-DD formatında)
  dueTime?: string;           // Son saat (HH:mm formatında)
  points?: number;            // Tapşırığın bal dəyəri (məs: 10 bal)
  isCompleted?: boolean;      // Bitirilibmi?
  authorId: string;           // Yaradan tələbə
  authorName: string;
  createdAt: string;
  updatedAt?: string;
}
```

---

## 9. Münasibətlər (Entity Relationships)

```mermaid
erDiagram
    USER ||--o{ GROUP_NOTE : "paylaşır"
    USER ||--o{ QUESTION : "soruşur"
    USER ||--o{ ANSWER : "cavablandırır"
    USER ||--o{ POLL : "başladır"
    USER ||--o{ VOTE : "səs verir"
    USER ||--o{ MATERIAL : "yükləyir"
    USER ||--o{ DEADLINE : "təyin edir"

    COURSE ||--o{ GROUP_NOTE : "aiddir"
    COURSE ||--o{ QUESTION : "aiddir"
    COURSE ||--o{ MATERIAL : "aiddir"
    COURSE ||--o{ DEADLINE : "aiddir"

    QUESTION ||--o{ ANSWER : "daxildir"
    POLL ||--|{ POLL_OPTION : "ibarətdir"
    POLL ||--o{ VOTE : "toplayır"
```
