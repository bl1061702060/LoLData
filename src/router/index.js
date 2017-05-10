import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home/home')), 'home')

const user = r => require.ensure([], () => r(require('../pages/user/user')), 'user')

const hot = r => require.ensure([], () => r(require('../pages/hot/hot')), 'hot')
const free = r => require.ensure([], () => r(require('../pages/hot/children/free')), 'free')
const championRank = r => require.ensure([], () => r(require('../pages/hot/children/championRank')), 'championRank')

const dict = r => require.ensure([], () => r(require('../pages/dict/dict')), 'dict')
const area = r => require.ensure([], () => r(require('../pages/dict/children/area')), 'area')
const champion = r => require.ensure([], () => r(require('../pages/dict/children/champion')), 'champion')
const tierQueue = r => require.ensure([], () => r(require('../pages/dict/children/tierQueue')), 'tierQueue')

const video = r => require.ensure([], () => r(require('../pages/video/video')), 'video')

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
            path: '/user/:id',
            component: user,
            children: []
        },
        // 联盟热区
        {
            path: '/hot',
            component: hot,
            children: [
                // 周免英雄
                {
                    path: 'free',
                    component: free
                },
                // 英雄rank
                {
                    path: 'championRank',
                    component: championRank
                }
            ]
        },
        // 联盟字典
        {
            path: '/dict',
            component: dict,
            children: [
                // 英雄数据
                {
                    path: 'area',
                    component: area
                },
                // 大区数据
                {
                    path: 'champion',
                    component: champion
                },
                // 段位信息
                {
                    path: 'tierQueue',
                    component: tierQueue
                }
            ]
        },
        // 视频
        {
            path: '/video',
            component: video,
            children: []
        }
    ]
}]