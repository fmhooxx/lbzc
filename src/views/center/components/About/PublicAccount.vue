<template>
    <transition leave-to-class="leave" leave-active-class="active">
        <div class="publice-account" @click.stop="close">
            <transition
                appear
                appear-active-class="animated bounceInUp"
                leave-active-class="animated bounceOutUp faster"
            >
                <div v-if="isAnimation" class="content" @click.stop>
                    <img class="qr-code" src="@images/icon-53.png">
                    <div class="text">
                        <span>关注蓝冰众创微信公众号</span>
                        <span>第一时间解锁新口子</span>
                    </div>
                    <div class="btn" @click.stop="copy">复制公众号并关注</div>
                    <img class="close" @click.stop="close" src="@images/close-1.png">
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
import 'animate.css';
export default {
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            isAnimation: true
        };
    },
    methods: {
        copy() {
            this.$copy('蓝冰众创');
            this.close();
        },
        close() {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$emit('update:show', false);
            }, 400);
        }
    }
};
</script>

<style lang="less" scoped>
.leave {
    opacity: 0;
}
.active {
    transition: all 0.14s ease;
}
.publice-account {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 200;
    background-color: rgba(0, 0, 1, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    > .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 4.77rem;
        height: 6.18rem;
        background-color: #fff;
        border-radius: 0.1rem;
        position: relative;
        > .qr-code {
            width: 2.36rem;
            height: 2.36rem;
        }
        > .text {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            > span {
                &:nth-child(1) {
                    font-size: 0.27rem;
                    color: rgba(0, 0, 0, 1);
                }
                &:nth-child(2) {
                    margin-top: 0.16rem;
                    font-size: 0.29rem;
                    color: rgba(85, 98, 238, 1);
                }
            }
        }
        > .btn {
            margin-top: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 3.51rem;
            height: 0.72rem;
            background: rgba(85, 98, 238, 1);
            box-shadow: 0px 0.12rem 0.19rem 0.01rem rgba(85, 98, 238, 0.28);
            border-radius: 0.36rem;
            font-size: 0.29rem;
            color: #fff;
        }
        > .close {
            position: absolute;
            left: 50%;
            bottom: -0.95rem;
            transform: translate(-50%);
            width: 0.45rem;
            height: 0.45rem;
        }
    }
}
</style>

