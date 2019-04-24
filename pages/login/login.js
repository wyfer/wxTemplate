// pages/login/login.js
const {login} = require('../../common/common.js');
const appApi = require('../../api/app')
const app = getApp();
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {

    },
    wxLogin: function (e) {
        let that = this;
        let code = null;
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            login().then(res => {
                code = res.code
                return e.detail;
            }).then(userInfo => {
                let params = {
                    code: code,
                    page: 'pages/login/login',
                    scene: '',
                    userInfo: userInfo,
                    system: app.globalData.systemInfo.system,
                    systemVersion: app.globalData.systemInfo.systemVersion,
                    xxxtype: true
                }

                console.log('登录')

                //存储用户信息
                /**
                 * loginType  0 微信登录 1 手机号等方式登录
                 * **/

                wx.setStorageSync('userInfo', res.data.data.userInfo);
                wx.setStorageSync('userWallets', res.data.data.userWallets);
                wx.setStorageSync('token', res.data.data.token);
                wx.setStorageSync('loginType', 0);

                app.globalData.userInfo = res.data.data.userInfo;
                app.globalData.userWallets = res.data.data.userWallets;
                app.globalData.token = res.data.data.token;
                app.globalData.isLogin = true;
                app.globalData.loginType = 0;
                wx.navigateBack({
                    delta: 1
                })

            })

            app.globalData.userInfo = e.detail.userInfo;
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title: '警告',
                content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
                showCancel: false,
                confirmText: '返回授权',
                success: function (res) {
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    }
                }
            })
        }
    },

    phoneLogin: function () {
        wx.navigateTo({
            url: 'phoneLogin/phoneLogin?type=0'
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

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

    },
})

