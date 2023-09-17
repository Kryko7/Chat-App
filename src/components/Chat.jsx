import React, { useContext } from "react";
import Cam from "../img/Cam.png";
import Add from "../img/Add.png";
import More from "../img/More.png";
import Messages from "./Messages";
import Input from "./Input";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";

const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(UserContext)
    console.log(data);
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