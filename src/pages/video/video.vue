<template>
    <div>
        <el-menu theme="dark" :default-active="activeIndex" mode="horizontal" :router=true>
            <el-menu-item index="/video/newest">
                最新视频
            </el-menu-item>
            <el-menu-item index="/video/author">
                解说视频
            </el-menu-item>
            <el-menu-item index="/video/hero">
                英雄视频
            </el-menu-item>
        </el-menu>
        <!-- 动态组件 -->
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    export default{
        data() {
            return {
                activeIndex: '/video/newest'
            }
        }
    }
</script>
<style lang="scss">
    @import '../../style/mixin.scss';

    .container {
        width:100%;
        height:840px;
    }

</style>