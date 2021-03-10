import React from 'react';
import './ImagesetDetails.css';
import Axios from 'axios';
import { Link } from 'react-router-dom'


class ImagesetDetails extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      item: {},
    }
    this.fix = this.fix.bind(this);
  }
  //--------------------------------------------------------------
  async componentWillMount() {
    let id = (this.props.location.state) ? this.props.location.state.item._id : this.props.match.params.id;
    await Axios.get("/api/imagesets/" + id).then(function (response) {
      this.setState({
        item: response.data
      })

      document.title = "Digital Plaform - " + (this.state.item.visualname ? this.state.item.visualname : this.state.item.name);


    }.bind(this)).catch((error) => {
      console.log(error);
    });

  }

  fix = () => {
    let number = parseInt($('li.pagenumber.active')[0].innerHTML) - 1;
    this.changeVisible(number);
  }

  changeVisible = (index) => {
    console.log(index);
    const listPages = $('.pagenumber');

    for (let i = 0; i < listPages.length; i++) {
      const e = $(listPages[i]);
      e.removeClass('d-block');
      e.addClass('d-none');

    }
    $(listPages[index]).addClass('d-block');

    for (let i = index - 5, j = index + 5; i < index; i++, j--) {
      $(listPages[i]).addClass('d-block');
      $(listPages[j]).addClass('d-block');

    }
  }

  render() {
    const { item } = this.state;
    if (!item._id)
      return null;
    return (
      <div className="container">
        <div className="row mb-5">
          <div className="col-sm-12 carro">
            <div id="s-1" className="carousel slide d-flex flex-column" data-ride="false" data-interval="false">

              <div className="carousel-inner">
                {
                  item['files'].map(file => {
                    let first = item['files'][0] == file;
                    return (<div className={(first ? "active " : "") + "carousel-item"} key={Math.random()}>

                      <div className="d-flex justify-content-center mh-100 page" >
                        <img className="img-fluid" src={"/api/imageset/page?id=" + item._id + "&name=" + file} />
                      </div>
                    </div>);

                  }, this)

                }

              </div>




              <ol class="carousel-indicators">
                {
                  item['files'].map((file, index) => {

                    let first = item['files'][0] == file;
                    return (<li className={('pagenumber ') + (first ? "active " : "") + (index < 10 ? 'd-block' : 'd-none')} onClick={() => this.changeVisible(index)} key={Math.random()} data-target="#s-1" data-slide-to={index}>{index + 1}
                    </li>);

                  }, this)

                } </ol>
              <a className="carousel-control-prev" href="#s-1" onClick={() => this.fix()} role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only" >Previous</span>
              </a>
              <a className="carousel-control-next" href="#s-1" onClick={() => this.fix()} role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
            </div>


          </div>
        </div>
        <div className="row content padding-top-1">
          <div className="poster col-sm-12 col-md-3 col-lg-3" >
            <img className="img-fluid"
              src={"/api/imageset/page?id=" + item._id + "&name=" + item.portada} />
          </div>
          <div className="movie-body col-sm-12 col-md-9 col-lg-9">
            <div className="header">
              <div className="title grid-container">
                <div className="row">
                  <div className="col-sm-12 col-md-9 col-lg-10">
                    <h4 style={{ wordWrap: 'break-word' }}>{this.state.item.visualname ? this.state.item.visualname : this.state.item.name}</h4>
                  </div>
                  <div className="col-sm-12 col-md-9 col-lg-2">
                    <i className="fab fa-facebook-square fa-2x padding-left-1"></i>
                    <i className="fab fa-google-plus fa-2x padding-left-1" aria-hidden="true"></i>
                    <i className="fab fa-twitter-square fa-2x padding-left-1" aria-hidden="true"></i>
                  </div>
                  <div className="col-sm-12 ">
                    <span className="classification">{this.state.item.pages}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="body grid-container">
              <div className="row information">
                <div className="col-sm-12">
                  <div className="sinopsis">
                    {this.state.item.description ? this.state.item.description : "No description"}
                  </div>
                  <div className="questions flex-container flex-dir-row">
                    <div className="list-star flex-child-auto align-self-middle">
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star checked"></span>
                      <span className="fa fa-star"></span>
                    </div>
                    <div className="watch padding-2">
                      <i className="fas fa-eye margin-right-1"></i>
                      {this.state.item.view ? this.state.item.view : 0} Visitas
                      </div>
                    <div className="like padding-2">
                      <i className="fas fa-heart margin-right-1"></i>
                      {this.state.item.like ? this.state.item.like : 0} Me gusta
                      </div>
                    <div className="comment padding-2">
                      <i className="fas fa fa-comments margin-right-1"></i>
                        0 Comentarios
                      </div>
                  </div>
                  <div className="info-gratitude margin-bottom-1">
                    <div className="directed">
                      <span>Título original: </span>
                      <span>{this.state.item.name ? this.state.item.name : ''}</span>
                    </div>
                  </div>
                  <div className="category">
                    {this.state.item.categorias ? this.state.item.categorias.map(itm => (<Link key={itm._id} to={"/categories/categorie/" + itm.name} className="badge badge-pill badge-dark">  {itm.name}</Link>)) : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


}
export default ImagesetDetails;