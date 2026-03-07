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
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  color?: string;
}

export interface ScheduleFilter {
  type: string[];
  course: string[];
}
