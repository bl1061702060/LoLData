<template>
    <div>
        <lo-header :activeIndex="activeIndex"></lo-header>
        <main>
            <div class="filter">
            </div>
            <div class="normal">
                <div class="main-item">
                    <lo-search :placeholder="placeholder" :submit="search" @input="syncValue">
                    </lo-search>
                </div>
                <div class="main-item list-block"> 
                    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
                        <el-tab-pane label="视频" name="first">
                            <el-carousel height="300px">
                            <el-carousel-item v-for="item in 4" :key="item">
                                <h3>{{ item }}</h3>
                            </el-carousel-item>
                            </el-carousel>
                        </el-tab-pane>
                        <el-tab-pane label="周免" name="second">
                            <el-carousel :interval="3000" type="card" height="300px">
                                <el-carousel-item v-for="item in 6" :key="item">
                                <h3>{{ item }}</h3>
                                </el-carousel-item>
                            </el-carousel>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            
        </main>
        <lo-footer></lo-footer>
    </div>
</template>

<script>
    import loHeader from '../../components/header/header'
    import loSearch from '../../components/common/search'
    import loFooter from '../../components/footer/footer'

    export default {
        data() {
            return {
                activeIndex: '1',
                placeholder: '搜索召唤师名称',
                activeName2: 'first'
            }
        },
        methods: {
            // 同步子组件中的 input的value
            syncValue(data) {
                this.searchValue = data
            },
            // 点击搜索跳转到用户页面
            search() {
                this.$router.push('./user?name=' + this.searchValue)
            },
            handleClick(tab, event) {
                console.log(tab, event)
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
            background: url('../../assets/img/bg2.jpeg') no-repeat;
            background-size:cover;
            z-index: -1;

            filter: url(data:image/svg+xml;base64,77u/PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxmaWx0ZXIgaWQ9ImJsdXIiPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249IjI1IiAvPjwvZmlsdGVyPjwvc3ZnPg==#blur);

            -webkit-filter: blur(10px); /* Chrome, Opera */
            -moz-filter: blur(10px);
            -ms-filter: blur(10px);    
            filter: blur(10px);
            filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=10, MakeShadow=false); /* IE6~IE9 */
        }

        .normal {
            @include wh(100%, 100%);
            @include fj(column, start);
            z-index: 0;
            padding-top: 120px;
            top: 60px;
            position: absolute;
            background-color: rgba(255, 0, 0, 0);

            .main-item {
                width:100%;
                max-width: 720px;
            }
        }
    }
    .list-block {
        margin-top: 80px;
        text-align: center;
        background-color: white;
    }
    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>