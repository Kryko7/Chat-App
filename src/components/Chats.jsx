import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";

const Chats = () => {

    const { currentUser } = useContext(AuthContext);
    const  { dispatch } = useContext(UserContext)
    const [chats, setChats] = useState([]);
    

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });
    
            return () => {
                unsub();
            }
        }
        
        currentUser && getChats();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({type: "CHANGE_USER", payload: user});
    }

    let chatArr = Object.entries(chats);
    console.log(chatArr);
    return (
        <div className="chats">
            {chatArr?.sort((a,b) => b[1].date - a[1].date).map((chat) => (
                <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} alt="" />
                    <div className="userChatInfo">
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                    </div>
                </div>
            ))}

         </div>

    )
}

export default Chats;


// return (
//     <div className="chats">
//         {chatArr?.map((chat) => (
//             <div className="userChat" key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
//                 <img src={chat[1].userInfo.photoURL} alt="" />
//                 <div className="userChatInfo">
//                     <span>{chat[1].userInfo.displayName}</span>
//                     <p>{chat[1].userInfo?.text}</p>
//                 </div>
//             </div>
//         ))}
//     </div>
// )

