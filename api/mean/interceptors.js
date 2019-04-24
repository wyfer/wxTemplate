const interceptors = {
    request(request) {

        //请求参数，header

        if (system == 'iOS') {

        } else if (system == 'Android') {

        }

        //token
        request.header['enjoyapp-info-token'] = wx.getStorageSync('token');

        //通信协议更改
        if (request.data) {
            if (request.data.xxxtype) {
                request.header['Content-Type'] = 'application/json'
            } else {
                request.header['Content-Type'] = 'application/x-www-form-urlencoded'
            }
        }

        wx.showLoading({
            title: '加载中...',
        })
        return request
    },
    requestError(requestError) {
        wx.hideLoading()
        return Promise.reject(requestError)
    },
    response(response) {

        //登录过期等判断
        if(response.data.code == 100){
            wx.navigateTo({
                url: '/pages/login/login',  //跳转页面的路径，可带参数 ？隔开，不同参数用 & 分隔；相对路径，不需要.wxml后缀
            })
        }
        wx.hideLoading()
        return response
    },
    responseError(responseError) {
        wx.hideLoading()
        return Promise.reject(responseError)
    },
}


export default interceptors