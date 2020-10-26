import React from 'react';
import PostShow from 'Components/PostShow'
import { useQuery } from 'jsonapi-react'
import { Typography } from 'antd';

const Feed = () => {
    const { data, meta, error, isLoading, isFetching } = useQuery(['feed', {include: ['user']}]);

    console.log('feed_data', data);

    return (
        <div>
            <Typography.Title level={1}>Following Feed</Typography.Title>
            {isLoading 
                ? <div>...loading</div>
                : data.map((post, idx) => <PostShow key={idx} post={post} user={post.user}/>)
            }
        </div>
    );
};

export default Feed;
