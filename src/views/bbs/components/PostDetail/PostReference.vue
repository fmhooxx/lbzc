<template>
    <div class="post-reference">
        <div class="title">
            <div class="top">引用:</div>
            <div class="bottom">
                <div class="left">蓝冰众创-{{postData.postContent.jobNum}}</div>
                <div class="right">{{postData.postContent.date}}</div>
            </div>
        </div>
        <div class="comment" v-html="postData.postContent.message"></div>
    </div>
</template>
<script>
export default {
    props: {
        postData: {
            type: Object,
            default: null,
            required: true
        }
    }
};
</script>
<style lang="less" scoped>
.post-reference {
    border: 1px dashed #ccc;
    padding: 0.3rem;
    min-height: 2.2rem;
    > .title {
        .top {
            font-size: 0.28rem;
            color: #000;
        }
        .bottom {
            margin-top: 0.2rem;
            display: flex;
            justify-content: space-between;
            .left {
                color: #ccc;
                font-size: 0.22rem;
            }
            .right {
                color: #ccc;
                font-size: 0.22rem;
            }
        }
    }
    > .comment {
        line-height: 1.1;
        margin-top: 0.2rem;
        color: #ccc;
        font-size: 0.28rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
    }
}
</style>


