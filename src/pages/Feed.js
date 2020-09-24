import React, { Component } from 'react';
import { Link } from '@reach/router'

class Feed extends Component {
    

    
    render() {
        return (
            <div>
                <h1>Here is the feed</h1>
                <Link to="/new-post">Post a playlist</Link>
            </div>
            
        );
    }
}

export default Feed;
