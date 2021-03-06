import React, { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { useMutation } from 'jsonapi-react';
import { navigate } from "@reach/router";
import PlaylistSelectForm from 'Components/PlaylistSelectForm';
import PostEditForm from 'Components/PostEditForm';
import { Typography } from 'antd';

const PostNew = () => {
    const [step, setStep] = useState(1);
    const [playlists, setPlaylists] = useState(new Map());
    const [selectedPlaylistId, setSelectedPlaylistId] = useState();
    const [selectedPlaylistTracks, setSelectedPlaylistTracks] = useState([]);
    const [addPost, { isLoading, data, error, errors }] = useMutation('posts')

    useEffect(() => get_user_spotify_playlists(), []);
    useEffect(() => selectedPlaylistId && get_selected_playlist_tracks(selectedPlaylistId), [selectedPlaylistId]);

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
            },
            (err) => {
                console.error(err);
            }
        );
    };

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

    const onSubmit = async (data) => {
        const result = await addPost( {spotify_playlist_id: selectedPlaylistId, caption: data.caption });
        navigate("/feed", { replace: true})
    };

    return (
        <div>
            <Typography.Title level={1}>New Post</Typography.Title>
            {step == 1 &&
                <PlaylistSelectForm
                    goNextStep={() => setStep(step + 1)}
                    playlists={playlists}
                    onSelectPlaylist={setSelectedPlaylistId}
                />
            }
            {step == 2 &&
                <PostEditForm
                    goPrevStep={() => setStep(step - 1)}
                    playlist={playlists.get(selectedPlaylistId)}
                    tracks={selectedPlaylistTracks}
                    onSubmit={onSubmit}
                />
            }
        </div>
    );
};

export default PostNew;
