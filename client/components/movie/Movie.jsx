import React from 'react';
import './Movie.css';
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';


class Movie extends React.Component {

  componentWillMount() {
  }
  getTime = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return (hours > 0 ? hours + " h " : '') + (minutes > 0 ? minutes + " min " : '') + seconds + " seg "
  }

  render() {
    return (
      <Link to={"/catalog/movie/" + this.props.item._id} className="w-100">
        <div title={this.props.item.name} className="p-1" onClick={() => this.props.vermasonclick(this.props.item)}>

          <LazyLoadImage
            wrapperClassName="img-fluid"
            effect="blur"
            src={this.props.item.portada} />
        </div>
        <p className="text-white time-stamp margin-0 padding-0 padding-right-1" >{this.getTime(this.props.item.duration)}</p>
        <p className="text-white text-truncate" >{this.props.item.name}</p>
      </Link>
    );
  }


}
export default Movie;