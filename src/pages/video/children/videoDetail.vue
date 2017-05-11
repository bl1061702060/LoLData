<template>
    <div v-html="vcontent"></div>
</template>
<script>
    export default{
        data() {
            return {
                vcontent: ''
            }
        },
        created() {
            this.vcontent = this.$route.query.v
        },
        watch: {
            '$route'(to, from) {
                console.log(to, from)// 对路由变化作出响应...
            }
        }
    }
</script>