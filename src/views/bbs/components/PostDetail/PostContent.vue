<template>
    <div class="post-content">
        <div class="top">
            <div class="left">
                <img :src="data.headImg">
                <div class="base">
                    <div class="name">{{data.jobNum}}</div>
                    <div class="date">{{data.friendDate}}</div>
                </div>
            </div>
            <div class="right">
                <img src="@images/icon-37.png">
                <div class="number">{{data.views}}</div>
            </div>
        </div>
        <div class="bottom" v-html="data.content" style="font-size: 0.26rem!important;"></div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Object,
            default: null
        }
    }
};
</script>

<style lang="less" scoped>
.post-content {
    padding: 0px 0.3rem;
    > .top {
        display: flex;
        align-items: stretch;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            img {
                width: 0.7rem;
            }
            .base {
                margin-left: 0.2rem;
                div {
                    font-size: 0.28rem;
                    line-height: normal;
                }
                .name {
                    color: #5f7ea9;
                }
                .date {
                    color: gray;
                    margin-top: 0.1rem;
                }
            }
        }
        .right {
            transform: translateY(0.04rem);
            align-self: flex-start;
            display: flex;
            align-items: center;
            img {
                width: 0.4rem;
            }
            .number {
                line-height: normal;
                margin-left: 0.1rem;
                color: rgb(183, 183, 183);
                font-size: 0.28rem;
            }
        }
    }
    > .bottom {
        margin-top: 0.6rem;
        line-height: 1.6;
        /deep/ img {
            width: 100%;
        }
        /deep/ font {
            font-size: 0.26rem;
            color: #6a6a6a;
        }
        /deep/ font[color='#ff0000'] {
            color: red;
            strong {
                color: red;
                font-weight: bold;
            }
        }
    }
}
</style>

