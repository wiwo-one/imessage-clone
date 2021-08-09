import React, { useState, useEffect } from "react";
import "./Sidebar.css";

import SidebarChat from "./SidebarChat";

import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChat, openChatAction, closeChatAction } from "./features/chatSlice";
import db, { auth } from "./Firebase";

function Sidebar() {
  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);

  //tylko po załadowaniu
  useEffect(() => {
    //chce przypiąć state do firebase

    db.collection("chats").onSnapshot((querySnapshot) => {
      //var cities = [];
      setChats(
        querySnapshot.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          name: doc.data().name,
          lastAvatar: doc.data().lastAvatar,
          lastName: doc.data().lastName,
          creationTime: doc.data().creationTime,
          lastEdit: doc.data().lastEdit,
          name: doc.data().name,
          data: doc.data(),
        }))
      );

      //console.log("Current cities in CA: ", cities.join(", "));
    });
  }, []);

  const handleChatClick = (doc) => {
    dispatch(
      openChatAction({
        ...doc,
      })
    );
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar onClick={() => auth.signOut()} src={user.photo} className="sidebar__avatar" />
        <div className="sidebar__search">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton variant="outlined" className="sidebar__input-buttton">
          <RateReviewIcon />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map((doc, index) => (
          <div
            key={doc.id}
            onClick={() => {
              handleChatClick(doc);
            }}>
            <SidebarChat name={doc.name} lastEdit={doc.lastEdit} lastName={doc.lastName} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
