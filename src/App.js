import React, { useEffect, useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  /* **** SET DOCUMENT TITLE **** */
  useEffect(() => {
    document.title = "Awesome Album App";
  }, []);

  /* **** LOAD USERS AT PAGE LOAD/RENDER ****/
  const usersURL = "https://jsonplaceholder.typicode.com/users";
  useEffect(() => {
    async function loadUsers () {
        const response = await fetch(usersURL);
        const usersFromAPI = await response.json();
        setUsers(usersFromAPI)
    }
    loadUsers();
  }, []);

  /* **** LOAD ALBUMS ON CHANGE OF 'users' STATE ****/

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} />
      </div>
    </div>
  );
}

export default App;
