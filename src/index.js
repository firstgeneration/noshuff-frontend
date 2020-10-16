import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { ApiClient, ApiProvider } from "jsonapi-react";
import schema from "./schema";
import App from "./App";
import { CurrentUserContext } from "Contexts/CurrentUserContext";

const client = new ApiClient({
    url: 'http://localhost:5000/api/v1',
    schema,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('noshuffToken')}`
    }
});

const Root = () => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('userId'));

    return (
        <ApiProvider client={client}>
            <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
                <App />
            </CurrentUserContext.Provider>
        </ApiProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
