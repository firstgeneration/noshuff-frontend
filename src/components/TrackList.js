import React from 'react';

const TrackList = (props) => {
    return (
        <ul>
            {props.tracks.map((track, idx) => 
                <li key={idx}>{track.name}</li>
            )}
        </ul>
    );
};

export default TrackList;
