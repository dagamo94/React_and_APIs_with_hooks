import React, {useState, useEffect} from "react";
import AlbumItem from "./AlbumItem";

function AlbumList({ user = {} , albums}) {
  // const [albums, setAlbums] = useState([]);

  // useEffect(() => {
  //   const baseAlbumsURL = `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`;
  //   const abortController = new AbortController();
  //   const signal = abortController.signal;

  //   async function loadAlbums() {
  //     try {
  //       const response = await fetch(baseAlbumsURL, { signal });
  //       const albumsFromAPI = await response.json();
  //       setAlbums(albumsFromAPI);
  //       console.log(albumsFromAPI);
  //     } catch (err) {
  //       if (err.name === "AbortError") {
  //         console.log("Aborted", user.id);
  //       } else {
  //         throw err;
  //       }
  //     }
  //   }

  //   loadAlbums();

  //   const cleanUp = () => {
  //     abortController.abort();
  //     document.title = "Awesome Album App";
  //   };

  //   return cleanUp();
  // }, [user]);

  return user === {} ? (<p>Please click on a user name to the left</p>
  ) : (
    <div>
      <p>{user.id}</p>
      <AlbumItem albums={albums} />
    </div>
  );
}

export default AlbumList;
