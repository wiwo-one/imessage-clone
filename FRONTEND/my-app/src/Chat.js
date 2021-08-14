import React, { useCallback, useEffect, useRef, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
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

    try {
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
          db.collection("chats")
            ?.doc(chat.id)
            .update({
              lastEdit: actualDate,
              lastName: user.displayName,
              lastAvatar: user.photo,
            })
            .then((s) => {
              //console.log("edytowalem info w chatcie");
            })
            .catch((e) => {
              console.log("error przy edycji chatu (zmiana ostatnich) ", e);
            });
        })
        .catch((e) => {
          console.log("ERROR", e);
        });
    } catch (e) {
      console.log("ERROR", e);
    }

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

  //close chat handling
  const handleCloseChatClick = () => {
    dispatch(closeChatAction());
    setMessages([]);
  };

  //sorting using array.sort to compare dates in moment format
  const sortByCreationTime = (chats) => chats.sort((a, b) => moment(a.creationTime) - moment(b.creationTime));

  const lastMessageRef = createRef();
  const messagesContainerRef = createRef();
  const [isMessageSent, setIsMessageSent] = useState(false);

  useEffect(() => {
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
      });
    }
  }, [messages]);

  //details modal
  const [isEditChatBSOpen, setIsEditChatBSOpen] = useState(false);

  return (
    <div className="chat">
      {/* chat header */}
      <div className="chat__header">
        <IconButton onClick={handleCloseChatClick}>
          <ArrowBackIosIcon />
        </IconButton>
        <div className="header__chat-name">
          <h4>{chat.open ? chat.name : ""}</h4>
        </div>

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
      {chat.open && (
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
            {/* <button type="submit">Send</button> */}
            <IconButton
              type="submit"
              onClick={() => {
                //setIsTestVisible(!isTestVisible);
              }}>
              <SendRoundedIcon />
            </IconButton>
          </form>
        </div>
      )}
      {isEditChatBSOpen && (
        <Modal
          open={isEditChatBSOpen}
          handleClose={() => {
            setIsEditChatBSOpen(false);
            // setMessages([]);
          }}>
          <ChatDetails open={isEditChatBSOpen} />
        </Modal>
      )}
    </div>
  );
}

export default Chat;
