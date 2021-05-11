
import React from 'react';
import './Carousel.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';


class Carousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "id-cs-" + Math.floor((Math.random() * 1000000000)),
        }
    }
    componentDidMount() {
        let enter = false;
        $("#" + this.state.id).on("mouseenter", function () {
            if (!enter) {
                enter = true
                $(this).carousel(0)
                    .carousel('cycle');
            }
        }).on("mouseleave", function () {
            enter = false;
            $(this).carousel(0)
                .carousel('pause')
                .carousel('pause')
                


        });

    }


    render() {
        return (
            <div id={this.state.id} className="carousel slide" data-interval="350" data-pause={this.props.pause ? this.props.pause : "true"}>
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
                                            placeholderSrc="/img/loading.svg"
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