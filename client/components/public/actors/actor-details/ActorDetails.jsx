import React from 'react';
import './ActorDetails.css';
import Axios from 'axios';
import Movie from '../../movie/Movie'
import { generatePath } from "react-router";
import RotateCircleLoading from 'react-loadingg/lib/RotateCircleLoading';
import Pagination from 'react-js-pagination';

class ActorDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      item: {},
      items: [],
      itemCount: 0,
      pageSize: 0,
      activePage: 0,
      loading: true

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
        pageSize: response.data.paginator.perPage,
        loading: false

      });
    }.bind(this));
  }


  onPageChanged = pageNumber => {
    pageNumber = parseInt(pageNumber)
    this.setState({ activePage: pageNumber, loading: true });
    this.loadPage(pageNumber);
    this.props.history.push({
      pathname: generatePath(this.props.match.path, { name: this.state.item.name, page: pageNumber })
    });
  }


  render() {
    const { pageSize, itemCount } = this.state;

    return (
      <div className="container-fluid">
        <div className="d-block  px-5 ">
          {
            (this.state.loading) ?
              <div className="m-5 pb-5">
                <RotateCircleLoading size="large" />
              </div>
              : <> <div className="card flex-md-row mb-4 shadow-sm h-md-250 bg-dark" >
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
                <div className="d-flex flex-row justify-content-center   mx-auto w-100 mw-1200">
                  <div className="display d-flex flex-row  flex-wrap w-100" >
                    {
                      this.state.items.map(function (item) {
                        return (
                          <div className="w-100 w-m-20 w-100 w-m-20 d-flex flex-column align-items-center" key={item._id} >
                            <Movie item={item} />
                          </div>
                        );
                      }, this)
                    }
                  </div>
                </div>
              </>
          }
          <Pagination
            totalItemsCount={itemCount}
            itemsCountPerPage={pageSize}
            activePage={this.state.activePage}
            pageRangeDisplayed={9}
            onChange={this.onPageChanged} />

        </div>
      </div>
    );
  }


}
export default ActorDetails;