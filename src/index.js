import React from "react";
import ReactDOM from "react-dom";
import { ApiClient, ApiProvider } from "jsonapi-react";
import schema from "./schema";
import App from "./App";

const client = new ApiClient({
    url: 'http://localhost:5000/api/v1',
    schema,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('noshuffToken')}`
    }
});

const Root = () => {
    return (
        <ApiProvider client={client}>
            <App />
        </ApiProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
