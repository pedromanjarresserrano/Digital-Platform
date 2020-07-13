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

  getPreview() {
    if (this.props.item.portada && this.props.item.portada.length > 0) {
      return <>
        <img
          className="img-fluid"
          effect="blur"
          src={this.props.item.portada} />
        <p className="text-white time-stamp margin-0 padding-0 padding-right-1" >{this.getTime(this.props.item.duration)}</p>
      </>

    } else {
      return <div className="slider-carousel">
        <div className="figure">
          {
            this.props.item.files.map(file => {
              return (
                <span key={Math.random()} className="img-span">
                  <LazyLoadImage
                    effect="blur"
                    alt={file}
                    visibleByDefault={file.includes("-1.png")}
                    src={file} />
                </span>);
            }, this)
          }
        </div>
        <span className="text-white time-stamp" >{this.getTime(this.props.item.duration)}</span>

        <span className="text-white quality-stamp" >{this.props.item.quality}p</span>
      </div>
    }
  }

  render() {
    return (
      <div className="w-100 w-m-20 card-m" key={this.props.item._id} >
        <div className=" border rounded bg-dark border-dark w-100 m-2 " >
          <Link to={"/catalog/movie/" + this.props.item._id} className="w-100">
            <div title={this.props.item.name} className="p-1" onClick={() => this.props.vermasonclick(this.props.item)}>
              {
                this.getPreview()
              }

              <p className="text-white text-center text-truncate" ><small>{this.props.item.visualname ? this.props.item.visualname : this.props.item.name} </small></p>
            </div>
          </Link>
        </div>

      </div>

    );
  }


}
export default Movie;