import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import chat from "../features/chatSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    chat: chat,
  },
});
