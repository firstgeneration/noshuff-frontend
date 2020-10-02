import React, { useState } from 'react';
import TrackList from 'Components/TrackList';
import PropTypes from 'prop-types';

const PostEditForm = ({playlist, tracks, goPrevStep}) => {
    const [showTracks, setShowTracks] = useState(false);

    const get_best_image_url = (imageUrls) => {
        const image = imageUrls.find(img => img.width == '300');
        return image ? image.url : imageUrls[0].url
    }

    const toggleTrackList = () => setShowTracks(!showTracks);

    return (
        <div>
            <h2>Post Edit form is here</h2>
            <div onClick={toggleTrackList}>
                {showTracks
                    ? <TrackList tracks={tracks} />
                    : <img width="300px" src={get_best_image_url(playlist.coverImageUrls)}/>
                }
            </div>
            <ul>
                <li>Name: {playlist.name}</li>
                <li>Description: {playlist.description || "*Add a description in spotify*"}</li>
                <li>TrackCount: {playlist.trackCount}</li>
            </ul>

            <button onClick={() => goPrevStep()}>Cancel</button>
        </div>
    );
};

PostEditForm.propTypes = {
    playlist: PropTypes.object.isRequired,
    tracks: PropTypes.array.isRequired,
    goPrevStep: PropTypes.func.isRequired,
}

export default PostEditForm;
