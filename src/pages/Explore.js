import React, { useContext } from 'react';
import PostShow from 'Components/PostShow'
import { useQuery } from 'jsonapi-react'
import { CurrentUserContext } from "Contexts/CurrentUserContext";

const Explore = () => {
    const { currentUser } = useContext(CurrentUserContext);
    const { data, meta, error, isLoading, isFetching } = useQuery(['explore', {include: ['user']}]);

    console.log('explore_data', data);

    return (
        <div>
            <h1>Here is the Explore page</h1>
            {isLoading 
                ? <div>...loading</div>
                : data.map((post, idx) => <PostShow key={idx} post={post} user={post.user}/>)
            }
        </div>
    );
};

export default Explore;
