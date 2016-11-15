<style src="./style.css" scoped></style>
<template src="./template.html"></template>

<script>
    export default {
        props: {
            src: {
                type: String,
                required: true
            },
            disabledVolume: {
                type: Boolean,
                default: !volumeChangeSupported()
            },
            loop: Boolean,
            poster: String,
            autoplay: Boolean,
            controls: Boolean,
            width: [String, Number],
            height: [String, Number],
            disabledFullScreen: Boolean
        },
        data() {
            return {
                state: {
                    volume: 1,
                    totalTime: 0,
                    error: false,
                    ended: false,
                    currentTime: 0,
                    playing: false,
                    fullScreen: false
                },
                showPoster: false,
                preloadProgress: 0,
                playingProgress: 0,
                isDragProgressBar: false
            }
        },
        computed: {
            showError() {
                return this.state.error
            },
            videoElementRef() {
                return this.$refs.video
            },
            sourceElementRef() {
                return this.$refs.source
            },
            preloadProgressRate() {
                return {width: `${this.preloadProgress}%`}
            },
            size() {
                return {width: `${this.width}px`, height: `${this.height}px`}
            }
        },
        methods: {
            play() {
                if(this.ended){
                    this.ended = false
                    this.state.currentTime = 0
                }

                this.showPoster = false
                this.state.playing = true
                this.videoElementRef.play()
            },
            pause() {
                this.state.playing = false
                this.videoElementRef.pause()
            },
            changeZoom() {
                this.state.fullScreen = !this.state.fullScreen
            },
            changeVolume() {
                this.state.volume = Number(!this.state.volume)
                this.videoElementRef.volume = this.state.volume
                this.videoElementRef.volume = 0
            },
            durationChangeEvent(e) {
                this.state.totalTime = parseInt(e.target.duration, 10) * 1000
            },
            timeUpdateEvent(e) {
                this.state.currentTime = parseInt(e.target.currentTime, 10) * 1000

                if(!this.isDragProgressBar){
                    this.playingProgress = parseInt(e.target.currentTime * 100000 / this.videoElementRef.duration, 10)
                }
            },
            endedEvent(e) {
                this.ended = true
                this.state.playing = false
                this.videoElementRef.removeEventListener('progress', this.progressEvent, false)
                this.loop && this.play()
            },
            errorEvent(e) {
                this.state.error = true
            },
            progressEvent(e) {
                if(this.videoElementRef.buffered.length) {
                    this.preloadProgress = (this.videoElementRef.buffered.end(0) / this.videoElementRef.duration) * 100
                }
            },
            volumeChangeEvent(e) {
                console.log(e)
            },
            startDragProgressBar() {
                this.isDragProgressBar = true
            },
            stopDragProgressBar() {
                this.isDragProgressBar = false
                this.videoElementRef.currentTime = Math.floor(this.playingProgress * (this.videoElementRef.duration / 100000))
            }
        },
        mounted() {
            this.videoElementRef.addEventListener('ended', this.endedEvent, false)
            this.sourceElementRef.addEventListener('error', this.errorEvent, false)
            this.videoElementRef.addEventListener('progress', this.progressEvent, false)
            this.videoElementRef.addEventListener('timeupdate', this.timeUpdateEvent, false)
            this.videoElementRef.addEventListener('volumechange', this.volumeChangeEvent, false)
            this.videoElementRef.addEventListener('durationchange', this.durationChangeEvent, false)

            this.showPoster = Boolean(this.poster)
            this.autoplay && this.play()
        },
        destroyed() {
            this.videoElementRef.removeEventListener('ended', this.endedEvent, false)
            this.sourceElementRef.removeEventListener('error', this.errorEvent, false)
            this.videoElementRef.removeEventListener('progress', this.progressEvent, false)
            this.videoElementRef.removeEventListener('timeupdate', this.timeUpdateEvent, false)
            this.videoElementRef.removeEventListener('volumechange', this.volumeChangeEvent, false)
            this.videoElementRef.removeEventListener('durationchange', this.durationChangeEvent, false)
        },
        filters: {
            format(time) {
                let hours, minutes, seconds

                time = new Date(time)
                seconds = time.getUTCSeconds()
                hours = `${time.getUTCHours()}:`
                minutes = `${time.getUTCMinutes()}:`

                return `${hours === '0:' ? '' : hours}${minutes}${seconds  < 10 ? '0' + seconds : seconds}`
            }
        }
    }

    function volumeChangeSupported() {
        return !(/ipad|iphone|ipod|android|blackberry|windows ce|windows phone|webos|playbook/.exec(navigator.userAgent.toLowerCase()))
    }
</script>
