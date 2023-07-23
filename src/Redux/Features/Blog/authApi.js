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
    }),
    userLogIn: builder.mutation({
      query: (data) => ({
        url: "/api/user/login",
        method: "POST",
        body: data,
      }),
    }),
    userAlreadyLoggedIn: builder.query({
      query: () => ({
        url: "/api/user/loggedin",
      }),
    }),
  }),
});
export const {
  useUserRegistationMutation,
  useUserLogInMutation,
  useUserAlreadyLoggedInQuery,
} = authApi;
