const { apiSlice } = require("../API/apiSlice");

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userRegistation: builder.mutation({
      query: (data) => ({
        url: "/api/user/register",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["loginstatus"],
    }),
    userLogIn: builder.mutation({
      query: (data) => ({
        url: "/api/user/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["loginstatus"],
    }),
    userLogOut: builder.query({
      query: () => "/api/user/logout",
      invalidatesTags: ["loginstatus"],
    }),
    userAlreadyLoggedIn: builder.query({
      query: () => ({
        url: "/api/user/loggedin",
      }),
      providesTags: ["loginstatus"],
    }),
  }),
});
export const {
  useUserRegistationMutation,
  useUserLogInMutation,
  useUserAlreadyLoggedInQuery,
  useUserLogOutQuery,
} = authApi;
