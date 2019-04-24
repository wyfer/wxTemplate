//app.js
const {checkLogin, systemInfo, setRandomToken} = require('common/common.js');
App({
    onLaunch: function () {
        let that = this;
        //生成随机字符串
        setRandomToken()
        //验证是否已经登录
        checkLogin().then(res => {
            console.log('已登录')
            that.globalData.userInfo = wx.getStorageSync('userInfo');
            that.globalData.userWallets = wx.getStorageSync('userWallets');
            that.globalData.token = wx.getStorageSync('token');
            that.globalData.isLogin = true;
        }).catch(error => {
            console.log('未登录 =>' + error)
        });

        //获取设备信息
        systemInfo().then(res => {
            that.globalData.systemInfo = res
            wx.setStorageSync('system', res.system)
            wx.setStorageSync('systemVersion', res.systemVersion)
        })


        //背景音频判断
        const bgmer = wx.getBackgroundAudioManager()

        if (typeof(bgmer.src) !== "undefined"){
            that.globalData.playingPath = bgmer.src
        }

    },

    globalData: {
        systemInfo: {},
        isLogin: false,
        loginType: 0,
        userInfo: {
            nickName: 'Hi,游客',
            avatar: '/static/icons/mine_author_login.png'
        },
        userWallets: {
            id: 0,
            userId: 0,
            balance: 0,
            powerBalance: 0
        },
        token: '',

        //音频
        playingPath: '',
        currentTime: 0,
        currentTimeShow: '00:00',
        duration: 0,
        durationShow: '00:00'
    }
})