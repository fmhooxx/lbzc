<template>
    <div class="poster">
        <div class="top">
            <div class="nav">
                <div class="arrow" @click.stop="$goBack">
                    <img src="@images/arrow-8.png" alt>
                </div>
                <div class="text">推荐海报</div>
            </div>
        </div>

        <div class="title">
            <div :class="{sel:index=='mem'}" @click.stop="index='mem'">推荐会员</div>
            <div :class="{sel:index=='rkd'}" @click.stop="index='rkd'">融客店</div>
            <div :class="{sel:index=='cha'}" @click.stop="index='cha'">征信专用</div>
            <div :class="{sel:index=='yjx'}" @click.stop="index='yjx'">APP推广</div>
        </div>

        <div class="bottom">
            <keep-alive>
                <PosterSlide v-if="index=='mem'" type="ShareImg" key="ShareImg"></PosterSlide>
                <PosterSlide v-if="index=='rkd'" type="RongkeImg" key="RongkeImg"></PosterSlide>
                <PosterSlide v-if="index=='cha'" type="ZhengxinImg" key="ZhengxinImg"></PosterSlide>
                <PosterSlide v-if="index=='yjx'" type="YujxImg" key="YujxImg"></PosterSlide>
            </keep-alive>
            <div style="backgroundColor:#f6f7fb;height:0.4rem"></div>
        </div>
    </div>
</template>
<script>
import PosterSlide from '../components/PosterSlide';
export default {
    components: { PosterSlide },
    data() {
        return {
            index: 'mem',
            slideData: null,
            isBaseLoadPage: true
        };
    },
    beforeRouteEnter(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    }
};
</script>

<style lang="less" scoped>
.poster {
    > .top {
        height: 1.88rem;
        background-image: linear-gradient(to right, #2e7cf6, #35a8fd);
        overflow: hidden;
        padding: 0px 0.3rem;
        z-index: 100;
        position: relative;
        > .nav {
            margin-top: 0.37rem;
            display: flex;
            align-items: center;
            > .arrow {
                width: 1rem;
                height: 100%;
                display: flex;
                align-items: center;
                > img {
                    width: 0.17rem;
                    height: 0.31rem;
                }
            }
            > .text {
                position: absolute;
                left: 50%;
                transform: translateX(-50%);
                font-size: 0.36rem;
                font-weight: bold;
                line-height: normal;
                color: #fff;
                text-align: center;
            }
        }
    }
    > .title {
        position: absolute;
        top: 1.26rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 6.88rem;
        height: 1.03rem;
        background-color: #fff;
        box-shadow: 0px 8px 0.29rem 0.02rem rgba(46, 125, 246, 0.1);
        border-radius: 0.06rem;
        padding: 0px 0.2rem;
        z-index: 100;
        > div {
            line-height: normal;
            font-size: 0.34rem;
            color: #787878;
            &.sel {
                font-size: 0.36rem;
                font-weight: bold;
                color: rgba(85, 98, 236, 1);
            }
        }
    }
    > .bottom {
        padding-top: 0.8rem;
        background-color: #f6f7fb;
    }
}
</style>

