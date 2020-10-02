import React from 'react';
import PropTypes from 'prop-types';

const TrackList = ({ tracks }) => {
    return (
        <ul>
            {tracks.map((track, idx) => 
                <li key={idx}>{track.name}</li>
            )}
        </ul>
    );
};

TrackList.propTypes = {
    tracks: PropTypes.array.isRequired,
}

export default TrackList;
