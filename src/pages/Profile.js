import React, { useContext } from 'react';
import PostShow from 'Components/PostShow'
import { useQuery } from 'jsonapi-react'
import { CurrentUserContext } from "Contexts/CurrentUserContext";
import FollowButton from 'Components/FollowButton';
import { Typography } from 'antd';

const Profile = (props) => {
    const { currentUser } = useContext(CurrentUserContext);
    const profileUserId = props.location.pathname.replaceAll('/', '');
    const { data, meta, error, isLoading, isFetching } = useQuery([['users', profileUserId], {include: ['posts']}]);

    console.log('profile data', data);

    return (
        <div>
            <Typography.Title level={1}>Profile</Typography.Title>
            {isLoading 
                ? <div>...loading</div>
                : <div>
                    {currentUser.id !== profileUserId &&
                        <FollowButton userId={profileUserId} isFollowing={data.is_following}/>
                    }
                    {data.posts.map((post, idx) => <PostShow key={idx} post={post} user={data}/>)}
                  </div>
            }
        </div>
    );
};

export default Profile;
