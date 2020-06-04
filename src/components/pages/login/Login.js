import React, { Component } from 'react';
import { navigate } from "@reach/router"
const queryString = require('query-string');

class Login extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Handle case where user rejects spotify access

        const parsed = queryString.parse(this.props.location.hash);
        const expires_in = parsed.expires_in;
        const access_token = parsed.access_token;

        localStorage.setItem('spotifyToken', access_token)

        const apiParams = queryString.stringify({ access_token, expires_in });
        fetch(`http://localhost:5000/auth/login?${apiParams}`)
            .then(res => res.json())
            .then(
                (result) => {
                    localStorage.setItem('noshuffToken', result.access_token)
                    navigate("/feed", { replace: true})
                },
                (error) => {
                    console.log('help', error);
                }
            )
    }

    render() {
        return (
            <div>
                <h1>Redirect page loading</h1>
            </div>
        );
    }
}

export default Login;
