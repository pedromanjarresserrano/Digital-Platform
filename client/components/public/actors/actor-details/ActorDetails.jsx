import React from 'react';
import './ActorDetails.css';
import Axios from 'axios';
import Paginator from '../../../admin/ui/paginator/Paginator';
import Movie from '../../movie/Movie'

class ActorDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      item: {},
      items: [],
      itemCount: 0,
      pageSize: 0
    }
  }
  //--------------------------------------------------------------
  componentDidMount() {
    console.log(this)
    if (this.props.location.state) {
      this.setState({
        item: this.props.location.state.item
      })
      this.loadPage(1);

    } else {
      Axios.post("/api/actores/fo", { name: this.props.match.params.name })
        .then(function (response) {
          this.setState({
            item: response.data
          })
          this.loadPage(1);
        }.bind(this))
        .catch(error => {
          console.log(error);

          //this.setState({ loading: false });
        });;
    }

  }

  loadPage(page) {
    Axios.get("/api/movies/all/" + page + "?reparto=" + (this.props.location.state ? this.props.location.state.item._id : this.state.item._id)).then(function (response) {
      this.setState({
        items: response.data.itemsList,
        paginator: response.data.paginator,
        itemCount: response.data.paginator.itemCount,
        pageSize: response.data.paginator.perPage
      });
    }.bind(this));
  }


  onPageChanged = data => {
    const { currentPage } = data;
    this.loadPage(currentPage);
  }

  vermas = (item) => {
    this.props.history.push({
      pathname: '/actor',
      state: {
        item: item
      }
    })
  }

  render() {
    const { pageSize, itemCount } = this.state;

    return (
      <div className="container-fluid">
        <div className="d-block  px-5">
          <div className="card flex-md-row mb-4 shadow-sm h-md-250 bg-dark" >
            <img className="card-img-right flex-auto d-none d-lg-block rounded-left" alt="Thumbnail [170x250]" style={{ width: "170px", height: "250px" }} src={this.state.item.imageAvatar} data-holder-rendered="true" />

            <div className="card-body d-flex flex-column align-items-start">

              <h4 className="mb-0">
                <span className="text-white" href="#">{this.state.item.name}</span>
              </h4>
              <h6 className="text-white">Aka: {this.state.item.aka}</h6>
              <div className="mb-1 text-light">Edad {this.state.item.edad} </div>
              <p className="card-text mb-auto">Biography <br />{this.state.item.bio}.</p>
            </div>

          </div>
          <div className="display row" >
            {
              this.state.items.map(function (item) {
                return (
                  <div className="col-3" key={item._id} >
                    <Movie item={item} />
                  </div>
                );
              }, this)
            }
          </div>
          <Paginator totalRecords={itemCount} pageLimit={pageSize} pageNeighbours={3} onPageChanged={this.onPageChanged} />

        </div>
      </div>
    );
  }


}
export default ActorDetails;