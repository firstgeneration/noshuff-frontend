
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
};

export default schema;
