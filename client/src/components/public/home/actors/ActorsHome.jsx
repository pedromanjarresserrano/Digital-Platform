import React from 'react';
import Actor from '../../actors/actor/Actor';

class ActorsHome extends React.Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.props.items.map((item) =>
                            <div className="col-4 col-md-2 ">
                                <Actor key={Math.random()} item={item} />
                            </div>
                        )
                    }
                </div>
            </div>)
    }
}

export default ActorsHome;