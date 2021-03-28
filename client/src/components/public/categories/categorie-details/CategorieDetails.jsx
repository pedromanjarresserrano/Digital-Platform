import React from 'react';
import './CategorieDetails.css';
import Axios from 'axios';
import Movie from '../../movies/movie/Movie'
import RotateCircleLoading from 'react-loadingg/lib/RotateCircleLoading';
import Pagination from 'react-js-pagination';
import { generatePath } from 'react-router-dom';
import { Constants } from '../../common/Constants';

class CategorieDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      item: {},
      items: [],
      itemCount: 0,
      pageSize: 0,
      activePage: 1,
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
      Axios.post("/api/categorias/fo", { name: this.props.match.params.name })
        .then(function (response) {
          this.setState({
            item: response.data
          })
          this.loadPage(1);
        }.bind(this))
        .catch(error => {
          console.log(error);

        });
    }

    this.playlist = this.playlist.bind(this);

  }

  loadPage(page) {
    Axios.get("/api/movies/all/" + page + "?categorias=" + (this.props.location.state ? this.props.location.state.item._id : this.state.item._id)).then(function (response) {
      this.setState({
        items: response.data.itemsList,
        paginator: response.data.paginator,
        itemCount: response.data.paginator.itemCount,
        pageSize: response.data.paginator.perPage,
        loading: false

      });
    }.bind(this))
      .catch(error => { console.log(error) });

  }


  onPageChanged = pageNumber => {
    pageNumber = parseInt(pageNumber)
    this.setState({ activePage: pageNumber, loading: true });
    this.loadPage(pageNumber);
    this.props.history.push({
      pathname: generatePath(this.props.match.path, { name: this.state.item.name, page: pageNumber })
    });
  }

  playlist = () => {

    this.props.history.push({
      pathname: '/playlist',
      state: { categorias: (this.props.location.state ? this.props.location.state.item._id : this.state.item._id) }
    })

  }

  render() {
    const { pageSize, itemCount } = this.state;

    return (
      <div className="container-fluid">
        <div className="d-block">
          <div className="d-flex row-flex justify-content-between">
            <h1 className="text-white text-truncate">{this.state.item.name}</h1>
            <button className="btn btn-success" onClick={this.playlist}>
              Play as playlist
          </button>
          </div>
          <div className="d-flex flex-row justify-content-center   mx-auto w-100 mw-1200">
            <div className="display d-flex flex-row  flex-wrap w-100" >
              {
                (this.state.loading) ?
                  <div className="m-5 pb-5">
                    <RotateCircleLoading size="large" />
                  </div>
                  : this.state.items.map(function (item) {
                    return (
                      <div className="w-100 w-m-20 d-flex flex-column align-items-center" key={item._id} >
                        <Movie item={item} />
                      </div>
                    );
                  }, this)
              }
            </div>
          </div>
          <Pagination
            totalItemsCount={itemCount}
            itemsCountPerPage={pageSize}
            activePage={this.state.activePage}
            pageRangeDisplayed={Constants.PUBLIC.PAGE_VISIBLE_COUNT}
            onChange={this.onPageChanged} />

        </div>
      </div>
    );
  }


}
export default CategorieDetails;