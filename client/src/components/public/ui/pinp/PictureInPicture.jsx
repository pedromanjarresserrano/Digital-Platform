import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';

const propTypes = {
    player: PropTypes.object,
    className: PropTypes.string
};

export default class PictureInPicture extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        const { video } = this.props;
        try {
            if (video !== document.pictureInPictureElement) {
                await video.requestPictureInPicture();
            } else {
                await document.exitPictureInPicture();
            }
        } catch (error) {
            console.log(`> Argh! ${error}`);
        }
    }

    render() {
        const { player, className } = this.props;

        return (
            <a
                ref={c => {
                    this.button = c;
                }}
                className={classNames(className, {
                    'video-react-control': true,
                    'video-react-button': true
                })}
                href={'#'}
                style={{
                    backgroundImage:
                        'url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cGF0aCBkPSJNMzggMTRIMjJ2MTJoMTZWMTR6bTQtOEg2Yy0yLjIxIDAtNCAxLjc5LTQgNHYyOGMwIDIuMjEgMS43OSAzLjk2IDQgMy45NmgzNmMyLjIxIDAgNC0xLjc2IDQtMy45NlYxMGMwLTIuMjEtMS43OS00LTQtNHptMCAzMi4wM0g2VjkuOTdoMzZ2MjguMDZ6Ii8+PC9zdmc+)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}
                tabIndex="0"
                onClick={this.handleClick}
            />
        );
    }
}

PictureInPicture.propTypes = propTypes;