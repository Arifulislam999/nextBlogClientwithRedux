const { apiSlice } = require("../API/apiSlice");

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLogInUser: builder.query({
      query: () => "/api/user/getuser",
      providesTags: ["update-data"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/updateuser",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["update-data"],
    }),
    userPost: builder.mutation({
      query: (data) => ({
        url: "/api/post/singlepost",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["upload-post", "edit-post"],
    }),
    getAllPost: builder.query({
      query: () => "/api/post/allpost",
      providesTags: ["upload-post", "edit-post", "delete-post"],
    }),
    getLoginUserPost: builder.query({
      query: () => "/api/post/loggedinuserpost",
      providesTags: ["upload-post", "edit-post", "delete-post"],
    }),
    getAnotherSingleUser: builder.query({
      query: ({ id }) => `/api/post/singleuserquery?id=${id}`,
    }),
    getMyUserId: builder.query({
      query: () => "/api/post/myuserid",
    }),
    getSinglePost: builder.query({
      query: ({ id }) => ({
        url: `/api/post/singlepost?id=${id}`,
      }),
      providesTags: ["edit-post-one"],
    }),
    editSinglePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/post/editpost?id=${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["edit-post", "edit-post-one"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/api/post/delete?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["delete-post"],
    }),
  }),
});
export const {
  useGetLogInUserQuery,
  useUpdateUserMutation,
  useUserPostMutation,
  useGetAllPostQuery,
  useGetLoginUserPostQuery,
  useGetAnotherSingleUserQuery,
  useGetMyUserIdQuery,
  useEditSinglePostMutation,
  useGetSinglePostQuery,
  useDeletePostMutation,
} = blogApi;
