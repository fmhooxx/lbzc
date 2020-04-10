<template>
    <div class="new-content">
        <div class="title">{{newsCon.Title}}</div>
        <div class="desc">
            <div v-if="newsCon.Author">{{newsCon.Author}}</div>
            <div>{{newsCon.Addtime}}</div>
            <div>{{newsCon.ViewCounk}}人阅读</div>
        </div>
        <div class="content" style="font-size:0.28rem;line-height:normal" v-html="newsCon.Contents"></div>
    </div>
</template>
<script>
export default {
    props: {
        newsCon: {
            type: Object,
            default: null
        }
    }
};
</script>
<style lang="less" scoped>
.new-content {
    padding: 0px 0.3rem;
    > .title {
        font-size: 0.4rem;
        font-weight: bold;
        color: #292f3d;
    }
    > .desc {
        margin-top: 0.4rem;
        display: flex;
        justify-content: space-between;
        > div {
            font-size: 0.24rem;
            color: #69727e;
        }
    }
    > .content {
        margin-top: 0.6rem;
        /deep/ img {
            width: 100% !important;
        }
    }
}
</style>
