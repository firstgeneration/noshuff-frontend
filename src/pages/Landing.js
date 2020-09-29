import React from 'react';
import { Typography } from 'antd';

const Landing = () => {

    const getSpotifyUrl = () => {
        const client_id = process.env.SPOTIFY_CLIENT_ID;
        const scopes = 'user-read-private user-read-email';
        const redirect_uri = 'http://localhost:8080/login';

        return 'https://accounts.spotify.com/authorize' +
            '?response_type=token' +
            '&client_id=' + client_id +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect_uri);
    }

    return (
        <div>
            <Typography.Title level={1}>Welcome to NoShuff</Typography.Title>
            <a href={getSpotifyUrl()}>Login with Spotify</a>
        </div>
    );
}

export default Landing;
