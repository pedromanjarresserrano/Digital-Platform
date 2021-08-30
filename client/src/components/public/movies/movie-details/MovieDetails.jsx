import React from 'react';
import './MovieDetails.css';
import {
  Player, ControlBar,
  CurrentTimeDisplay,
  TimeDivider,
  VolumeMenuButton,
  BigPlayButton,
  PlaybackRateMenuButton,
  ReplayControl,
  ForwardControl
} from 'video-react';
import Axios from 'axios';
import { Link } from 'react-router-dom'
import Actor from '../../actors/actor/Actor';
import { segFormat } from '../../../../utils/Utils';
import { Constants } from '../../common/Constants';
import PanoramicButtom from '../../ui/panoramicbutton/PanoramicButtom';

class MovieDetails extends React.Component {

  constructor(props) {
    super(props)
    let vol = parseFloat(localStorage.getItem("volumen"))

    this.state = {
      item: {},
      muted: vol == 0,
      vol: vol
    }
    this.panoramic = this.panoramic.bind(this);
  }


  //--------------------------------------------------------------
  componentWillMount() {
    let id = (this.props.location.state) ? this.props.location.state.item._id : this.props.match.params.id;
    Axios.get("/api/movies/" + id).then(function (response) {
      this.setState({
        item: response.data
      })
      this.video = this.player.video.video;
      this.video.addEventListener("volumechange", e => {
        if (e.srcElement.muted)
          localStorage.setItem("volumen", 0)
        else
          localStorage.setItem("volumen", e.srcElement.volume)
      })
      this.video.muted = this.state.muted
      this.video.volume = parseFloat(isNaN(this.state.vol) ? 0 : this.state.vol);

      document.title = "Digital Plaform - " + (this.state.item.visualname ? this.state.item.visualname : this.state.item.name);
    }.bind(this)).catch((error) => {
      console.log(error);
    });

  }


  panoramic = () => {
    $('.c-player').toggleClass('container-md')
    $('.c-player').toggleClass('mw-95')
    window.scrollTo({
      top: $('.c-player').position().top,
      behavior: 'smooth'
    })

  }

  render() {

    const { item } = this.state;
    if (!item._id)
      return null;
    return (
      <div className="container-md container-fluid c-player">
        <div className="row">
          <div className="col-sm-12 ">
            <Player fluid={true} width={"100%"} height={480} loop={false} poster={this.state.item.files[1]} ref={(player) => { this.player = player }}>
              <source src={"/api/movie/" + this.state.item._id} />
              <BigPlayButton position="center" />
              <ControlBar autoHide={true}>
                <ReplayControl seconds={5} order={2.1} />
                <ForwardControl seconds={5} order={3.1} />
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton />
                <PlaybackRateMenuButton rates={Constants.PUBLIC.RATES} order={7.1} />
                <PanoramicButtom order={8} onClick={this.panoramic} />
              </ControlBar>
            </Player>
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
      </div>
    );
  }


}
export default MovieDetails;