<template>
    <div v-html="msg" v-if = "isShow">
    </div>
</template>
<script>
    export default {
        props: ['msg', 'isShow']
    }
</script>
<style lang="scss">
    @import '../../style/mixin.scss';
</style>