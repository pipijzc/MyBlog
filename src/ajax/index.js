import axios from 'axios'
import store from '../store/index'
import router from '../router/index'
// import { Message } from 'element-ui'
axios.interceptors.request.use(
    config => {
        if (store.state.Authorization) {
            config.headers.Authorization = store.state.Authorization;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });
axios.interceptors.response.use(
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    // 服务器状态码不是2开头的的情况
    // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
    error => {
        if (error) {
            switch (error.response.status) {
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面                
                case 403:
                    // console.log('stat');
                    ELEMENT.Message.error({
                            message: '登录过期',
                            type: 'warning'
                        })
                        // 清除token
                    localStorage.removeItem('token');
                    store.dispatch('getTokens', '')
                    setTimeout(() => {
                        router.replace('/login');
                    }, 1000);
                    break;
            }
            return Promise.reject(error.response);
        }
    }
)
export default function ajax(url, data = {}, type = 'GET') {
    return new Promise(function(resolve, reject) {
        // 执行异步ajax请求
        let promise
        if (type === 'GET') {
            // 准备url query参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url)
        } else {
            // 发送post请求
            promise = axios.post(url, data)
        }
        promise.then(function(response) {
            // 成功了调用resolve()
            resolve(response.data)
        }).catch(function(error) {
            //失败了调用reject()
            reject(error)
        })
    })
}