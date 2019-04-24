//index.js
const app = getApp()

const indexPage = {
    data: {
        playingPath: '',
        list:[
            {
                id: 0,
                name: '测试音乐0',
                src: 'http://isure.stream.qqmusic.qq.com/C400003FIqDQ0xyaGF.m4a?guid=7686466072&vkey=56C9955E73E5906BA180CEE0DF586F340E4EC7E36FE69CC81FD24E36D421660EFBA684E80C87E8E184AA6885362FF29729B640EB79E7F7FE&uin=0&fromtag=66',
                isPlaying: 0,
            },
            {
                id: 1,
                name: '测试音乐1',
                src: 'http://223.99.245.19/amobile.music.tc.qq.com/C4000045Cv9U2MGGjv.m4a?guid=7686466072&vkey=C56ADBDE4BCFC5B79810D01248957DCE70F0EC5F2D1EB767C0F79CDD6DBCCD51D4221EF573FD8037DADA553987BBBC1E59CAC10687DA00E3&uin=0&fromtag=66',
                isPlaying: 0,
            },
            {
                id: 2,
                name: '测试音乐2',
                src: 'http://223.99.245.19/amobile.music.tc.qq.com/C400003YYX4K3gTZBT.m4a?guid=7686466072&vkey=AF768FC864AB3F3990BAFD624B4427810A309F06CCBCBAC8C2079EAB96458BF8AE945431332194FFB0CF733974139995A729F40295E3BF7A&uin=0&fromtag=66',
                isPlaying: 0,
            }
        ]
    },
    parentCallBack(e){
        console.log(e)
        this.setData({
            //获取音频路径，进行全局刷新
            playingPath: e.detail.url
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {

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
};

Page(indexPage);
