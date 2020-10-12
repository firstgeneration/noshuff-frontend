import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { getBestImageUrl } from 'Utils/spotifyUtils';

const PlaylistSelectForm = ({ playlists, onSelectPlaylist, goNextStep }) => {
    const handleSelectPlaylist = (id) => {
        onSelectPlaylist(id);
        goNextStep();
    };

    return (
        <div>
            <Typography.Title level={2}>Select playlist</Typography.Title>
            <ul>
                {[...playlists.keys()].map((id) =>
                    <li onClick={() => handleSelectPlaylist(id)} key={id}>
                        <img width="60px" src={getBestImageUrl('small', playlists.get(id).coverImageUrls)}/>
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
