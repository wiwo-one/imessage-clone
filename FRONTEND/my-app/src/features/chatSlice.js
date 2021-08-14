import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    open: false,
    name: "",
    id: "NOPE",
    creationTime: "",
    testData: {},
  },
  reducers: {
    openChatAction: (state, action) => {
      state.open = true;
      const { name, id, creationTime, lastAvatar, lastEdit, lastName } = action.payload;
      state.name = name;
      state.id = id;
      state.creationTime = creationTime;
      state.lastAvatar = lastAvatar;
      state.lastEdit = lastEdit;
      state.lastName = lastName;
      //state.data = {...action.payload.data, action.payload.data};
    },
    updateChatAction: (state, action) => {
      //console.dir({ ...state });
      //console.dir({ ...action.payload });
      state.testData = { ...state, ...action.payload };
      state.lastEdit = action.payload.lastEdit;
      state.lastName = action.payload.lastName;
      state.lastAvatar = action.payload.lastAvatar;
      state.name = action.payload.name;
      state.creatorUid = action.payload.creatorUid;
      state.id = action.payload.id;
    },
    closeChatAction: (state) => {
      //state = {};
      state.open = false;
    },
  },
});

export const { openChatAction, updateChatAction, closeChatAction } = chatSlice.actions;

export const selectChat = (state) => state.chat;

export default chatSlice.reducer;
