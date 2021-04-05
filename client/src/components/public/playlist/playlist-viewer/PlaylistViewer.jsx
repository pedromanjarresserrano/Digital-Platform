import React from 'react';
import './PlaylistViewer.css';
import {
  Player, ControlBar,
  CurrentTimeDisplay,
  TimeDivider,
  VolumeMenuButton,
  BigPlayButton,
  PlaybackRateMenuButton
} from 'video-react';
import axios from 'axios';
import Actor from '../../actors/actor/Actor';
import Movie from '../../movies/movie/Movie';
import { segFormat } from '../../../../utils/Utils';
import { Link } from 'react-router-dom'
import { Constants } from '../../common/Constants';
import Pagination from 'react-js-pagination';
import { BrowserUtils } from '../../common/BrowserUtils';
class PlaylistViewer extends React.Component {

  constructor(props) {
    super(props)
    let vol = parseFloat(localStorage.getItem("volumen"))

    this.state = {
      items: [],
      loading: true,
      item: {},
      itemCount: 0,
      pageSize: 0,
      activePage: 1,
      index: 0,
      muted: vol == 0,
      vol: !isNaN(vol) ? vol : 1.0
    }

    this.handleChange = this.handleChange.bind(this);
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.loadTitle = this.loadTitle.bind(this);

  }

  next = () => {
    let index = this.state.items.indexOf(this.state.item) + 1;
    if (index < this.state.items.length) {
      this.setState({
        item: this.state.items[index]
      })
      let pbr = this.player.playbackRate;
      this.player.video.load();
      this.player.playbackRate = pbr;
      this.loadTitle();
      return this.state.item.visualname ? this.state.item.visualname : this.state.item.name;
    }
  }
  back = () => {
    let index = this.state.items.indexOf(this.state.item) - 1;
    if (index > 0) {
      this.setState({
        item: this.state.items[index]
      })
      let pbr = this.player.playbackRate;
      this.player.video.load();
      this.player.playbackRate = pbr;
      this.loadTitle();
      return this.state.item.visualname ? this.state.item.visualname : this.state.item.name;

    }
  }


  handleChange(item) {
    this.setState({
      item: item
    })
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this.player.video.load();
  }

  async loadPage(page) {
    let find = this.props.location.state;
    let response = await axios.post('/api/movies/all/' + page + '?chunk=24', find)
    await this.setState({
      items: response.data.itemsList,
      paginator: response.data.paginator,
      itemCount: response.data.paginator.itemCount,
      pageSize: response.data.paginator.perPage,
      loading: false

    });
  }

  onPageChanged = pageNumber => {
    pageNumber = parseInt(pageNumber)
    this.setState({ activePage: pageNumber, loading: true });
    this.loadPage(pageNumber);

  }


  //--------------------------------------------------------------
  async componentWillMount() {
    await this.loadPage(1);
    if (this.state.items && this.state.items.length > 0) {
      this.setState({
        item: this.state.items[0]
      })
    }

    this.video = this.player.video.video;
    this.video.addEventListener("ended", (() => {
      this.next();
    }).bind(this));
    this.video.addEventListener("volumechange", e => {
      if (e.srcElement.muted)
        localStorage.setItem("volumen", 0)
      else
        localStorage.setItem("volumen", e.srcElement.volume)
    })
    this.video.muted = this.state.muted
    this.video.volume = parseFloat(this.state.vol)
    this.loadTitle();
    BrowserUtils.mediaTrack({
      name: this.state.item.visualname ? this.state.item.visualname : this.state.item.name,
      next: this.next,
      back: this.back
    });

  }
  loadTitle = () => {
    document.title = "Digital Plaform - " + (this.state.item.visualname ? this.state.item.visualname : this.state.item.name);
  }

  regresar = () => {
    this.props.history.goBack();
  }



  render() {
    const { pageSize, itemCount, item } = this.state;
    if (!item._id)
      return null;
    return (
      <div className="container-md container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <Player loop={false} autoPlay={true} poster={this.state.item.files[1]} ref={(player) => { this.player = player }}>
              <source src={"/api/movie/" + this.state.item._id} />
              <BigPlayButton position="center" />
              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton />
                <PlaybackRateMenuButton rates={Constants.PUBLIC.RATES} order={7.1} />
              </ControlBar>
            </Player>
          </div>
          <div className=" d-flex flex-row  justify-content-between w-100">
            <button className="btn btn-success" onClick={this.back}>Back</button>
            <button className="btn btn-success" onClick={this.next}>Next</button>
          </div>
        </div>
        <div className="row content padding-top-1">
          <div className="poster col-sm-12 col-md-3 col-lg-3" >
            <img className="img-fluid"
              src={this.state.item.portada} />
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
                    <span className="classification">{segFormat(this.state.item.duration)} | {this.state.item.year ? this.state.item.year : '-'}</span>
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
                  <div className="info-gratitude margin-bottom-1 w-100">
                    <div className="directed w-100">
                      <span>Título original: </span>
                      <span className='w-100' style={{ wordWrap: 'break-word' }}>{this.state.item.name ? this.state.item.name : ''}</span>
                    </div>
                    <div className="directed w-100">
                      <span>Director: </span>
                      <span className='w-100' style={{ wordWrap: 'break-word' }}>{this.state.item.like ? this.state.item.like : ''}</span>
                    </div>
                    <div className="credits w-100">
                      <span>Guión: </span>
                      <span>Dan Berendsen</span>
                    </div>
                    <div className="studio w-100">
                      <span>Estudio: </span>
                      <span>{this.state.item.studio ? <Link className="badge badge-pill badge-dark text-white" to={"/studios/studio/" + this.state.item.studio.name}>{this.state.item.studio.name}</Link> : ''}</span>
                    </div>
                  </div>
                  <div className="category w-100">
                    {this.state.item.categorias ? this.state.item.categorias.map(cat => (<Link key={cat._id} to={"/categories/categorie/" + cat.name} className="badge badge-pill badge-dark">  {cat.name}</Link>)) : ''}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4 className="text-white">Reparto</h4>
        <div className="row ">
          {this.state.item.reparto ? this.state.item.reparto.map(reparto => (
            <div className="w-20">
              <Actor item={reparto} />
            </div>
          )) : ''}
        </div>

        <div className="container-fluid">

          <div className="d-block  px-5 ">
            <div className="pt-3 mb-2">
              <Pagination
                totalItemsCount={itemCount}
                itemsCountPerPage={pageSize}
                activePage={this.state.activePage}
                pageRangeDisplayed={Constants.PUBLIC.PAGE_VISIBLE_COUNT}
                onChange={this.onPageChanged} />
            </div>
            <div className="d-flex flex-row justify-content-center   mx-auto w-100 mw-1200">
              <div className="display d-flex flex-row  justify-content-between flex-wrap w-100" >  {

                this.state.items.map((m, index) =>
                  <>
                    <Movie item={m} index={index} onClicked={this.handleChange} playing={m == this.state.item} />
                  </>
                  , this)

              }

                {
                  (this.state.items ?
                    ([...Array(10).keys()]
                    ).map(() => {
                      return (<div className="w-100 w-m-20 card-m d-md-block d-none" />)
                    })
                    : <div />)
                }
              </div>
            </div>


            <div className="pt-3 mb-2">
              <Pagination
                totalItemsCount={itemCount}
                itemsCountPerPage={pageSize}
                activePage={this.state.activePage}
                pageRangeDisplayed={Constants.PUBLIC.PAGE_VISIBLE_COUNT}
                onChange={this.onPageChanged} />
            </div>
          </div>
        </div>
      </div >
    );
  }


}
export default PlaylistViewer;