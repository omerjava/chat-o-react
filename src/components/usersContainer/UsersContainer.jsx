import React, { useEffect, useState } from "react";
import { userApiCalls } from "../../api-calls/userApiCalls";
import User from "../user/User";
import "./UsersContainer.css";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import MyPrivateMessages from "../myPrivateMessages/MyPrivateMessages";
import { privateMessageApiCalls } from "../../api-calls/privateMessageApiCalls";
import Message from "../message/Message";

function UsersContainer() {
  const [userList, setUserList] = useState([]);
  const [privateMessageList, setPrivateMessageList] = useState([]);
  const [errorUserContainer, setErrorUserContainer] = useState("");
  const [privateMessageInput, setPrivateMessageInput] = useState("");
  const [errorPrivateMessage, setErrorPrivateMessage] = useState("");
  const [errorMyMessages, setErrorMyMessages] = useState("");
  const [errorDeleteMessage, setErrorDeleteMessage] = useState("");
  const [usernameWhichLastMessageIsSent, setUsernameWhichLastMessageIsSent] =
    useState("");


    

  const { setLoggedIn, usernameLoggedIn } = useContext(AllContext);

  const getAllUsers = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    const response = userApiCalls.getUsers(token);

    response
      .then((res) => {
        if (res.ok) {
          setErrorUserContainer("");
          return res.json();
        } else setErrorUserContainer("Sorry, there is a network problem!");
      })
      .then((data) => {
        setUserList(data);
      })
      .catch(() =>
        setErrorUserContainer(
          "Sorry, there is a network problem! Please check your conection and try again!"
        )
      );
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const sendPrivateMessageHandle = (message, toUser, fromUser) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }
    console.log(message, toUser, fromUser);
    if (!message || !toUser || !fromUser) {
      setErrorPrivateMessage("Something wrong with input!");
      return;
    }

    const response = privateMessageApiCalls.createPrivateMessage(
      message,
      toUser,
      fromUser,
      token
    );

    response
      .then((res) => {
        if (res.ok) {
          setErrorPrivateMessage("Your message is sent!");
          setPrivateMessageInput("");
        } else
          setErrorPrivateMessage(
            "We couldn't save your message! Please try again later!"
          );
      })
      .catch((err) => setErrorPrivateMessage(err));
  };



  const getPrivateMessagesHandle = (username) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    if (!username) {
      setErrorMyMessages("Something wrong with input!");
      return;
    }

    const response = privateMessageApiCalls.getPrivateMessagesByUsername(
      username,
      token
    );

    response
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else setErrorMyMessages("Network Problem!");
      })
      .then((data) => setPrivateMessageList(data.data))
      .catch((err) => setErrorMyMessages(err));
  };

  const deletePrivateMessageHandle = (id, username) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }

    if (!id) {
      setErrorDeleteMessage("Something wrong with input!");
      return;
    }

    const response = privateMessageApiCalls.deletePrivateMessage(id, token);

    response.then((res) => {
      if(res.ok){
        getPrivateMessagesHandle(username);
      }
      else setErrorDeleteMessage("Network problem!");
    }).catch((err)=> setErrorDeleteMessage(err));
  };

  return (
    <div className="users">
      <div className="header">
        {
          <MyPrivateMessages
            fetchPrivateMessages={() => getPrivateMessagesHandle(usernameLoggedIn)}
            errorHappenedInMyMessages={errorMyMessages}
            myMessages={privateMessageList.map((v, i) =>
              <Message
                key={i}
                username={v.attributes.messageFrom}
                created_at={v.attributes.createdAt.substring(0, 10)}
                message={v.attributes.privateMessage}
                nameofclass={"my-private-message"}
                deleteMessageEvent={()=> deletePrivateMessageHandle(v.id, usernameLoggedIn)}
                klasOfDelete={"private-message-delete"}
                errorDelete={errorDeleteMessage}
              />
            )}
          />
        }
      </div>
      <div className="user-list">
        {userList!==undefined ? userList.map((v, i) => (
          <User
            key={i}
            username={v.username}
            value={privateMessageInput}
            placeholder={`Your message to ${v.username}..`}
            onChangeEvent={(e) => {
              setPrivateMessageInput(e.target.value);
              console.log(privateMessageInput);
            }}
            sendPrivateMessage={() => {
              sendPrivateMessageHandle(
                privateMessageInput,
                v.username,
                usernameLoggedIn
              );
              setUsernameWhichLastMessageIsSent(v.username);
            }}
            errorPrivateMessage={
              usernameWhichLastMessageIsSent === v.username
                ? errorPrivateMessage
                : ""
            }
          />
        )) : ''}
        {errorUserContainer}
      </div>
    </div>
  );
}

export default UsersContainer;
