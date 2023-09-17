import React, { useContext } from "react";
import Cam from "../img/Cam.png";
import Add from "../img/Add.png";
import More from "../img/More.png";
import Message from "./Message";
import Messages from "./Messages";
import Input from "./Input";
import { UserContext } from "../context/UserContext";

const Chat = () => {
    const { data } = useContext(UserContext)
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Input />
        </div>
    )
}

export default Chat;