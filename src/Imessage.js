import React, { useEffect, useState } from "react";
import "./Imessage.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import { selectChat, openChatAction, updateChatAction, closeChatAction } from "./features/chatSlice";

function Imessage() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);

  useEffect(() => {
    const onResize = (e) => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="imessage">
      {innerWidth >= 640 && (
        <>
          {" "}
          <Sidebar />
          <Chat />
        </>
      )}

      {innerWidth < 640 && (!chat.open ? <Sidebar /> : <Chat />)}
    </div>
  );
}

export default Imessage;
