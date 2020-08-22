
import React from 'react';
import './Slider.css';
import Movie from '../../movie/Movie';
import { Slide } from 'react-slideshow-image';

class Slider extends React.Component {

    constructor(props) {
        super(props)
        let list = []
        let aux = []
        let couter = 1;
        for (let i = 0; i < this.props.items.length; i++) {
            if (couter == 4 || i == (this.props.items.length - 1)) {
                list.push(aux);
                aux.push(this.props.items[i]);

                aux = [];
                couter = 1;


            } else {

                aux.push(this.props.items[i]);
                couter++;
            }

        }

        this.state = {
            id: "id-ss-lg-" + Math.floor((Math.random() * 1000000)),
            items: list
        }
    }

    render() {

        return (
            <Slide autoplay={false} >
                {
                    this.state.items.map((movie) => {
                        return (
                            <div key={Math.random()} className="each-slide px-4" key={Math.random()}>
                                <span key={Math.random()} className="container-slider">
                                    {
                                        movie.map((e, i) => {
                                            return (

                                                <div key={Math.random()} className="w-100 w-m-20 d-flex justify-content-center flex-row">
                                                    <Movie item={e} index={i} />
                                                </div>
                                            )
                                        }, this)

                                    }
                                </span>
                            </div>)
                    }, this)
                }

            </Slide>

        );
    }


}


export default Slider;