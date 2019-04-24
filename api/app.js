import base from 'mean/base'
import WxRequest from '../element/wx-request/lib/index'
import interceptors from 'mean/interceptors'

class Service extends WxRequest {
    constructor(options) {
        super(options)
        // this.$$prefix = '/user'
        this.$$path = {
            loginByWx: '/login_by_weixin',
            sendIdentityValidate: '/sms/send_identity_validate',
            accountSimpleLogin: '/account_simple_login',
            accountLogin: '/account_login',
            sendLogin: 'sms/send_login'
        }
        // 在此也可注入拦截器
        this.interceptors.use(interceptors)
    }

    /**
     * 微信授权登录
     * **/
    loginByWx(params) {
        return this.postRequest(this.$$path.loginByWx, params)
    }

    /**
     * 发送短信身份验证
     * **/
    sendIdentityValidate(params) {
        return this.postRequest(this.$$path.sendIdentityValidate, params)
    }

    /**
     * 发送短信登录验证
     * **/
    sendLogin(params) {
        return this.postRequest(this.$$path.sendLogin, params)
    }

    /**
     * 手机号码+验证码登录
     * **/
    accountSimpleLogin(params) {
        return this.postRequest(this.$$path.accountSimpleLogin, params)
    }

    /**
     * 手机号码+密码登录
     * **/
    accountLogin(params) {
        return this.postRequest(this.$$path.accountLogin, params)
    }

}

const appApi = new Service(base)
module.exports = appApi