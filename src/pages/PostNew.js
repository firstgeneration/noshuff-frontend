import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistSelectForm from 'Components/PlaylistSelectForm';
import PostEditForm from 'Components/PostEditForm';

const PostNew = () => {
    const [step, setStep] = useState(1);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState('');
    const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState([]);
    const [comment, setComment] = useState('');
    const [hashtags, setHashtags] = useState([]);

    let spotify = new SpotifyWebApi();
    spotify.setAccessToken(localStorage.getItem('spotifyToken'));

    const get_user_spotify_playlists = () => {
        spotify.getUserPlaylists()
        .then(
            (data) => {
                console.log(data);
                const playlists = data.items.reduce((result, pData) => {
                    return result.set(pData.id, {
                        name: pData.name,
                        coverImageUrls: pData.images,
                        description: pData.description,
                        trackCount: pData.tracks.total,
                    });
                }, new Map());
                setPlaylists(playlists);
                console.log(playlists);
            },
            (err) => {
                console.error(err);
            }
        );
    };
    useEffect(() => get_user_spotify_playlists(), []);

    const get_selected_playlist_tracks = (playlistId) => {
        spotify.getPlaylistTracks(playlistId)
        .then(
            (data) => {
                const tracks = data.items.reduce((result, tData) => {
                    return result.concat({
                        name: tData.track.name,
                        durationMs: tData.track.duration_ms,
                    });
                }, []);
                setSelectedPlaylistTracks(tracks);
            },
            (err) => {
                console.error(err);
            }
        );
    };
    useEffect(() => get_selected_playlist_tracks(selectedPlaylistId), [selectedPlaylistId]);

    return (
        <div>
            <h1>Here is the new post page</h1>
            {step == 1 &&
                <PlaylistSelectForm
                    goNextStep={() => setStep(step + 1)}
                    playlists={playlists}
                    selectPlaylist={setSelectedPlaylistId}
                />
            }
            {step == 2 &&
                <PostEditForm
                    goPrevStep={() => setStep(step - 1)}
                    playlist={playlists.get(selectedPlaylistId)}
                    tracks={selectedPlaylistTracks}
                />
            }
        </div>
    );
};

export default PostNew;
