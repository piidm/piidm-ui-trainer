export interface Batch {
  id: string;
  length: number;
  name: string;
  timing: '10am-12pm' | '3pm-6pm' | '7pm-9pm';
  students: Student[];
  startDate: string;
  endDate: string;
  courseTitle: string;
  totalStudents: number;
  isActive: boolean;
}

export interface Student {
  id: string;
  length?:number;
  name: string;
  email: string;
  avatar?: string;
  enrollmentDate: string;
  overallAttendance: number;
  overallGrade: number;
  batchId: string;
}

export interface LiveSession {
  id: string;
  topic: string;
  batchId: string;
  date: string;
  time: string;
  mode: 'classroom' | 'online' | 'hybrid';
  lectureLink?: string;
  status: 'scheduled' | 'ongoing' | 'completed';
}

export interface Assignment {
  id: string;
  title: string;
  details: string;
  dueDate: string;
  batchId: string;
  totalMarks: number;
  submissions: AssignmentSubmission[];
  status: 'active' | 'expired' | 'draft';
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface AssignmentSubmission {
  id: string;
  studentId: string;
  studentName: string;
  assignmentId: string;
  submittedAt: string;
  files: SubmissionFile[];
  marks?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'reviewed';
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface SubmissionFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

export interface ReviewAction {
  id: string;
  submissionId: string;
  assignmentId: string;
  action: 'accept' | 'reject';
  marks?: number;
  feedback: string;
  reviewedBy: string;
  reviewedAt: string;
}

export interface AssignmentStats {
  totalAssignments: number;
  activeAssignments: number;
  expiredAssignments: number;
  totalSubmissions: number;
  pendingReviews: number;
  reviewedSubmissions: number;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  batchId: string;
  type: 'mcq' | 'descriptive' | 'practical' | 'mixed';
  duration: number;
  totalMarks: number;
  passingMarks: number;
  scheduledDate: string;
  questions: ExamQuestion[];
  submissions: ExamSubmission[];
  status: 'draft' | 'scheduled' | 'ongoing' | 'completed';
}

export interface ExamQuestion {
  id: string;
  type: 'mcq' | 'descriptive' | 'practical';
  question: string;
  options?: string[];
  correctAnswer?: string | number;
  marks: number;
  order: number;
}

export interface ExamSubmission {
  id: string;
  studentId: string;
  examId: string;
  answers: ExamAnswer[];
  submittedAt: string;
  grade?: number;
  status: 'in-progress' | 'submitted' | 'graded';
}

export interface ExamAnswer {
  questionId: string;
  answer: string;
  isCorrect?: boolean;
  marks?: number;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  batchId: string;
  date: string;
  status: 'present' | 'absent' | 'late';
  sessionId?: string;
  markedAt: string;
  notes?: string;
}

export interface DashboardStats {
  totalBatches: number;
  totalStudents: number;
  todaySessions: number;
  pendingGrading: number;
  averageAttendance: number;
  upcomingExams: number;
}