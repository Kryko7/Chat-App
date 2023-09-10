import React from "react";
import avatar from "../img/avatar.png";

const SignUp = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">'Sup</span>
                <span className="title">Sign Up</span>
                <form>
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
                <p>You do have an account? Login</p>
            </div>
        </div>
    );
}

export default SignUp;
