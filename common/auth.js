//强制用户启用录音功能
const authRecord = (authHandler) => {
    return new Promise(function (resolve, reject) {
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.record']) {
                    wx.authorize({
                        scope: 'scope.record',
                        complete() {
                            resolve(openSetting_record(authHandler))
                        }
                    })
                }
            }
        })
    });
}
const openSetting_record = (authHandler) => {
    return new Promise(function (resolve, reject) {
        wx.getSetting({
            success(res) {
                if (!res.authSetting['scope.record']) {
                    wx.showModal({
                        title: '',
                        content: '请先完成授权！在设置页面中勾选“录音功能”选项，否则部分功能将受限。',
                        showCancel: true,
                        confirmText: '前去设置',
                        confirmColor: '#004b97',
                        success: function (res) {
                            if (res.confirm) {
                                wx.openSetting({
                                    success: (res) => {
                                        res.authSetting = {
                                            'scope.record': true,
                                        };
                                    },
                                    complete: function (res) {
                                        openSetting_record(authHandler);
                                    },
                                })
                            }
                            if (res.cancel) {
                                resolve(false)
                                // openSetting_record(authHandler); //强制授权
                            }
                            if (!res.confirm && !res.cancel) {
                                openSetting_record(authHandler);
                            }
                        }
                    });
                } else {
                    authRecord(authHandler);
                }
            }
        })
    });
}

module.exports = {
    authRecord
}