<template>
    <div>
        <el-row>
            <el-menu theme="dark" :default-active="activeIndex" mode="horizontal">
                <el-col :span="4">
                    <el-menu-item index="1" class="title-icon"><router-link to="/">LoLData</router-link></el-menu-item>
                </el-col>
                <el-col :span="3"> 
                    <el-submenu index="2">
                    <template slot="title">联盟热榜</template>
                        <el-menu-item index="2-1">
                            <router-link to="/hot/free">本周周免</router-link>
                        </el-menu-item>
                        <el-menu-item index="2-2">
                            <router-link to="/hot/championRank">英雄Rank排行</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-col>
                <el-col :span="3">
                    <el-submenu index="3">
                        <template slot="title">联盟字典</template>
                        <el-menu-item index="3-1">
                            <router-link to="/dict/Champion">英雄数据</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-2">
                           <router-link to="/dict/Area">大区数据</router-link>
                        </el-menu-item>
                        <el-menu-item index="3-3">
                            <router-link to="/dict/tierQueue">段位信息</router-link>
                        </el-menu-item>
                    </el-submenu>
                </el-col>
                <el-col :span="3">
                    <el-menu-item index="4">
                        <router-link to="/video">视频</router-link>
                    </el-menu-item>
                </el-col>
            </el-menu>
        </el-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: ['activeIndex']
    }
</script>
<style lang="scss" scoped>
    @import '../../style/mixin.scss';
    
    .el-row {
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.52);
        -webkit-box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.52);
    }
    .el-col > :first-child {
        width: 100%;
        text-align: center;
    } 
    .title-icon {
        font-size: 24px;
        font-weight: bolder;
        
    }
</style>