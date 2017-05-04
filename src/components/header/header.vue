<template>
    <div>
        <el-row>
            <el-menu theme="dark" :default-active="activeIndex" mode="horizontal">
                <el-col :span="6">
                    <el-menu-item index="1" ><router-link to="/home">首页</router-link></el-menu-item>
                </el-col>
                <el-col :span="6"> 
                    <el-submenu index="2">
                    <template slot="title">联盟热榜</template>
                        <el-menu-item index="2-1">本周限免</el-menu-item>
                        <el-menu-item index="2-2">英雄Rank排行</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </el-submenu>
                </el-col>
                <el-col :span="6">
                    <el-submenu index="3">
                        <template slot="title">联盟字典</template>
                        <el-menu-item index="3-1">英雄数据</el-menu-item>
                        <el-menu-item index="3-2">大区数据</el-menu-item>
                        <el-menu-item index="3-3">段位信息</el-menu-item>
                    </el-submenu>
                </el-col>
                <el-col :span="6">
                    <el-menu-item index="4">视频</el-menu-item>
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
<style lang="scss">
    .el-col > :first-child{
        width: 100%;
        text-align: center;
    }
</style>