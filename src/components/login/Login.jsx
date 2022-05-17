import React from "react";
import "./Login.css";
import { useState } from "react";
import { ORIGIN } from "../../config/config";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";

function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameRegister, setUsernameRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");

  const { setLoggedIn, setUsernameLoggedIn, setUser_Id, setUserEmail } =
    useContext(AllContext);

  const registerAuthenticatedUser = (
    usernameInput,
    emailInput,
    passwordInput
  ) => {
    fetch(`${ORIGIN}/api/auth/local/register`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
        username: usernameInput,
        email: emailInput,
        password: passwordInput,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setShowLogin(true);
          setShowRegister(false);
          setUsernameRegister("");
          setPasswordRegister("");
          setEmailRegister("");
          setErrorMessage("");
        } else {
          console.log(res);
          setErrorMessage(
            "Sorry, something went wrong! Please try again later!"
          );
        }
        return res.json();
      })
      .catch(() =>
        setErrorMessage("Sorry, there is an error! Please try again later!")
      );
  };

  const loginHandle = (usernameInput, passwordInput) => {
    fetch(`${ORIGIN}/api/auth/local`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      method: "POST",
      body: JSON.stringify({
        identifier: usernameInput,
        password: passwordInput,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setUsername("");
          setPassword("");
          setErrorMessage("");
          return res.json();
        } else {
          setErrorMessage(
            "Sorry, something went wrong! Please try again later!"
          );
          setLoggedIn(false);
          return;
        }
        
      })
      .then((data) => {
        localStorage.setItem("jwtToken", data.jwt);
        localStorage.setItem("userId", data.user.id);
        const token = localStorage.getItem("jwtToken");
        console.log(data.user);
        if (token) {
          setLoggedIn(true);
          setUsernameLoggedIn(data.user.username);
          setUser_Id(data.user.id);
          setUserEmail(data.user.email);
        };
      })
      .catch(() =>
        setErrorMessage("Sorry, there is an error! Please try again later!")
      );
  };

  return (
    <div className="auth">
      <div className={showLogin ? "login" : "no-login"}>
        <form className="login-form">
          <h2>Login</h2>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              minLength="2"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              minLength="2"
              required
            />
          </div>
          <button type="button" onClick={() => loginHandle(username, password)}>
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLogin(false);
              setShowRegister(true);
              setUsername("");
              setPassword("");
            }}
          >
            Register
          </button>
          <p>{errorMessage}</p>
        </form>
      </div>

      <div className={showRegister ? "register" : "no-register"}>
        <form className="register-form">
          <h2>Register</h2>
          <div>
            <input
              type="text"
              value={usernameRegister}
              onChange={(e) => setUsernameRegister(e.target.value)}
              placeholder="Username"
              minLength="2"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={emailRegister}
              onChange={(e) => setEmailRegister(e.target.value)}
              placeholder="Email"
              minLength="2"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={passwordRegister}
              onChange={(e) => setPasswordRegister(e.target.value)}
              placeholder="Password"
              minLength="2"
              required
            />
          </div>
          <button
            type="button"
            onClick={() =>
              registerAuthenticatedUser(
                usernameRegister,
                emailRegister,
                passwordRegister
              )
            }
          >
            Register
          </button>
          <button
            type="button"
            onClick={() => {
              setShowRegister(false);
              setShowLogin(true);
              setUsernameRegister("");
              setPasswordRegister("");
              setEmailRegister("");
            }}
          >
            Login
          </button>
          <p>{errorMessage}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
