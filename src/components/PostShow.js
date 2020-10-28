import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SpotifyWebApi from 'spotify-web-api-js';
import PlaylistCover from 'Components/PlaylistCover';
import { getBestImageUrl } from 'Utils/spotifyUtils';
import { Link } from "@reach/router";
import LikeButton from 'Components/LikeButton';
import CommentsSection from 'Components/CommentsSection';
import TimeAgo from 'react-timeago'

const PostShow = ({ post, user }) => {
    const [playlist, setPlaylist] = useState({});
    const [likesCount, setlikesCount] = useState(post.likes_count);

    useEffect(() => get_spotify_playlist(post.spotify_playlist_id), []);

    const get_spotify_playlist = (playlistId) => {
        let spotify = new SpotifyWebApi();
        spotify.setAccessToken(localStorage.getItem('spotifyToken'));
        spotify.getPlaylist(playlistId)
        .then(
            (data) => {
                setPlaylist({
                    name: data.name,
                    imageUrl: getBestImageUrl('medium', data.images),
                    description: data.description,
                    trackCount: data.tracks.total,
                    tracks: data.tracks.items.map((item) => {
                        return item.track;
                    })
                });
            },
            (err) => {
                console.error(err);
            }
        );
    };
    const onLike = () => setlikesCount(likesCount + 1);
    const onUnlike = () => setlikesCount(likesCount - 1);

    return (
        <div>
            <strong>
                <Link to={`/${user.id}`}>
                    <img width='25px' src={user.avatar_url}/>{user.display_name}
                </Link>
            </strong>
            <PlaylistCover
                tracks={playlist.tracks}
                imageUrl={playlist.imageUrl}
            />
            <LikeButton
                postId={post.id}
                isLiked={post.is_liked}
                onLike = {onLike}
                onUnlike = {onUnlike}
            />
            <div>{likesCount} Like{likesCount == 1 ? '': 's'}</div>
            <ul>
                <li>Name: {playlist.name}</li>
                <li>Description: {playlist.description || "*Add a description in spotify*"}</li>
                <li>TrackCount: {playlist.trackCount}</li>
                <li>caption: {post.caption}</li>
            </ul>
            <CommentsSection comments={post.comments} postId={post.id} />
            <TimeAgo style={{color:'gray'}}date={post.created_at} live={false} />
        </div>
    );
};

PostShow.propTypes = {
    post: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default PostShow;
