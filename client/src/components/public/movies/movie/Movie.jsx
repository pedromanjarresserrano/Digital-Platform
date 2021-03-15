import React from 'react';
import './Movie.css';
import { Link } from 'react-router-dom'
import Carousel from '../../ui/carousel/Carousel';


class Movie extends React.Component {

  componentWillMount() {
  }
  getTime = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return (hours > 0 ? hours + " h " : '') + (minutes > 0 ? minutes + " min " : '') + (seconds > 0 ? seconds + " seg " : "")
  }

  getPreview() {
    if (this.props.item.portada && this.props.item.portada.length > 0) {
      return <>
        <div className="p-1 d-flex flex-column justify-content-center" >
          <img
            className="img-fluid"
            effect="blur"
            src={this.props.item.portada} />
          <p className="text-white margin-0 padding-0 padding-right-1" >{this.getTime(this.props.item.duration)}</p>
        </div>
      </>

    } else {
      return <div className="w-100 preview" >
        <Carousel items={this.props.item.files} pause={null} />

        <span className="text-white time-stamp" >{this.getTime(this.props.item.duration)}</span>

        <span className="text-white quality-stamp" >{this.props.item.quality}p</span>
      </div >
    }
  }

  render() {
    return (
      <div className="w-100 w-m-20 card-m" key={this.props.item._id} title={this.props.item.name} >
        <div className=" border rounded bg-dark border-dark w-100 mb-2 mt-2" >
          <Link to={"/catalog/movie/" + this.props.item._id} className="w-100">
            {
              this.getPreview()
            }

            <p className="text-white text-center text-truncate" ><small>{this.props.item.visualname ? this.props.item.visualname : this.props.item.name} </small></p>
          </Link>
        </div>

      </div>

    );
  }


}
export default Movie;