//ten plik jest ze starym 


import React, { useState } from "react";
import "./Chat.css";
import Message from "./Message";
import MicNoneIcon from "@material-ui/icons/MicNone";
import { Avatar, IconButton } from "@material-ui/core";

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input: "testowa",
    }

    this.sendMessage = this.sendMessage.bind(this)
  }


  sendMessage(e) {
    e.preventDefault();

    this.setState({
      input: ""
    })
  }

  render() {
    return (
      <div className="chat">
        {" "}
        {/* chat header */}{" "}
        <div className="chat__header">
          <h4> To: Janusz </h4> <h4 className="chat__details"> Details </h4>{" "}
        </div>
        {/* chat messages */}{" "}
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
          <div className="chat__input-left"> </div>{" "}
          <div className="chat__input-right">
            <form className="chat__input-wrapper">
              <input
                value={this.state.input}
                onChange={(e) => this.setState({input: e.target.value})}
                placeholder="Message"
              />
              <button onClick={this.sendMessage}> Send </button>{" "}
            </form>{" "}
            <IconButton>
              <MicNoneIcon />
            </IconButton>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default Chat;
