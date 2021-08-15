import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import "./PanoramicButtom.css"
const propTypes = {
    player: PropTypes.object,
    className: PropTypes.string
};

export default class PanoramicButtom extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    async handleClick() {
        this.props.onClick();
    }

    render() {
        const { player, className } = this.props;

        return (
            <div className='video-react-control video-react-button video-react-icon' onClick={this.handleClick}>
                <button
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
                            'url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzFwdCIgaGVpZ2h0PSIxNHB0IiB2aWV3Qm94PSIwIDAgMzEgMTQiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMTAwJSwxMDAlLDEwMCUpO2ZpbGwtb3BhY2l0eToxOyIgZD0iTSAzMC4xNzE4NzUgMC4zNzEwOTQgTCAyOS4zNDM3NSAwLjYxNzE4OCBDIDI5LjI5Mjk2OSAwLjYzMjgxMiAyNC4yODEyNSAyLjA4OTg0NCAxNS40NzI2NTYgMi4wODk4NDQgQyA2LjY2MDE1NiAyLjA4OTg0NCAxLjcwNzAzMSAwLjYzMjgxMiAxLjY2MDE1NiAwLjYxNzE4OCBMIDAuODI4MTI1IDAuMzcxMDk0IEwgMC44MjgxMjUgMTMuNTkzNzUgTCAxLjYzMjgxMiAxMy4zODY3MTkgQyAxLjY5MTQwNiAxMy4zNzEwOTQgNy40ODQzNzUgMTEuOTEwMTU2IDE1LjQ3MjY1NiAxMS45MTAxNTYgQyAyMy40NDUzMTIgMTEuOTEwMTU2IDI5LjMwODU5NCAxMy4zNzEwOTQgMjkuMzY3MTg4IDEzLjM4NjcxOSBMIDMwLjE3MTg3NSAxMy41ODk4NDQgWiBNIDI4Ljg3NSAxMS45MTAxNTYgQyAyNy44MTI1IDExLjY3OTY4OCAyNS43NTc4MTIgMTEuMjg1MTU2IDIzIDEwLjk4NDM3NSBMIDIyLjAzOTA2MiA5LjQyMTg3NSBMIDIyLjk3NjU2MiA5LjQyMTg3NSBMIDIxLjEwMTU2MiA2LjExNzE4OCBMIDE5LjIyMjY1NiA5LjQyMTg3NSBMIDIwLjA4NTkzOCA5LjQyMTg3NSBMIDE5LjMwODU5NCAxMC42ODM1OTQgQyAxOC43ODkwNjIgMTAuNjU2MjUgMTguMjU3ODEyIDEwLjYzMjgxMiAxNy43MTA5MzggMTAuNjEzMjgxIEwgMTYuNjM2NzE5IDguODcxMDk0IEwgMTcuODY3MTg4IDguODcxMDk0IEwgMTUuNDA2MjUgNC41MzUxNTYgTCAxMi45NDUzMTIgOC44NzEwOTQgTCAxNC4wNzgxMjUgOC44NzEwOTQgTCAxMi45OTYwOTQgMTAuNjIxMDk0IEMgMTIuNDc2NTYyIDEwLjY0MDYyNSAxMS45NjQ4NDQgMTAuNjY0MDYyIDExLjQ3MjY1NiAxMC42OTE0MDYgTCAxMC42ODc1IDkuNDIxODc1IEwgMTEuNjI1IDkuNDIxODc1IEwgOS43NSA2LjExNzE4OCBMIDcuODc1IDkuNDIxODc1IEwgOC43MzgyODEgOS40MjE4NzUgTCA3Ljc1NzgxMiAxMS4wMDc4MTIgQyA1LjEyMTA5NCAxMS4zMDQ2ODggMy4xNTYyNSAxMS42ODM1OTQgMi4xMjUgMTEuOTA2MjUgTCAyLjEyNSAyLjExMzI4MSBDIDMuODk4NDM4IDIuNTM1MTU2IDguNDUzMTI1IDMuNDIxODc1IDE1LjQ2ODc1IDMuNDIxODc1IEMgMjIuNSAzLjQyMTg3NSAyNy4wOTM3NSAyLjUzMTI1IDI4Ljg3NSAyLjEwOTM3NSBaIE0gMjguODc1IDExLjkxMDE1NiAiLz4KPHBhdGggc3R5bGU9IiBzdHJva2U6bm9uZTtmaWxsLXJ1bGU6bm9uemVybztmaWxsOnJnYigxMDAlLDEwMCUsMTAwJSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDI2LjQ4MDQ2OSA1LjQ1MzEyNSBDIDI2LjQ4MDQ2OSA2LjE4NzUgMjUuODk4NDM4IDYuNzg1MTU2IDI1LjE4MzU5NCA2Ljc4NTE1NiBDIDI0LjQ2NDg0NCA2Ljc4NTE1NiAyMy44ODY3MTkgNi4xODc1IDIzLjg4NjcxOSA1LjQ1MzEyNSBDIDIzLjg4NjcxOSA0LjcxODc1IDI0LjQ2NDg0NCA0LjEyMTA5NCAyNS4xODM1OTQgNC4xMjEwOTQgQyAyNS44OTg0MzggNC4xMjEwOTQgMjYuNDgwNDY5IDQuNzE4NzUgMjYuNDgwNDY5IDUuNDUzMTI1IFogTSAyNi40ODA0NjkgNS40NTMxMjUgIi8+CjwvZz4KPC9zdmc+Cg==)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center'
                    }}
                    tabIndex="0"
                />
            </div>
        );
    }
}

PanoramicButtom.propTypes = propTypes;