import React from "react";

const Login = () => {
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">'Sup</span>
                <span className="title">Sign Up</span>
                <form>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                </form>
                <p>You don't have an account? Sign Up</p>
            </div>
        </div>
    );
}

export default Login;
