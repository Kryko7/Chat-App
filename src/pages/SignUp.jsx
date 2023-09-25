import React from "react";
import avatar from "../img/avatar.png";
import { createUserWithEmailAndPassword, updateProfile, setPersistence, browserLocalPersistence } from "firebase/auth";
import  {auth, storage, db}  from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useNavigate, Link } from "react-router-dom";



const SignUp = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const avatar = e.target[3].files[0];
        
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, displayName);

            const uploadTask = await uploadBytesResumable(storageRef, avatar);
            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion

            const url = await getDownloadURL(storageRef);
            const update = await updateProfile(res.user, {
                displayName,
                photoURL: url,
            });
            const docRef = await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName,
                email,
                photoURL: url,
            });

            const docChat = await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");

            

        } catch (error) {
            setErr(true)
        }
    }

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">'Sup</span>
                <span className="title">Sign Up</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="User Name" />
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <input style={{display:"none"}} type="file" id="file" />
                    <label htmlFor="file">
                        <img src={avatar} alt="" />
                        <span>Upload Avatar</span>
                    </label>
                    <button>Sign Up</button>
                </form>
                {err && <span className="err">Something went wrong!</span>}
                <p>You do have an account? <Link to="/Login"><button type="submit">Sign In</button></Link></p>
            </div>
        </div>
    );
}

export default SignUp;



