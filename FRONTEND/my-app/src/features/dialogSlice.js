import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    open: false,
    data: {},
  },
  reducers: {
    openAction: (state, action) => {
      state.open = true;
      state.data = action.payload;
    },
    closeAction: (state) => {
      state.open = false;
    },
  },
});

export const { openAction, closeAction } = dialogSlice.actions;

export const selectDialog = (state) => state.open;

export default dialogSlice.reducer;
