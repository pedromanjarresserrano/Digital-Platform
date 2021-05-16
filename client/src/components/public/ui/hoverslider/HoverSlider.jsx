
import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './HoverSlider.css';

class HoverSlider extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            id: "id-cs-" + Math.floor((Math.random() * 1000000000)),
        }
    }


    componentDidMount() {
        let div = document.getElementById(this.state.id);
        let list = document.querySelectorAll("#" + this.state.id + " img");
        let fun = function (event) {
            event.preventDefault();
            let slider = this.getBoundingClientRect();
            let width = slider.width;
            let aux = width / 10;
            let aux0 = event.clientX - slider.left;
            let lvl = Math.ceil(aux0 / aux);
            show(lvl);


        }
        div.addEventListener("mousemove", fun);
        div.addEventListener("touchemove", fun);
        
        function show(img) {
            list.forEach(e => e.style.display = "none");
            list[img > 0 ? img - 1 : 0].style.display = "block"
        }

        div.addEventListener("mouseleave", function () {
            list.forEach(e => e.style.display = "none");
            list[0].style.display = "block"
        });

    }


    render() {

        return (
            <div id={this.state.id} className="slider-dp">
                {
                    this.props.images.map((movie) => {
                        let first = movie.includes("-1.png");
                        return (
                            <img
                                effect="blur"
                                alt={movie}
                                placeholderSrc="/img/loading.svg"
                                visibleByDefault={first}
                                src={movie} />);
                    }, this)
                }

            </div>

        );
    }


}


export default HoverSlider;