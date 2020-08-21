import axios from 'axios'
import url from '../api'

export function request(config) {
    //创建axios实例
    const instance = axios.create({
            baseURL: url.BaseUrl,
            timeout: 5000
        })
        //发送请求
    return instance(config)
}