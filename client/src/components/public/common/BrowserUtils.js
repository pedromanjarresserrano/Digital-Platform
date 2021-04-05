export const BrowserUtils = {
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    mediaTrack: function(params) {
        let video = document.querySelector('video');
        window.next = () => {
            updateMetadata(params.next());
        }

        window.back = () => {
            updateMetadata(params.back());
        }

        /* Previous Track & Next Track */
        navigator.mediaSession.setActionHandler('previoustrack', () => {
            updateMetadata(params.back());
        });

        navigator.mediaSession.setActionHandler('nexttrack', () => {
            updateMetadata(params.next());
        });
        /* Seek Backward & Seek Forward */

        let defaultSkipTime = 10; /* Time to skip in seconds by default */
        function updatePositionState() {
            if ('setPositionState' in navigator.mediaSession) {
                log('Updating position state...');
                navigator.mediaSession.setPositionState({
                    duration: video.duration,
                    playbackRate: video.playbackRate,
                    position: video.currentTime
                });
            }
        }

        navigator.mediaSession.setActionHandler('seekbackward', function(event) {
            console.log('> User clicked "Seek Backward" icon.');
            const skipTime = event.seekOffset || defaultSkipTime;
            video.currentTime = Math.max(video.currentTime - skipTime, 0);
            updatePositionState();
        });

        navigator.mediaSession.setActionHandler('seekforward', function(event) {
            console.log('> User clicked "Seek Forward" icon.');
            const skipTime = event.seekOffset || defaultSkipTime;
            video.currentTime = Math.min(video.currentTime + skipTime, video.duration);
            updatePositionState();
        });

        /* Play & Pause */

        navigator.mediaSession.setActionHandler('play', async function() {
            console.log('> User clicked "Play" icon.');
            await video.play();
            navigator.mediaSession.playbackState = "playing";
            // Do something more than just playing video...
        });

        navigator.mediaSession.setActionHandler('pause', function() {
            console.log('> User clicked "Pause" icon.');
            video.pause();
            navigator.mediaSession.playbackState = "paused";
            // Do something more than just pausing video...
        });

        /* Stop (supported since Chrome 77) */

        try {
            navigator.mediaSession.setActionHandler('stop', function() {
                console.log('> User clicked "Stop" icon.');
                // TODO: Clear UI playback...
            });
        } catch (error) {
            console.log('Warning! The "stop" media session action is not supported.');
        }

        /* Seek To (supported since Chrome 78) */

        try {
            navigator.mediaSession.setActionHandler('seekto', function(event) {
                console.log('> User clicked "Seek To" icon.');
                if (event.fastSeek && ('fastSeek' in video)) {
                    video.fastSeek(event.seekTime);
                    return;
                }
                video.currentTime = event.seekTime;
                updatePositionState();
            });
        } catch (error) {
            console.log('Warning! The "seekto" media session action is not supported.');
        }



        function updateMetadata(name) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: name
            });
        }

        updateMetadata(params.name)
    }
}