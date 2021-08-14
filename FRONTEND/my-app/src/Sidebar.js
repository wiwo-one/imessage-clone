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
import { selectChat, openChatAction, closeChatAction, updateChatAction } from "./features/chatSlice";
import db, { auth } from "./Firebase";
import NewChatBS from "./BottomSheet/NewChatBS";
import { handlePLDateString, transformUnknownDateFormat, transformMomentToString } from "./utils";
import moment from "moment";
import Modal from "./BottomSheet/Modal";

function Sidebar() {
  const user = useSelector(selectUser);
  const chat = useSelector(selectChat);
  const dispatch = useDispatch();
  const chatId = useSelector((s) => s.chat.id);

  const [chats, setChats] = useState([]);

  //tylko po załadowaniu
  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((querySnapshot) => {
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
      //console.log("Aktualnie otwarty chat to: " + chat);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const openChat = chats.find((c) => c.id === chat.id);
    if (openChat) {
      const { lastEdit, lastName, lastAvatar, name, creatorUid, id } = openChat;
      dispatch(
        updateChatAction({
          lastEdit: transformMomentToString(transformUnknownDateFormat(lastEdit)),
          lastName,
          lastAvatar,
          name,
          creatorUid,
          id,
        })
      );
    }
  }, [chats]);

  const handleChatClick = (doc) => {
    dispatch(
      openChatAction({
        ...doc,
        lastEdit: transformMomentToString(transformUnknownDateFormat(doc.lastEdit)),
        creationTime: transformMomentToString(transformUnknownDateFormat(doc.creationTime)),
        data: null,
      })
    );
  };

  //sorting using array.sort to compare dates in moment format
  const sortChatsByLastEdit = (chats) => chats.sort((a, b) => moment(b.lastEdit) - moment(a.lastEdit));

  //add new chat modal
  const [isNewChatBSOpen, setIsNewChatBSOpen] = useState(false);

  const [searchPhrase, setSearchPhrase] = useState("");

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar onClick={() => auth.signOut()} src={user.photo} className="sidebar__avatar" />
        <div className="sidebar__search">
          <SearchIcon />
          <input placeholder="Search" onChange={(e) => setSearchPhrase(e.target.value)} />
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
        {chats
          .filter((chat) => {
            if (searchPhrase === "") return true;
            else if (chat.name.toLowerCase().includes(searchPhrase.toLowerCase())) return true;
            else return false;
          })
          .map((doc, index) => (
            <div
              key={doc.id}
              onClick={() => {
                handleChatClick(doc);
              }}>
              <SidebarChat
                name={doc.name}
                lastEdit={transformMomentToString(doc.lastEdit)}
                lastName={doc.lastName}
                lastAvatar={doc.lastAvatar}
                isActive={doc.id === chat.id ? true : false}
              />
            </div>
          ))}
      </div>
      {isNewChatBSOpen && (
        <Modal
          open={isNewChatBSOpen}
          handleClose={() => {
            setIsNewChatBSOpen(false);
          }}>
          <NewChatBS
            open={isNewChatBSOpen}
            handleClose={() => {
              setIsNewChatBSOpen(false);
            }}
          />
        </Modal>
      )}
    </div>
  );
}

export default Sidebar;
