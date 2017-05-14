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
        'value': 'A8F53-71123-A3217-AAF83'
    }
    vtoken = {
        'key': 'DAIWAN-API-TOKEN',
        'value': 'CA4FC-65DA1-234C4-D86CC'
    }
    contentType = 'text/html; charset=utf-8'
} else {
    baseUrl = '/api'
    vbaseUrl = '/vapi'
    routerMode = 'hash'
    token = {
        'key': 'DAIWAN-API-TOKEN',
        'value': 'A8F53-71123-A3217-AAF83'
    }
    vtoken = {
        'key': 'DAIWAN-API-TOKEN',
        'value': 'CA4FC-65DA1-234C4-D86CC'
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