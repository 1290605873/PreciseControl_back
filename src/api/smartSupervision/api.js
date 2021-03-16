import axios from 'axios';
import config from './apiServerConfig';
import qs from 'qs';
// import Cookies from 'js-cookie'
// import router from '@/router'

// 使用vuex做全局loading时使用
// import store from '@/store'




export default function $axios(options) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            // baseURL: config.baseURL,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                // 上正式及测试需将以下代码注释  by tan 2020-05-22
                 // 'applicationcontext':'eyJBcHBQYWNrQWNjVG9rZW4iOm51bGwsIkVtcGxveWVlSWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMDAwMC0wMDAwMDAwMDAwMDAiLCJJRCI6bnVsbCwiTGF0aXR1ZGUiOm51bGwsIkxvZ2luQ3VycmVudEN1bHR1cmUiOjAsIkxvZ2luRGVwYXJ0bWVudCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIkxvZ2luRGVwYXJ0bWVudE5hbWUiOm51bGwsIkxvZ2luSVAiOm51bGwsIkxvZ2luT3JnIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiTG9naW5PcmdDb2RlIjoiIiwiTG9naW5PcmdOYW1lIjoiIiwiTG9naW5UZW5hbnRJZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDAwMDAwMDAwMCIsIkxvZ2luVGVuYW50TmFtZSI6bnVsbCwiTG9naW5UaW1lIjoiXC9EYXRlKDE1NjQzODQ3MDIyMzgrMDgwMClcLyIsIkxvZ2luVXNlckNvZGUiOiIxODYxMDY3NDEyNiIsIkxvZ2luVXNlcklEIjoiNmE3ZDIxZWItNjAzMS00ZjAxLTg3MjYtMDk5YTg0NzZiN2FiIiwiTG9naW5Vc2VyTmFtZSI6IjE4NioqKio0MTI2IiwiTG9uZ2l0dWRlIjpudWxsLCJTZXNzaW9uSUQiOiI5YjdkZDljZi05ZWJjLTRkZTYtYjFhYS1jNDY2OTk3NjgyYmEifQ=='

            },
            timeout: 1000*60*10, // request timeout
            transformResponse: [function (data) {
            }],
        });

        // request 拦截器
        instance.interceptors.request.use(
            config => {
                // let token = Cookies.get('CookieContextDTO');
                // window.console.log(token);
                // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
                // window.console.log(store.state.loading)
                // window.console.log('准备发送请求...')
                // 2. 带上token
                // if (token) {
                //     config.headers.accessToken = token
                // }
                // else {
                //     // 重定向到登录页面
                //     router.push('/login')
                // }
                // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
                config.headers = Object.assign(config.method === 'get' ? {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                } : {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }, config.headers);

                if (config.method === 'post') {

                  const contentType = config.headers['Content-Type'];
                  // 根据Content-Type转换data格式
                  if (contentType) {
                      if (contentType.includes('multipart')) { // 类型 'multipart/form-data;'
                          config.data = config.data;
                      } else if (contentType.includes('json')) { // 类型 'application/json;'
                          // 服务器收到的raw body(原始数据) "{name:"heywei",age:"18"}"（普通字符串）
                          config.data = JSON.stringify(config.data);
                      } else { // 类型 'application/x-www-form-urlencoded;'
                          // 服务器收到的raw body(原始数据) name=nowThen&age=18
                          config.data = QS.stringify(config.data);
                      }
                  }
                }
                return config
            },

            error => {
                // 请求错误时
                // window.window.console.log('request:', error)
                // 1. 判断请求超时n
                if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
                    //window.console.log('timeout请求超时')
                    // return service.request(originalRequest);//再重复请求一次
                }
                // 2. 需要重定向到错误页面
                const errorInfo = error.response;
                //window.console.log(errorInfo)
                // if (errorInfo) {
                //     //error =errorInfo.data  //页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
                //     const errorStatus = errorInfo.status; // 404 403 500 ...
                //     router.push({
                //         path: `/error/${errorStatus}`
                //     })
                // }
                return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
            }
        );

        // response 拦截器
        instance.interceptors.response.use(
            response => {
                let data;
                // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
                if (response.data == undefined) {
                    try{
                        data = JSON.parse(response.request.responseText)
                    }catch{
                        data = response.request.responseText
                    }
                } else {
                    data = response.data
                }

                // 根据返回的code值来做不同的处理
                switch (data.rc) {
                    case 1:
                        window.console.log(data.desc)
                        break;
                    case 0:
                        // store.commit('changeState')
                        // window.console.log('登录成功')
                        break;
                    default:
                }
                // 若不是正确的返回code，且已经登录，就抛出错误
                // const err = new Error(data.desc)
                // err.data = data
                // err.response = response
                // throw err


                return data
            },
            err => {
                if (err && err.response) {
                    switch (err.response.status) {
                        case 400:
                            err.message = '请求错误'
                            break

                        case 401:
                            err.message = '未授权，请登录'
                            break

                        case 403:
                            err.message = '拒绝访问'
                            break

                        case 404:
                            err.message = `请求地址出错: ${err.response.config.url}`
                            break

                        case 408:
                            err.message = '请求超时'
                            break

                        case 500:
                            err.message = '服务器内部错误'
                            break

                        case 501:
                            err.message = '服务未实现'
                            break

                        case 502:
                            err.message = '网关错误'
                            break

                        case 503:
                            err.message = '服务不可用'
                            break

                        case 504:
                            err.message = '网关超时'
                            break

                        case 505:
                            err.message = 'HTTP版本不受支持'
                            break

                        default:
                    }
                }
                // window.console.error(err)
                return Promise.reject(err) // 返回接口返回的错误信息
            }
        )

        // 请求处理
        instance(options).then(res => {
            resolve(res)
            return false
        }).catch(error => {
            reject(error)
        })
    })
}
