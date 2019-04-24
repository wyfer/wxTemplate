//判断用户登陆
const checkLogin = () => {
    return new Promise((resolve, reject) => {
        if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
            //判断当前的登录方式
            if (wx.getStorageSync('loginType') == 1) {
                resolve(true)
            } else {
                checkSession().then(() => {
                    resolve(true);
                }).catch(() => {
                    reject(false);
                });
            }
        } else {
            reject(false);
        }
    });
}
const checkSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success: () => {
                resolve(true);
            },
            fail: () => {
                reject(false);
            }
        })
    });
}

//获取用户信息
const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getUserInfo({
            success: (res) => {
                resolve(res)
            },
            fail: () => {
                reject(false)
            }
        })
    })
}

//微信登录
const login = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success: (res) => {
                resolve(res)
            },
            fail: (res) => {
                reject(false)
            }
        })
    })
}

// 获取设备信息
const systemInfo = () => {
    return new Promise((resolve, reject) => {
        wx.getSystemInfo({
            success: (res) => {
                let systemInfo = res
                let arr = systemInfo.system.split(' ')
                systemInfo.system = arr[0]
                systemInfo.systemVersion = arr[1]
                resolve(systemInfo)
            },
            fail: () => {
                resolve(false)
            }
        })
    })
}

//生成随机字符串
const setRandomToken = () => {
    if (!wx.getStorageSync('randomCode')) {
        let str = "";
        let ss = "abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ.#@%$!*&^";
        ss = ss + ss.toUpperCase() + "0123456789";
        for (let i = 0; i < 32; i++) {
            str += ss.charAt(Math.random() * ss.length)
        }
        wx.setStorageSync('randomCode', str)
    }
}

//检查是否存在新版本
const checkUpdate = () => {
    wx.getUpdateManager().onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log("是否有新版本：" + res.hasUpdate);
        if (res.hasUpdate) {//如果有新版本

            // 小程序有新版本，会主动触发下载操作（无需开发者触发）
            wx.getUpdateManager().onUpdateReady(function () {//当新版本下载完成，会进行回调
                wx.showModal({
                    title: '更新提示',
                    content: '新版本已经准备好，单击确定重启应用',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                            wx.getUpdateManager().applyUpdate();
                        }
                    }
                })
            })

            // 小程序有新版本，会主动触发下载操作（无需开发者触发）
            wx.getUpdateManager().onUpdateFailed(function () {//当新版本下载失败，会进行回调
                wx.showModal({
                    title: '提示',
                    content: '检查到有新版本，但下载失败，请检查网络设置',
                    showCancel: false,
                })
            })
        }
    })
}

module.exports = {
    checkLogin,
    login,
    getUserInfo,
    systemInfo,
    setRandomToken,
    checkUpdate
}