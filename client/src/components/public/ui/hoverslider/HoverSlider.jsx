
import React from 'react';
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
        let list = div.childNodes;
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
            img = img > 0 ? img - 1 : 0;
            list.forEach(e => e.style.display = "none");
            list[img].style.display = "block"
            list[img].src = this.props.images[img];
        }
        show = show.bind(this);

        div.addEventListener("mouseleave", function (e) {
            e.preventDefault()
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
                                placeholder="/img/loading.svg"
                                visibleByDefault={first}
                                src={first ? movie : ''} />);
                    }, this)
                }

            </div>

        );
    }


}


export default HoverSlider;