import { createSlice } from "@reduxjs/toolkit";

const adminsSlice = createSlice({
  name: "admin",
  initialState: null,
  reducers: {
    setAdmin(state, action) {
      return action.payload;
    },
    updateAdmin(state, action) {
      return action.payload;
    },
    removeAdmin(state, action) {
      return null;
    },
  },
});

const { actions, reducer } = adminsSlice;
export const { setAdmin, removeAdmin, updateAdmin } = actions;
export default reducer;
