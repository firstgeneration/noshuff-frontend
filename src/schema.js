
 const schema = {
    posts: {
        type: 'posts',
        fields: {
            spotify_playlist_id: 'string',
            caption: 'string',
            created_at: {
                type: 'date',
                readOnly: true,
                resolve: created_at => {
                    return created_at + 'z';
                }
            },
            updated_at: {
                type: 'date',
                readOnly: true,
                resolve: updated_at => {
                    return updated_at + 'z';
                }
            },
        },
        relationships: {
            user: {
                type: 'users',
            }
        }
    },
    users: {
        type: 'users',
        fields: {
            id: 'string',
            avatar_url: 'string',
            display_name: 'string',
            is_following: 'boolean'
        },
        relationships: {
            user: {
                type: 'users',
            }
        }
    },
    comments: {
        type: 'comments',
        fields: {
            id: 'integer',
            text: 'string',
            created_at: {
                type: 'date',
                readOnly: true,
                resolve: created_at => {
                    return created_at + 'z';
                }
            },
            updated_at: {
                type: 'date',
                readOnly: true,
                resolve: updated_at => {
                    return updated_at + 'z';
                }
            },
        },
        relationships: {
            post: {
                type: 'posts'
            },
            author: {
                type: 'users',
            },
            parent: {
                type: 'comments',
            },
            children: {
                type: 'comments',
            },
        }
    },
};

export default schema;
