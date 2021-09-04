import React from 'react';
import './Imageset.css';
import { Link } from 'react-router-dom'


class Imageset extends React.Component {

  componentWillMount() {
  }
  getTime = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return (hours > 0 ? hours + " h " : '') + (minutes > 0 ? minutes + " min " : '') + (seconds > 0 ? seconds + " seg " : "")
  }


  render() {
    return (
      <div className="w-100 w-m-20 card-m-l" key={this.props.item._id} title={this.props.item.name} >
        <div className=" border rounded bg-dark border-dark w-100 mb-2 mt-2" >
          <Link to={"/imagesets/imageset/" + this.props.item._id} className="w-100">
            <div className="p-1 d-flex flex-column justify-content-center" >
              <img
                className="img-fluid"
                effect="blur"
                src={"/api/imageset/page?id=" + this.props.item._id + "&name=" + this.props.item.portada} />
              <p className="text-white margin-0 padding-0 padding-right-1" >{this.getTime(this.props.item.duration)}</p>
            </div>

            <p className="text-white text-center text-truncate" ><small>{this.props.item.visualname ? this.props.item.visualname : this.props.item.name} </small></p>
          </Link>
        </div>

      </div>

    );
  }


}
export default Imageset;