import React from 'react';
import PropTypes from 'prop-types';

const PlaylistSelectForm = ({ playlists, onSelectPlaylist, goNextStep }) => {
    const handleSelectPlaylist = (id) => {
        onSelectPlaylist(id);
        goNextStep();
    };

    const get_best_image_url = (imageUrls) => {
        const image = imageUrls.find(img => img.width == '60');
        return image ? image.url : imageUrls[0].url
    };

    return (
        <div>
            <h2>Select your playlist</h2>
            <ul>
                {[...playlists.keys()].map((id) =>
                    <li onClick={() => handleSelectPlaylist(id)} key={id}>
                        <span>{playlists.get(id).name}</span>
                        <img width="60px" src={get_best_image_url(playlists.get(id).coverImageUrls)}/>
                        <span>Trackcount: {playlists.get(id).trackCount}</span>
                    </li>
                )}
            </ul>
        </div>
    );
};

PlaylistSelectForm.propTypes = {
    playlists: PropTypes.instanceOf(Map).isRequired,
    onSelectPlaylist: PropTypes.func.isRequired,
    goNextStep: PropTypes.func.isRequired,
}

export default PlaylistSelectForm;
