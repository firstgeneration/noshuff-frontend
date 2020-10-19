import React, { useContext } from 'react';
import { navigate } from "@reach/router"
const queryString = require('query-string');
import { CurrentUserContext } from "Contexts/CurrentUserContext";

const Login = (props) => {
    const { setCurrentUser, setToken } = useContext(CurrentUserContext);
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
                localStorage.setItem('userId', result.user_id)
                setToken(result.noshuff_access_token);
                setCurrentUser(result.spotify_id);
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
