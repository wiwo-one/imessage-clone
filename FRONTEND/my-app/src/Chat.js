import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { Avatar, IconButton } from "@material-ui/core";
import db from "./Firebase";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChat, openChatAction, closeChatAction } from "./features/chatSlice";
import moment from "moment";
import { transformMomentToString, transformUnknownDateFormat } from "./utils";
import { createRef } from "react";

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
        authorUid: user.uid,
        authorPhoto: user.photo,
        content: input,
        creationTime: new Date(),
      })
      .then(() => {
        db.collection("chats")?.doc(chat.id).set(
          {
            lastEdit: new Date(),
            lastName: user.displayName,
            lastAvatar: user.photo,
          },
          { merge: true }
        );
      });

    setInput("");
  };

  //update obiektu chat
  useEffect(() => {
    let unsubscribe = null;
    if (chat.open) {
      unsubscribe = db
        .collection("chats")
        ?.doc(chat.id)
        ?.collection("messages")
        .onSnapshot((querySnapshot) => {
          const sortedMessages = sortByCreationTime(
            querySnapshot.docs?.map((mess) => ({
              ...mess.data(),
              creationTime: transformUnknownDateFormat(mess.data().creationTime),
            }))
          );
          setMessages(sortedMessages);
        });
    }
    return () => {
      if (chat.open) unsubscribe();
    };
  }, [chat]);

  //sorting using array.sort to compare dates in moment format
  const sortByCreationTime = (chats) => chats.sort((a, b) => moment(a.creationTime) - moment(b.creationTime));

  // const lastMessageCallbackRef = useCallback(
  //   (node) => {
  //     node.scrollIntoView();
  //     console.log("lastMessageCallbackRef");
  //   },
  //   [messages]
  // );

  const lastMessageRef = createRef();

  useEffect(() => {
    console.dir(lastMessageRef);
    if (lastMessageRef && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
    console.log("messages changing");
  }, [messages]);

  //to point last message

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
            incomming={mess.authorUid === user.uid ? true : false}
            content={mess.content}
            {...mess}
            creationTime={transformMomentToString(mess.creationTime)}
            ref={lastMessageRef}
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
