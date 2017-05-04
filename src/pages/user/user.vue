<template>
    <div>
        <lo-header :activeIndex="activeIndex"></lo-header>
        <main>
            <ul v-if="showHistory">
                <li class="h-link" v-for="item in searchHistory" @click="search(item)">
                    {{ item }}
                </li>
            </ul>
            <el-table v-else :data="userAreaList"  fit highlight-current-row>
                <el-table-column align="center"
                    :formatter="getAreaName"
                    prop="area_id" 
                    label="大区">
                </el-table-column>
                <el-table-column
                    prop="name" align="center"
                    label="召唤师名称">
                </el-table-column>
            </el-table>
        </main>
    </div>
</template>
<script>
    import loHeader from '../../components/header/header'
    import loSearch from '../../components/common/search'
    import loFooter from '../../components/footer/footer'
    import { getUserArea, getTierInfo } from '../../service/getUser'
    import { getArea } from '../../service/getArea'
    import { getStorage, setStorage } from '../../config/util'

    export default {
        data() {
            return {
                activeIndex: '1',
                placeholder: '搜索召唤师名称',
                searchValue: '', // 搜索内容
                userAreaList: [], // 搜索返回的结果
                searchHistory: [], // 搜索历史记录
                showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
                emptyResult: false, // 搜索结果为空时显示
                tierList: [], // 段位新
                areaList: [] // 大区信息
            }
        },
        mounted() {
            // 获取段位信息
            getTierInfo().then(res => {
                this.tierList = res || []
            })

            // 获取大区信息
            getArea().then(res => {
                this.areaList = res.data || []
            })
        },
        created() {
            // 初始化页面
            // 1. 获取上一页传递过来的参数
            let searchValue = this.query.name

            // 2. 调用搜索方法搜索并加载结果
            this.search(searchValue)
        },
        computed: {
            // 获取路由参数
            query() {
                const query = this.$route.query
                return query || {}
            }
        },
        methods: {
            // 获取段位名称
            getTierName(row, column) {
                if (!row) {
                    return
                }
                if (Object.prototype.toString.call(this.tierList) === '[object Array]' && this.tierList.length > 0) {
                    this.tierList.forEach((item) => {
                        if (row.tier === item.tier && row.queue === item.queue) {
                            return item.description
                        }
                    })
                }
            },

            // 获取大区名称
            getAreaName(row, column) {
                if (!row) {
                    return
                }
                if (Object.prototype.toString.call(this.areaList) === '[object Array]' && this.areaList.length > 0) {
                    for (let i = 0; i < this.areaList.length; i++) {
                        let item = this.areaList[i]
                        if (row.area_id === item.id) {
                            return item.name
                        }
                    }
                }
            },

            // 获取大区isp
            getAreaIsp(row, column) {
                if (!row) {
                    return
                }
                if (Object.prototype.toString.call(this.areaList) === '[object Array]' && this.areaList.length > 0) {
                    for (let i = 0; i < this.areaList.length; i++) {
                        let item = this.areaList[i]
                        if (row.area_id === item.isp) {
                            return item.isp
                        }
                    }
                }
            },
            // 搜索方法，搜索并保存历史
            async search(searchValue) {
                if (!searchValue) {
                    return
                }
                // 隐藏历史记录
                this.showHistory = false
                // 1.获取搜索结果
                try {
                    await getUserArea(searchValue).then(res => {
                        if (res) {
                            if (res.code === 0) {
                                this.userAreaList = res.data || []
                            } else if (res.code === 1) {
                                this.userAreaList = []
                            } else {
                                this.showHistory = true
                                throw new Error(res.msg)
                            }
                        }
                    })
                } catch (e) {
                    console.log(e)
                }
                this.emptyResult = !this.userAreaList.length
                this.showHistory = this.emptyResult
                // 2.如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
                let history = getStorage('searchHistory')
                if (history) {
                    let checkrepeat = false
                    this.searchHistory = JSON.parse(history)
                    this.searchHistory.forEach(item => {
                        if (item === searchValue) {
                            checkrepeat = true
                        }
                    })
                    if (!checkrepeat) {
                        if (this.searchHistory.length >= 20) {
                            this.searchHistory.pop() // 删除最早的那个记录
                            this.searchHistory.unshift(searchValue) // 记录最新的搜索内容
                        } else {
                            this.searchHistory.unshift(searchValue) // 记录最新的搜索内容
                        }
                    }
                } else {
                    this.searchHistory.shift(searchValue)
                }
                setStorage('searchHistory', this.searchHistory)
            },
            // 点击图标刷新页面
            reload() {
                window.location.reload()
            }
        },
        components: {
            loHeader,
            loSearch,
            loFooter
        }
    }
</script>
<style lang="scss">
    @import '../../style/mixin.scss';

    main{
        @include wh(100%, 840px);
        .h-link{
            text-decoration: underline #2392e7;
            &:hover{
                color: #2392e7;
            }
        }
    }
</style>