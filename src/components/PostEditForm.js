import React, { useState, useEffect } from 'react'
import SpotifyWebApi from 'spotify-web-api-js';

const PostEditForm = (props) => {

    return (
        <div>
            <h2>Post Edit form is here</h2>
            <img width="150px" src={props.playlist.coverImageUrl}/>
            <ul>
                <li>Name: {props.playlist.name}</li>
                <li>Description: {props.playlist.description}</li>
                <li>TrackCount: {props.playlist.trackCount}</li>
            </ul>

            <button onClick={() => props.goPrevStep()}>Cancel</button>
        </div>
    );
}

export default PostEditForm;
