<template>
    <transition
        appear
        appear-class="help-detail-enter"
        appear-active-class="help-detail-active"
        leave-to-class="help-detail-enter"
        leave-active-class="help-detail-active"
    >
        <div class="help-detail" @click.stop="close" @touchmove.prevent>
            <transition
                appear
                appear-active-class="animated bounceInUp"
                leave-active-class="animated bounceOutDown"
            >
                <div v-if="isAnimation" class="content" @click.stop>
                    <div class="title">
                        <div class="text">{{detail?detail.Title:''|threePoints(8)}}</div>
                        <div class="img" @click.stop="close">
                            <img src="@/assets/images/close-2.png" />
                        </div>
                    </div>
                    <div class="article">
                        <cube-scroll v-if="detail" ref="scroll">
                            <div ref="detail-content" class="content" v-html="detail.Contents"></div>
                        </cube-scroll>
                    </div>
                    <BaseLoad v-if="isBaseLoad"></BaseLoad>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
import 'animate.css';
import { getHelpDetail } from '_api/center';
export default {
    props: {
        id: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            detail: null,
            isBaseLoad: true,
            isAnimation: true
        };
    },
    async mounted() {
        try {
            await this.getHelpDetail();
            window.setTimeout(() => {
                // let content = this.$refs['detail-content'];
                // console.dir(content.getElementsByTagName('img'));
                this.$refs.scroll.refresh();
            }, 600);
            this.isBaseLoad = false;
        } catch (err) {
            this.isBaseLoad = false;
        }
    },
    methods: {
        async getHelpDetail() {
            this.detail = await getHelpDetail({ id: this.id });
        },
        close() {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$emit('update:isHelpDetail', false);
            }, 600);
        }
    }
};
</script>

<style lang="less" scoped>
.help-detail-enter {
    opacity: 0;
}
.help-detail-active {
    transition: all 0.4s ease;
}
.help-detail {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 200;
    background-color: rgba(0, 0, 1, 0.6);
    > .content {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        height: 70%;
        background-color: #fff;
        > .title {
            height: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid rgb(241, 241, 241);
            background-color: #fff;
            position: relative;
            > .text {
                font-size: 0.34rem;
                color: rgba(18, 28, 50, 1);
            }
            > .img {
                width: 1.2rem;
                height: 100%;
                position: absolute;
                top: 0px;
                right: 0px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                > img {
                    margin-right: 0.3rem;
                    width: 0.25rem;
                    height: 0.25rem;
                }
            }
        }
        > .article {
            position: absolute;
            top: 1.1rem;
            bottom: -0.4rem;
            left: 0px;
            right: 0px;
            overflow: hidden;
            background-color: #fff;
            padding-bottom: 0.4rem;
            /deep/ .content {
                margin-top: 0.4rem;
                margin-bottom: 0.4rem;
                padding: 0px 0.3rem;
                font-size: 0.28rem;
                line-height: normal;
            }
        }
    }
}
</style>
