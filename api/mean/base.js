import path from '../path'

const base = {
    baseURL: path.base_url,
    // `dataType` 表示服务器响应的数据类型
    // dataType: 'JSON',
    // `headers` 是即将被发送的自定义请求头
    header: {
        // 'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    },
    // `transformResponse` 转换响应数据
    transformResponse: [
        (data, header) => {
            if (typeof data === 'string') {
                try {
                    data = JSON.parse(data)
                } catch (e) { /* Ignore */ }
            }
            return data
        },
    ],
    // 基于响应状态返回成功或失败
    validateStatus: status => status >= 200 && status < 300,
}


export default base