import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TrackList from 'Components/TrackList';
import { Form, Mentions, Button, Typography } from 'antd';

const PostEditForm = ({ goPrevStep, playlist, tracks, caption, setCaption, onSubmit }) => {
    const [form] = Form.useForm();
    const [showTracks, setShowTracks] = useState(false);

    const get_best_image_url = (imageUrls) => {
        const image = imageUrls.find(img => img.width == '300');
        return image ? image.url : imageUrls[0].url
    }
    const toggleTrackList = () => setShowTracks(!showTracks);

    return (
        <Form form={form} name="control-hooks" onFinish={onSubmit}>
            <Typography.Title level={2}>Post Edit form is here</Typography.Title>
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
            <Form.Item name="caption">
                <Mentions
                    placeholder="Write a caption..."
                    value={caption}
                    onChange={(val)=> setCaption(val)}
                />
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Save
            </Button>
            <Button htmlType="button" onClick={() => goPrevStep()}>
                Cancel
            </Button>
        </Form>
    );
};

PostEditForm.propTypes = {
    playlist: PropTypes.object.isRequired,
    tracks: PropTypes.array.isRequired,
    goPrevStep: PropTypes.func.isRequired,
}

export default PostEditForm;
