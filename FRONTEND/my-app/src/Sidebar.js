import React, { useState, useEffect } from "react";
import "./Sidebar.css";

import SidebarChat from "./SidebarChat";

import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import RateReviewIcon from "@material-ui/icons/RateReview";
import AddCommentIcon from "@material-ui/icons/AddComment";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "./features/userSlice";
import { selectChat, openChatAction, closeChatAction } from "./features/chatSlice";
import db, { auth } from "./Firebase";
import NewChatBS from "./BottomSheet/NewChatBS";
import { handlePLDateString, transformUnknownDateFormat, transformMomentToString } from "./utils";
import moment from "moment";

function Sidebar() {
  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);
  const dispatch = useDispatch();

  const [chats, setChats] = useState([]);

  //tylko po załadowaniu
  useEffect(() => {
    db.collection("chats").onSnapshot((querySnapshot) => {
      const sortedChats = sortChatsByLastEdit(
        querySnapshot.docs?.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          name: doc.data().name,
          lastAvatar: doc.data().lastAvatar,
          lastName: doc.data().lastName,
          creationTime: doc.data().creationTime,
          lastEdit: doc.data().lastEdit
            ? transformUnknownDateFormat(doc.data().lastEdit)
            : transformUnknownDateFormat(doc.data().creationTime),
          name: doc.data().name,
          data: doc.data(),
        }))
      );
      setChats(sortedChats);
      //sortChatsByDate(chats);
    });
  }, []);

  const handleChatClick = (doc) => {
    dispatch(
      openChatAction({
        ...doc,
      })
    );
  };

  //sorting using array.sort to compare dates in moment format
  const sortChatsByLastEdit = (chats) => chats.sort((a, b) => moment(b.lastEdit) - moment(a.lastEdit));

  //add new chat modal
  const [isNewChatBSOpen, setIsNewChatBSOpen] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar onClick={() => auth.signOut()} src={user.photo} className="sidebar__avatar" />
        <div className="sidebar__search">
          <SearchIcon />
          <input placeholder="Search" />
        </div>
        <IconButton variant="outlined" className="sidebar__input-buttton">
          <AddCircleIcon
            onClick={() => {
              setIsNewChatBSOpen(true);
            }}
          />
        </IconButton>
      </div>
      <div className="sidebar__chats">
        {chats.map((doc, index) => (
          <div
            key={doc.id}
            onClick={() => {
              handleChatClick(doc);
            }}>
            <SidebarChat
              name={doc.name}
              lastEdit={transformMomentToString(doc.lastEdit)}
              lastName={doc.lastName}
            />

            {/* {console.log(doc.name + " --- " + doc.lastEdit)} */}
            {console.log(transformUnknownDateFormat(doc.lastEdit))}
          </div>
        ))}
      </div>
      {true && (
        <NewChatBS
          open={isNewChatBSOpen}
          handleClose={() => {
            setIsNewChatBSOpen(false);
          }}
        />
      )}
    </div>
  );
}

export default Sidebar;
