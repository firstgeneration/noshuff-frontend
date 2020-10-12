import React from 'react';
import PropTypes from 'prop-types';
import PlaylistCover from 'Components/PlaylistCover';
import { Form, Mentions, Button, Typography } from 'antd';
import { getBestImageUrl } from 'Utils/spotifyUtils';

const PostEditForm = ({ goPrevStep, playlist, tracks, caption, setCaption, onSubmit }) => {
    const [form] = Form.useForm();

    return (
        <Form form={form} name="control-hooks" onFinish={onSubmit}>
            <Typography.Title level={2}>Post Edit form is here</Typography.Title>
            <PlaylistCover
                tracks={tracks}
                imageUrl={getBestImageUrl('medium', playlist.coverImageUrls)}
            />
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
