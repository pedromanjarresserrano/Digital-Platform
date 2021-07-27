import React from 'react';
import './PlaylistViewerFourTime.css';
import {
  Player, ControlBar,
  CurrentTimeDisplay,
  TimeDivider,
  VolumeMenuButton,
  BigPlayButton,
  PlaybackRateMenuButton
} from 'video-react';
import axios from 'axios';
import Movie from '../../movies/movie/Movie';
import { Constants } from '../../common/Constants';
import Pagination from 'react-js-pagination';
import Modal from '@material-ui/core/Modal';
import NextButtom from '../../ui/nextbuttom/NextButtom';
import PrevButtom from '../../ui/prevbuttom/PrevButtom';
import Timeline from './timeline/Timeline';
import queryString from 'query-string'
import { generatePath } from "react-router";

class PlaylistViewerFourTime extends React.Component {

  constructor(props) {
    super(props)
    let vol = parseFloat(localStorage.getItem("volumen"))
    localStorage.setItem("state", JSON.stringify(null))
    let states = JSON.parse(localStorage.getItem("state"))
    if (states)
      this.state = {
        ...states,
        open: false
      }
    else
      this.state = {
        items: [],
        search: '',
        loading: true,
        item_temp: {},
        item_1: {},
        item_2: {},
        item_3: {},
        item_4: {},
        list1: [],
        list2: [],
        list3: [],
        list4: [],
        itemCount: 0,
        pageSize: 0,
        activePage: 1,
        index: 0,
        muted: vol == 0,
        open: false,
        vol: !isNaN(vol) ? vol : 1.0
      };
    this.next = this.next.bind(this);
    this.back = this.back.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setupPlayer = this.setupPlayer.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);

  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });

  }

  handleSearch(event) {
    event.preventDefault();
    this.props.history.push({
      pathname: generatePath(this.props.match.path, { page: 1 }),
      search: '?search=' + this.state.search,

    })
    this.loadPage(1);

  }

  async handleChange(listn, item) {

    let list = this.state[listn]
    list.push(this.state.item_temp);
    this.setState({
      [listn]: list
    })
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
    await this.setState({
      item_temp: {},
      open: false
    })
    localStorage.setItem("state", JSON.stringify(this.state))
  }

  async loadPage(page) {
    let find = this.props.location.state;
    if (!find)
      find = { $and: [] }

    find.$and.push({
      $or: [
        {
          name: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
        },
        {
          visualname: { "$regex": ".*" + this.state.search + ".*", $options: 'i' },
        },
      ]
    })
    let response = await axios.post('/api/movies/all/' + page + '?chunk=36', find)
    await this.setState({
      items: response.data.itemsList,
      paginator: response.data.paginator,
      itemCount: response.data.paginator.itemCount,
      pageSize: response.data.paginator.perPage,
      loading: false

    });
  }

  async load() {
    const values = queryString.parse(this.props.location.search);

    let page = this.props.match.params.page;

    page = page ? parseInt(page) : 1;

    var statesVal = { activePage: page }
    if (values && values.search)
      statesVal.search = values.search;

    await this.setState(statesVal);
    await this.loadPage(page);
  }

  onPageChanged = pageNumber => {
    pageNumber = parseInt(pageNumber)
    this.setState({ activePage: pageNumber, loading: true });
    this.loadPage(pageNumber);
    this.props.history.push({
      pathname: generatePath(this.props.match.path, { page: pageNumber }),
      search: this.props.location.search ? this.props.location.search : "",
      state: this.props.history.state

    });
  }

  async componentDidMount() {
    await this.load();
    if (this.state.items && this.state.items.length > 0) {

      let list1 = this.state.list1;
      let list2 = this.state.list2;
      let list3 = this.state.list3;
      let list4 = this.state.list4;
      if (list1.length == 0)
        list1.push(this.state.items[0])
      if (list2.length == 0)
        list2.push(this.state.items[1])
      if (list3.length == 0)
        list3.push(this.state.items[2])
      if (list4.length == 0)
        list4.push(this.state.items[3])
      this.setState({
        item_1: this.state.items[0],
        item_2: this.state.items[1],
        item_3: this.state.items[2],
        item_4: this.state.items[3],
        list1: list1,
        list2: list2,
        list3: list3,
        list4: list4,
        mayorlist: [
          list1,
          list2,
          list3,
          list4
        ]
      })
      this.setupPlayer('player1', 'list1', "item_1");
      this.setupPlayer('player2', 'list2', "item_2");
      this.setupPlayer('player3', 'list3', "item_3");
      this.setupPlayer('player4', 'list4', "item_4");

      /* BrowserUtils.mediaTrack({
         name: this.state.item.visualname ? this.state.item.visualname : this.state.item.name,
         next: this.next,
         back: this.back
       });*/
    }

  }

  next = (player, list, item = {}) => {
    let index = this.state[list].indexOf(this.state[item]) + 1;
    if (index < this.state[list].length) {
      this.setState({
        [item]: this.state[list][index]
      })
      let pbr = this[player].playbackRate;
      this[player].video.load();
      this[player].playbackRate = pbr;
      return this.state[item].visualname ? this.state[item].visualname : this.state[item].name;
    }
  }

  back = (player, list, item = {}) => {
    let index = this.state[list].indexOf(this.state[item]) - 1;
    if (index >= 0) {
      this.setState({
        [item]: this.state[list][index]
      })
      let pbr = this[player].playbackRate;
      this[player].video.load();
      this[player].playbackRate = pbr;
      return this.state[item].visualname ? this.state[item].visualname : this.state[item].name;

    }
  }
  setupPlayer(player, list, item) {

    this.video = this[player].video.video;
    this.video.addEventListener("ended", (() => {
      this.next(player, list, item);
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

  deleteItem(listname, item) {
    console.log('delete');
    let list = this.state[listname]
    let index = list.indexOf(item);
    list.splice(index, 1);
    this.setState({
      [listname]: list
    })
  }

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
              <button className="btn btn-success col-5 m-1" onClick={() => this.handleChange("list1", "item_1")}>Player 1</button>
              <button className="btn btn-success col-5 m-1" onClick={() => this.handleChange("list2", "item_2")}>Player 2</button>
              <button className="btn btn-success col-5 m-1" onClick={() => this.handleChange("list3", "item_3")}>Player 3</button>
              <button className="btn btn-success col-5 m-1" onClick={() => this.handleChange("list4", "item_4")}>Player 4</button>

            </div>
          </div>
        </Modal>
        <div className="row">
          <div className="col-sm-6">
            <Player loop={false} autoPlay={true} poster={this.state.item_1.files[1]} ref={(player1) => { this.player1 = player1 }}>
              <source src={"/api/movie/" + this.state.item_1._id} />
              <BigPlayButton position="center" />

              <NextButtom onClick={() => { this.next('player1', 'list1', "item_1") }} />
              <PrevButtom onClick={() => { this.back('player1', 'list1', "item_1") }} />
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

              <NextButtom onClick={() => { this.next('player2', 'list2', "item_2") }} />
              <PrevButtom onClick={() => { this.back('player2', 'list2', "item_2") }} />
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

              <NextButtom onClick={() => { this.next('player3', 'list3', "item_3") }} />
              <PrevButtom onClick={() => { this.back('player3', 'list3', "item_3") }} />
              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton />
                <PlaybackRateMenuButton rates={Constants.PUBLIC.RATES} order={7.1} />
              </ControlBar>
            </Player>
          </div>
          <div className="col-sm-6">
            <Player loop={false} autoPlay={true} poster={this.state.item_4.files[1]} ref={(player4) => { this.player4 = player4 }}>
              <source src={"/api/movie/" + this.state.item_4._id} />
              <BigPlayButton position="center" />

              <NextButtom onClick={() => { this.next('player4', 'list4', "item_4") }} />
              <PrevButtom onClick={() => { this.back('player4', 'list4', "item_4") }} />
              <ControlBar autoHide={true}>
                <CurrentTimeDisplay order={4.1} />
                <TimeDivider order={4.2} />
                <VolumeMenuButton />
                <PlaybackRateMenuButton rates={Constants.PUBLIC.RATES} order={7.1} />
              </ControlBar>
            </Player>
          </div>
        </div>
        <div className="mt-5 mb-5">
          <Timeline list={this.state.list1} listname={'list1'} delete={this.deleteItem} />
          <Timeline list={this.state.list2} listname={'list2'} delete={this.deleteItem} />
          <Timeline list={this.state.list3} listname={'list3'} delete={this.deleteItem} />
          <Timeline list={this.state.list4} listname={'list4'} delete={this.deleteItem} />
        </div>
        <div className="container-fluid">
          <div className="col-12  p-5 sticky-top-scroll" >
            <div className="row mb-2">

              <div className="col-12 col-md-4 ">
                <div className="form-inline">
                  <div className="input-group">
                    <input type="text" className="form-control" onKeyDown={this._handleKeyDown} value={this.state.search} onChange={this.handleSearchChange} />
                    <div className="input-group-append">
                      <button className="btn btn-danger " onClick={this.handleSearch} >Buscar </button>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

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
                    <Movie item={m} index={index} onClicked={this.handleOpen} playing={m == this.state.item} />
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
export default PlaylistViewerFourTime;