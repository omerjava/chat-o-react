import React from "react";
import "./Message.css";

function Message(props) {
  return (
    <div className={props.nameofclass}>
      <div className="message">
        <div className="top">
          <div className="username">{props.username}</div>       
          <div className={props.klasOfDelete} onClick={props.deleteMessageEvent}>x</div>{" "}
        </div>
        <div>{props.message}</div>
        <div className="message-footer">{props.created_at}</div>{" "}
        <div className="error-delete">{props.errorDelete}</div>
      </div>
    </div>
  );
}

export default Message;
