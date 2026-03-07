import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

// Define a type for the data
export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes: ['Posts'], // Define tags for cache invalidation
  endpoints: (builder) => ({
    // READ: Get all posts
    getPosts: builder.query<Post[], void>({
      query: () => ({ url: '/posts', method: 'get' }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),

    // READ: Get a single post by ID
    getPostById: builder.query<Post, number>({
      query: (id) => ({ url: `/posts/${id}`, method: 'get' }),
      providesTags: (_result, _error, id) => [{ type: 'Posts', id }],
    }),

    // CREATE: Create a new post
    createPost: builder.mutation<Post, Partial<Post>>({
      query: (body) => ({
        url: '/posts',
        method: 'post',
        data: body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),

    // UPDATE: Update an existing post
    updatePost: builder.mutation<Post, { id: number; body: Partial<Post> }>({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: 'put',
        data: body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Posts', id }],
    }),

    // DELETE: Delete a post
    deletePost: builder.mutation<{ success: boolean; id: number }, number>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'delete',
      }),
      invalidatesTags: (_result, _error, id) => [{ type: 'Posts', id }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = api;
