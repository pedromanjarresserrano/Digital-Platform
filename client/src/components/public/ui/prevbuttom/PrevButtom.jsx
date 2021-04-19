import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import "./PrevButtom.css"
const propTypes = {
    player: PropTypes.object,
    className: PropTypes.string
};

export default class PrevButtom extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        this.props.onClick();
    }

    render() {
        const { player, className } = this.props;
        const { currentSrc } = player;

        return (
            <div className={classNames(className, "backbar ",
                "video-react-control-bar-auto-hide")} onClick={this.handleClick}
            >  <a
                    ref={c => {
                        this.button = c;
                    }}
                    className={classNames(className,
                        "video-react-control-bar-auto-hide",
                        'video-react-big-play-button-left', {
                        'video-react-control': true,
                        'video-react-button': true
                    })}
                    href={'#'}
                    style={{
                        backgroundImage:
                            'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDkwLjg4IDQ5MC44OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkwLjg4IDQ5MC44ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0yNDUuNDQsMEMxMTAuMTAxLDAsMCwxMTAuMTAxLDAsMjQ1LjQ0czExMC4xMDEsMjQ1LjQ0LDI0NS40NCwyNDUuNDRzMjQ1LjQ0LTExMC4xMDEsMjQ1LjQ0LTI0NS40NFMzODAuNzc5LDAsMjQ1LjQ0LDB6DQoJCQkgTTI0NS40NCw0NjkuNTQ3Yy0xMjMuNTYzLDAtMjI0LjEwNy0xMDAuNTQ0LTIyNC4xMDctMjI0LjEwN1MxMjEuODc3LDIxLjMzMywyNDUuNDQsMjEuMzMzUzQ2OS41NDcsMTIxLjg3Nyw0NjkuNTQ3LDI0NS40NA0KCQkJUzM2OS4wMDMsNDY5LjU0NywyNDUuNDQsNDY5LjU0N3oiIGZpbGw9IndoaXRlIi8+DQoJPC9nPg0KPC9nPg0KPGc+DQoJPGc+DQoJCTxwYXRoIGQ9Ik0xNzUuMDgzLDI0NS4zMzNsMTIwLjQ0OC0xMjAuNDQ4YzQuMTYtNC4xNiw0LjE2LTEwLjkyMywwLTE1LjA4M2MtNC4xNi00LjE2LTEwLjkyMy00LjE2LTE1LjA4MywwbC0xMjgsMTI4DQoJCQljLTQuMTYsNC4xNi00LjE2LDEwLjkyMywwLDE1LjA4M2wxMjgsMTI4YzIuMDkxLDIuMDY5LDQuODIxLDMuMTE1LDcuNTUyLDMuMTE1czUuNDQtMS4wNDUsNy41MzEtMy4xMzYNCgkJCWM0LjE2LTQuMTYsNC4xNi0xMC45MjMsMC0xNS4wODNMMTc1LjA4MywyNDUuMzMzeiIgZmlsbD0id2hpdGUiLz4NCgk8L2c+DQo8L2c+DQoNCjwvc3ZnPg0K)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                    tabIndex="0"
                />
            </div>
        );
    }
}

PrevButtom.propTypes = propTypes;