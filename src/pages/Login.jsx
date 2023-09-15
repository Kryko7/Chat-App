import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import  { auth } from "../firebase";

const Login = () => {
    const [err, setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
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
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                </form>
                <p>You don't have an account? <Link to="/SignUp">Sign Up</Link></p>
            </div>
        </div>
    );
}

export default Login;
