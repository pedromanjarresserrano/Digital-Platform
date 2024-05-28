import React from 'react';
import './PlayerN.css';

class PlayerN extends React.Component {

    constructor(props) {
        super(props);
        let vol = parseFloat(localStorage.getItem("volumen"))
        this.state = {
            item: {},
            muted: vol == 0,
            vol: vol,
            rates: [12, 10, 8, 4, 2, 1.5, 1, 0.75, 0.5, 0.25, 0.15]
        }
        this.setPlayrate = this.setPlayrate.bind(this);
    }

    componentDidMount() {
        const videoContainer = document.querySelector(".video-container");
        const centerContainer = document.querySelector(".video-container .center-button-container .center-button");
        const video = document.querySelector(".video-container video");

        let showingcontrol = false;
        const controlsContainer = document.querySelector(
            ".video-container .controls-container"
        );

        const playPauseButton = document.querySelector(
            ".video-container .controls button.play-pause"
        );

        const castButton = document.querySelector(
            ".video-container .controls button.cast"
        );


        const captionButton = document.querySelector(
            ".video-container .controls button.captions"
        );

        const blurButton = document.querySelector(
            ".video-container .controls button.blur-btn"
        ); 
        const playPauseButtonCenter = document.querySelector(
            ".video-container .center-button-container .center-button"
        );

        const rewindButton = document.querySelector(
            ".video-container .controls button.rewind"
        );
        const fastForwardButton = document.querySelector(
            ".video-container .controls button.fast-forward"
        );
        const volumeButton = document.querySelector(
            ".video-container .controls button.volume"
        );
        const fullScreenButton = document.querySelector(
            ".video-container .controls button.full-screen"
        );
        const itemrates = document.querySelectorAll(
            ".item-rate"
        );

        const playbackrates = document.querySelector(
            ".playbackrates"
        );
        const track = document.getElementsByTagName('track')[0].track;

        const playButton = videoContainer.querySelectorAll(".playing");
        const pauseButton = videoContainer.querySelectorAll(".paused");
        const loading = videoContainer.querySelectorAll(".loading");
        const fullVolumeButton = volumeButton.querySelector(".full-volume");
        const RangeVolumeButton = volumeButton.querySelector(".range");
        const mutedButton = volumeButton.querySelector(".muted");
        const maximizeButton = fullScreenButton.querySelector(".maximize");
        const minimizeButton = fullScreenButton.querySelector(".minimize");

        const progressBar = document.querySelector(
            ".video-container .progress-controls .progress-bar-video"
        );
        const watchedBar = document.querySelector(
            ".video-container .progress-controls .progress-bar-video .watched-bar"
        );
        const timeLeft = document.querySelector(
            ".video-container .progress-controls .time-remaining"
        );
        const controls = document.querySelector(
            ".video-container .controls"
        );
        const progresscontrols = document.querySelector(
            ".video-container .progress-controls"
        );
        const playhead = document.querySelector(
            ".video-container .progress-controls .progress-bar-video .playhead"
        );
        const tm = () => {
            if (video.muted) {
                fullVolumeButton.style.display = "none";
                mutedButton.style.display = "";
            } else {
                fullVolumeButton.style.display = "";
                mutedButton.style.display = "none";
            }
        };
        const stopPropagation = (event) => {
            event.stopPropagation();
        }
        const displayControls = () => {
            controlsContainer.style.opacity = "1";
            centerContainer.style.opacity = "1";
            showingcontrol = true;
            document.body.style.cursor = "initial";

            if (controlsTimeout) {
                clearTimeout(controlsTimeout);
            }
            controlsTimeout = setTimeout(() => {
                controlsContainer.style.opacity = "0";
                centerContainer.style.opacity = "0";
                showingcontrol = false;
            }, 2500);
        };
        video.addEventListener('canplay', function () {
            //  loading.forEach(e => e.style.display = "none")
            //   pauseButton.forEach(e => e.style.display = "block")
        });

        video.addEventListener('play', function () {
            loading.forEach(e => e.style.display = "none")
            pauseButton.forEach(e => e.style.display = "block")
        });

        itemrates.forEach(e => e.addEventListener('click', function (event) {
            event.stopPropagation()
            let item = document.getElementsByClassName("drop-up-item-parent")[0];
            item.classList.toggle("drop-up-item-show");
            this.setPlayrate(e.dataset.value, event);
        }.bind(this)))
        let showRates = false;
        itemrates.forEach(e => e.addEventListener('mouseover', function (event) {
            event.stopPropagation();
            displayControls();
        }));

        captionButton.addEventListener('click', function (event) {
            if (!showRates) {
                showRates = true;
            } else {
                showRates = false;
            }
            let item = document.getElementsByClassName("drop-up-item-parent")[0];
            item.classList.toggle("drop-up-item-show");
        });

        const playPause = (event) => {
            event.stopPropagation();
            console.log("here")
            if (video.paused) {
                video.play();
                playButton.forEach(e => e.style.display = "none")
                loading.forEach(e => e.style.display = "block")
                // Move the cue up 3 lines to make room for video controls
            } else {
                video.pause();
                playButton.forEach(e => e.style.display = "block")
                pauseButton.forEach(e => e.style.display = "none")
                loading.forEach(e => e.style.display = "none")
            }
        };
        const toggleMute = (event) => {
            event.stopPropagation();
            video.muted = !video.muted;
            video.volume = 1;
            tm();
        };
        const aux = controlsContainer.style;
        const toggleFullScreen = (event) => {
            event.preventDefault();
            if (!document.fullscreenElement) {
                videoContainer.requestFullscreen();
                screen.orientation.lock("landscape-primary");
                controlsContainer.style.width = "100%"
            } else {
                controlsContainer.style = aux;
                document.exitFullscreen();
            }
        };
        mutedButton.style.display = "none";
        let controlsTimeout;
        controlsContainer.style.opacity = "0";
        watchedBar.style.width = "0px";
        pauseButton.forEach(e => e.style.display = "none")
        minimizeButton.style.display = "none";

        video.addEventListener("volumechange", e => {
            if (video.muted)
                localStorage.setItem("volumen", 0)
            else
                localStorage.setItem("volumen", video.volume)
        })
        video.muted = this.state.muted
        video.volume = parseFloat(isNaN(this.state.vol) ? 0 : this.state.vol);
        tm();




        document.addEventListener("fullscreenchange", (event) => {
            event.stopPropagation();
            if (!document.fullscreenElement) {
                maximizeButton.style.display = "";
                minimizeButton.style.display = "none";
            } else {
                maximizeButton.style.display = "none";
                minimizeButton.style.display = "";
            }
        });

        document.addEventListener("keyup", (event) => {
            event.stopPropagation();
            if (event.code === "Space") {
                playPause(event);
            }

            if (event.code === "KeyM") {
                toggleMute(event);
            }

            if (event.code === "KeyF") {
                toggleFullScreen();
            }

            displayControls();
        });

        videoContainer.addEventListener("click", (event) => {
            event.stopPropagation();
            displayControls();
        });
        playhead.addEventListener("mousemove", (event) => {
            event.stopPropagation();
            displayControls();
        });
        progressBar.addEventListener("mousemove", (event) => {
            event.stopPropagation();
            displayControls();
        });
        video.addEventListener("timeupdate", (event) => {
            event.stopPropagation();
            watchedBar.style.width = (video.currentTime / video.duration) * 100 + "%";
            // Calc hours
            const totalSecondsRemaining = video.duration - video.currentTime;
            const time = new Date(null);
            time.setSeconds(totalSecondsRemaining);
            let hours = null;

            if (totalSecondsRemaining >= 3600) {
                hours = ((totalSecondsRemaining / 3600) >> 0).toString()
            }

            let minutes = time.getMinutes().toString().padStart(2, "0");
            let seconds = time.getSeconds().toString().padStart(2, "0");
            timeLeft.textContent = `${hours && parseInt(hours) >= 1 ? hours.padStart(2, "0") + ":" : ""}${minutes}:${seconds}`;
            if (track.activeCues && track.activeCues[0]) {
  
            }
        });

        progressBar.addEventListener("click", (event) => {
            event.stopPropagation();
            if (event.target.id == "progress-bar-video") {
                const pos =
                    event.offsetX /
                    progressBar.offsetWidth;
                video.currentTime = pos * video.duration;
                // console.log(pos);
            }
        });

        rewindButton.addEventListener("click", (event) => {
            event.stopPropagation();
            video.currentTime -= 10;
        });

        fastForwardButton.addEventListener("click", (event) => {
            event.stopPropagation();
            video.currentTime += 10;
        });

        playPauseButton.addEventListener("click", playPause);
        playPauseButtonCenter.addEventListener("click", playPause);

        video.addEventListener("click", (event) => {
            if (showingcontrol) {
                playPause(event);
            }
        });

        video.addEventListener("ended", (event) => {
            event.stopPropagation();
            playButton.forEach(e => e.style.display = "")
            pauseButton.forEach(e => e.style.display = "none")
        });

        controls.addEventListener("click", stopPropagation);

        progresscontrols.addEventListener("click", stopPropagation);

        controlsContainer.addEventListener("click", (event) => {
            if (showingcontrol) {
                playPause(event);
            }
        });

        volumeButton.addEventListener("click", toggleMute);
        blurButton.addEventListener("click", async (event) => {
            event.stopPropagation();
            video.classList.toggle("blur")
        });
        fullScreenButton.addEventListener("click", toggleFullScreen);
        castButton.addEventListener("click", async (event) => {
            event.stopPropagation();
            try {
                if (video !== document.pictureInPictureElement) {
                    await video.requestPictureInPicture();
                } else {
                    await document.exitPictureInPicture();
                    playButton.forEach(e => e.style.display = "")
                    pauseButton.forEach(e => e.style.display = "none")
                }
            } catch (error) {
                // console.log(`> Argh! ${error}`);
            }
        });

        var timeDrag = false;
        let down = async (event) => {
            timeDrag = true;
            updatebar(event.pageX);
        }

        playhead.addEventListener("mousedown", down);
        progressBar.addEventListener("mousedown", down);
        document.addEventListener("mouseup", async (event) => {
            if (timeDrag) {
                timeDrag = false;
                updatebar(event.pageX);
            }
        });
        document.addEventListener("mousemove", async (event) => {
            if (timeDrag) {
                updatebar(event.pageX);
            }
        });

        let downTouch = async (event) => {
            timeDrag = true;
            updatebar(event.touches[0].pageX);
        }
        playhead.addEventListener("touchstart", downTouch);
        progressBar.addEventListener("touchstart", downTouch);
        document.addEventListener("touchend", async (event) => {
            if (timeDrag) {
                timeDrag = false;
                updatebar(event.touches[0].pageX);
            }
        });
        document.addEventListener("touchmove", async (event) => {
            if (timeDrag) {
                updatebar(event.touches[0].pageX);
                displayControls()
            }
        });




        var updatebar = function (x) {
            var maxduration = video.duration; //Video duraiton
            var position = x - findPos(progressBar).curleft; //Click pos
            var percentage = 100 * position / progressBar.offsetWidth;

            //Check within range
            if (percentage > 100) {
                percentage = 100;
            }
            if (percentage < 0) {
                percentage = 0;
            }

            //Update progress bar and video currenttime
            watchedBar.style.width = percentage + "%";

            video.currentTime = maxduration * percentage / 100;
        };

        function findPos(obj) {
            var curleft = 0, curtop = 0;
            if (obj.offsetParent) {
                do {
                    curleft += obj.offsetLeft;
                    curtop += obj.offsetTop;

                } while (obj = obj.offsetParent);
                return { curleft, curtop };
            }

        }

        const range = document.querySelector(".volumebox input[type=range]");

        const barHoverBox = document.querySelector(".volumebox .bar-hoverbox");
        const fill = document.querySelector(".volumebox .bar .bar-fill");

        range.addEventListener("change", (e) => {
            video.volume = e.target.value / 100;
        });

        const setValue = (value) => {
            fill.style.width = value + "%";
            range.setAttribute("value", value)
            range.dispatchEvent(new Event("change"))
        }
        setValue(video.volume * 100);

        const calculateFill = (e) => {
            let offsetX = e.offsetX

            if (e.type === "touchmove") {
                offsetX = e.touches[0].pageX - e.touches[0].target.offsetLeft
            }

            const width = e.target.offsetWidth - 30;

            setValue(
                Math.max(
                    Math.min(
                        (offsetX - 15) / width * 100.0,
                        100.0
                    ),
                    0
                )
            );
        }

        let barStillDown = false;

        barHoverBox.addEventListener("touchstart", (e) => {
            barStillDown = true;

            calculateFill(e);
        }, true);

        barHoverBox.addEventListener("touchmove", (e) => {
            if (barStillDown) {
                calculateFill(e);
            }
        }, true);

        barHoverBox.addEventListener("mousedown", (e) => {
            barStillDown = true;

            calculateFill(e);
        }, true);

        barHoverBox.addEventListener("mousemove", (e) => {
            if (barStillDown) {
                calculateFill(e);
            }
        });

        barHoverBox.addEventListener("wheel", (e) => {
            const newValue = +range.value + e.deltaY * 0.5;

            setValue(Math.max(
                Math.min(
                    newValue,
                    100.0
                ),
                0
            ))
        });

        document.addEventListener("mouseup", (e) => {
            barStillDown = false;
        }, true);

        document.addEventListener("touchend", (e) => {
            barStillDown = false;
        }, true);


    }

