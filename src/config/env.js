/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl
let vbaseUrl
let token
let vtoken
let routerMode
let contentType

if (process.env.NODE_ENV === 'development') {
    baseUrl = '/api'
    vbaseUrl = '/vapi'
    routerMode = 'hash'
    token = {
        'key': 'DAIWAN-API-TOKEN',
        'value': '5954F-B3B3B-AA81B-3BFC3'
    }
    vtoken = {
        'key': 'DAIWAN-API-TOKEN',
        'value': 'F8BFF-B893B-ABBB7-744BB'
    }
    contentType = 'text/html; charset=utf-8'
} else {
    baseUrl = '/api'
    vbaseUrl = '/vapi'
    routerMode = 'hash'
    token = {
        'key': 'DAIWAN-API-TOKEN',
        'value': '5954F-B3B3B-AA81B-3BFC3'
    }
    vtoken = {
        'key': 'DAIWAN-API-TOKEN',
        'value': 'F8BFF-B893B-ABBB7-744BB'
    }
    contentType = 'text/html; charset=utf-8'
}
export {
    baseUrl,
    vbaseUrl,
    token,
    vtoken,
    routerMode,
    contentType
}