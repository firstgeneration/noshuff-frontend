import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CurrentUserContext } from "Contexts/CurrentUserContext";
import { Button } from 'antd';

const LikeButton = ({ postId, isLiked, onLike, onUnlike }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const [isUserLiked, setIsUserLiked] = useState(isLiked);

    const toggleLike = () => {
        const url = `http://localhost:5000/api/v1/posts/${postId}/relationships/likes`;
        const options = {
            method: isUserLiked ? 'DELETE' : 'POST',
            headers: {
                'Content-Type': 'application/vnd.api+json',
                'Accept': 'application/vnd.api+json',
                'Authorization': `Bearer ${currentUser.token}`
            },
            body: JSON.stringify({
                "data": [
                    {
                        type: 'users',
                        id: currentUser.id
                    }
                ]
            })
        };
        fetch(url, options)
        .then(res => res.json())
        .then(
            (result) => {
                isUserLiked ? onUnlike() : onLike()
                setIsUserLiked(!isUserLiked)
            },
            (error) => {
                console.log('help', error);
            }
        )
    };

    return (
        <Button htmlType="button" onClick={toggleLike}>
            {isUserLiked ? 'Unlike this' : 'Like this'}
        </Button>
    )
};

LikeButton.propTypes = {
    postId: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired,
    onLike: PropTypes.func.isRequired,
    onUnlike: PropTypes.func.isRequired,
}

export default LikeButton;
