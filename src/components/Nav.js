import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "@reach/router";

const Nav = ({ currentUserId }) => {
    return (
        <nav>
            <Link to="/feed">Feed  | </Link>
            <Link to="/new-post">Post a Playlist  | </Link>
            <Link to={`/${currentUserId}`}>Profile  | </Link>
            <Link to="/explore">Explore </Link>
        </nav>
    )
};

Nav.propTypes = {
    currentUserId: PropTypes.string.isRequired,
};

export default Nav;
