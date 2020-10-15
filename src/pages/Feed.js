import React from 'react';
import { Link } from '@reach/router'
import PostShow from 'Components/PostShow'
import { useQuery } from 'jsonapi-react'

const Feed = () => {
    const { data, meta, error, isLoading, isFetching } = useQuery(['posts', {include: ['user']}]);

    return (
        <div>
            <h1>Here is the feed</h1>
            <Link to="/new-post">Post a playlist</Link>
            {isLoading 
                ? <div>...loading</div>
                : data.map((post, idx) => <PostShow key={idx} post={post} />)
            }
        </div>
    );
};

export default Feed;
