<template>
    <div id="search">
        <input type="text" 
        :placeholder="placeholder"
        v-model="value"
        @keyup.enter="submit"
        />
    </div>
</template>
<script>
    export default{
        data() {
            return {
                value: ''
            }
        },
        props: ['placeholder', 'submit'],
        watch: {
            value(val) {
                this.$emit('input', val)
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../style/mixin';
    input {
        @include wh;
        color:#fff;
        text-align: center;
        padding: 0;
        border: none;
        height: 40px;
        font-size: 17px;
        border-radius: 20px;
        background: rgba(153, 153, 153, 0.36);
        border: solid 1px rgba(251, 253, 255, 0.78);
        &::-webkit-input-placeholder {color: #fff;}
    　　 &:-moz-placeholder {color: #fff;}
    　　 &::-moz-placeholder {color: #fff;}
    　　 &:-ms-input-placeholder {color: #fff;}
    }
</style>