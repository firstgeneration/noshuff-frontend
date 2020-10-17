import React, { useState, useContext } from 'react';
import { CurrentUserContext } from "Contexts/CurrentUserContext";
import { Button } from 'antd';

const FollowButton = ({ isFollowing, userId }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const [isUserFollowing, setIsUserFollowing] = useState(isFollowing);

    const toggleFollow = () => {
        const url = `http://localhost:5000/api/v1/users/${currentUser}/relationships/follows`;
        const options = {
            method: isUserFollowing ? 'DELETE' : 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'Authorization': `Bearer ${localStorage.getItem('noshuffToken')}`
            },
            body: JSON.stringify({
                "data": [
                    {
                        type: 'users',
                        id: userId
                    }
                ]
            })
        };
        fetch(url, options)
        .then(res => res.json())
        .then(
            (result) => {
                setIsUserFollowing(!isUserFollowing)
            },
            (error) => {
                console.log('help', error);
            }
        )
    };

    return (
        <Button htmlType="button" onClick={toggleFollow}>
            {isUserFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    )
};

export default FollowButton;
