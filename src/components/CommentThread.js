import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Comment from 'Components/Comment'
import CommentForm from 'Components/CommentForm'
import { useMutation } from 'jsonapi-react';

const CommentThread = ({ parentId=null, comments, postId, currentUser, onChildAdd=null, showForm=true, prompt=null }) => {
    const [threadComments, setThreadComments] = useState(comments);
    const [addComment, { isLoading, data, error, errors }] = useMutation(['comments', {include: ['author']}]);

    const onAddComment = async (text) => {
        let commentData = {
            post: {id: postId},
            text: text,
        };
        if (parentId) {
            commentData.parent = {id: parentId};
        }
        const result = await addComment(commentData);
        setThreadComments([result.data, ...threadComments]);
        if (onChildAdd) {
            onChildAdd();
        }
    };

    return(
        <div>
            {showForm &&
                <CommentForm
                    prompt={prompt || 'Add a comment...'}
                    currentUser={currentUser}
                    onSubmit={onAddComment}
                />
            }
            {threadComments.map((comment, idx) =>
                <Comment
                    comment={comment}
                    author={comment.author}
                    postId={postId}
                    currentUser={currentUser}
                    key={comment.id + idx}
                />
            )}
        </div>
    );
};

CommentThread.propTypes = {

    parentId: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(null)
    ]),
    onChildAdd: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.instanceOf(null)
    ]),
    comments: PropTypes.array.isRequired,
    postId: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
    showForm: PropTypes.bool,
    prompt: PropTypes.string,
};

export default CommentThread;
