import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
    // baseUrl: process.env.BACKEND_URL,
  }),
  tagTypes: [
    "loginstatus",
    "upload-post",
    "update-data",
    "edit-post",
    "edit-post-one",
    "delete-post",
  ],
  endpoints: (builder) => ({}),
});
