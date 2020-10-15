import React from "react";
import { Router } from "@reach/router";
import Landing from 'Pages/Landing';
import Login from 'Pages/Login';
import Feed from 'Pages/Feed';
import PostNew from 'Pages/PostNew';
import Profile from 'Pages/Profile'

const App = () => {
    return (
        <Router>
            <Landing path="/" />
            <Login path="login" />
            <Feed path="feed" />
            <PostNew path="new-post" />
            <Profile path=":userId" />
        </Router>
    );
};

export default App;
