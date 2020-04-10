<template>
    <transition
        appear
        appear-class="base-load-enter"
        appear-active-class="base-load-enter-active"
        enter-class="base-load-enter"
        enter-active-class="base-load-enter-active"
        leave-to-class="base-load-leave"
        leave-active-class="base-load-leave-active"
    >
        <div class="base-load" :class="{nomask:nomask}">
            <transition
                appear
                appear-class="base-load-enter"
                appear-active-class="base-load-enter-active"
                enter-class="base-load-enter"
                enter-active-class="base-load-enter-active"
                leave-to-class="base-load-leave"
                leave-active-class="base-load-leave-active"
            >
                <div class="content">
                    <div class="top">
                        <div class="loading">
                            <svg viewBox="25 25 50 50" class="loading-circular">
                                <circle cx="50" cy="50" r="20" fill="none"></circle>
                            </svg>
                        </div>
                    </div>
                    <div class="bottom">
                        <slot>加载中...</slot>
                    </div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        nomask: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="less" scoped>
.base-load {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.6);
    > .content {
        width: 2rem;
        height: 2rem;
        border-radius: 0.1rem;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        > .top {
            width: 0.8rem;
            height: 0.8rem;
            z-index: 0;
            font-size: 0;
            line-height: 0;
            position: relative;
            vertical-align: middle;
            > .loading {
                z-index: -1;
                width: 100%;
                height: 100%;
                position: relative;
                display: inline-block;
                box-sizing: border-box;
                animation: self-rotate 2s linear infinite;
                > .loading-circular {
                    width: 100%;
                    height: 100%;
                    > circle {
                        stroke: #ffffff;
                        stroke-width: 1.5;
                        stroke-linecap: round;
                        animation: self-circular 1.5s ease-in-out infinite;
                    }
                }
            }
        }
        > .bottom {
            margin-top: 0.2rem;
            display: flex;
            justify-content: center;
            color: #fff;
            font-size: 0.28rem;
        }
    }
}
.nomask {
    z-index: 1;
    background-color: rgba(0, 0, 0, 0);
    > .content {
        transform: translateY(-1rem);
    }
}
@keyframes self-rotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
@keyframes self-circular {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }

    50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -40;
    }

    100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -120;
    }
}
.base-load-enter,
.base-load-leave {
    opacity: 0;
}
.base-load-enter-active,
.base-load-leave-active {
    transition: all 0.2s ease-in-out;
}
</style>
