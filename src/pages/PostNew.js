import React, { Component } from 'react';
import PlaylistSelectForm from 'Components/PlaylistSelectForm';

class PostNew extends Component {
    
    componentDidMount() {
        
    }
    
    render() {
        return (
            <div>
                <h1>Here is the new post page</h1>
                <PlaylistSelectForm />
            </div>
            
        );
    }
}

export default PostNew;
