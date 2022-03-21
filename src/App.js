import React, { useEffect, useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [albums, setAlbums] = useState([]);

  /* **** SET DOCUMENT TITLE **** */
  useEffect(() => {
    document.title = "Awesome Album App";
  }, []);

  /* **** LOAD USERS AT PAGE LOAD/RENDER ****/
  useEffect(() => {
    const usersURL = "https://jsonplaceholder.typicode.com/users";
    async function loadUsers() {
      const response = await fetch(usersURL);
      const usersFromAPI = await response.json();
      setUsers(usersFromAPI);
    }
    loadUsers();
  }, []);

  /* **** LOAD ALBUMS ON CHANGE OF 
  'currentUser' STATE ****/
  useEffect(() => {
    const baseAlbumsURL = `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`;
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadAlbums() {
      try {
        const response = await fetch(baseAlbumsURL, { signal });
        const albumsFromAPI = await response.json();
        setAlbums(albumsFromAPI);
        console.log(albumsFromAPI);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted", currentUser.id);
        } else {
          throw err;
        }
      }
    }

    loadAlbums();

    const cleanUp = () => {
      abortController.abort();
      document.title = "Awesome Album App";
    };

    return cleanUp();
  }, [currentUser]);

  console.log(currentUser);
  console.log(albums);
  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} albums={albums}/>
      </div>
    </div>
  );
}

export default App;
