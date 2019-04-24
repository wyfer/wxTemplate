import path from 'path'
import {promisify} from "../utils/promise.util";

const wxUploadFile = promisify(wx.uploadFile)

/**
 * 图片上传
 * **/
const upApi = (pics) => {
    wx.showLoading({
        title: '请稍后...',
    })

    return new Promise((resolve, reject) => {
        const arr = pics.map(item => {
            return wxUploadFile({
                url: path.up_url,
                filePath: item,
                name: 'mini_update',
                formData: {

                }
            })
        })

        Promise.all(arr).then(res => {
            const resArr = res.map(res => {
                if (typeof res.data === 'string') {
                    try {
                        res.data = JSON.parse(res.data)
                        if (res.data.code == 0) {
                            res.ossUrl = res.data.result[0].ossUrl
                        } else {
                            res.ossUrl = ''
                        }
                    } catch (e) {
                    }
                }
                return res
            })
            resolve(resArr)
            wx.hideLoading()
        })
    })
}


/**
 * 音频上传
 * **/
const upFileAudio = (file) => {
    wx.showLoading({
        title: '正在上传...',
    })

    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: path.up_url,
            filePath: file,
            name:"file_audio",//后台要绑定的名称
            //参数绑定
            formData:{

            },
            success:function(res){
                console.log(res)
                wx.hideLoading()
                if (typeof res.data === 'string') {
                    try {
                        res.data = JSON.parse(res.data)
                        if (res.data.code == 0) {
                            res.ossUrl = res.data.result[0].ossUrl
                        } else {
                            res.ossUrl = ''
                        }
                    } catch (e) {
                    }
                }
                resolve(res);
            },
            fail: function(err){
                console.log(err)
                wx.hideLoading()
                reject(false);
            }
        })
    })
}

/**
 * 视频上传
 * **/
const upFileVideo = (file) => {
    wx.showLoading({
        title: '正在上传...',
    })

    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: path.up_url,
            filePath: file,
            name:"file_video",//后台要绑定的名称
            //参数绑定
            formData:{

            },
            success:function(res){
                console.log(res)
                wx.hideLoading()
                if (typeof res.data === 'string') {
                    try {
                        res.data = JSON.parse(res.data)
                        if (res.data.code == 0) {
                            res.ossUrl = res.data.result[0].ossUrl
                        } else {
                            res.ossUrl = ''
                        }
                    } catch (e) {
                    }
                }
                resolve(res);
            },
            fail: function(err){
                console.log(err)
                wx.hideLoading()
                reject(false);
            }
        })
    })
}

module.exports = {
    upApi,
    upFileAudio,
    upFileVideo
}