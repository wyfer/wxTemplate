// pages/login/appLogin/appLogin.js
import WxValidate from '../../../element/wx-validate/WxValidate.js'
const {md5} = require('../../../utils/md5.util')

const app = getApp()

var countdown = 60;
var settime = function (that) {
    if (countdown == 0) {
        that.setData({
            disabled: false,
            codename: '重新发送'
        })
        countdown = 60;
        return;
    } else {
        that.setData({
            disabled: true,
            codename: countdown + 's后可重发'
        })
        countdown--;
    }
    setTimeout(function () {
            settime(that)
        }
        , 1000)
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        select_tab: 0,
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo'),


        //验证码
        areaText: '中国',
        areaCode: '86',
        phoneCode: '',
        securityCode: '',
        pwdCode: '',
        pwdLine: 0,

        codename: '获取验证码',
        typeLine: 1,
        phoneLine: 0,
        codeLine: 0,
        disabled: false,
        canClick: false,
        code: {},

        // 底部弹出框
        actionShow: false,
        actions: [
            {
                name: '短信验证码',
            },
            {
                name: '语音验证码'
            }
        ],
    },

    onappselect(event) {
        this.setData({
            select_tab: event.currentTarget.dataset.id
        });
    },

    //验证函数
    initValidate() {
        const rules = {
            phone: {
                required: true,
                tel: true
            }
        }
        const messages = {
            phone: {
                required: '请填写手机号',
                tel: '请填写正确的手机号'
            }
        }
        this.WxValidate = new WxValidate(rules, messages);
    },
    /**
     * 调用验证函数
     * **/
    formSubmit: function (e) {
        let that = this;
        console.log('form发生了submit事件，携带的数据为：', e.detail.value)
        const params = e.detail.value
        //校验表单
        if (!that.WxValidate.checkForm(params)) {
            const error = that.WxValidate.errorList[0]
            console.log(error.msg)
            return false
        }

        let type = that.data.select_tab

        if (type == 0) {
            if (that.data.securityCode.length <= 0) {
                console.log('请填写验证码')
                return false
            }

            console.log('验证码登陆')

        } else {
            if (that.data.pwdCode.length <= 0) {
                console.log('请填写密码')
                return false
            }

            console.log('密码登陆')
        }
    },
    /**
     * 登录后保存信息
     * **/
    saveLogin(res) {
        console.log(res)
        //存储用户信息
        wx.setStorageSync('userInfo', res.data.data.userInfo);
        wx.setStorageSync('userWallets', res.data.data.userWallets);
        wx.setStorageSync('token', res.data.data.token);
        wx.setStorageSync('loginType', 1);

        app.globalData.userInfo = res.data.data.userInfo;
        app.globalData.userWallets = res.data.data.userWallets;
        app.globalData.token = res.data.data.token;
        app.globalData.isLogin = true;
        app.globalData.loginType = 1;
        wx.navigateBack({
            delta: 2
        })
    },
    /**
     * 发送短信
     * **/
    handleClickItem({detail}) {
        let that = this
        const index = detail.index;
        const area = that.data.areaCode
        const mobile = that.data.phoneCode

        let params = {
            mode: index,
            mobile: area + '-' + mobile,

        }

        console.log('发送短信')

    },
    handleCancel() {
        this.setData({
            actionShow: false
        });
    },
    getVerificationCode() {
        let that = this;
        let telephone = that.data.phoneCode
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(telephone)) {
            console.log('请输入正确的手机号码')
            return false;
        } else {
            that.setData({
                actionShow: true
            })
        }
    },
    /**
     * 输入下划线
     * **/

    showPwdLine(e) {
        let that = this;
        let s = e.detail.value.length;
        if (s > 0) {
            that.setData({
                pwdLine: 1
            })
        } else {
            that.setData({
                pwdLine: 0
            })
        }

        that.setData({
            pwdCode: e.detail.value
        })
    },

    showPhoneLine(e) {
        let that = this;
        let s = e.detail.value.length;
        if (s > 0) {
            that.setData({
                phoneLine: 1,
                canClick: true
            })
        } else {
            that.setData({
                phoneLine: 0,
                canClick: false
            })
        }

        that.setData({
            phoneCode: e.detail.value
        })
    },
    showCodeLine(e) {
        let that = this;
        let s = e.detail.value.length;
        if (s > 0) {
            that.setData({
                codeLine: 1
            })
        } else {
            that.setData({
                codeLine: 0
            })
        }

        that.setData({
            securityCode: e.detail.value
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        if (options.type) {
            if (options.type == 1) {
                wx.setNavigationBarTitle({
                    title: '绑定手机号码'
                });

                that.setData({
                    code: options.code
                })
            }
        }
        this.initValidate()
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