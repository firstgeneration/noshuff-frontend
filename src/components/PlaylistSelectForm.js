import React from 'react';

const PlaylistSelectForm = (props) => {
    const selectPlaylist = (id) => {
        props.selectPlaylist(props.playlists.get(id));
        props.goNextStep();
    };

    const get_best_image_url = (imageUrls) => {
        const image = imageUrls.find(img => img.width == '60');
        return image ? image.url : imageUrls[0].url
    }

    return (
        <div>
            <h2>Select your playlist</h2>
            <ul>
                {[...props.playlists.keys()].map((id) =>
                    <li onClick={() => selectPlaylist(id)} key={id}>
                        <span>{props.playlists.get(id).name}</span>
                        <img width="60px" src={get_best_image_url(props.playlists.get(id).coverImageUrls)}/>
                        <span>Trackcount: {props.playlists.get(id).trackCount}</span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default PlaylistSelectForm;
