import React, { useState, useEffect } from 'react';
import PostShow from 'Components/PostShow';
import { useQuery } from 'jsonapi-react';
import { Typography } from 'antd';

const Feed = () => {
    const [loadPosts, setLoadPosts] = useState(true);
    const { data, meta, error, isLoading, isFetching } = useQuery(loadPosts && ['feed', {include: ['user', 'comments.author']}]);
    useEffect(() => {data && loadPosts && setLoadPosts(false)});

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
