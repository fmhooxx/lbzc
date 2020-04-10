<template>
    <transition
        appear
        appear-class="enter"
        appear-active-class="enter-active"
        enter-class="enter"
        enter-active-class="enter-active"
        leave-to-class="leave"
        leave-active-class="leave-active"
    >
        <div class="base-success" :class="{mask:mask}" v-show="show">
            <transition
                appear
                appear-class="enter"
                appear-active-class="enter-active"
                enter-class="enter"
                enter-active-class="enter-active"
                leave-to-class="leave"
                leave-active-class="leave-active"
            >
                <div class="content">
                    <img class="top" v-if="type=='SUCCESS'" src="@/assets/images/success.png">
                    <img class="top" v-if="type=='FAIL'" src="@/assets/images/fail.png">
                    <div class="bottom">{{text}}</div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'SUCCESS',
            required: true
        },
        show: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: '操作成功'
        },
        mask: {
            type: Boolean,
            default: false
        }
    }
};
</script>

<style lang="less" scoped>
.base-success {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 7777;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0);
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
.mask {
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.6);
}
.enter,
.leave {
    opacity: 0;
}
.enter-active,
.leave-active {
    transition: all 0.2s ease-in-out;
}
</style>

