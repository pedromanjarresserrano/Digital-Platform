
import React from 'react';
import './Carousel.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';


class Carousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "id-cs-" + Math.floor((Math.random() * 1000000000))
        }
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
    }

    mouseEnter = () => {
        $("#" + this.state.id).carousel({
            interval: 350,
            cycle: true,
            pause: "false"
        }).carousel(0);
    }


    mouseLeave = () => {
        $("#" + this.state.id).carousel({
            pause: null,
            interval: false
        });
        $("#" + this.state.id).carousel(0)
        $("#" + this.state.id).carousel('pause')


    }


    render() {
        return (
            <div id={this.state.id} className="carousel slide" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}  data-pause={this.props.pause ? this.props.pause : "true"}>
                <div className="carousel-inner" >
                    {
                        this.props.items.map(file => {
                            let first = file.includes("-1.png");
                            return (
                                <div className={(first ? "active " : "") + "carousel-item"} key={Math.random()}>
                                    <div>
                                        <LazyLoadImage
                                            effect="blur"
                                            alt={file}
                                            placeholderSrc	="/img/loading.svg"
                                            visibleByDefault={first}
                                            src={file} />
                                    </div>
                                </div>);
                        }, this)
                    }
                </div>
            </div>
        );
    }


}


export default Carousel;