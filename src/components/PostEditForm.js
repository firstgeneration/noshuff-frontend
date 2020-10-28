import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlaylistCover from 'Components/PlaylistCover';
import { Form, Mentions, Button, Typography } from 'antd';
import { getBestImageUrl } from 'Utils/spotifyUtils';

const { Option } = Mentions;

const PostEditForm = ({ goPrevStep, playlist, tracks, onSubmit }) => {
    const [form] = Form.useForm();
    const [results, setResults] = useState([]);

    const onSearch = (text, prefix) => {
        if (prefix == '@') {
            const url = `http://localhost:5000/api/v1/users`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'Authorization': `Bearer ${localStorage.getItem('noshuffToken')}`
                },
            };
            fetch(url, options)
            .then(res => res.json())
            .then(
                (result) => {
                    const userList = result.data.map((user) => {
                        return `${user.attributes.display_name.replace(/ /g, '')}(${user.id})`
                    });
                    setResults(userList);
                },
                (error) => {
                    console.log('help', error);
                }
            )
        } else if (prefix == '#') {
            const url = `http://localhost:5000/api/v1/hashtags`;
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/vnd.api+json',
                    'Accept': 'application/vnd.api+json',
                    'Authorization': `Bearer ${localStorage.getItem('noshuffToken')}`
                },
            };
            fetch(url, options)
            .then(res => res.json())
            .then(
                (result) => {
                    const hashtagList = result.data.map((hashtag) => {
                        return hashtag.attributes.tag;
                    });
                    setResults(hashtagList);
                },
                (error) => {
                    console.log('help', error);
                }
            )
        }
    };

    const onSelect = (option) => {
        setResults([]);
    };

    return (
        <Form form={form} onFinish={onSubmit}>
            <Typography.Title level={2}>Add details</Typography.Title>
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
                    autoFocus={true}
                    placeholder="Write a caption..."
                    prefix={['@', '#']}
                    onSearch={onSearch}
                    onSelect={onSelect}
                >
                    {results.map((value, idx) => <Option value={value} key={idx}>{value}</Option>)}
                </Mentions>
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
