import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./Features/API/apiSlice";
import blogSlice from "./Features/Blog/blogSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    text: blogSlice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});
