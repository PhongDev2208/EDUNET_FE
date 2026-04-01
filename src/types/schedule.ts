// Schedule page types
export interface ScheduleEvent {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  type: 'class' | 'assignment' | 'quiz' | 'meeting' | 'deadline';
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  instructor?: string;
  location?: string;
  meetingLink?: string;
  isOnline?: boolean;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  color?: string;
}

export interface ScheduleFilter {
  type: string[];
  course: string[];
}

/** Raw shape returned by the backend Schedule entity (with optional relation includes) */
export interface ApiSchedule {
  id: string;
  title: string;
  description?: string;
  /** Backend enum: 'class' | 'exam' | 'assignment' | 'event' */
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  location?: string;
  meetingLink?: string;
  isOnline: boolean;
  courseId?: string;
  teacherId?: string;
  course?: {
    id: string;
    title: string;
    thumbnail?: string;
    teacher?: {
      firstName?: string;
      lastName?: string;
    };
  };
}
