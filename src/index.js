import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { ApiClient, ApiProvider } from "jsonapi-react";
import schema from "./schema";
import App from "./App";
import { CurrentUserContext } from "Contexts/CurrentUserContext";
import Nav from 'Components/Nav';

const getClient = (token) => {
    return new ApiClient({
        url: 'http://localhost:5000/api/v1',
        schema,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

const Provider = ({ currentUser }) => {
    return (
        <ApiProvider client={getClient(currentUser.token)}>
            {currentUser.id && 
                <Nav currentUserId={currentUser.id}/>
            }
            <App />
        </ApiProvider>
    );
};

const Root = () => {
    const userIdStorage = localStorage.getItem('userId');
    const tokenStorage = localStorage.getItem('noshuffToken');
    const [currentUser, setCurrentUser] = useState({id: userIdStorage, token: tokenStorage});
    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <Provider currentUser={currentUser}/>
        </CurrentUserContext.Provider>
    )
};

ReactDOM.render(<Root />, document.querySelector("#root"));
