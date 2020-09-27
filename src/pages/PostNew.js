import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistSelectForm from 'Components/PlaylistSelectForm';
import PostEditForm from 'Components/PostEditForm';

const PostNew = () => {
    const [step, setStep] = useState(1);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setselectedPlaylist] = useState({
        playlistId: 0,
        playlistName: '',
        description: '',
        trackCount: 0,
    });
    const [comment, setComment] = useState('');
    const [hashtags, setHashtags] = useState([]);

    const get_user_spotify_playlists = () => {
        let spotify = new SpotifyWebApi();
        spotify.setAccessToken(localStorage.getItem('spotifyToken'));
        spotify.getUserPlaylists()
        .then(
            (data) => {
                console.log(data);
                const playlists = data.items.reduce((result, pData) => {
                    result.set(pData.id, {
                        name: pData.name,
                        coverImageUrls: pData.images,
                        description: pData.description,
                        trackCount: pData.tracks.total,
                    });
                    return result
                }, new Map());
                setPlaylists(playlists);
                console.log(playlists);
            },
            (err) => {
                console.error(err);
            }
        );
    }

    useEffect(() => get_user_spotify_playlists(), []);

    return (
        <div>
            <h1>Here is the new post page</h1>
            {step == 1 &&
                <PlaylistSelectForm
                    goNextStep={() => setStep(step + 1)}
                    playlists={playlists}
                    selectPlaylist={setselectedPlaylist}
                />
            }
            {step == 2 &&
                <PostEditForm
                    goPrevStep={() => setStep(step - 1)}
                    playlist={selectedPlaylist}
                />
            }
        </div>
    );
}

export default PostNew;
