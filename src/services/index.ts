// Export all API services and hooks

// Auth API
export {
  authApi,
  useLoginMutation,
  useRegisterMutation,
  useGetProfileQuery,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
} from './authApi';

export type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  ApiResponse,
  PaginatedResponse,
} from './authApi';

// Course API
export {
  courseApi,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  useGetLessonsByCourseQuery,
  useGetLessonByIdQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  useGetEnrollmentsQuery,
  useGetUserEnrollmentsQuery,
  useEnrollCourseMutation,
  useUpdateEnrollmentMutation,
  useGetReviewsQuery,
  useGetReviewsByCourseQuery,
  useGetCourseReviewStatsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useToggleReviewVisibilityMutation,
} from './courseApi';

export type {
  Course,
  CourseTeacher,
  Category,
  Teacher,
  Lesson,
  Enrollment,
  Review,
  QueryParams,
} from './courseApi';

// Learning API
export {
  learningApi,
  useGetMaterialsByCourseQuery,
  useGetMaterialByIdQuery,
  useGetAssignmentsByCourseQuery,
  useGetMyAssignmentsQuery,
  useGetAssignmentByIdQuery,
  useSubmitAssignmentMutation,
  useGetQuizzesByCourseQuery,
  useGetQuizByIdQuery,
  useStartQuizAttemptMutation,
  useSubmitQuizAttemptMutation,
  useGetQuizAttemptsQuery,
  useGetQuizBestScoreQuery,
  useGetSchedulesQuery,
  useGetUpcomingSchedulesQuery,
  useGetSchedulesByDateRangeQuery,
  useGetSchedulesByCourseQuery,
} from './learningApi';

export type {
  Material,
  Assignment,
  Quiz,
  QuizAttempt,
  Schedule,
} from './learningApi';

// Support API
export {
  supportApi,
  useGetTicketsQuery,
  useGetMyTicketsQuery,
  useGetTicketByIdQuery,
  useGetTicketsByStatusQuery,
  useGetTicketStatsQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useRespondToTicketMutation,
  useResolveTicketMutation,
  useCloseTicketMutation,
  useDeleteTicketMutation,
} from './supportApi';

export type {
  SupportTicket,
  CreateTicketRequest,
  TicketStats,
} from './supportApi';

// Axios utilities
export {
  axiosBaseQuery,
  API_BASE_URL,
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from './axiosBaseQuery';
