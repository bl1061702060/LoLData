<template>
  <!-- 动态组件 -->
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
  export default {
  }
</script>

<style lang="scss">
	@import './style/common'
</style>