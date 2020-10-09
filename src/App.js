import React from "react";
import { Router } from "@reach/router";
import Landing from 'Pages/Landing';
import Login from 'Pages/Login';
import Feed from 'Pages/Feed';
import PostNew from 'Pages/PostNew';

const App = () => {
    return (
        <Router>
            <Landing path="/" />
            <Login path="/login" />
            <Feed path="/feed" />
            <PostNew path="/new-post" />
        </Router>
    );
};

export default App;
