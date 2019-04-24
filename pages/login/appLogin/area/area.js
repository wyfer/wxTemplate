// pages/login/appLogin/area/area.js
import {cities} from '../../../../common/city';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cities: []
    },
    selectCity(e) {
        let name = e.target.dataset.name
        let value = e.target.dataset.value
        console.log(name,value)

        let pages = getCurrentPages();
        let prevPage = pages[pages.length - 2];  //上一个页面

        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
            areaText: name,
            areaCode: value
        })
        wx.navigateBack();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        this.setData({
            cities: cities
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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

    }
})