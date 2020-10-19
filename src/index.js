import React, { useState, useContext } from 'react';
import ReactDOM from "react-dom";
import { ApiClient, ApiProvider } from "jsonapi-react";
import schema from "./schema";
import App from "./App";
import { CurrentUserContext } from "Contexts/CurrentUserContext";

const getClient = (token) => {
    return new ApiClient({
        url: 'http://localhost:5000/api/v1',
        schema,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const Provider = () => {
    const { token } = useContext(CurrentUserContext);
    return (
        <ApiProvider client={getClient(token)}>
            <App />
        </ApiProvider>
    );
};

const Root = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('userId'));
    const [token, setToken] = useState(localStorage.getItem('noshuffToken'));
    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser, token, setToken}}>
            <Provider/>
        </CurrentUserContext.Provider>
    )
};

ReactDOM.render(<Root />, document.querySelector("#root"));
