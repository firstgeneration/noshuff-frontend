import React from 'react';
import PostShow from 'Components/PostShow'
import { useQuery } from 'jsonapi-react'

const Profile = (props) => {
    const userId = props.location.pathname.replaceAll('/', '');
    const { data, meta, error, isLoading, isFetching } = useQuery([['users', userId], {include: ['posts']}]);

    let user = {};
    if (!isLoading) {
        user = {id: data.id, display_name: data.display_name};
    }

    return (
        <div>
            <h1>Here is the user profile</h1>
            {isLoading 
                ? <div>...loading</div>
                : data.posts.map((post, idx) => <PostShow key={idx} post={post} user={user}/>)
            }
        </div>
    );
};

export default Profile;
