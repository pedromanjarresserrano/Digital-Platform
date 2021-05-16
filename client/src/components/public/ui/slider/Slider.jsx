
import React from 'react';
import './Slider.css';
import Movie from '../../movie/Movie';


class Slider extends React.Component {

    constructor(props) {
        super(props)
        let list = []
        let aux = []
        let couter = 1;
        for (let i = 0; i < this.props.items.length; i++) {
            if (couter == 3 || i == (this.props.items.length - 1)) {
                list.push(aux);
                aux.push(this.props.items[i]);

                aux = [];
                couter = 1;


            } else {

                aux.push(this.props.items[i]);
                couter++;
            }

        }

        console.log(list)
        this.state = {
            id: "id-cs-" + Math.floor((Math.random() * 100000)),
            items: list
        }
    }

    componentDidMount() {
        $("#" + this.state.id).carousel({
            interval: false,
            cycle: true,
            pause: false
        }).carousel(0);
    }

    render() {

        return (
            <div key={Math.random()} id={this.state.id} className="carousel slide" data-pause={this.props.pause ? this.props.pause : "hover"} data-ride="carousel" data-interval="false">

                <ol key={Math.random()} className="carousel-indicators">
                    {

                        this.state.items.map((movie, index) => {
                            return (<li key={Math.random()} data-target="#carouselExampleCaptions" data-slide-to={index} className={index == 0 ? "active " : ""}></li>)
                        })
                    }

                </ol>
                <div key={Math.random()} className="carousel-inner">
                    {

                        this.state.items.map((movie, index) => {
                            return (
                                <div key={Math.random()} className={(index == 0 ? "active " : "") + "carousel-item"} key={Math.random()}>
                                    <div key={Math.random()} className="d-flex">
                                        {
                                            movie.map((e, i) => {
                                                return (

                                                    <div key={Math.random()} className="w-100 w-md-20">
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