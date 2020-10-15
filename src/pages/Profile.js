import React from 'react';
import { Link } from '@reach/router'
import PostShow from 'Components/PostShow'
import { useQuery } from 'jsonapi-react'

const Profile = (props) => {
    const userId = props.location.pathname.replaceAll('/', '');
    const { data, meta, error, isLoading, isFetching } = useQuery([['users', userId], {include: ['posts']}]);

    return (
        <div>
            <h1>Here is the user profile</h1>
            {isLoading 
                ? <div>...loading</div>
                : data.posts.map((post, idx) => <PostShow key={idx} post={post} userId={userId}/>)
            }
        </div>
    );
};

export default Profile;
