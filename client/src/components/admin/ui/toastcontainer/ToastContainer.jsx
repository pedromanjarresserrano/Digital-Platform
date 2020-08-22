import React from 'react';
import './ToastContainer.css';


class ToastContainer extends React.Component {

    constructor(props) {
        super(props)
        let states = {}

        switch (this.props.position) {
            case "TOP_LEFT":
                states.id = 'toastsContainerTopLeft';
                states.position = 'toasts-top-left';
                break;

            case "TOP_RIGHT":
                states.id = 'toastsContainerTopRight';
                states.position = 'toasts-top-right';
                break;
            case "BOTTOM_LEFT":
                states.id = 'toastsContainerBottomLeft';
                states.position = 'toasts-bottom-left';
                break;

            case "BOTTOM_RIGHT":
                states.id = 'toastsContainerBottomRight';
                states.position = 'toasts-bottom-right';
                break;

            default:
                states.id = 'toastsContainerBottomRight';
                states.position = 'toasts-bottom-right';
                break;
        }

        this.state = states;
    }


    render() {
        return (
            <div id={this.state.id} className={this.state.position + " fixed"}></div >
        )
    }
}

export default ToastContainer;