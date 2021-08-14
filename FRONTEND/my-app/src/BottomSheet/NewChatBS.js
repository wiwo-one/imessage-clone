import React, { useCallback, useState } from "react";
import BottomSheet from "./BottomSheet";
import db from "../Firebase";
import styles from "./NewChatBS.module.css";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";
import { selectChat, openChatAction, closeChatAction, updateChatAction } from "../features/chatSlice";
import SendRoundedIcon from "@material-ui/icons/SendRounded";

import { MenuGroup, MenuGroupElement, Left, Right, MenuHeader, Edit } from "./BottomSheetMenu";
import { transformMomentToString, transformUnknownDateFormat } from "../utils";

const NewChatBS = React.forwardRef(({ open, handleClose }, ref) => {
  const [newName, setNewName] = useState("");

  const [tooShort, setTooShort] = useState(true);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const addNewChat = (chatName) => {
    db.collection("chats")
      .add({
        lastName: user.displayName,
        lastEdit: new Date(),
        lastAvatar: user.photo,
        creationTime: new Date(),
        name: chatName,
      })
      .then((newChat) => {
        console.log("NEW CHAT ADDED " + newChat.id);
        console.dir(newChat.id);

        newChat.get().then((doc) => {
          //doc.data
          dispatch(
            openChatAction({
              ...doc.data(),
              lastEdit: transformMomentToString(transformUnknownDateFormat(doc.data().lastEdit)),
              creationTime: transformMomentToString(transformUnknownDateFormat(doc.data().creationTime)),
              data: null,
            })
          );
        });
      });
  };

  const handleCreateNewChatSubmit = (e) => {
    e.preventDefault();
    if (newName.length > 3) {
      console.log("handle change on submit: " + newName);
      addNewChat(newName);
      setNewName("");
      handleClose();
    } else {
      setTooShort(false);
    }
  };

  const inputRef = useCallback((node) => {
    node?.focus();
    console.dir(node);
  }, []);

  return (
    <BottomSheet open={open} handleClose={handleClose} ref={ref}>
      <div className={styles.Container}>
        <MenuHeader>
          <div className="text-xl font-extrabold text-center">New</div>
        </MenuHeader>

        <MenuGroup>
          <MenuGroupElement>
            <Left type="edit">Chat Name</Left>

            <form onSubmit={handleCreateNewChatSubmit} className="flex-1 ml-10">
              <div className="flex items-center justify-between w-full">
                <input
                  //autoFocus
                  ref={inputRef}
                  className="flex-grow bg-transparent border-0 border-transparent border-black focus-visible:outline-none"
                  value={newName}
                  onChange={(e) => {
                    setNewName(e.target.value);
                    if (newName.length <= 3) setTooShort(true);
                    else setTooShort(false);
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
      </div>
    </BottomSheet>
  );
});

export default NewChatBS;
