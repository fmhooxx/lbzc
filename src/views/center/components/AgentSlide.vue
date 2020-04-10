<template>
    <div class="agent-slide" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div class="slide" ref="slide">
            <div
                @click.stop
                class="slide-item"
                :class="{current:index==1}"
                :style="{backgroundImage:`url(${backFilter(item.Name)})`}"
                v-for="(item,index) in updateArray"
                :key="`slide_${index}`"
                @transitionend.stop
            >
                <div class="name">{{item.Name}}</div>
                <div class="price">
                    <i>¥</i>
                    {{item.Price}}
                </div>
            </div>
        </div>
        <base-login-pop v-if="isBaseLoginPop" :isBaseLoginPop.sync="isBaseLoginPop"></base-login-pop>
    </div>
</template>
<script>
export default {
    props: {
        slideData: {
            type: Array,
            required: true,
            default: []
        }
    },
    data: () => {
        return {
            currentPage: 1,
            isBaseLoginPop: false
        };
    },
    mounted() {
        this.clientWidth = document.documentElement.clientWidth;
        this.init();
        window.addEventListener('resize', this._onresize);
        window.addEventListener('visibilitychange', this._browserEvent);
    },
    methods: {
        backFilter: function(name) {
            if (name == '高级代理') {
                return require('@images/b-7.png');
            } else if (name == '中级代理') {
                return require('@images/b-6.png');
            } else {
                return require('@images/b-5.png');
            }
        },
        touchstart() {
            this._stop();
            this._remove();
            this.startX = event.touches[0].clientX;
        },
        touchmove() {
            this.moveing = true;
            if (this.currentPage >= this.children.length - 1) {
                this._remove();
                this.distanceX = 0;
                this.currentPage = 1;
                let location = this.currentPage * this.width;
                this.slide.style.transform = `translate3d(-${location}px,0,0)`;
            } else if (this.currentPage <= 0) {
                this._remove();
                this.distanceX = 0;
                this.currentPage = this.children.length - 2;
                let location = this.currentPage * this.width;
                this.slide.style.transform = `translate3d(-${location}px,0,0)`;
            } else {
                this.distanceX = event.touches[0].clientX - this.startX;
            }
            let location = this.currentPage * this.width;
            this.slide.style.transform = `translate3d(${-location + this.distanceX}px,0,0)`;
        },
        touchend() {
            if (!this.moveing) return;
            if (Math.abs(this.distanceX) > this.width * 0.3) {
                if (this.distanceX > 0) {
                    this.pre('all 0.3s ease');
                } else {
                    this.next('all 0.3s ease');
                }
            } else {
                this.slide.style.transition = 'all 0.3s ease';
                let location = this.currentPage * this.width;
                this.slide.style.transform = `translate3d(-${location}px,0,0)`;
            }
            this.startX = 0;
            this.distanceX = 0;
            this.moveing = false;
            this._play();
        },
        init() {
            this.slide = this.$refs.slide;
            this.children = this.slide.children;
            this.width = this.slide.offsetWidth;
            this.initLocation = this.currentPage * this.width;
            this.slide.style.transform = `translate3d(-${this.initLocation}px,0,0)`;
            this.slide.addEventListener('transitionend', async () => {
                if (this.currentPage == 0 || this.currentPage == this.children.length - 1) {
                    this._stop();
                    this._remove();
                    if (this.currentPage == 0) this.currentPage = this.children.length - 2;
                    if (this.currentPage == this.children.length - 1) this.currentPage = 1;
                    let location = this.currentPage * this.width;
                    this.slide.style.transform = `translate3d(-${location}px,0,0)`;
                    this._play();
                }
            });
            this._play();
        },
        pre(tran) {
            this.currentPage = this.currentPage - 1;
            this._add(tran);
            let location = this.currentPage * this.width;
            this.slide.style.transform = `translate3d(-${location}px,0,0)`;
        },
        next(tran) {
            if (this.currentPage >= this.children.length) this.currentPage = 0;
            this.currentPage = this.currentPage + 1;
            this._add(tran);
            let location = this.currentPage * this.width;
            this.slide.style.transform = `translate3d(-${location}px,0,0)`;
        },
        _replace() {
            try {
                if (this.currentPage >= this.children.length) return;
                for (let i = 0; i < this.children.length; i++) {
                    let child = this.children[i];
                    child.classList.remove('current');
                }
                this.children[this.currentPage].classList.add('current');
                if (this.currentPage == 0) {
                    this.children[this.children.length - 2].classList.add('current');
                }
                if (this.currentPage == this.children.length - 1) {
                    this.children[1].classList.add('current');
                }
            } catch (err) {
                console.log(err);
            }
        },
        _add(tran) {
            this.slide.style.transition = tran;
            this._replace();
        },
        _remove() {
            this.slide.style.transition = 'none';
        },
        _play() {
            window.clearInterval(this.timer);
            // this.timer = window.setInterval(() => {
            //     this.next('all 0.5s ease');
            // }, 3000);
        },
        _stop() {
            window.clearInterval(this.timer);
        },
        async _onresize() {
            if(this.clientWidth==document.documentElement.clientWidth) return;
            if (this.slideData.length > 0) {
                this._stop();
                await this.$waitTime(500);
                this.currentPage = 1;
                this.init();
                this.next();
            }
        },
        //浏览器切换事件
        _browserEvent() {
            if (document.visibilityState == 'hidden') {
                this._stop();
            } else {
                if (!this.slide) return;
                this._onresize();
            }
        },

    },
    activated() {
        this._onresize();
    },
    deactivated() {
        this._stop();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this._onresize);
        window.removeEventListener('visibilitychange', this._browserEvent);
    },
    computed: {
        updateArray() {
            let arr = [];
            if (this.slideData.length == 1) {
                arr = [this.slideData[0], this.slideData[0], this.slideData[0]];
            } else if (this.slideData.length > 1) {
                arr = [
                    this.slideData[this.slideData.length - 1],
                    ...this.slideData,
                    this.slideData[0]
                ];
            } else {
                arr = [];
            }
            return arr;
        }
    },
    watch: {
        currentPage: {
            handler: function(newVal, oldVal) {
                let length = this.slideData.length;
                if (!length) return this.$emit('slideChange', 0);
                if (newVal == 0 || newVal == length) {
                    this.$emit('slideChange', length - 1);
                } else if (newVal == 1 || newVal == length + 1) {
                    this.$emit('slideChange', 0);
                } else {
                    this.$emit('slideChange', newVal - 1);
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.agent-slide {
    width: 100%;
    overflow: hidden;
}
.slide {
    margin: 0 auto;
    width: 5.5rem;
    height: 2.83rem;
    display: flex;
    > .slide-item {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        transition: all 0.5s;
        transform: scale3d(0.92, 0.92, 0.92);
        opacity: 0.6;
        border-radius: 0.16rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        > .name {
            font-size: 0.34rem;
            font-weight: bold;
            color: #fff;
        }
        > .price {
            margin-top: 0.2rem;
            font-size: 0.55rem;
            color: #fff;
            line-height: normal;
            > i {
                color: #fff;
                line-height: normal;
                font-weight: bold;
                font-size: 0.4rem;
            }
        }
    }
    > .current {
        opacity: 1;
        transform: scale3d(1, 1, 1);
    }
}
</style>

