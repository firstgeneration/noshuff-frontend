
 const schema = {
    posts: {
        type: 'posts',
        fields: {
            spotify_playlist_id: 'string',
            caption: 'string'
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
};

export default schema;
