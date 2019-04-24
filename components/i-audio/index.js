// components/i-audio/index.js

const bgmer = wx.getBackgroundAudioManager()

const app = getApp()

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        pUrl: {
            type: String,
            value: '',
            observer: function (newVal) {
                if (newVal == this.data.url) {
                    setTimeout(() => {
                        if (bgmer.paused == true) {
                            this.setData({
                                playing: 0
                            })
                        } else {
                            this.timeGo()
                            this.setData({
                                playing: 1
                            })
                        }

                        this.setData({
                            currentTime: app.globalData.currentTime,
                            currentTimeShow: app.globalData.currentTimeShow,
                            duration: app.globalData.duration,
                            durationShow: app.globalData.durationShow
                        })
                    }, 500)
                } else {
                    this.setData({
                        playing: 0
                    })
                }
            }
        },
        url: {
            type: String,
            value: '',
        },
        cid: {
            type: Number,
            observer: function (newVal) {
                this.setData({
                    id: newVal
                })
            }
        },
        idx: {
            type: Number,
        },
        status: {
            type: Number,
            observer: function (newVal) {
                this.setData({
                    playing: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        currentTime: 0,
        currentTimeShow: '00:00',
        playing: 0,
        url: '',
        idx: 0,
        id: 0,
        duration: 0,
        durationShow: '00:00',
        playId: 0,
        playUrl: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        formatTime: function (t) {
            let duration = parseInt(t)
            var other = duration % 3600;
            var minute = Math.floor(other / 60);
            if (minute < 10) minute = '0' + minute
            var second = (other % 60)
            if (second < 10) second = '0' + second
            return minute + ':' + second
        },
        playAudio: function (e) {
            let that = this
            let id = e.target.dataset.idx
            let url = e.target.dataset.url

            bgmer.title = 'List Comment Audio ' + id;
            bgmer.coverImgUrl = '';
            // 设置了 src 之后会自动播放
            bgmer.src = url;
            bgmer.startTime = that.data.currentTime

            app.globalData.playingPath = url

            that.setData({
                playing: 1,
                playId: id,
                playUrl: url
            })

            that.triggerEvent('parentReceive', {url: that.data.url}, {})

            bgmer.onPause(() => {
                that.setData({
                    playing: 0
                })
            })

            bgmer.onStop(() => {
                that.setData({
                    playing: 0
                })
            })

            bgmer.onEnded((e) => {
                that.setData({
                    playing: 0
                })
            })

            bgmer.onError(() => {
                that.setData({
                    playing: 0
                })
                console.log('出现了一点问题')
            })

            bgmer.onPlay(() => {
                that.timeGo()
            })
        },

        pauseAudio: function (e) {
            bgmer.pause();
            this.setData({
                playing: 0
            })
        },

        /**
         * slider
         * **/
        sliderChange: function (e) {
            let that = this
            if(bgmer.src == this.data.url){
                bgmer.seek(e.detail.value)
                that.setData({
                    currentTime: e.detail.value
                })
            }
        },

        timeGo: function () {
            bgmer.onTimeUpdate(() => {
                app.globalData.currentTime = bgmer.currentTime
                app.globalData.currentTimeShow = this.formatTime(bgmer.currentTime)
                app.globalData.duration= bgmer.duration
                app.globalData.durationShow= this.formatTime(bgmer.duration)


                this.setData({
                    currentTime: bgmer.currentTime,
                    currentTimeShow: this.formatTime(bgmer.currentTime),
                    duration: bgmer.duration,
                    durationShow: this.formatTime(bgmer.duration),
                })
            })
        }
    },
    behaviors: {

    },
    pageLifetimes: {
        //组件重新显示
        show() {
            if (app.globalData.playingPath == this.data.url) {
                if (typeof(bgmer.paused) == "undefined") {
                    this.setData({
                        playing: 0
                    })
                } else if (bgmer.paused == false) {
                    this.timeGo()
                    this.setData({
                        playing: 1
                    })
                } else if (bgmer.paused == true) {
                    this.setData({
                        playing: 0,
                        currentTime: bgmer.currentTime,
                        currentTimeShow: this.formatTime(bgmer.currentTime),
                    })
                }
            } else {
                this.setData({
                    playing: 0
                })
            }
        }
    },
    //组件移除
    detached() {

    },
})
