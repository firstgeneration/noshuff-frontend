import React, { useState } from 'react';
import TrackList from 'Components/TrackList';

const PostEditForm = (props) => {
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
                    ? <TrackList tracks={props.tracks} />
                    : <img width="300px" src={get_best_image_url(props.playlist.coverImageUrls)}/>
                }
            </div>
            <ul>
                <li>Name: {props.playlist.name}</li>
                <li>Description: {props.playlist.description || "*Add a description in spotify*"}</li>
                <li>TrackCount: {props.playlist.trackCount}</li>
            </ul>

            <button onClick={() => props.goPrevStep()}>Cancel</button>
        </div>
    );
};

export default PostEditForm;
