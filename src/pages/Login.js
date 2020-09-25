import React, { Component } from 'react';
import { navigate } from "@reach/router"
const queryString = require('query-string');

const Login = (props) => {

    // Add case where user rejects spotify access
    const parsed = queryString.parse(props.location.hash);
    localStorage.setItem('spotifyToken', parsed.access_token);

    const apiParams = queryString.stringify({
        spotify_access_token: parsed.access_token,
        spotify_access_token_expires_in: parsed.expires_in
    });
    fetch(`http://localhost:5000/api/v1/login?${apiParams}`)
        .then(res => res.json())
        .then(
            (result) => {
                localStorage.setItem('noshuffToken', result.noshuff_access_token)
                navigate("/feed", { replace: true})
            },
            (error) => {
                console.log('help', error);
            }
        )

    return (
        <div>
            <h1>Redirect page loading...</h1>
        </div>
    );
}

export default Login;
