import interceptors from "../mean/interceptors";

const {base, WxRequest} = require('base');

class Service extends WxRequest {
    constructor(options) {
        super(options)
        // this.$$prefix = '/user'
        this.$$path = {

        }
        // 在此也可注入拦截器
        this.interceptors.use(interceptors)
    }

}

const indexApi = new Service(base)
export default indexApi