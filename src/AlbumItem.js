import React from "react";

function AlbumItem ({albums}){
    console.log(albums);
    return (
        <div >
            {albums.map(album => (<p key={album.id}>{album.id} - {album.title}</p>))}
        </div>
    );
}

export default AlbumItem;

// {albums.map(album => (<p>{album.id} - {album.title}</p>))}