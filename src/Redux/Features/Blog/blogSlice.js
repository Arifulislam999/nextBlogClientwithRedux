const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  text: "",
  logStatus: true,
  page: 1,
};
const blogSlice = createSlice({
  name: "blogSlice",
  initialState,
  reducers: {
    searchText: (state, action) => {
      state.text = action.payload;
    },
    removeSearchText: (state) => {
      state.text = "";
    },
    logOutTrueFalse: (state, action) => {
      state.logStatus = action.payload;
    },
    paginationPage: (state, action) => {
      state.page = action.payload;
    },
  },
});
export const { searchText, removeSearchText, logOutTrueFalse, paginationPage } =
  blogSlice.actions;
export default blogSlice.reducer;
