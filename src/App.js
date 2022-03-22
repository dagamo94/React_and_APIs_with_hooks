import React, { useEffect, useState } from "react";
import "./App.css";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [albums, setAlbums] = useState([]);
  const title = document.title;

  /* **** SET DOCUMENT TITLE **** */
  useEffect(() => {
    document.title = "Awesome Album App";
  }, []);

  /* **** LOAD USERS AT PAGE LOAD/RENDER ****/
  useEffect(() => {
    const usersURL = "https://jsonplaceholder.typicode.com/users";
    const abortController = new AbortController();
    const signal = abortController.signal;

    async function loadUsers() {
      try {
        const response = await fetch(usersURL, {signal});
        const usersFromAPI = await response.json();
        setUsers(usersFromAPI);
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("Aborted", users);
        } else {
          throw err;
        }      
      }

    }
    loadUsers();

    const cleanUp = () => {
      abortController.abort();
      document.title = title;
    };

    return () => cleanUp();
  }, []);

  /* **** LOAD ALBUMS ON CHANGE OF 
  'currentUser' STATE ****/
  useEffect(() => {
    const baseAlbumsURL = `https://jsonplaceholder.typicode.com/albums?userId=${currentUser.id}`;
    const abortController = new AbortController();
    const signal = abortController.signal;
    document.title = "Awesome Album App";

    async function loadAlbums() {
      try {
        if (currentUser.id) {
          const response = await fetch(baseAlbumsURL, { signal });
          const albumsFromAPI = await response.json();
          setAlbums(albumsFromAPI)
        }
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
      document.title = title;
    };

    return () => cleanUp();
  }, [currentUser]);

  console.log(currentUser);
  console.log(albums);
  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} />
      </div>
      <div className="right column">
        <AlbumList user={currentUser} albums={albums} />
      </div>
    </div>
  );
}

export default App;
