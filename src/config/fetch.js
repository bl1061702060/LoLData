/**
 * 定义获取数据的通用方法
 */
import { baseUrl, token, contentType } from './env'
import axios from 'axios'

export default async(type = 'get', url = '', params = {}, mothod = 'axios') => {
    let res = null
        // 使用axios
    if (mothod === 'axios') {
        type = type.toLowerCase()
        await axios({
            method: type,
            url: url,
            baseURL: baseUrl,
            // `params` are the URL parameters to be sent with the request
            params: params,
            headers: {
                'Content-Type': contentType,
                [token.key]: token.value
            },
            // `data` is the data to be sent as the request body
            // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
            // When no `transformRequest` is set, must be a string, an ArrayBuffer or a hash
            data: JSON.stringify(params),
            // `timeout` specifies the number of milliseconds before the request times out.
            // If the request takes longer than `timeout`, the request will be aborted.
            timeout: 1000,
            // `transformRequest` allows changes to the request data before it is sent to the server
            // This is only applicable for request methods 'PUT', 'POST', and 'PATCH'
            // The last function in the array must return a string or an ArrayBuffer
            transformRequest: [function (data) {
                // Do whatever you want to transform the data
                return data
            }],
            // `transformResponse` allows changes to the response data to be made before
            // it is passed to then/catch
            transformResponse: [function (data) {
                // Do whatever you want to transform the data
                return data
            }]
        }).then(response => {
            // 处理返回
            let obj = response.data
            if (typeof obj !== 'object') {
                obj = JSON.parse(obj)
            }
            res = obj
        }).catch(response => {
            // 错误处理
            if (response instanceof Error) {
                // Something happened in setting up the request that triggered an Error
                throw new Error(response.message)
            } else {
                // The request was made, but the server responded with a status code
                // that falls out of the range of 2xx 这里还要对不是2xx的状态进行处理
                console.log(response.data)
                console.log(response.status)
                console.log(response.headers)
                console.log(response.config)
            }
        })
    } else {
        await new Promise(function (resolve, reject) {
            // 使用原生js
            let requestObj
            url = baseUrl + url
            type = type.toUpperCase()

            if (type === 'GET') {
                let dataStr = '' // 数据拼接字符串
                Object.keys(params).forEach(key => {
                    dataStr += key + '=' + params[key] + '&'
                })

                if (dataStr !== '') {
                    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
                    url = url + '?' + dataStr
                }
            }

            if (window.XMLHttpRequest) {
                requestObj = new XMLHttpRequest()
                if (requestObj.overrideMimeType) {
                    requestObj.overrideMimeType('text/xml')
                }
            } else if (window.ActiveXObject) {
                // try {
                //     requestObj = new ActiveXObject('Msxml2.XMLHTTP')
                // } catch (e) {
                //     try {
                //         requestObj = new ActiveXObject('Microsoft.XMLHTTP')
                //     } catch (e) {}
                // }
            }

            let sendData = ''
            if (type === 'POST') {
                sendData = JSON.stringify(params)
            }

            requestObj.open(type, url, true)
            requestObj.setRequestHeader('Content-type', contentType)
            requestObj.setRequestHeader(token.key, token.value)
            requestObj.onreadystatechange = () => {
                if (requestObj.readyState === 4) {
                    if (requestObj.status === 200) {
                        let obj = requestObj.response
                        if (typeof obj !== 'object') {
                            obj = JSON.parse(obj)
                        }
                        resolve(obj)
                    } else {
                        reject(new Error(requestObj.response))
                    }
                }
            }
            requestObj.onerror = function () {
                reject(new Error('XMLHttpRequest Error: ' + this.statusText))
            }
            requestObj.send(sendData)
        }).then(function (value) {
            res = value
        }, function (error) {
            throw error
        })
    }
    return res
}