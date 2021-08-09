import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    open: false,
    name: "",
    id: "",
    creationDate: "",
  },
  reducers: {
    openChatAction: (state, action) => {
      state.open = true;
      const { name, id, creationTime } = action.payload;
      state.name = name;
      state.id = id;
      state.creationTime = creationTime;
      state.data = action.payload.data;
    },
    closeChatAction: (state) => {
      state.open = false;
      state.data = {};
    },
  },
});

export const { openChatAction, closeChatAction } = chatSlice.actions;

export const selectChat = (state) => state.chat;

export default chatSlice.reducer;
