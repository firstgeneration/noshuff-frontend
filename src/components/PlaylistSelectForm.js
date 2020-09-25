import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';

const PlaylistSelectForm = () => {

    const [playlists, setPlaylists] = useState([]);

    const get_user_playlists = () => {
        let spotify = new SpotifyWebApi();
        spotify.setAccessToken(localStorage.getItem('spotifyToken'));
        spotify.getUserPlaylists()
        .then(
            (data) => {
                // console.log('User playlists', data);
                let playlists = []
                data.items.map((pData) => {
                    const playlist = {
                        coverImageUrl: pData.images[1],
                        name: pData.name,
                        trackCount: pData.tracks.total,
                    }
                    playlists.push(playlist)
                });
                setPlaylists(playlists);
            },
            (err) => {
                console.error(err);
            }
        );
    }
    
    useEffect(() => get_user_playlists());

    return (
        <div>
            <h2>Select your playlist</h2>
            <ul>
                {playlists.map(playlist => 
                    <li key={playlist.name}>{playlist.name}</li>
                )}
            </ul>
        </div>
    );
}

export default PlaylistSelectForm;
