
import React from 'react';
import './Slider.css';
import Movie from '../../movie/Movie';


class Slider extends React.Component {

    constructor(props) {
        super(props)
        let list = []
        let aux = []
        for (let i = 0; i < this.props.items.length; i++) {
            if ((i % 3) == 0 && i > 0) {
                list.push(aux);
                aux = [];
            } else {
                aux.push(this.props.items[i]);
            }

        }
        debugger;
        this.state = {
            id: "id-cs-" + Math.floor((Math.random() * 100000)),
            items: list
        }
    }


    render() {

        return (
            <div id={this.state.id} className="carousel slide" data-pause={this.props.pause ? this.props.pause : "false"}>

                <ol className="carousel-indicators">
                    {

                        this.state.items.map((movie, index) => {
                            <li data-target="#carouselExampleCaptions" data-slide-to={index} className={index == 0 ? "active " : ""}></li>
                        })
                    }

                </ol>
                <div className="carousel-inner">
                    {

                        this.state.items.map((movie, index) => {
                            return (
                                <div className={(index == 0 ? "active " : "") + "carousel-item"} key={Math.random()}>
                                    <div className="d-flex">
                                        {
                                            movie.map((e, i) => {
                                                return (

                                                    <div className="w-100 w-md-20">
                                                        <Movie item={e} index={i} />
                                                    </div>
                                                )
                                            }, this)

                                        }
                                    </div>
                                </div>)
                        }, this)
                    }
                </div>
            </div >
        );
    }


}


export default Slider;