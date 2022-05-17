import React from "react";
import "./User.css";
import { useState } from "react";

function User(props) {
  const [privateMessage, setPrivateMessage] = useState(false);

  return (
    <div className="user">
      <div className="user-header">
        <div>
          <button onClick={() => setPrivateMessage(!privateMessage)}>Send Message </button>
        </div>
        <div> {props.username}</div>
      </div>
      <div className={privateMessage ? "private-message" : "no-private-message"}>
        <input
          type="text"
          value={props.value}
          onChange={props.onChangeEvent}
          placeholder={props.placeholder}
          minLength="2"
          required
        />
        <button type="button" onClick={props.sendPrivateMessage}>
          Send
        </button>
        <button onClick={() => setPrivateMessage(false)}>Cancel</button><br></br>
        <div className="error-pm">{props.errorPrivateMessage}</div>
      </div>
    </div>
  );
}

export default User;
