import React from 'react';

class HomeAdmin extends React.Component {


    componentWillMount() {
        var user = localStorage.getItem("userInfo");
        if (!user) {
            this.props.history.push('./login');

        }
    }

    render() {
        return (
            <div>

            </div>
        );
    }
}

export default HomeAdmin;
