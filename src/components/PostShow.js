import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistCover from 'Components/PlaylistCover';
import { getBestImageUrl } from 'Utils/spotifyUtils';

const PostShow = ({ post }) => {
    const [playlist, setPlaylist] = useState({});

    useEffect(() => get_spotify_playlist(post.spotify_playlist_id), []);

    const get_spotify_playlist = (playlistId) => {
        let spotify = new SpotifyWebApi();
        spotify.setAccessToken(localStorage.getItem('spotifyToken'));

        spotify.getPlaylist(playlistId)
        .then(
            (data) => {
                const tracks = data.tracks.items.map((item) => {
                    return item.track;
                });
                const playlist = {
                    name: data.name,
                    imageUrl: getBestImageUrl('medium', data.images),
                    description: data.description,
                    trackCount: data.tracks.total,
                    tracks: tracks,
                };
                setPlaylist(playlist);
            },
            (err) => {
                console.error(err);
            }
        );
    };

    return (
        <div>
            <PlaylistCover
                tracks={playlist.tracks}
                imageUrl={playlist.imageUrl}
            />
            <ul>
                <li>Name: {playlist.name}</li>
                <li>Description: {playlist.description || "*Add a description in spotify*"}</li>
                <li>TrackCount: {playlist.trackCount}</li>
                <li>caption: {post.caption}</li>
            </ul>
        </div>
    );
};

PostShow.propTypes = {
    post: PropTypes.object.isRequired,
};

export default PostShow;
