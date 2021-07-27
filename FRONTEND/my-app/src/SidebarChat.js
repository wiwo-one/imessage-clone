import React from 'react'
import './SidebarChat.css'
import { Avatar } from "@material-ui/core";

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar className="sidebarChat__avatar"/>
            <div className="sidebarChat__info">
                <div className="sidebarChat__info-1">
                    <div className="sidebarChat__name">Janusz</div>
                    <div className="sidebarChat__date">22/11/2020 19:34</div>
                </div>
                <div className="sidebarChat__info-2">Co tam słychać mordeczko? 😬</div>
                
            </div>
          </div>
    )
}

export default SidebarChat
