import React, { useContext, useState } from "react";
import Attachment from "../img/attachment.png";
import Picture from "../img/picture.png";
import { AuthContext } from "../context/AuthContext";
import { UserContext } from "../context/UserContext";
import  {auth, storage, db}  from "../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Timestamp } from "firebase/firestore";
import { serverTimestamp } from "firebase/firestore";


const Input = () => {

    const [text, setText] = useState("");
    const [image, setImage] = useState(null);

    const {currentUser} = useContext(AuthContext);
    const { data } = useContext(UserContext);

    const handleSend = async() => {
        if(image) {
            const storageRef = ref(storage, uuidv4());

            const uploadTask = await uploadBytesResumable(storageRef, image);

            const url = await getDownloadURL(storageRef);

            await updateDoc(doc(db, "chats", data.chatID), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderID: currentUser.uid,
                    date:Timestamp.now(),
                    image: url,
                })
            })
            
        } else {
            await updateDoc(doc(db, "chats", data.chatID), {
                messages: arrayUnion({
                    id: uuidv4(),
                    text,
                    senderID: currentUser.uid,
                    date:Timestamp.now(),
                })
            })
        }

        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatID+".lastMessage"]: {
                text
            },
            [data.chatID+".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatID+".lastMessage"]: {
                text
            },
            [data.chatID+".date"]: serverTimestamp()
        });
        setText("");
        setImage(null);
    }
    return (
        <div className="input">
            <input type="text" placeholder="Type something..," onChange={e=>setText(e.target.value)} value={text}/>
            <div className="send">
                <img src={Picture} alt="" />
                <input type="file" style={{display:"none"}} id="file" onChange={e=>setImage(e.target.files[0])}/>
                <label htmlFor="file">
                    <img src={Attachment} alt="" />
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input;