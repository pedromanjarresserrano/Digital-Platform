


import React from 'react';
import './TopMenu.css';
import ProfileButton from '../profilebutton/ProfileButton';

class TopMenu extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <ul className="navbar-nav ml-auto">
                <ProfileButton />
            </ul>
        );
    }
}

export default TopMenu;