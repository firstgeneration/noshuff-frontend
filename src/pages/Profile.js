import React, { useContext } from 'react';
import PostShow from 'Components/PostShow'
import { useQuery } from 'jsonapi-react'
import { CurrentUserContext } from "Contexts/CurrentUserContext";

const Profile = (props) => {
    const { currentUser } = useContext(CurrentUserContext);
    const userId = props.location.pathname.replaceAll('/', '');
    const { data, meta, error, isLoading, isFetching } = useQuery([['users', userId], {include: ['posts']}]);

    let user = {};
    if (!isLoading) {
        user = {id: data.id, display_name: data.display_name};
    }

    return (
        <div>
            <h1>Here is the user profile</h1>
            {currentUser !== userId &&
                <div>Put a follow button here</div>
            }
            {isLoading 
                ? <div>...loading</div>
                : data.posts.map((post, idx) => <PostShow key={idx} post={post} user={user}/>)
            }
        </div>
    );
};

export default Profile;
