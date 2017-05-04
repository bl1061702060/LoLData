<template>
    <div class="hello">
        <div>{{groupArea}}</div>
    </div>
</template>

<script>
import { getArea } from '../service/getCommon'
export default {
    name: 'hello',
    data() {
        return {
            groupArea: {}   // 所有城市列表
        }
    },
    mounted() {
        // 获取大区列表
        getArea().then(res => {
            this.groupArea = res
            console.log('2****' + res)
        })
    },
    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>