<template>
    <div class="message-pop" @click.stop="close">
        <div class="content">
            <cube-slide
                ref="slide"
                :data="data"
                :auto-play="false"
                :showDots="false"
                @change="changePage"
            >
                <cube-slide-item v-for="(item, index) in data" :key="`m_p_${index}`">
                    <div class="img-content" @click.stop="toPage(item.type,item.Url)">
                        <img :src="item.Pic" />
                    </div>
                </cube-slide-item>
            </cube-slide>
            <img class="close" src="@images/close-1.png" />
        </div>
        <div class="point">
            <div
                :class="{current:currentDot(index)}"
                v-for="(item,index) in data"
                :key="`dot_${index}`"
            ></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        data: {
            type: Array,
            default: []
        },
        isMessagePop: {
            type: Boolean,
            default: false
        }
    },
    data: () => {
        return {
            currentPage: 0
        };
    },
    mounted() {
        window.addEventListener('resize', this._onresize);
        window.addEventListener('visibilitychange', this._browserEvent);
    },
    activated() {
        this.currentPage = 0;
        if (this.data) this.$refs.slide.refresh();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this._onresize);
        window.removeEventListener('visibilitychange', this._browserEvent);
    },
    methods: {
        _onresize() {
            if (this.data) this.$refs.slide.refresh();
        },
        _browserEvent() {
            if (this.data) this.$refs.slide.refresh();
        }
    },
    computed: {
        currentDot() {
            return dot => {
                return dot == this.currentPage;
            };
        }
    },
    methods: {
        close() {
            this.$emit('update:isMessagePop', false);
        },
        toPage(type, url) {
            // 项目内  项目外  type ：跳转类型 1：站内 2：外部链接
            if (type == 1) {
                if (url.indexOf('/personalMyPlaybill') >= 0) {
                    this.$goUrl('/poster');
                } else if (url.indexOf('/promotionPro/daiShare?daiId=1287') >= 0) {
                    this.$goUrl('/shareDetail?id=1287&type=1');
                } else {
                    this.$goUrl(url);
                }
            } else {
                this.$open(url);
            }
        },
        changePage(current) {
            this.currentPage = current;
        }
    }
};
</script>

<style lang="less" scoped>
.message-pop {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .content {
        width: 5.34rem;
        height: 7.74rem;
        position: relative;
        .img-content {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .close {
            position: absolute;
            top: -0.6rem;
            right: -0.6rem;
            width: 0.45rem;
            height: 0.45rem;
        }
    }

    .point {
        margin-top: 0.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        > div {
            width: 0.18rem;
            height: 0.18rem;
            background-color: #aaa;
            border-radius: 50%;
            margin-right: 0.22rem;
            transition: width 0.1s cubic-bezier(0.78, 0.02, 0, 0.94);
            &.current {
                width: 0.34rem;
                height: 0.16rem;
                background-color: #fff;
                border-radius: 0.07rem;
            }
        }
    }
}
</style>

