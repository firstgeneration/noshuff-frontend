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
    const currentUserStorage = {
        token: localStorage.getItem('noshuffToken'),
        id: localStorage.getItem('userId'),
        dislpayName: localStorage.getItem('displayName'),
        avatarUrl: localStorage.getItem('avatarUrl')
    };
    const [currentUser, setCurrentUser] = useState(currentUserStorage);
    return (
        <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
            <Provider currentUser={currentUser}/>
        </CurrentUserContext.Provider>
    )
};

ReactDOM.render(<Root />, document.querySelector("#root"));
