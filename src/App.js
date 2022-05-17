import { useEffect, useState } from "react";
import { userApiCalls } from "./api-calls/userApiCalls";
import "./App.css";
import ChannelsAndMessagesContainer from "./components/channelsAndMessagesContainer/ChannelsAndMessagesContainer";
import Login from "./components/login/Login";
import UsersContainer from "./components/usersContainer/UsersContainer";
import { AllContext } from "./context/AllContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [usernameLoggedIn, setUsernameLoggedIn] = useState("");
  const [user_Id, setUser_Id] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const getToken = () => {
    const token = localStorage.getItem("jwtToken");

    if (token) setLoggedIn(true);
    else setLoggedIn(false);
  };

  const userInfo = () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      setLoggedIn(false);
      return;
    }
    const id = localStorage.getItem("userId");

    const response = userApiCalls.getUserById(id, token);

    response
      .then((res) => res.json())
      .then((data) => {
        setUser_Id(data.id)
        setUserEmail(data.email);
        setUsernameLoggedIn(data.username);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    userInfo();
    getToken();
  }, []);

  return (
    <div className="App">
      <AllContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          usernameLoggedIn,
          setUsernameLoggedIn,
          user_Id,
          setUser_Id,
          userEmail,
          setUserEmail,
        }}
      >
        <section className={loggedIn ? "no-login-section" : "login-section"}>
          <Login />
        </section>
        <section className={loggedIn ? "chat-section" : "no-chat-section"}>
          <ChannelsAndMessagesContainer
            username={usernameLoggedIn}
            logout={() => {
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("userId");
              getToken();
            }}
          />
          <UsersContainer />
        </section>
      </AllContext.Provider>
    </div>
  );
}

export default App;
