import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";


const Message = ({message}) => {

    const {currentUser} = useContext(AuthContext);
    const { data } = useContext(UserContext);
    console.log("LOL")
    console.log(message);
    console.log("LOL")
    return (
        <div className={`message ${message.senderID === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={currentUser.uid === message.senderID ? currentUser.photoURL : data.user.photoURL} alt="" />
                <span>Just Now</span>
            </div>
            <div className="messageContent">
                <p>{message.text}</p>
                {message.image && <img src={message.image} alt="" />}
            </div>
        </div>
    )
}   

export default Message;


