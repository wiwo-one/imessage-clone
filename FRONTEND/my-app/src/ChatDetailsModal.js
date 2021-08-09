import React, { useEffect, useState } from "react";
import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";

import Transition from "react-transition-group/Transition";
import { CSSTransition } from "react-transition-group";

import "./ChatDetailsModal.css";

import { useSelector } from "react-redux";
import { selectChat } from "./features/chatSlice";
import { selectUser } from "./features/userSlice";
import db from "./Firebase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "white",
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 3),
    outline: "none",
    "&:focus-visible": {
      outline: "none",
    },
    "&:focus": {
      outline: "none",
    },
    borderRadius: "14px 14px 0 0",
    width: "98vw",
    position: "absolute",
    //height: "100%",
    top: "20px",
    bottom: "0px",
  },
}));

const duration = 500;

const defaultStyle = {
  transition: `all ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1, height: "100%", transform: "translateY(100%)" },
  entered: { opacity: 1, height: "100%", transform: "translateY(0%)" },
  exiting: { opacity: 0, height: "100%", transform: "translateY(0%)" },
  exited: { opacity: 0, height: "100%", transform: "translateY(100%)" },
};

const ChatDetailsModal = ({ open, handleClose }) => {
  //info o czacie
  const chat = useSelector((state) => state.chat);

  //zmiana nazwy
  const [newName, setNewName] = useState(chat.data?.name);
  useEffect(() => {
    setNewName(chat.data?.name);
    return () => {
      //cleanup
    };
  }, [chat]);

  const classes = useStyles();

  const handleChangeNameSubmit = (e) => {
    e.preventDefault();
    db.collection("chats")
      .doc(chat.id)
      .set(
        {
          name: newName,
          lastEdit: new Date().toLocaleString("pl-PL"),
        },
        { merge: true }
      )
      .then(console.log("all good"))
      .catch((e) => {
        console.log("błąd");
      });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus="true"
      keepMounted="true"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 1000,
      }}>
      <Transition in={open} timeout={100}>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
            className={`${classes.paper}`}>
            <div className="details-container">
              <h4 onClick={handleClose} className="details-done">
                Done
              </h4>

              <div className="details-center">
                <div className="details-element">
                  <h2>Nazwa: </h2>
                  <p>{chat.name}</p>
                </div>
                <div className="details-element">
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
                <div className="details-element">
                  <h2>Last activity: </h2>
                  <p>{chat.data?.lastEdit && chat.data?.lastEdit}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Modal>
  );
};

export default ChatDetailsModal;
