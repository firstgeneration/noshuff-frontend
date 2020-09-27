import React from 'react';

const PlaylistSelectForm = (props) => {
    const selectPlaylist = (id) => {
        props.selectPlaylist(props.playlists.get(id));
        props.goNextStep();
    };

    return (
        <div>
            <h2>Select your playlist</h2>
            <ul>
                {[...props.playlists.keys()].map((id) =>
                    <li onClick={() => selectPlaylist(id)} key={id}>
                        <span>{props.playlists.get(id).name}</span>
                        <img width="60px" src={props.playlists.get(id).coverImageUrl}/>
                        <span>Trackcount: {props.playlists.get(id).trackCount}</span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default PlaylistSelectForm;
