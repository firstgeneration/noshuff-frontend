import React from "react";
import ReactDOM from "react-dom";
import './index.css';
import { Router, Link } from "@reach/router";
import Landing from 'pages/landing/Landing';

const App = () => {
    return (
        <Router>
            <Landing path="/" />
        </Router>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
