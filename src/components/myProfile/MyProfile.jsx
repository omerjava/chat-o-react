import React from "react";
import "./MyProfile.css";
import { useState } from "react";
import { useContext } from "react";
import { AllContext } from "../../context/AllContext";
import { ORIGIN } from "../../config/config";
import { userApiCalls } from "../../api-calls/userApiCalls";

function MyProfile() {
  const { user_Id, usernameLoggedIn, userEmail, setLoggedIn } = useContext(AllContext);

  const [myAccount, setMyAccount] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState(usernameLoggedIn);
  const [updatedEmail, setUpdatedEmail] = useState(userEmail);
  const [errorUpdateUser, setErrorUpdateUser] = useState('');
  const [errorDeleteUser, setErrorDeleteUser] = useState('');

  
  const updateUserAccount = (username, email, id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {setLoggedIn(false); return;}

    const data = {
      data: {
        id: id,
        username: username,
        email: email,
      }
    };

    const response = fetch(`${ORIGIN}/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      method: "PUT",
      body: JSON.stringify(data),
    });

    response.then((res)=> {
      if(res.ok){
        setErrorUpdateUser("Your account information is updated!");
      }
      else setErrorUpdateUser("Something wrong! We couldn't update your account! Please try again later!");
    });


  };

  const deleteUserAccount = (id) => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {setLoggedIn(false); return;}

    const response = userApiCalls.deleteUser(id, token);

    response.then((res)=>{
      if(res.ok){
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("userId");
        setLoggedIn(false);
        setErrorDeleteUser('');
      }
      else setErrorDeleteUser("We couldn't delete your account! Please try again later!");
    }).catch((err)=> setErrorDeleteUser(err));
  };

  return (
    <div className="myProfile-container">
      <div className="myProfile">
        <div>{usernameLoggedIn}</div>
        <div>
          <button onClick={() => setMyAccount(!myAccount)}>My Account</button>
        </div>
      </div>
      <div className={myAccount ? "settings" : "no-settings"}>
        <p>Username: {usernameLoggedIn}</p>
        <p>Email: {userEmail}</p>
        <button onClick={() => setUpdateProfile(true)}>Update</button>
        <button onClick={() => setMyAccount(false)}>Cancel</button>
        <button onClick={() => deleteUserAccount(user_Id)}>Delete</button>
        {errorDeleteUser}
        <div className={updateProfile ? "update" : "no-update"}>
          <input
            type="text"
            defaultValue={usernameLoggedIn}
            onChange={(e)=>setUpdatedUsername(e.target.value)}
            minLength="2"
            required
          />
          <input
            type="email"
            onChange={(e)=>setUpdatedEmail(e.target.value)}
            defaultValue={userEmail}
            minLength="2"
            required
          />
          <button type="button" onClick={() => updateUserAccount(updatedUsername, updatedEmail, user_Id)}>
            Change
          </button>
          <button onClick={() => {setUpdateProfile(false); setErrorUpdateUser('');}}>Cancel</button>
          {errorUpdateUser}
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
