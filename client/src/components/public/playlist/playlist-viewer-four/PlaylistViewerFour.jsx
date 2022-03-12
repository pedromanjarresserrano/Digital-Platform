import React from 'react';
import './PlaylistViewerFour.css';
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
import Modal from '@material-ui/core/Modal';

import { BrowserUtils } from '../../common/BrowserUtils';
import NextButtom from '../../ui/nextbuttom/NextButtom';
import PrevButtom from '../../ui/prevbuttom/PrevButtom';
class PlaylistViewerFour extends React.Component {

  constructor(props) {
    super(props)
    let vol = parseFloat(localStorage.getItem("volumen"))

    this.state = {
      items: [],
      loading: true,
      item_temp: {},
      item_1: {},
      item_2: {},
      item_3: {},
      item_4: {},
      itemCount: 0,
      pageSize: 0,
      activePage: 1,
      index: 0,
      muted: vol == 0,
      open: false,
      vol: !isNaN(vol) ? vol : 1.0
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }




  handleChange(player, item) {
    this.setState({
      [item]: this.state.item_temp
    })
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    this[player].video.load();
    this.setState({
      item_temp: {},
      open: false
    })
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

  async load() {

    let page = this.props.match.params.page;

    page = page ? parseInt(page) : 1;

    var statesVal = { activePage: page }

    await this.setState(statesVal);
    await this.loadPage(page);
  }

  onPageChanged = pageNumber => {
    pageNumber = parseInt(pageNumber)
    this.setState({ activePage: pageNumber, loading: true });
    this.loadPage(pageNumber);
    this.props.history.push({
      pathname: generatePath(this.props.match.path, { page: pageNumber }),
      state: this.props.history.state

    });
  }

  async componentDidMount() {
    await this.load();
    if (this.state.items && this.state.items.length > 0) {
      this.setState({
        item_1: this.state.items[0],
        item_2: this.state.items[1],
        item_3: this.state.items[2],
        item_4: this.state.items[3],
      })

      this.setupPlayer('player1', 'list1');
      this.setupPlayer('player1', 'list1');
      this.setupPlayer('player1', 'list1');
      this.setupPlayer('player1', 'list1');
      /* BrowserUtils.mediaTrack({
         name: this.state.item.visualname ? this.state.item.visualname : this.state.item.name,
         next: this.next,
         back: this.back
       });*/
    }

  }

  setupPlayer(player, list) {

    this.video = this[player].video.video;
    this.video.addEventListener("ended", (() => {
      this.next(player, list);
    }).bind(this));
    this.video.addEventListener("volumechange", e => {
      if (e.srcElement.muted)
        localStorage.setItem("volumen", 0)
      else
        localStorage.setItem("volumen", e.srcElement.volume)
    })
    this.video.muted = this.state.muted
    this.video.volume = parseFloat(this.state.vol)
  }

  regresar = () => {
    this.props.history.goBack();
  }

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  handleOpen = (item) => {

    this.setState({
      item_temp: item,
      open: true
    })
    console.log('open')
  };

  render() {
    const { pageSize, itemCount, item_1 } = this.state;
    if (!item_1._id)
      return null;
    return (
      <div className="container-lg container-fluid">
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div className="d-flex justify-content-center align-items-center border-0 h-100 bg-secundary">
            <div className="d-flex flex-row flex-wrap justify-content-center  bg-secondary rounded p-2">
              <span className="w-100 h3 text-white ">Select player</span>
              <button className="btn btn-success col-5 m-1" onClick={() => this.handleChange("player1", "item_1")}>Player 1</button>
              <button className="btn btn-success col-5 m-1" onClick={() => this.handleChange("player2", "item_2")}>Player 2</button>
              <button className="btn btn-success col-5 m-1" onClick={() => this.handleChange("player3", "item_3")}>Player 3</button>
              <button className="btn btn-success col-5 m-1" onClick={() => this.handleChange("player4", "item_4")}>Player 4</button>

            </div>
          </div>
        </Modal>
        <div className="row">
          <div className="col-sm-6">
            <Player loop={false} autoPlay={true} poster={this.state.item_1.files[1]} ref={(player1) => { this.player1 = player1 }}>
              <source src={"/api/movie/" + this.state.item_1._id} />
              <BigPlayButton position="center" />
              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton />
                <PlaybackRateMenuButton rates={Constants.PUBLIC.RATES} order={7.1} />
              </ControlBar>
            </Player>
          </div>
          <div className="col-sm-6">
            <Player loop={false} autoPlay={true} poster={this.state.item_2.files[1]} ref={(player2) => { this.player2 = player2 }}>
              <source src={"/api/movie/" + this.state.item_2._id} />
              <BigPlayButton position="center" />
              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton />
                <PlaybackRateMenuButton rates={Constants.PUBLIC.RATES} order={7.1} />
              </ControlBar>
            </Player>
          </div>
          <div className="col-sm-6">
            <Player loop={false} autoPlay={true} poster={this.state.item_3.files[1]} ref={(player3) => { this.player3 = player3 }}>
              <source src={"/api/movie/" + this.state.item_3._id} />
              <BigPlayButton position="center" />
              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton />
                <PlaybackRateMenuButton rates={Constants.PUBLIC.RATES} order={7.1} />
              </ControlBar>
            </Player>
          </div>     <div className="col-sm-6">
            <Player loop={false} autoPlay={true} poster={this.state.item_4.files[1]} ref={(player4) => { this.player4 = player4 }}>
              <source src={"/api/movie/" + this.state.item_4._id} />
              <BigPlayButton position="center" />

              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton />
                <PlaybackRateMenuButton rates={Constants.PUBLIC.RATES} order={7.1} />
              </ControlBar>
            </Player>
          </div>
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
            <div className="d-flex flex-row justify-content-center   mx-auto w-100 mw-1300">
              <div className="display d-flex flex-row  justify-content-between flex-wrap w-100" >  {

                this.state.items.map((m, index) =>
                  <>
                    <Movie item={m} index={index} onClicked={this.handleOpen} playing={m == this.state.item} />
                  </>
                  , this)

              }

                {
                  (this.state.items ?
                    ([...Array(10).keys()]
                    ).map(() => {
                      return (<div className="w-100 w-m-20 card-m-l d-md-block d-none" />)
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
export default PlaylistViewerFour;