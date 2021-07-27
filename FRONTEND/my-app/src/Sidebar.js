import React from "react";
import "./Sidebar.css";

import SidebarChat from './SidebarChat'

import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewIcon from "@material-ui/icons/RateReview";

function Sidebar() {
  return (
    <div className="sidebar">
        
      <div className="sidebar__header">
        <Avatar className="sidebar__avatar"/>
        <div className="sidebar__search">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton variant="outlined" className="sidebar__input-buttton">
          <RateReviewIcon />
        </IconButton>
      </div>
      <div className="sidebar__chats">
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
 
          

      </div>
    </div>
  );
}

export default Sidebar;
