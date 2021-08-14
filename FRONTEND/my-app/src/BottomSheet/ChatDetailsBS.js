import React, { useCallback, useEffect, useState } from "react";
import BottomSheet from "./BottomSheet";
import db from "../Firebase";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import styles from "./EditChatBS.module.css";
import { MenuGroup, MenuGroupButton, MenuGroupElement, Left, Right, MenuHeader } from "./BottomSheetMenu";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChat, closeChatAction } from "../features/chatSlice";

import moment from "moment";
import gsap from "gsap/gsap-core";

const ChatDetails = React.forwardRef(({ open, handleClose }, ref) => {
  const innerRef = React.useRef();
  const deeperRef = React.useRef(null);

  const [newName, setNewName] = useState("");

  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);

  const dispatch = useDispatch();

  const [tooShort, setTooShort] = useState(true);

  useEffect(() => {
    setNewName(chat.name);
  }, []);

  useEffect(() => {
    setTooShort(newName.length < 4);
  }, [newName]);

  const changeChatName = (newName) => {
    db.collection("chats")?.doc(chat.id).set(
      {
        name: newName,
      },
      { merge: true }
    );
  };

  const handleChangeNameSubmit = (e) => {
    e.preventDefault();
    if (newName.length >= 4) {
      //console.log("handling change on submit: " + newName);
      changeChatName(newName);
      handleClose();
    } else {
      setTooShort(false);
    }
  };

  const inputRef = useCallback(
    (node) => {
      node?.focus();
    },
    [open]
  );

  const handleDelete = (e) => {
    db.collection("chats")
      ?.doc(chat.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
        dispatch(closeChatAction());
        handleClose();
      })
      .catch((error) => {
        console.error("Error removing document :( ): ", error);
      });
  };

  return (
    <BottomSheet open={open} handleClose={handleClose} ref={innerRef}>
      <div className={styles.Container} ref={deeperRef}>
        <MenuHeader>
          <div className="text-xl font-extrabold text-center">{chat.name}</div>
        </MenuHeader>

        <MenuGroup>
          <MenuGroupElement>
            <Left type="edit">Chat Name</Left>

            <form onSubmit={handleChangeNameSubmit} className="flex-1 ml-10">
              <div className="flex items-center justify-between w-full">
                <input
                  //autoFocus
                  ref={inputRef}
                  className="flex-grow bg-transparent border-0 border-transparent border-black focus-visible:outline-none"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                />
                {tooShort ? (
                  <div className="flex-shrink-0 text-xs text-red-600 justify-self-end">
                    The name is too short. Correct it.
                  </div>
                ) : (
                  <button type="submit" className="p-0">
                    <SendRoundedIcon color={tooShort ? "disabled" : "primary"} />
                  </button>
                )}
              </div>
            </form>
          </MenuGroupElement>
        </MenuGroup>

        <MenuGroup>
          <MenuGroupElement>
            <Left>Chat Name</Left>
            <Right>{chat.name}</Right>
          </MenuGroupElement>
          <MenuGroupElement>
            <Left>ID</Left>
            <Right>{chat.id}</Right>
          </MenuGroupElement>
          <MenuGroupElement>
            <Left>creationTime</Left>
            <Right>{chat.creationTime}</Right>
          </MenuGroupElement>
          <MenuGroupElement>
            <Left>lastEdit</Left>
            <Right>{chat.lastEdit}</Right>
          </MenuGroupElement>
          <MenuGroupElement>
            <Left>lastEdit Relative</Left>
            <Right>{moment(chat.lastEdit, "DD/MM/YYYY, h:mm:ss").fromNow()}</Right>
          </MenuGroupElement>
          <MenuGroupElement>
            <Left>lastName</Left>
            <Right>{chat.lastName}</Right>
          </MenuGroupElement>
          <MenuGroupElement>
            <Left>lastAvatar</Left>
            <Right>{chat?.lastAvatar?.slice(0, 150)}</Right>
          </MenuGroupElement>
          <MenuGroupElement>
            <Left>creatorUid</Left>
            <Right>{chat?.creatorUid}</Right>
          </MenuGroupElement>
        </MenuGroup>
        <MenuGroupButton
          onClick={handleDelete}
          className="transition-all duration-150 hover:bg-imessage-dark-gray">
          <MenuGroupElement className="font-bold text-red-600">Delete</MenuGroupElement>
        </MenuGroupButton>
      </div>
    </BottomSheet>
  );
});

export default ChatDetails;
