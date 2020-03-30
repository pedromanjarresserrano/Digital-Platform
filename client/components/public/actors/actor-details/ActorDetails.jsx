import React from 'react';
import './ActorDetails.css';
import Axios from 'axios';
import { Link } from 'react-router-dom'
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
    /*    <button onClick={this.regresar}>Regresar </button>*/
    const { pageSize, itemCount } = this.state;

    return (
      <div className="row-content">
        <div className="grid-container  p-1">
          <h1 className="text-white">{this.state.item.name}</h1>
          <div className="filter-list">
            <div className="display row" >
              {
                this.state.items.map(function (item) {
                  return (
                    <div className="col-3" key={item._id} >
                      <Movie item={item} vermasonclick={this.vermas} />
                    </div>
                  );
                }, this)
              }
            </div>
          </div>
          <Paginator totalRecords={itemCount} pageLimit={pageSize} pageNeighbours={3} onPageChanged={this.onPageChanged} />

        </div>
      </div>
    );
  }


}
export default ActorDetails;