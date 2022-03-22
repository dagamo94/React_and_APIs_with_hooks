import React, {useState, useEffect} from "react";
import AlbumItem from "./AlbumItem";

function AlbumList({ user = {} , albums}) {

  return !user.id ? (<p>Please click on a user name to the left</p>
  ) : (
    <div>
      <h1>{user.name}</h1>
      <AlbumItem albums={albums} />
    </div>
  );
}

export default AlbumList;
