import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import "./NextButtom.css"

const propTypes = {
    player: PropTypes.object,
    className: PropTypes.string
};

export default class NextButtom extends Component {

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
            <div className={classNames(className, "nextbar ",
                "video-react-control-bar-auto-hide")}> <a
                    ref={c => {
                        this.button = c;
                    }}
                    className={classNames(className, {
                        'video-react-control': true,
                        'video-react-button': true,
                    })}
                    href={'#'}
                    style={{
                        backgroundImage:
                            'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDkwLjg4IDQ5MC44OCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDkwLjg4IDQ5MC44ODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGc+DQoJPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBkPSJNMjQ1LjQ0LDBDMTEwLjEwMSwwLDAsMTEwLjEwMSwwLDI0NS40NHMxMTAuMTAxLDI0NS40NCwyNDUuNDQsMjQ1LjQ0czI0NS40NC0xMTAuMTAxLDI0NS40NC0yNDUuNDRTMzgwLjc3OSwwLDI0NS40NCwweiAgICAgTTI0NS40NCw0NjkuNTQ3Yy0xMjMuNTYzLDAtMjI0LjEwNy0xMDAuNTQ0LTIyNC4xMDctMjI0LjEwN1MxMjEuODc3LDIxLjMzMywyNDUuNDQsMjEuMzMzUzQ2OS41NDcsMTIxLjg3Nyw0NjkuNTQ3LDI0NS40NCAgICBTMzY5LjAwMyw0NjkuNTQ3LDI0NS40NCw0NjkuNTQ3eiIgZmlsbD0id2hpdGUiLz4NCgk8L2c+DQo8L2c+DQo8Zz4NCgk8Zz4NCgk8cGF0aCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGQ9Ik0zMzguNDMyLDIzOC4wMTZsLTEyOC0xMjhjLTQuMTYtNC4xNi0xMC45MjMtNC4xNi0xNS4wODMsMGMtNC4xNiw0LjE2LTQuMTYsMTAuOTIzLDAsMTUuMDgzbDEyMC40MjcsMTIwLjQ2OSAgICBMMTk1LjMyOCwzNjYuMDE2Yy00LjE2LDQuMTYtNC4xNiwxMC45MjMsMCwxNS4wODNjMi4wOTEsMi4wNjksNC44MjEsMy4xMTUsNy41NTIsMy4xMTVzNS40NjEtMS4wMjQsNy41NTItMy4xMTVsMTI4LTEyOCAgICBDMzQyLjU5MiwyNDguOTM5LDM0Mi41OTIsMjQyLjE3NiwzMzguNDMyLDIzOC4wMTZ6IiBmaWxsPSJ3aGl0ZSIvPg0KCTwvZz4NCjwvZz4NCg0KPC9zdmc+DQo=)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                    tabIndex="0"
                    onClick={this.handleClick}
                />
            </div>
        );
    }
}

NextButtom.propTypes = propTypes;