# lol_data
## 这是一个查询英雄联盟数据的网站，使用Vue + Vuex + ElementUI 开发，后台是使用daiwan的第三方接口。
> a web app for search lol game data

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## 1. 运行帮助

> 目前项目使用的是daiwan 提供的临时token，可以自己到 http://api.games-cube.com/ 注册获取 ，然后在 src/config/env.js 下替换成你申请的token 就可以了：

``` javascript

    baseUrl = '/api'
    vbaseUrl = '/vapi'
    routerMode = 'hash'
    token = {
        'key': 'DAIWAN-API-TOKEN',
        'value': '5954F-B3B3B-AA81B-3BFC3' // 这是英雄联盟的token
    }
    vtoken = {
        'key': 'DAIWAN-API-TOKEN',
        'value': 'F8BFF-B893B-ABBB7-744BB' // 这是视频的 token
    }
    contentType = 'text/html; charset=utf-8'
```

## 2. 项目Demo
>https://bl1061702060.github.io/LoLData