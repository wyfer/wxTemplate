// pages/mine/mine.js
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 是否登陆
        isLogin: false,

        // 用户信息
        userAvatarUrl: app.globalData.userInfo.avatar,
        nickName: ''

    },
    getInfo: function (type){
        let that = this;
        that.setData({
            isLogin: app.globalData.isLogin,
            nickName: app.globalData.userInfo.nickName,
            userAvatarUrl: app.globalData.userInfo.avatar
        })
        if(type) wx.stopPullDownRefresh()
    },
    exitLogin: function(){
        //清除用户信息
        wx.removeStorageSync('userInfo');
        wx.removeStorageSync('userWallets');
        wx.removeStorageSync('token');
        wx.removeStorageSync('loginType');

        //赋值
        app.globalData.userInfo = {
            nickName: 'Hi,游客',
            avatar: '/static/icons/mine_author_login.png'
        }
        app.globalData.userWallets = {
            id: 0,
                userId: 0,
                balance: 0,
                powerBalance: 0
        }
        app.globalData.token = ''
        app.globalData.isLogin = false;
        app.globalData.isLecturer = 0
        app.globalData.loginType = 0

        this.getInfo(0)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log('load');
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // console.log('ready');
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this.getInfo(0)
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        // console.log('hide');
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        // console.log('unload');
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.getInfo(1)
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})