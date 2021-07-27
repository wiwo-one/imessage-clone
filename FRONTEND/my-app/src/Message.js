import React from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
function Message() {
  return (
    <div className="message">
      <div className="message__top">
        <div className="message__text">Testowa wiadomość</div>
        <Avatar className="message__avatar"/>
      </div>
      <p className="mesage__data">7/7/2020 12:34</p>
    </div>
  );
}

export default Message;
