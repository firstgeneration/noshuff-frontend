import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrackList from 'Components/TrackList';

const PlaylistCover = ({ tracks, imageUrl }) => {
    const [showTracks, setShowTracks] = useState(false);

    const toggleTrackList = () => setShowTracks(!showTracks);

    return (
        <div onClick={toggleTrackList}>
            {showTracks
                ? <TrackList tracks={tracks} />
                : <img width="300px" src={imageUrl}/>
            }
        </div>
    );
};

TrackList.propTypes = {
    tracks: PropTypes.array.isRequired,
};

export default PlaylistCover;
