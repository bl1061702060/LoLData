<template>
    <div>
        <lo-header :activeIndex="activeIndex"></lo-header>
        <main>
            <div class="filter">
            </div>
            <div class="normal">
                <div class="m-search">
                    <lo-search :placeholder="placeholder" :submit="search" @input="syncValue">
                    </lo-search>
                </div>
                <section v-if= "isSearched" class="m-content list-block">
                    <el-row class="row-header">
                        <el-col :span="8">
                            最近搜索
                        </el-col>
                        <el-col :span="16">
                            搜索结果
                        </el-col>
                    </el-row>
                    <el-row class="row-content">
                        <el-col :span="8">
                            <ul>
                                <li class="h-link" v-for="item in searchHistory" @click="search(item)">
                                    {{ item }}
                                </li>
                            </ul>
                        </el-col>
                        <el-col :span="16">
                           <ul>
                                <li class="u-link" v-for="item in userAreaList" @click="rowClick(item)">
                                    <span>
                                         <el-popover
                                            placement="right"
                                            width="200"
                                            trigger="hover">
                                            <span slot v-html="getUserHtml(item)"></span>
                                            <span slot="reference">{{item.name}}</span>
                                        </el-popover>
                                    </span>
                                    <span>
                                        {{getAreaName(item.area_id)}}
                                    </span>
                                    <span>
                                        {{getAreaIsp(item.area_id)}}
                                    </span>
                                </li>
                            </ul>
                        </el-col>
                    </el-row>
                </section >
                <section v-else class="m-content card-block"> 
                    <el-tabs v-model="activeName2" type="card">
                        <el-tab-pane class="first" label="视频" name="first">
                            <el-carousel height="235px" indicator-position="inside" type="card" :autoplay=false>
                                <el-carousel-item v-for="item in videoList" :key="item.guid">
                                    <el-card :body-style="{ padding: '0px', height: '235px' }">
                                        <img :src=item.img class="image" width="183" height="108" @click.stop="viewVideo(item)">
                                        <div class="card-content">
                                            <div class="card-title" @click.stop="viewVideo(item)" >{{item.title}}</div>
                                            <div class="card-button" @click.stop="viewMoreVideo">更多视频</div>
                                        </div>
                                    </el-card>
                                </el-carousel-item>
                            </el-carousel>
                        </el-tab-pane>
                        <el-tab-pane class="second" label="周免" name="second">
                            <el-carousel :interval="3000" type="card" height="300px">
                                <el-carousel-item v-for="item in 6" :key="item">
                                <h3>{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </el-tab-pane>
                    </el-tabs>
                </section>
            </div>
        </main>
        <lo-footer></lo-footer>
    </div>
</template>

<script>
    import loHeader from '../../components/header/header'
    import loSearch from '../../components/common/search'
    import loFooter from '../../components/footer/footer'
    import {getTierInfo, getUserArea} from '../../service/getUser'
    import { getArea } from '../../service/getArea'
    import { getNewestVideos } from '../../service/getVideo'
    import { getStorage, setStorage } from '../../config/util'
    export default {
        data() {
            return {
                isSearched: false,
                activeIndex: '1',
                placeholder: '搜索召唤师名称',
                activeName2: 'first',
                searchValue: '', // 搜索内容
                userAreaList: [], // 搜索返回的结果
                searchHistory: [], // 搜索历史记录
                showHistory: true, // 是否显示历史记录，只有在返回搜索结果后隐藏
                emptyResult: false, // 搜索结果为空时显示
                tierList: [], // 段位新
                areaList: [], // 大区信息
                videoList: [] // 最新视频
            }
        },
        mounted() {
            // 获取最新视频
            getNewestVideos(1).then(res => {
                let arr = res.data || []
                this.videoList = arr.splice(0, 5)
            })
            // 获取段位信息
            getTierInfo().then(res => {
                this.tierList = res || []
            })

            // 获取大区信息
            getArea().then(res => {
                this.areaList = res.data || []
            })
        },
        computed: {
        },
        methods: {
            // 同步子组件中的 input的value
            syncValue(data) {
                this.searchValue = data
            },
            // 提示popover
            getUserHtml(row) {
                if (!row) {
                    return
                }
                return `<div>${this.getTierName(row)}<div>`
            },
            // 获取段位名称
            getTierName(row) {
                if (!row) {
                    return
                }
                if (Object.prototype.toString.call(this.tierList) === '[object Array]' && this.tierList.length > 0) {
                    for (let i = 0; i < this.tierList.length; i++) {
                        let obj = this.tierList[i]
                        if (row.tier === +obj.tier && row.queue === +obj.queue) {
                            return obj.description
                        }
                    }
                }
            },

            // 获取大区名称
            getAreaName(id) {
                if (Object.prototype.toString.call(this.areaList) === '[object Array]' && this.areaList.length > 0) {
                    for (let i = 0; i < this.areaList.length; i++) {
                        let item = this.areaList[i]
                        if (id === item.id) {
                            return item.name
                        }
                    }
                }
            },

            // 获取大区isp
            getAreaIsp(id) {
                if (Object.prototype.toString.call(this.areaList) === '[object Array]' && this.areaList.length > 0) {
                    for (let i = 0; i < this.areaList.length; i++) {
                        let item = this.areaList[i]
                        if (id === item.id) {
                            return item.isp
                        }
                    }
                }
            },
            // 搜索方法，搜索并保存历史
            async search(searchValue) {
                if (searchValue && typeof searchValue === 'string') {
                    this.searchValue = searchValue
                }
                this.isSearched = true
                // 隐藏历史记录
                this.showHistory = false
                // 1.获取搜索结果
                try {
                    await getUserArea(this.searchValue).then(res => {
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
                if (this.emptyResult) {
                    this.noResultMsg = '抱歉，未找到名为 ' + this.searchValue + ' 的召唤师'
                }
                // 2.如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
                let history = getStorage('searchHistory')
                if (history) {
                    let checkrepeat = false
                    this.searchHistory = JSON.parse(history)
                    this.searchHistory.forEach(item => {
                        if (item === this.searchValue) {
                            checkrepeat = true
                        }
                    })
                    if (!checkrepeat) {
                        if (this.searchHistory.length >= 20) {
                            this.searchHistory.pop() // 删除最早的那个记录
                            this.searchHistory.unshift(this.searchValue) // 记录最新的搜索内容
                        } else {
                            this.searchHistory.unshift(this.searchValue) // 记录最新的搜索内容
                        }
                    }
                } else {
                    this.searchHistory.shift(this.searchValue)
                }
                setStorage('searchHistory', this.searchHistory)
            },
            // 点击召唤跳转到召唤师信息页面
            rowClick(row) {
                if (row && row.qquin) {
                    this.$router.push({
                        path: '/user',
                        params: {
                            qquin: row.qquin,
                            vaid: row.area_id
                        }
                    })
                }
            },
            // 观看视频
            viewVideo(obj) {
                if (obj && obj.content) {
                    this.$router.push({
                        path: '/video/videoDetail',
                        query: {
                            v: obj.content
                        }
                    })
                }
            },
            // 跳转到视频主页
            viewMoreVideo() {
                this.$router.push({
                    path: '/video'
                })
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
<style lang="scss" scoped>
    @import '../../style/mixin.scss';

    main {
        @include wh(100%, 840px);

        .filter {
            @include wh(100%, 100%);
            background-color: #324157;
           
        }

        .normal {
            @include wh(100%, 100%);
            @include fj(column, start);
            z-index: 0;
            padding: 60px;
            top: 60px;
            position: absolute;
            background-color: rgba(255, 0, 0, 0);

            .m-search {
                width: 720px;
            }
            .m-content {
                margin-top: 80px;
                width: 840px;
            }
            .list-block {
                box-shadow: 0px 0px 15px #000000;
                .row-header {
                    height: 41px;
                    line-height: 40px;
                    box-shadow: inset 0px 1px 5px #acc7ef;
                    background-color: #324157;
                    .el-col {
                        color: #adbac9;
                        text-align: center;
                    }
                }
                .row-content {
                    box-shadow: inset 0px 0px 5px #acc7ef;
                    background-color: #324157;
                    ul {
                        height: 480px;
                        padding: 20px;
                        overflow-y: auto;
                        .h-link {
                            color: #adbac9;
                            padding: 3px 0;
                            &:hover {
                                text-decoration: underline;
                                color: #20a0ff;
                            }
                        }
                        .u-link {
                            padding: 8px 0;
                            color: #adbac9;
                            @include fj(row, start);
                            span {
                                width: calc(100%/3);
                                color: #adbac9;
                                text-align: left;

                                &:hover {
                                    color:#20a0ff;
                                    text-decoration: underline;
                                }
                            }
                        }
                    }
                }
            }

            .card-block {
                .first{
                    img {
                        width:100%;
                        height: auto;
                    }
                    .card-content {
                        position: fixed;
                        bottom: 0;
                        width:100%; 
                        height: 56px;
                        padding: 5px 10px;
                        background-color: rgba(87, 97, 111, .6);

                        .card-title{
                            color:#fff;
                            &:hover {
                                text-decoration: underline;
                            }
                        }

                        .card-button{
                            color:#20a0ff;
                            text-align: right;
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                }
            }
        }
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>