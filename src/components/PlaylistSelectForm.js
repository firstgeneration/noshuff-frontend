import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';

const PlaylistSelectForm = () => {

    const [playlists, setPlaylists] = useState([]);

    const get_user_playlists = () => {

        const get_best_image_url = (images) => {
            const image = images.find(img => img.width == '60');
            return image ? image.url : images[0].url
        }

        let spotify = new SpotifyWebApi();
        spotify.setAccessToken(localStorage.getItem('spotifyToken'));
        spotify.getUserPlaylists()
        .then(
            (data) => {
                let playlists = []
                data.items.map((pData) => {
                    const playlist = {
                        coverImageUrl: get_best_image_url(pData.images),
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
    
    useEffect(() => get_user_playlists(), []);

    return (
        <div>
            <h2>Select your playlist</h2>
            <ul>
                {playlists.map(playlist => 
                    <li key={playlist.name}>
                        <span>{playlist.name}</span>
                        <img width="60px" src={playlist.coverImageUrl}/>
                        <span>Trackcount: {playlist.trackCount}</span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default PlaylistSelectForm;
