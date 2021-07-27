import React from 'react';
import { segFormat } from '../../../../../utils/Utils';
import './Timeline.css';

class Timeline extends React.Component {


    render() {
        return (
            <div className="content">
                <div className="box mt-1 mb-1">
                    {
                        this.props.list.map((item) =>
                            <div className="bg-info mr-1" style={{
                                width: item.duration / 10 + "px",
                                height: '50px'
                            }}>
                                <img
                                    className="h-100"
                                    effect="blur"
                                    src={item.files[0]} />
                                <button className="btn btn-danger" onClick={() => this.props.delete(this.props.listname, item)}>X</button>
                                <span className="small">{segFormat(item.duration)}</span>
                            </div>
                            , this)
                    }
                </div>
            </div>
        )
    }
}

export default Timeline;