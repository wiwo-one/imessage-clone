import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { Avatar, IconButton } from "@material-ui/core";
import db from "./Firebase";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChat, openChatAction, closeChatAction } from "./features/chatSlice";

function Chat() {
  //redux
  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);

  const [input, setInput] = useState("");

  //messages state
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("chats")
      ?.doc(chat.id)
      ?.collection("messages")
      .add({
        authorName: user.displayName,
        content: input,
        creationTime: new Date().toLocaleString("pl-PL"),
      });

    setInput("");
  };

  useEffect(() => {
    console.dir(chat);
    console.log(chat.id);
    if (chat.open === true) {
      db.collection("chats")
        ?.doc(chat.id)
        ?.collection("messages")
        .orderBy("creationTime", "desc")
        .onSnapshot((querySnapshot) => {
          setMessages(
            querySnapshot.docs?.map((mess) => ({
              ...mess.data(),
            }))
          );
        });
    }
  }, [chat]);

  return (
    <div className="chat">
      {/* chat header */}
      <div className="chat__header">
        <h4>Chat: {chat.open ? chat.name : "---"}</h4>
        <h4 className="chat__details">Details</h4>
      </div>

      {/* chat messages */}
      <div className="chat__messages">
        {messages.map((mess, index) => (
          <Message
            key={index}
            incomming={mess.authorUid === user.id ? true : false}
            content={mess.content}
            {...mess}
          />
        ))}
      </div>

      {/* chat input */}

      <div className="chat__input">
        <form className="chat__input-wrapper">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message" />
          <button onClick={sendMessage}>Send</button>
        </form>
        <IconButton>
          <MicNoneIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
