<template>
    <div class="scroll">
        <div class="refresh" ref="refresh" v-if="isRefresh">
            <div class="refresh-tip" ref="refresh-tip" @transitionend.stop>
                <img class="arrow" v-if="!isRequest" src="@images/arrow-9.png" ref="arrow">
                <div class="text" v-if="!isRequest">下拉刷新</div>
                <img class="load" v-if="isRequest" src="@images/load.png">
            </div>
        </div>
        <slot></slot>
        <div class="load-more" v-if="isLoadMore">
            <div v-if="!isLoadDone" class="more-data">
                <div class="pacman">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div v-if="isLoadDone" class="no-more">没有更多数据...</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            height: 0,
            isRefresh: false,
            isLoadMore: false,
            isRequest: false,
            isLoading: false,
            isLoadDone: false
        };
    },
    async mounted() {
        if (this.$listeners.pull) {
            this.isRefresh = true;
            await this.pullInit();
        }
        if (this.$listeners.loadMore) {
            this.isLoadMore = true;
            window.addEventListener('scroll', this.loadMoreEvent);
        }
    },
    methods: {
        async pullInit() {
            await this.$nextTick(() => {
                this.parent = this.$el;
                this.parent.addEventListener('touchmove', this.touchmove);
                this.parent.addEventListener('touchend', this.touchend);

                this.distanceY = 0;
                this.initY = 0;
                this.refresh = this.$refs.refresh;
                this.pullIconHeight = this.$refs['refresh-tip'].clientHeight; // 刷新图标和文字提示
                this.stayY = this.pullIconHeight + 30; //下拉到极值后回弹到指定距离
                this.maxY = this.stayY + 40; //下拉到极值
            });
        },
        touchmove(event) {
            if (this.isRequest) return;
            this.refresh.style.transition = 'none';
            this.moveY = event.touches[0].clientY;
            if (window.scrollY == 0 && !this.initY) {
                this.initY = this.moveY;
            }
            if (window.scrollY == 0 && this.initY) {
                let h = this.moveY - this.initY;
                if (h > this.maxY) {
                    this.height = this.maxY;
                } else {
                    this.height = h;
                }
                this.refresh.style.height = this.height + 'px';
            }
        },
        touchend(event) {
            if (this.isRequest) return;
            if (this.height >= this.stayY) {
                this.toStay();
            } else {
                this.toInit();
            }
            this.distanceY = 0;
            this.initY = 0;
        },
        toStay() {
            this.refresh.style.transition = 'height 0.1s linear';
            this.height = this.stayY;
            this.refresh.style.height = this.height + 'px';
            this.isRequest = true;
        },
        toInit() {
            this.refresh.style.transition = 'height 0.3s cubic-bezier(1, 0.03, 0.58, 1)';
            this.height = 0;
            this.refresh.style.height = this.height + 'px';
        },
        // 监听window滚动事件，当滚动条触底之后触发回调函数（调用父组件注册的函数）
        loadMoreEvent() {
            let wScrollY = window.scrollY; // 当前滚动条位置
            let wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
            let bScrollH = document.body.scrollHeight; // 滚动条总高度
            if (wScrollY + wInnerH >= bScrollH - 100) {
                if (this.isLoadDone || this.isLoading) return;
                this.isLoading = true;
                this.$emit('loadMore', finish => {
                    console.log(finish);
                    if (finish) {
                        this.isLoadDone = true;
                    } else {
                        this.isLoading = false;
                    }
                });
            }
        }
    },
    activated() {
        window.addEventListener('scroll', this.loadMoreEvent);
    },
    deactivated() {
        window.removeEventListener('scroll', this.loadMoreEvent);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.loadMoreEvent);
    },
    watch: {
        height: {
            handler: async function() {
                if (!this.pullIconHeight) return;
                if (this.height >= this.stayY) {
                    this.$refs.arrow.style.transform = 'rotateZ(180deg)';
                } else {
                    await this.$nextTick(() => {
                        this.$refs.arrow.style.transform = 'rotateZ(0deg)';
                    });
                }
            }
        },
        isRequest: {
            handler: async function(nw, old) {
                if (this.isRequest) {
                    // 模拟请求数据
                    this.$emit('pull', () => {
                        this.isRequest = false;
                        this.toInit();
                        this.isLoading = false;
                        this.isLoadDone = false;
                    });
                }
            },
            immediate: true
        }
    }
};
</script>
<style lang="less" scoped>
.scroll {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    .refresh {
        position: relative;
        height: 0px;
        overflow: hidden;
        font-size: 0.28rem;

        img {
            width: 0.4rem;
        }
        .load {
            animation: loading 1s infinite linear;
        }
        .refresh-tip {
            position: absolute;
            bottom: 0px;
            left: 0px;
            right: 0px;
            padding: 0.2rem 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
                width: 0.4rem;
                transition: all 0.2s linear;
            }
            .text {
                margin-top: 0.1rem;
                font-size: 0.28rem;
                color: #aaaaaa;
            }
        }
    }
    .load-more {
        padding: 0.4rem 0px;
        background-color: #fff;
        > .more-data {
            display: flex;
            align-items: center;
            justify-content: center;
            > .pacman {
                > div {
                    &:nth-child(1) {
                        border-right: 0.25rem solid transparent;
                        border-top: 0.25rem solid #c8e6c8;
                        border-left: 0.25rem solid #c8e6c8;
                        border-bottom: 0.25rem solid #c8e6c8;
                        border-radius: 0.25rem;
                        left: -0.3rem;
                    }
                    &:nth-child(2) {
                        border-right: 0.25rem solid transparent;
                        border-top: 0.25rem solid #c8e6c8;
                        border-left: 0.25rem solid #c8e6c8;
                        border-bottom: 0.25rem solid #c8e6c8;
                        border-radius: 0.25rem;
                        margin-top: -0.5rem;
                        left: -0.3rem;
                    }
                    &:nth-child(3),
                    &:nth-child(4),
                    &:nth-child(5),
                    &:nth-child(6) {
                        background-color: #c8e6c8;
                        width: 0.15rem;
                        height: 0.15rem;
                        margin: 0.02rem;
                        width: 0.1rem;
                        height: 0.1rem;
                        transform: translate(0, -0.0625rem);
                        top: 0.25rem;
                        left: 0.7rem;
                    }
                }
            }
        }
        > .no-more {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.23rem;
            color: #737373;
        }
    }
}
@keyframes loading {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
@keyframes pacman-balls {
    75% {
        opacity: 0.7;
    }

    100% {
        transform: translate(-1rem, -0.0625rem);
    }
}
</style>


