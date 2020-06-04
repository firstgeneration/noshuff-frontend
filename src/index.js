import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { Router, Link } from "@reach/router";
import Landing from 'pages/landing/Landing';
import Login from 'pages/login/Login';
import Feed from 'pages/feed/Feed';

const App = () => {
    return (
        <Router>
            <Landing path="/" />
            <Login path="/login" />
            <Feed path="/feed" />
        </Router>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
