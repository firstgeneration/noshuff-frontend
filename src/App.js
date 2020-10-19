import React from "react";
import { Router } from "@reach/router";
import Landing from 'Pages/Landing';
import Login from 'Pages/Login';
import Feed from 'Pages/Feed';
import PostNew from 'Pages/PostNew';
import Profile from 'Pages/Profile'
import Explore from 'Pages/Explore'

const App = () => {
    return (
        <Router>
            <Landing path="/" />
            <Login path="login" />
            <Feed path="feed" />
            <PostNew path="new-post" />
            <Profile path=":userId" />
            <Explore path="explore" />
        </Router>
    );
};

export default App;
