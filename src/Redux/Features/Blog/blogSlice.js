const { createSlice } = require("@reduxjs/toolkit");
const initialState = {
  text: "",
  logStatus: true,
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
  },
});
export const { searchText, removeSearchText, logOutTrueFalse } =
  blogSlice.actions;
export default blogSlice.reducer;
