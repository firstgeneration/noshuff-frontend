import React, { useContext } from 'react';
import PostShow from 'Components/PostShow'
import { useQuery } from 'jsonapi-react'
import { CurrentUserContext } from "Contexts/CurrentUserContext";
import FollowButton from 'Components/FollowButton';

const Profile = (props) => {
    const { currentUser } = useContext(CurrentUserContext);
    const profileUserId = props.location.pathname.replaceAll('/', '');
    const { data, meta, error, isLoading, isFetching } = useQuery([['users', profileUserId], {include: ['posts']}]);

    let profileUser = {};
    if (!isLoading) {
        console.log('profile data', data);
        profileUser = {id: data.id, display_name: data.display_name};
    }

    console.log('profile data', data);

    return (
        <div>
            <h1>Here is the user profile</h1>
            {isLoading 
                ? <div>...loading</div>
                : <div>
                    {currentUser !== profileUserId &&
                        <FollowButton userId={profileUserId} isFollowing={data.is_following}/>
                    }
                    {data.posts.map((post, idx) => <PostShow key={idx} post={post} user={profileUser}/>)}
                  </div>
            }
        </div>
    );
};

export default Profile;
