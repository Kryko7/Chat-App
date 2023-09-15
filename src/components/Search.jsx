import React, { useState, useContext } from "react";
import { collection, query, where, getDocs, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { getDoc, doc, setDoc } from "firebase/firestore";



const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    
    const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
        const q  = query(collection(db, "users"), where("displayName", "==", username));
        try{
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch (err) {
            setErr(true);
        }
    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    }

    const handleSelect = async() => {
        //check whether the chat already exists, if not, create a new one
        const combineID = 
            currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        
        try {
            const res = await getDoc(doc(db, "chats", combineID));
            if(!res.exists()) {
                //create a new chat in the chats collection
                await setDoc(doc(db, "chats", combineID), {messages: []});

                //create user chats
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combineID+".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                    },
                    [combineID+".date"]: serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combineID+".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    [combineID+".date"]: serverTimestamp()
                });
            }
        } catch (err) {
        }

        setUser(null);
        setUsername("");

    }
    return (
        <div className="search">
            <div className="searchForm">
                <input 
                    type="text" 
                    placeholder="find a user" 
                    onKeyDown={handleKey} 
                    onChange={e=>setUsername(e.target.value)}
                    value={username}
                />
                {err && <span>User not found</span>}
                {user && <div className="userChat" onClick={handleSelect}>
                    <img 
                        src={user.photoURL} 
                        alt=""
                    />
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>}
            </div>
        </div>

    )
}

export default Search;