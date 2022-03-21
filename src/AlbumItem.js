import React from "react";

function AlbumItem ({albums}){
    console.log(albums);
    return (
        <div>
            <p>test</p>
            {albums.map(album => (<p>{album.id} - {album.title}</p>))}
        </div>
    );
}

export default AlbumItem;

// {albums.map(album => (<p>{album.id} - {album.title}</p>))}