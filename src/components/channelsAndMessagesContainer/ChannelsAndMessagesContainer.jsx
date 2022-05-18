import React, { useEffect, useState } from "react";
import Channel from "../channel/Channel";
import Message from "../message/Message";
import "./ChannelsAndMessagesContainer.css";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import MyProfile from "../myProfile/MyProfile";
import { channelApiCalls } from "../../api-calls/channelApiCalls";
import { messageApiCalls } from "../../api-calls/messageApiCalls";

function ChannelsAndMessagesContainer(props) {
  const [channelList, setChannelList] = useState([]);
  const [errorChannel, setErrorChannel] = useState("");
  const [addNewChannel, setAddNewChannel] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [errorGetMessage, setErrorGetMessages] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [channel_Id, setChannel_Id] = useState(1);
  const [errorPostMessage, setErrorPostMessage] = useState("");
  const [showChannelMessages, setShowChannelMessages] = useState(false);
  const [channelOfMessages, setChannelOfMessages] = useState("");
  const [errorDeleteMessage, setErrorDeleteMessage] = useState("");

  const { user_Id, usernameLoggedIn, loggedIn, setLoggedIn } =
    useContext(AllContext);

  const getChannels = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    const response = channelApiCalls.getChannels();

    response
      .then((res) => {
        if (res.ok) return res.json();
        else
          return setErrorChannel(
            "Sorry, there is a network problem! Please check your conection and try again!"
          );
      })
      .then((data) => {
        setChannelList(data.data);
      })
      .catch(() =>
        setErrorChannel(
          "Sorry, there is a network problem! Please check your conection and try again!"
        )
      );
  };

  useEffect(() => {
    getChannels();
  }, [loggedIn]);

  const createNewChannel = (channel, username) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    if (!channel || !username) {
      setErrorChannel("Something wrong with input!");
      return;
    }

    const response = channelApiCalls.createChannel(channel, username, token);

    response.then((res) => {
      console.log(res);
      if (res.ok) {
        setAddNewChannel(false);
        getChannels();
        setChannelName("");
        setErrorChannel("");
      } else
        setErrorChannel("Sorry, something went wrong! Please try again later!");
    });
  };

  const getMessages = (channelId) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    if (!channelId) {
      setErrorGetMessages("Something wrong with channel ID!");
      return;
    }

    const response = messageApiCalls.getMessages(token);

    response
      .then((res) => {
        if (res.ok) {
          setErrorGetMessages("");
          return res.json();
        } else
          setErrorGetMessages(
            "Sorry, there is a problem in messages! Please check your conection and try again!"
          );
      })
      .then((data) => {
        const channelMessages = data.data
          .filter((v) => v.attributes.channel.data !== null)
          .filter((v) => v.attributes.channel.data.id === channelId);
        setMessageList(channelMessages);
      })
      .catch(() =>
        setErrorGetMessages(
          "Sorry, there is a problem in fetching messages! Please check your conection and try again!"
        )
      );
  };

  const postNewMessage = (userMessage, userID, channelID) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    if (!userMessage || !userID || !channelID) {
      setErrorPostMessage("Something wrong!");
      return;
    }
    const response = messageApiCalls.createMessage(
      userMessage,
      userID,
      channelID,
      token
    );

    response
      .then((res) => {
        if (res.ok) {
          setMessageInput("");
          getMessages(channelID);
        } else
          setErrorPostMessage(
            "Sorry, there is an error! Please try again later!"
          );
      })
      .catch(() =>
        setErrorPostMessage("Sorry, there is an error! Please try again later!")
      );
  };

  const deleteChannel = (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    const response = channelApiCalls.deleteChannel(id, token);

    response.then(() => getChannels()).catch((err) => console.log(err));
  };

  const deleteMessageHandle = (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    if (!id) {
      setErrorDeleteMessage("Something wrong with message id!");
      return;
    }

    const response = messageApiCalls.deleteMessage(id, token);

    response
      .then((res) => {
        if (res.ok) {
          getMessages(channel_Id);
        } else setErrorDeleteMessage("Message delete response is not ok!");
      })
      .catch((err) => setErrorDeleteMessage(err));
  };

  return (
    <div className="channels">
      <section className="channels-section">
        <div className="welcome">
          <div className="closeBtn" onClick={props.logout}>
            Logout
          </div>
          <div className="header">{<MyProfile />}</div>
        </div>
        <div className="add-channel">
          <button
            className="new-channel-btn"
            onClick={() => setAddNewChannel(!addNewChannel)}
          >
            Add New Channel
          </button>
          <div className={addNewChannel ? "addNewChannel" : "no-addNewChannel"}>
            <input
              type="text"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              placeholder="Channel Name"
              minLength="2"
              required
            />
            <button
              onClick={() => createNewChannel(channelName, usernameLoggedIn)}
            >
              Submit
            </button>
            <button onClick={() => setAddNewChannel(false)}>Cancel</button>
            <p>{errorChannel}</p>
          </div>
        </div>
        <div className="channel-list">
          {channelList.map((v, i) => (
            <Channel
              key={i}
              channelId={v.id}
              channelName={v.attributes.channel}
              created_by={v.attributes.username}
              created_at={v.attributes.createdAt.substring(0, 10)}
              messages_count={v.attributes.messages.data.length}
              last_activity={v.attributes.updatedAt.substring(0, 10)}
              fetchChannelMessages={() => {
                getMessages(v.id);
                setChannel_Id(v.id);
                setChannelOfMessages(v.attributes.channel);
                setShowChannelMessages(true);
              }}
              deleteChannel={() => deleteChannel(v.id)}
              userLogged={usernameLoggedIn}
            />
          ))}
        </div>
      </section>
      <section className="messages-section">
        <div className="post-message">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Post your message.."
            minLength="1"
            required
          />
          <button
            onClick={() => {
              postNewMessage(messageInput, user_Id, channel_Id);
            }}
          >
            OK
          </button>
          <div className="error-post-message">{errorPostMessage}</div>
        </div>
        <div className="messages">
          <div
            className={
              showChannelMessages
                ? "no-landing-message-section"
                : "landing-message-section"
            }
          >
            <h3>Welcome to Chat-O</h3>
            <div>chat in current channels</div>
            <div>create your own channel</div>
            <div>send messages to other users</div>
          </div>
          <div
            className={showChannelMessages ? "message-list" : "no-message-list"}
          >
            <div className="messages-header">Channel {channelOfMessages}</div>
            <div>
              {" "}
              {messageList.map((v, i) => (
                <Message
                  key={i}
                  nameofclass={
                    i % 2 === 0 ? "message-container1" : "message-container2"
                  }
                  username={
                    v.attributes.users_permissions_user.data !== null
                      ? v.attributes.users_permissions_user.data.attributes
                          .username
                      : "Ex-User"
                  }
                  message={v.attributes.message}
                  created_at={v.attributes.createdAt.substring(0, 10)}
                  klasOfDelete={
                    (v.attributes.users_permissions_user.data !== null
                      ? v.attributes.users_permissions_user.data.attributes
                          .username
                      : "Ex-User") === usernameLoggedIn
                      ? "delete-message"
                      : "no-delete-message"
                  }
                  deleteMessageEvent={() => deleteMessageHandle(v.id)}
                  errorDelete={errorDeleteMessage}
                />
              ))}
            </div>
          </div>
          {errorGetMessage}
        </div>
      </section>
    </div>
  );
}

export default ChannelsAndMessagesContainer;
