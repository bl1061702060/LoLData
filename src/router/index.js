import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')
const user = r => require.ensure([], () => r(require('../pages/user/user')), 'user')
const hot = r => require.ensure([], () => r(require('../pages/hot/hot')), 'hot')

export default [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [ // 二级路由
        // 地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        // 首页搜索页面
        {
            path: '/home',
            component: home
        },
        // 用户区域
        {
            path: '/user',
            component: user,
            children: []
        },
        // 联盟热区
        {
            path: '/hot',
            component: hot,
            children: []
        }
    ]
}]