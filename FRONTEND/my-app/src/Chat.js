import React, { useState } from "react";
import "./Chat.css";
import Message from "./Message";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { Avatar, IconButton } from "@material-ui/core";

function Chat() {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();

    setInput("");
  };

  return (
    <div className="chat">
      {/* chat header */}
      <div className="chat__header">
        <h4>To: Janusz</h4>
        <h4 className="chat__details">Details</h4>
      </div>

      {/* chat messages */}
      <div className="chat__messages">
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
        <Message />
      </div>

      {/* chat input */}

      <div className="chat__input">
        <form className="chat__input-wrapper">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message"
          />
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
