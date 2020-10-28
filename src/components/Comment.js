import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'jsonapi-react'
import CommentThread from 'Components/CommentThread'
import { Link } from "@reach/router";
import TimeAgo from 'react-timeago'

const Comment = ({ comment, postId, currentUser }) => {
    const [showReplyThread, setShowReplyThread] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showNestedThread, setShowNestedThread] = useState(false);
    const [loadChildren, setLoadChildren] = useState(false);
    const { data: commentData } = useQuery(loadChildren && ['comments', comment.id, {include: ['children.author']}]);
    const formatter = (count, interval) => (count + interval[0]);
    const openNestedThread = () => {
        if (!commentData) {
            setLoadChildren(true)
        }
        setShowNestedThread(!showNestedThread)
    };
    const openReplyThread = () => {
        setShowCommentForm(!showCommentForm)
        !showReplyThread && setShowReplyThread(true)
    };
    useEffect(() => {commentData && loadChildren && setLoadChildren(false)});

    return (
        <div>
            <Link style={{color: 'black', fontWeight: 'bold'}} to={`/${comment.author.id}`}>
                <img width='25px' src={comment.author.avatar_url}/>{comment.author.display_name}
            </Link>
            <span> {comment.text}</span>
            <div style={{marginLeft:'25px', color: 'gray'}}>
                <TimeAgo date={comment.updated_at} formatter={formatter} live={false}/>
                <span onClick={()=>openReplyThread(true)}>
                    -- Reply
                </span>
            </div>
            {showReplyThread &&
                <div style={{marginLeft:'40px'}}>
                    <CommentThread
                        comments={[]}
                        postId={postId}
                        currentUser={currentUser}
                        parentId={comment.id}
                        showForm={showCommentForm}
                        onChildAdd={()=>setShowCommentForm(false)}
                        prompt='Add a reply...'
                    />
                </div>
            }
            {comment.children_count > 0 && !showNestedThread && 
                <div style={{marginLeft:'40px'}} onClick={openNestedThread}>
                    ― {comment.children_count} more 
                    {comment.children_count == 1 ? ' reply' : ' replies'}
                </div>
            }
            {showNestedThread && commentData &&
                <div style={{marginLeft:'40px'}}>
                    <CommentThread
                        comments={commentData.children}
                        postId={postId}
                        currentUser={currentUser}
                        parentId={comment.id}
                        showForm={false}
                    />
                </div>
            }
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    currentUser: PropTypes.object.isRequired,
};

export default Comment;