    setPlayrate(e, event) {
        event.stopPropagation()
        const video = document.querySelector(".video-container video");
        video.playbackRate = e * 1.0;
    }

    render() {
        return (
            <div className="video-container">
                <video src={this.props.src} poster={this.props.poster}>
                    <track label="English" kind="subtitles" srclang="en" src={"/api/movies/sub?id=" + this.props.srcid} default />

                </video>
                <div className='center-button-container' >
                    <div className='center-button'>
                        <svg
                            className="playing"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                        >
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                        <svg className="paused" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16"></rect>
                            <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                        <div class="loading lds-ring"><div></div><div></div><div></div><div></div></div>
                    </div>
                    <div className='playbackrates' >
                        <div className='list'>
                            {this.state.rates.map(e => <div className='item-rate' data-value={e} onClick={this.setPlayrate}>{e}x</div>)}

                        </div>
                    </div>
                </div>
                <div className="controls-container">
                    <div className="progress-controls">
                        <div id="progress-bar-video" className="progress-bar-video">
                            <div className="watched-bar"></div>
                            <div className="playhead"></div>
                        </div>
                        <div className="time-remaining">00:00</div>
                    </div>
                    <div className="controls">
                        <div>
                            <button className="play-pause">
                                <svg
                                    className="playing"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                                <svg className="paused" viewBox="0 0 24 24">
                                    <rect x="6" y="4" width="4" height="16"></rect>
                                    <rect x="14" y="4" width="4" height="16"></rect>
                                </svg>
                            </button>
                            <button className="rewind">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        fill="#ffffff"
                                        d="M12.5,3C17.15,3 21.08,6.03 22.47,10.22L20.1,11C19.05,7.81 16.04,5.5 12.5,5.5C10.54,5.5 8.77,6.22 7.38,7.38L10,10H3V3L5.6,5.6C7.45,4 9.85,3 12.5,3M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14Z"
                                    />
                                </svg>
                            </button>
                            <button className="fast-forward">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        fill="#ffffff"
                                        d="M10,12V22H8V14H6V12H10M18,14V20C18,21.11 17.11,22 16,22H14A2,2 0 0,1 12,20V14A2,2 0 0,1 14,12H16C17.11,12 18,12.9 18,14M14,14V20H16V14H14M11.5,3C14.15,3 16.55,4 18.4,5.6L21,3V10H14L16.62,7.38C15.23,6.22 13.46,5.5 11.5,5.5C7.96,5.5 4.95,7.81 3.9,11L1.53,10.22C2.92,6.03 6.85,3 11.5,3Z"
                                    />
                                </svg>
                            </button>
                            <div className="volumebox">
                                <button className="volume">
                                    <svg className="full-volume" viewBox="0 0 24 24">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                        <path
                                            d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"
                                        ></path>
                                    </svg>
                                    <svg className="muted" viewBox="0 0 24 24">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                        <line x1="23" y1="9" x2="17" y2="15"></line>
                                        <line x1="17" y1="9" x2="23" y2="15"></line>
                                    </svg>
                                </button> <input type="range" min="0" max="100" value="50" className="volume-range" />

                                <div className="bar-hoverbox">
                                    <div className="bar">
                                        <div className="bar-fill"></div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div>
                            {/* <button className="help">
                            <svg viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"></circle>
                                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                            </svg>
                        </button> 
                        <button className="next">
                            <svg viewBox="0 0 24 24">
                                <polygon points="5 4 15 12 5 20 5 4"></polygon>
                                <line x1="19" y1="5" x2="19" y2="19"></line>
                            </svg>
                        </button>
                        <button className="episodes">
                            <svg viewBox="0 0 24 24">
                                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                <polyline points="2 17 12 22 22 17"></polyline>
                                <polyline points="2 12 12 17 22 12"></polyline>
                            </svg>
                        </button>*/}
                            <button className="captions">
                                <span className="drop-up">
                                    <span className="drop-up-item-parent">
                                        <span className="drop-up-sub-nav">
                                            {
                                                this.state.rates.map(e =>
                                                    <span className="drop-up-item">
                                                        <button className='item-rate' type="button" data-value={e} onClick={this.setPlayrate}>{e}x</button>
                                                    </span>)
                                            }
                                        </span>
                                    </span>
                                </span>
                                <svg viewBox="0 0 20 20">
                                    <path
                                        d="M17 0H3a3 3 0 00-3 3v10a3 3 0 003 3h11.59l3.7 3.71A1 1 0 0019 20a.84.84 0 00.38-.08A1 1 0 0020 19V3a3 3 0 00-3-3zM3.05 9.13h2a.75.75 0 010 1.5h-2a.75.75 0 110-1.5zm3.89 4.44H3.05a.75.75 0 010-1.5h3.89a.75.75 0 110 1.5zm5 0H10a.75.75 0 010-1.5h2a.75.75 0 010 1.5zm0-2.94H8.08a.75.75 0 010-1.5H12a.75.75 0 010 1.5zm5 0H15a.75.75 0 010-1.5h2a.75.75 0 010 1.5z"
                                    />
                                </svg>
                            </button>
                            <button className="cast">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"
                                    ></path>
                                    <line x1="2" y1="20" x2="2.01" y2="20"></line>
                                </svg>
                            </button>

                            <button className="blur-btn">
                                <svg viewBox="0 0 24 24">
                                    <path
                                        d="M2 16.1A5 5 0 0 1 5.9 20M2 12.05A9 9 0 0 1 9.95 20M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6"
                                    ></path>
                                    <line x1="2" y1="20" x2="2.01" y2="20"></line>
                                </svg>
                            </button>
                            <button className="full-screen">
                                <svg className="maximize" viewBox="0 0 24 24">
                                    <path
                                        d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                                    ></path>
                                </svg>
                                <svg className="minimize" viewBox="0 0 24 24">
                                    <path
                                        d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PlayerN;