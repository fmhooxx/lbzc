<template>
    <div class="ad-slide" @click.stop="$goUrl('/notice')">
        <div class="left">
            <img src="@images/icon-3.png">
            <div class="title">平台广告</div>
            <div class="slide">
                <base-slide-vertical :slideData="noticeData"></base-slide-vertical>
            </div>
        </div>
        <img class="right" src="@images/arrow-6.png">
    </div>
</template>
<script>
export default {
    props: {
        noticeData: {
            type: Array,
            default: []
        }
    }
};
</script>

<style lang="less" scoped>
.ad-slide {
    height: 1rem;
    padding: 0px 0.3rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .left {
        height: 1rem;
        display: flex;
        align-items: center;
        > img {
            width: 0.3rem;
            height: 0.25rem;
        }
        > .title {
            line-height: normal;
            margin-left: 0.2rem;
            color: #292f3d;
            font-size: 0.28rem;
        }
        > .slide {
            width: 4.4rem;
            margin-left: 0.2rem;
            height: 100%;
        }
    }
    > .right {
        width: 0.1rem;
        height: 0.2rem;
    }
}
</style>
