import React from 'react';
import './StudioDetails.css';
import Axios from 'axios';
import RotateCircleLoading from 'react-loadingg/lib/RotateCircleLoading';
import Pagination from 'react-js-pagination';
import Movie from '../../movies/movie/Movie';
import { generatePath } from 'react-router-dom';
import { Constants } from '../../common/Constants';

class StudioDetails extends React.Component {

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
      Axios.post("/api/studios/fo", { name: this.props.match.params.name })
        .then(function (response) {
          this.setState({
            item: response.data,
            activePage: this.props.match.params.page
          })
          this.loadPage(this.props.match.params.page);
        }.bind(this))
        .catch(error => {
          console.log(error);

          this.setState({ loading: false });
        });
    }
  }

  loadPage(page) {
    Axios.get("/api/movies/all/" + page + "?studio=" + (this.props.location.state ? this.props.location.state.item._id : this.state.item._id)).then(function (response) {
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

  playlist = () => {
    let find = { studio: (this.props.location.state ? this.props.location.state.item._id : this.state.item._id) };
    localStorage.setItem("fils", JSON.stringify(find));
    this.props.history.push({
      pathname: '/playlist',
      state: find
    })

  }

  render() {
    const { pageSize, itemCount } = this.state;

    return (
      <div className="container-fluid">
        <div className="d-block">
          <div className="d-flex row-flex justify-content-between">
            <h1 className="text-white">{this.state.item.name}</h1>
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
export default StudioDetails;