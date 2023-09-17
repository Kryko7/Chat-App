import React, { useEffect, useState, useContext } from "react";
import Message from "./Message";
import { UserContext } from "../context/UserContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Messages = () => {
    const [messages, setMessages] = useState([])
    const { data } = useContext(UserContext)


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatID), (doc) => {
            doc.exists() && setMessages(doc.data().messages);
        });

        return () => {
            unsub();
        }
    }, [data.chatID]);

    return (
        <div className="messages">
            {messages.map((m) => {
                <Message message={m} />
            })}
        </div>
    )
}

export default Messages;