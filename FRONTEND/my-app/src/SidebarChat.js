import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

import { transformUnknownDateFormat, transformMomentToString } from "./utils";

function SidebarChat({ name, lastEdit, lastName }) {
  return (
    <div className="sidebarChat">
      <Avatar className="sidebarChat__avatar" />
      <div className="sidebarChat__info">
        <div className="sidebarChat__info-1">
          <div className="sidebarChat__name">{name}</div>
          <div className="sidebarChat__date">
            {transformMomentToString(transformUnknownDateFormat(lastEdit))}
          </div>
        </div>
        <div className="sidebarChat__info-2">{lastName}</div>
      </div>
    </div>
  );
}

export default SidebarChat;
