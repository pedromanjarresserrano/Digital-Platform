export const BrowserUtils = {
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    mediaTrack: function(params) {
        let video = document.querySelector('video');

        function onPlayButtonClick() {
            playVideo();
        }

        function playVideo() {
            video.play()
                .then(_ => updateMetadata())
                .catch(error => log(error.message));
        }


        /* Seek Backward & Seek Forward */

        let defaultSkipTime = 10; /* Time to skip in seconds by default */

        navigator.mediaSession.setActionHandler('seekbackward', function(event) {
            log('> User clicked "Seek Backward" icon.');
            const skipTime = event.seekOffset || defaultSkipTime;
            video.currentTime = Math.max(video.currentTime - skipTime, 0);
            updatePositionState();
        });

        navigator.mediaSession.setActionHandler('seekforward', function(event) {
            log('> User clicked "Seek Forward" icon.');
            const skipTime = event.seekOffset || defaultSkipTime;
            video.currentTime = Math.min(video.currentTime + skipTime, video.duration);
            updatePositionState();
        });

        /* Play & Pause */

        navigator.mediaSession.setActionHandler('play', async function() {
            log('> User clicked "Play" icon.');
            await video.play();
            navigator.mediaSession.playbackState = "playing";
            // Do something more than just playing video...
        });

        navigator.mediaSession.setActionHandler('pause', function() {
            log('> User clicked "Pause" icon.');
            video.pause();
            navigator.mediaSession.playbackState = "paused";
            // Do something more than just pausing video...
        });

        /* Stop (supported since Chrome 77) */

        try {
            navigator.mediaSession.setActionHandler('stop', function() {
                log('> User clicked "Stop" icon.');
                // TODO: Clear UI playback...
            });
        } catch (error) {
            log('Warning! The "stop" media session action is not supported.');
        }

        /* Seek To (supported since Chrome 78) */

        try {
            navigator.mediaSession.setActionHandler('seekto', function(event) {
                log('> User clicked "Seek To" icon.');
                if (event.fastSeek && ('fastSeek' in video)) {
                    video.fastSeek(event.seekTime);
                    return;
                }
                video.currentTime = event.seekTime;
                updatePositionState();
            });
        } catch (error) {
            log('Warning! The "seekto" media session action is not supported.');
        }
    }
}