<template>
    <section class="base-drop-up">
        <div v-if="!nomore" class="more-data">
            <div class="pacman">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div v-if="nomore" class="no-more">没有更多数据...</div>
    </section>
</template>
<script>
import 'loaders.css';
export default {
    props: {
        done: {
            type: Boolean,
            default: false,
            required: true
        },
        nomore: {
            type: Boolean,
            default: false,
            required: true
        }
    },
    mounted() {
        window.addEventListener('scroll', this.windowDropUpEvent);
    },
    methods: {
        // 监听window滚动事件，当滚动条触底之后触发回调函数（调用父组件注册的函数）
        windowDropUpEvent() {
            var wScrollY = window.scrollY; // 当前滚动条位置
            var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
            var bScrollH = document.body.scrollHeight; // 滚动条总高度
            if (wScrollY + wInnerH >= bScrollH - 100) {
                if (!this.done) return;
                this.$emit('dropUp');
            }
        }
    },
    activated() {
        window.addEventListener('scroll', this.windowDropUpEvent);
    },
    deactivated() {
        window.removeEventListener('scroll', this.windowDropUpEvent);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.windowDropUpEvent);
    }
};
</script>

<style lang="less">
.base-drop-up {
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

@keyframes pacman-balls {
    75% {
        opacity: 0.7;
    }

    100% {
        transform: translate(-1rem, -0.0625rem);
    }
}
</style>