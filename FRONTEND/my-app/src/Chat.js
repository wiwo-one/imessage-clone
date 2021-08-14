import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { Avatar, IconButton } from "@material-ui/core";
import db from "./Firebase";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChat, openChatAction, updateChatAction, closeChatAction } from "./features/chatSlice";
import moment from "moment";
import { transformMomentToString, transformUnknownDateFormat } from "./utils";
import { createRef } from "react";

import ChatDetails from "./BottomSheet/ChatDetailsBS";

//animacja nowych wiadomości
import { Flipper, Flipped } from "react-flip-toolkit";
import Modal from "./BottomSheet/Modal";

function Chat() {
  //redux
  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);
  const dispatch = useDispatch();

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
        const actualDate = new Date();
        db.collection("chats")?.doc(chat.id).set(
          {
            lastEdit: actualDate,
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
              id: mess.id,
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

  const lastMessageRef = createRef();

  useEffect(() => {
    if (lastMessageRef && lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView();
    }
    //for flipper... doesn't work
    setChangeCounter(changeCounter + 1);
  }, [messages]);

  //to point last message - for flipper
  const [changeCounter, setChangeCounter] = useState(0);

  //details modal
  const [isEditChatBSOpen, setIsEditChatBSOpen] = useState(false);

  const [isTestVisible, setIsTestVisible] = useState(false);

  return (
    <div className="chat">
      {/* chat header */}
      <div className="chat__header">
        <h4>Chat: {chat.open ? chat.name : "---"}</h4>
        <h4
          onClick={() => {
            setIsEditChatBSOpen(true);
          }}
          className="chat__details">
          Details
        </h4>
      </div>

      {/* chat messages */}
      <div className="chat__messages">
        {messages.map((mess, index) => (
          <div key={index}>
            <Message
              key={index}
              incomming={mess.authorUid === user.uid}
              content={mess.content}
              {...mess}
              creationTime={transformMomentToString(mess.creationTime)}
              ref={lastMessageRef}
            />
          </div>
        ))}
      </div>

      {/* chat input */}
      <div className="chat__input">
        <form onSubmit={sendMessage} className="chat__input-wrapper">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message" />
          <button type="submit">Send</button>
        </form>
        <IconButton>
          <SendRoundedIcon
            onClick={() => {
              setIsTestVisible(!isTestVisible);
            }}
          />
        </IconButton>
        {isTestVisible && (
          <Modal>
            <div className="bg-green-300 w-96 h-96">
              <h1>Test</h1>
            </div>
          </Modal>
        )}
      </div>
      {isEditChatBSOpen && (
        <Modal
          open={isEditChatBSOpen}
          handleClose={() => {
            setIsEditChatBSOpen(false);
          }}>
          <ChatDetails
            open={isEditChatBSOpen}
            handleClose={() => {
              setIsEditChatBSOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Chat;
