/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */
let baseUrl
let token
let routerMode
let contentType

if (process.env.NODE_ENV === 'development') {
    baseUrl = '/api'
    routerMode = 'history'
    token = {
        'key': 'DAIWAN-API-TOKEN',
        'value': '96066-09404-F9B90-100E0'
    }
    contentType = 'text/html; charset=utf-8'
} else {
    baseUrl = '/api'
    routerMode = 'hash'
    token = {
        'key': 'DAIWAN-API-TOKEN',
        'value': '96066-09404-F9B90-100E0'
    }
    contentType = 'text/html; charset=utf-8'
}
export {
    baseUrl,
    token,
    routerMode,
    contentType
}