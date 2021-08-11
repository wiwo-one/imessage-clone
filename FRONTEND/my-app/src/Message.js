import React from "react";
import "./Message.css";
import { Avatar } from "@material-ui/core";
import { forwardRef } from "react";
const Message = forwardRef(({ content, creationTime, authorPhoto, authorName, incomming }, ref) => {
  //const messageRef = forwardRef();

  return (
    <div ref={ref} className={`message ${!incomming && "message--incomming"}`}>
      <div className="message__top">
        <div className="message__text">{content}</div>
        <Avatar src={authorPhoto} className="message__avatar" />
      </div>
      <p className="message__data">
        {creationTime} {authorName}
      </p>
    </div>
  );
});

export default Message;
