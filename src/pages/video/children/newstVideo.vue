<template>
    <div class="container">
        <div class="card-block">
            <el-card v-for="item in videoList" :body-style="{ padding: '0px' }" class="card">
                <img :src=item.img class="image">
                <div class="card-content">
                    <div class="card-title">{{item.title}}</div>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script>
    import { getNewestVideos } from '../../../service/getVideo'

    export default{
        data() {
            return {
                videoList: [] // 视频列表
            }
        },
        mounted() {
            getNewestVideos(1).then(res => {
                this.videoList = res.data || []
            })
        }
    }
</script>
<style lang="scss">
    @import '../../../style/mixin.scss';

    .container{
        padding: 20px;
        .card-block {
            @include fj(row, start);
            flex-wrap: wrap;
            .card {
                width: 300px;
                height: 230px;
                margin-top: 30px; 
                margin-left: 20px;
                box-shadow: 0 4px 12px #324157;
                &:hover {
                    box-shadow: 0 4px 25px #324157;
                    cursor: pointer;
                }
                img {
                    width: 100%;
                    height: auto;
                }
                .card-content {
                    width: 100%;
                    padding:5px;
                    .card-title {
                        font-size: 14px;
                        &:hover {
                            color: #209efc;
                            cursor: pointer;
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
    }
</style>