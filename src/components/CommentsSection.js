import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CommentThread from 'Components/CommentThread'
import { CurrentUserContext } from "Contexts/CurrentUserContext";

const CommentsSection = ({ comments, postId }) => {
    const { currentUser } = useContext(CurrentUserContext);
    const topLevelComments = comments.filter((comment) => {
        return !comment.parent_id
    });

    return (
        <div>
            <CommentThread
                comments={topLevelComments}
                postId={postId}
                currentUser={currentUser}
            />
        </div>
    );
};

CommentsSection.propTypes = {
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
};

export default CommentsSection;
