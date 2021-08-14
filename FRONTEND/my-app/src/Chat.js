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
import gsap from "gsap";

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
    setIsMessageSent(true);

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

  //reset when changing chat
  useEffect(() => {
    setIsMessageSent(false);
    return () => {};
  }, [chat]);

  //sorting using array.sort to compare dates in moment format
  const sortByCreationTime = (chats) => chats.sort((a, b) => moment(a.creationTime) - moment(b.creationTime));

  const lastMessageRef = createRef();
  const messagesContainerRef = createRef();

  const [isMessageSent, setIsMessageSent] = useState(false);

  useEffect(() => {
    // if (lastMessageRef && lastMessageRef.current) {
    //   lastMessageRef.current.scrollIntoView();
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollBy(0, messagesContainerRef.current.scrollHeight);
    }

    if (isMessageSent) {
      console.log("isMessageSent", isMessageSent);
      gsap.from(lastMessageRef.current, {
        opacity: 0,
        height: 0,
        //transform: "scaleY(0)",
        duration: 0.5,
        onComplete: () => {
          console.log("oncomplete animacji");
        },
      });
    }

    //setFirstLoad(false);
  }, [messages]);

  //to point last message - for flipper
  const [changeCounter, setChangeCounter] = useState(0);

  //details modal
  const [isEditChatBSOpen, setIsEditChatBSOpen] = useState(false);

  const [isTestVisible, setIsTestVisible] = useState(false);

  // const chatDetailsModalRef = useCallback((node) => {
  //   if (node) {
  //     gsap.from(node.children, { y: "100%", duration: 1 });
  //     console.log("ANIIIMUJEEE");
  //   }
  // }, []);

  const messageRefCallback = useCallback((node) => {
    // const scrollDown = () => {
    //   console.log("scrolluje z oncomplete");
    //   node.scrollIntoView();
    // };
    // if (!firstLoad) {
    //   gsap.from(node, { opacity: 0, height: 0, duration: 0.5, onComplete: node.scrollIntoView });
    // }
    console.log("z use callback");
    //node.scrollIntoView();
  }, []);

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
      <div ref={messagesContainerRef} className={`${!chat.open && "bg-gray-200"} chat__messages`}>
        {messages.map((mess, index) => (
          <div key={index} ref={messageRefCallback}>
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
        <form
          onSubmit={(e) => {
            if (chat.open) sendMessage(e);
            else {
              e.preventDefault();
              setInput("");
            }
          }}
          className="chat__input-wrapper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
            disabled={!chat.open ? true : false}
          />
          <button type="submit">Send</button>
        </form>
        <IconButton>
          <SendRoundedIcon
            onClick={() => {
              //setIsTestVisible(!isTestVisible);
            }}
          />
        </IconButton>
      </div>
      {isEditChatBSOpen && (
        <Modal
          open={isEditChatBSOpen}
          handleClose={() => {
            setIsEditChatBSOpen(false);
          }}>
          <ChatDetails open={isEditChatBSOpen} />
        </Modal>
      )}
    </div>
  );
}

export default Chat;
