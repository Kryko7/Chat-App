import React from "react";
import Attachment from "../img/attachment.png";
import Picture from "../img/picture.png";

const Input = () => {
    return (
        <div className="input">
            <input type="text" placeholder="Type something..," />
            <div className="send">
                <img src={Picture} alt="" />
                <input type="file" style={{display:"none"}} id="file" />
                <label htmlFor="file">
                    <img src={Attachment} alt="" />
                </label>
                <button>Send</button>
            </div>
        </div>
    )
}

export default Input;