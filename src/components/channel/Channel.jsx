import React from "react";
import "./Channel.css";
import { useState } from "react";

function Channel(props) {
  const [channelSettings, setChannelSettings] = useState(false);
  const [changeName, setChangeName] = useState(false);

  return (
    <div className="channel-container" onClick={props.fetchChannelMessages}>
      <div className="channel">
        <div>{props.channelName}</div>
        <div
          className={
            props.created_by === props.userLogged
              ? "showMyChannel"
              : "no-myChannel"
          }
        >
          <button onClick={() => setChannelSettings(!channelSettings)}>My Channel</button>
        </div>
      </div>
      <div className={channelSettings ? "settings" : "no-settings"}>
        <p>Channel Id: {props.channelId}</p>
        <p>Channel Name: {props.channelName}</p>
        <p>Created by: {props.created_by}</p>
        <p>Created at: {props.created_at}</p>
        <p>Last activity: {props.last_activity}</p>
        <p>Total messages: {props.messages_count}</p>
        <button onClick={() => setChangeName(true)}>Change Name</button>
        <button onClick={() => setChannelSettings(false)}>Cancel</button>
        <button onClick={props.deleteChannel}>Delete</button>

        <div className={changeName ? "update" : "no-update"}>
          <input
            type="text"
            value={props.updateInputValue}
            onChange={props.updateChannelNameInput}
            placeholder="New Channel Name"
            minLength="2"
            required
          />
          <button type="submit" onSubmit={props.updateSubmit}>
            Submit
          </button>
          <button onClick={() => setChangeName(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default Channel;
