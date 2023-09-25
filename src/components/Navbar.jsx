import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { auth } from "../firebase";
import {AuthContext}  from "../context/AuthContext";

const Navbar = () => {
    const { currentUser } = useContext(AuthContext);

    console.log(currentUser);
    console.log(currentUser.displayName);

    if (!currentUser) {
        return <div>Loading...</div>
    }

    return (
        <div className="navbar">
            <span className="logo">'Sup</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                <button onClick={() => signOut(auth)}>Logout</button>
            </div>

        </div>
    )
}

export default Navbar;