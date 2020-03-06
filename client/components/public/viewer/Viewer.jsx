import React from 'react';
import { Player } from 'video-react';

class Viewer extends React.Component {

    componentWillMount() {
        console.log(this)
    }
    componentDidUpdate() { debugger }

    render() {
        return (
            <div className="flex-video-example">
                <Player>
                    <source src={"/api/movie/" + this.props.item._id} />
                </Player>
            </div>
        );
    }


}
export default Viewer;