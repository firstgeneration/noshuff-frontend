import React, { Component } from 'react';

class Landing extends Component {

    getSpotifyUrl(){
        let client_id = process.env.SPOTIFY_CLIENT_ID;
        let scopes = 'user-read-private user-read-email';
        let redirect_uri = 'http://localhost:8080/login';

        return 'https://accounts.spotify.com/authorize' +
            '?response_type=token' +
            '&client_id=' + client_id +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect_uri);
    }

    render() {
        return (
            <div>
                <h1>Welcome to NoShuff</h1>
                <a href={this.getSpotifyUrl()}>Login with Spotify</a>
            </div>
        );
    }
}

export default Landing;
