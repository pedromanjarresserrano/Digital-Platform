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
      var id = "id-ss-" + Math.floor((Math.random() * 10));
      let tr;
      let hoverAction = () => {
        debugger
        if (tr)
          clearInterval(tr)
        let sl = document.getElementById(id);
        let couter = 0;
        tr = setInterval(() => {
          switch (couter) {
            case 1:
              sl.style.left = 0;
              break;

            case 2:
              sl.style.left = "-100%";
              break;
            case 3:
              sl.style.left = "-100%";
              break;
            case 4:
              sl.style.left = "-200%";
              break;
            case 5:
              sl.style.left = "-200%";
              break;
            case 6:
              sl.style.left = "-300%";
              break;
            case 7:
              sl.style.left = "-300%";
              break;
            case 8:
              sl.style.left = "-300%";
              break;
            case 9:
              sl.style.left = "-400%";
              break;
            case 10:
              sl.style.left = "-400%";
              break;
            case 11:
              sl.style.left = "-500%";
              break;
            case 12:
              sl.style.left = "-500%";
              break;
            case 13:
              sl.style.left = "-600%";
              break;
            case 14:
              sl.style.left = "-600%";
              break;
            case 15:
              sl.style.left = "-700%";
              break;
            case 16:
              sl.style.left = "-700%";
              break;
            case 17:
              sl.style.left = "-800%";
              break;
            case 18:
              sl.style.left = "-800%";
              break;
            case 19:
              sl.style.left = "-900%";
              break;
            case 20:
              sl.style.left = "-900%";
              break;

          }
          couter++;
        }, 350);

      }
      let hoverActionLeave = () => {
        if (tr)
          clearInterval(tr)
        let sl = document.getElementById(id);
        sl.style.left = "0"
      }
      return <div className="slider-carousel"/* onMouseEnter={hoverAction} onMouseLeave={hoverActionLeave}*/>
        <div id={id} className="figure">
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
        <span className="row-stamp" >
          <span className="text-white time-stamp" >{this.getTime(this.props.item.duration)}</span>

          <span className="text-white quality-stamp" >{this.props.item.quality}p</span>
        </span>
      </div>
    }
  }

  render() {
    return (
      <div className="w-100 w-m-20 card-m" key={this.props.item._id} >
        <div className=" border rounded bg-dark border-dark w-100 mb-2 mt-2" >
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