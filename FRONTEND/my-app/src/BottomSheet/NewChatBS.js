import React, { useState } from "react";
import BottomSheet from "./BottomSheet";
import db from "../Firebase";
import styles from "./NewChatBS.module.css";

import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/userSlice";

const NewChatBS = ({ open, handleClose }) => {
  const [newName, setNewName] = useState("");

  const user = useSelector(selectUser);

  const addNewChat = (chatName) => {
    db.collection("chats").add({
      lastName: user.displayName,
      lastEdit: new Date(),
      creationTime: new Date(),
      name: chatName,
    });
  };

  const handleChangeNameSubmit = (e) => {
    e.preventDefault();
    console.log("handle change on submit: " + newName);
    addNewChat(newName);
    setNewName("");
    handleClose();
  };

  return (
    <BottomSheet open={open} handleClose={handleClose}>
      <div className={styles.Container}>
        <div className={styles.Element}>
          <h2>Nazwa: </h2>
          <form onSubmit={handleChangeNameSubmit}>
            <input
              value={newName}
              onChange={(e) => {
                setNewName(e.target.value);
              }}
            />
            <button type="submit">OK</button>
          </form>
        </div>
      </div>
    </BottomSheet>
  );
};

export default NewChatBS;
