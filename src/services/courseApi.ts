import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery, API_BASE_URL } from './axiosBaseQuery';
import type { ApiResponse, PaginatedResponse } from './authApi';

// Course Types — aligned with backend Course entity
export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
  duration?: string;
  totalLessons: number;
  totalStudents?: number;
  rating?: number;
  totalReviews?: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'all';
  status: 'draft' | 'pending' | 'approved' | 'rejected' | 'published' | 'archived';
  language?: string;
  tags?: string[];
  goal?: string;
  schedule?: string[];
  startDate?: string;
  publishedAt?: string;
  categoryId?: string;
  category?: Category;
  teacherId: string;
  teacher?: CourseTeacher;
  lessons?: Lesson[];
  reviews?: Review[];
  createdAt: string;
  updatedAt: string;
}

// The teacher relation on Course points to the User entity
export interface CourseTeacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  order?: number;
  isActive?: boolean;
  courses?: Course[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Teacher {
  id: string;
  teacherId: string;
  specialization?: string[];
  qualification?: string;
  experience?: number;
  rating?: number;
  totalCourses?: number;
  totalStudents?: number;
  status?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  earnings?: number;
  userId: string;
  user?: CourseTeacher;
  createdAt?: string;
  updatedAt?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description?: string;
  content?: string;
  type: 'video' | 'reading' | 'quiz' | 'assignment';
  duration?: string;
  order: number;
  videoUrl?: string;
  isFree: boolean;
  courseId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  status: 'active' | 'completed' | 'dropped' | 'expired';
  progress: number;
  completedAt?: string;
  lastAccessedAt?: string;
  course?: Course;
  user?: CourseTeacher;
  createdAt: string;
  updatedAt?: string;
}

export interface Review {
  id: string;
  rating: number;
  comment?: string;
  isVisible?: boolean;
  courseId: string;
  userId: string;
  course?: Course;
  user?: {
    id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt?: string;
}

/** Query params aligned with backend decorators: page, size, filter, sort, include */
export interface QueryParams {
  page?: number;
  size?: number | string;
  filter?: string;
  sort?: string;
  include?: string;
}

export const courseApi = createApi({
  reducerPath: 'courseApi',
  baseQuery: axiosBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Courses', 'Categories', 'Lessons', 'Enrollments', 'Reviews', 'Teachers'],
  endpoints: (builder) => ({
    // ============ CATEGORIES ============
    getCategories: builder.query<PaginatedResponse<Category>, QueryParams | void>({
      query: (params) => ({
        url: '/categories',
        method: 'get',
        params: params || {},
      }),
      providesTags: ['Categories'],
    }),

    getCategoryById: builder.query<ApiResponse<Category>, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'get',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Categories', id }],
    }),

    createCategory: builder.mutation<ApiResponse<Category>, Partial<Category>>({
      query: (data) => ({
        url: '/categories',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Categories'],
    }),

    updateCategory: builder.mutation<ApiResponse<Category>, { id: string; data: Partial<Category> }>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        method: 'patch',
        data,
      }),
      invalidatesTags: ['Categories'],
    }),

    deleteCategory: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Categories'],
    }),

    // ============ COURSES ============
    getCourses: builder.query<PaginatedResponse<Course>, QueryParams | void>({
      query: (params) => ({
        url: '/courses',
        method: 'get',
        params: params || {},
      }),
      providesTags: (result) =>
        result?.data?.rows
          ? [
              ...result.data.rows.map(({ id }) => ({ type: 'Courses' as const, id })),
              { type: 'Courses', id: 'LIST' },
            ]
          : [{ type: 'Courses', id: 'LIST' }],
    }),

    getCourseById: builder.query<ApiResponse<Course>, { id: string; include?: string }>({
      query: ({ id, include }) => ({
        url: `/courses/${id}`,
        method: 'get',
        params: include ? { include } : {},
      }),
      providesTags: (_result, _error, { id }) => [{ type: 'Courses', id }],
    }),

    createCourse: builder.mutation<ApiResponse<Course>, Partial<Course>>({
      query: (data) => ({
        url: '/courses',
        method: 'post',
        data,
      }),
      invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
    }),

    updateCourse: builder.mutation<ApiResponse<Course>, { id: string; data: Partial<Course> }>({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: 'patch',
        data,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Courses', id }, { type: 'Courses', id: 'LIST' }],
    }),

    deleteCourse: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/courses/${id}`,
        method: 'delete',
      }),
      invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
    }),

    // ============ TEACHERS ============
    getTeachers: builder.query<PaginatedResponse<Teacher>, QueryParams | void>({
      query: (params) => ({
        url: '/teachers',
        method: 'get',
        params: params || {},
      }),
      providesTags: ['Teachers'],
    }),

    getTeacherById: builder.query<ApiResponse<Teacher>, string>({
      query: (id) => ({
        url: `/teachers/${id}`,
        method: 'get',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Teachers', id }],
    }),

    // ============ LESSONS ============
    getLessonsByCourse: builder.query<ApiResponse<Lesson[]>, string>({
      query: (courseId) => ({
        url: `/lessons/course/${courseId}`,
        method: 'get',
      }),
      providesTags: ['Lessons'],
    }),

    getLessonById: builder.query<ApiResponse<Lesson>, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'get',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Lessons', id }],
    }),

    createLesson: builder.mutation<ApiResponse<Lesson>, Partial<Lesson>>({
      query: (data) => ({
        url: '/lessons',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Lessons'],
    }),

    updateLesson: builder.mutation<ApiResponse<Lesson>, { id: string; data: Partial<Lesson> }>({
      query: ({ id, data }) => ({
        url: `/lessons/${id}`,
        method: 'patch',
        data,
      }),
      invalidatesTags: ['Lessons'],
    }),

    deleteLesson: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/lessons/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Lessons'],
    }),

    // ============ ENROLLMENTS ============
    getEnrollments: builder.query<PaginatedResponse<Enrollment>, QueryParams | void>({
      query: (params) => ({
        url: '/enrollments',
        method: 'get',
        params: params || {},
      }),
      providesTags: ['Enrollments'],
    }),

    getUserEnrollments: builder.query<ApiResponse<Enrollment[]>, string>({
      query: (userId) => ({
        url: `/enrollments/user/${userId}`,
        method: 'get',
      }),
      providesTags: ['Enrollments'],
    }),

    enrollCourse: builder.mutation<ApiResponse<Enrollment>, { courseId: string; userId: string }>({
      query: (data) => ({
        url: '/enrollments',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Enrollments'],
    }),

    updateEnrollment: builder.mutation<ApiResponse<Enrollment>, { id: string; data: Partial<Enrollment> }>({
      query: ({ id, data }) => ({
        url: `/enrollments/${id}`,
        method: 'patch',
        data,
      }),
      invalidatesTags: ['Enrollments'],
    }),

    // ============ REVIEWS ============
    getReviews: builder.query<PaginatedResponse<Review>, QueryParams | void>({
      query: (params) => ({
        url: '/reviews',
        method: 'get',
        params: params || {},
      }),
      providesTags: ['Reviews'],
    }),

    getReviewsByCourse: builder.query<ApiResponse<Review[]>, string>({
      query: (courseId) => ({
        url: `/reviews/course/${courseId}`,
        method: 'get',
      }),
      providesTags: ['Reviews'],
    }),

    getCourseReviewStats: builder.query<ApiResponse<{ averageRating: number; totalReviews: number }>, string>({
      query: (courseId) => ({
        url: `/reviews/course/${courseId}/stats`,
        method: 'get',
      }),
      providesTags: ['Reviews'],
    }),

    createReview: builder.mutation<ApiResponse<Review>, { courseId: string; rating: number; comment?: string }>({
      query: (data) => ({
        url: '/reviews',
        method: 'post',
        data,
      }),
      invalidatesTags: ['Reviews', 'Courses'],
    }),

    updateReview: builder.mutation<ApiResponse<Review>, { id: string; data: Partial<Review> }>({
      query: ({ id, data }) => ({
        url: `/reviews/${id}`,
        method: 'patch',
        data,
      }),
      invalidatesTags: ['Reviews'],
    }),

    deleteReview: builder.mutation<ApiResponse<null>, string>({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'delete',
      }),
      invalidatesTags: ['Reviews'],
    }),

    toggleReviewVisibility: builder.mutation<ApiResponse<Review>, string>({
      query: (id) => ({
        url: `/reviews/${id}/toggle-visibility`,
        method: 'patch',
      }),
      invalidatesTags: ['Reviews'],
    }),
  }),
});

export const {
  // Categories
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  // Courses
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
  // Teachers
  useGetTeachersQuery,
  useGetTeacherByIdQuery,
  // Lessons
  useGetLessonsByCourseQuery,
  useGetLessonByIdQuery,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
  // Enrollments
  useGetEnrollmentsQuery,
  useGetUserEnrollmentsQuery,
  useEnrollCourseMutation,
  useUpdateEnrollmentMutation,
  // Reviews
  useGetReviewsQuery,
  useGetReviewsByCourseQuery,
  useGetCourseReviewStatsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useToggleReviewVisibilityMutation,
} = courseApi;
