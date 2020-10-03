import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';

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
            <Typography.Title level={2}>Select playlist</Typography.Title>
            <ul>
                {[...playlists.keys()].map((id) =>
                    <li onClick={() => handleSelectPlaylist(id)} key={id}>
                        <img width="60px" src={get_best_image_url(playlists.get(id).coverImageUrls)}/>
                        <span>{playlists.get(id).name} / </span>
                        <span>{playlists.get(id).trackCount} Tracks</span>
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
