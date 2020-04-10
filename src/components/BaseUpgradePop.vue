<template>
    <transition leave-to-class="leave" leave-active-class="active">
        <div class="base-upgrade-pop">
            <transition
                appear
                appear-active-class="animated bounceInUp"
                leave-active-class="animated bounceOutUp faster"
            >
                <div
                    v-if="isAnimation&&serverVersion"
                    class="content"
                    :style="{backgroundImage:`url(${require('@images/upgrade.png')})`}"
                >
                    <div class="top">
                        <h3>发现新版本</h3>
                        <h4>V{{serverVersion.Ver}}</h4>
                    </div>
                    <div class="center" v-html="serverVersion.Updates"></div>
                    <div class="bottom">
                        <div class="content">
                            <span @click.stop="close">取消</span>
                            <span @click.stop="upgrade">立即升级</span>
                        </div>
                    </div>
                    <div
                        @click.stop="close"
                        class="close"
                        :style="{backgroundImage:`url(${require('@images/close-1.png')})`}"
                    ></div>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
import 'animate.css';
import { getVersion } from '_api/func';
import { forceUpdate } from '_native/func';
import { mapState } from 'vuex';
export default {
    data: () => {
        return {
            isAnimation: true
        };
    },
    computed: {
        ...mapState({
            serverVersion: state => state.native.serverVersion
        })
    },
    methods: {
        upgrade() {
            forceUpdate(this.serverVersion.Url);
        },

        close() {
            // isForced 是否强制更新 1是2 不是
            if (this.serverVersion.isForced == 2) {
                this.isAnimation = false;
                window.setTimeout(() => {
                    this.$store.dispatch('native/setUpgrade', false);
                }, 400);
            } else {
                this.$msg.fail('请点击升级');
            }
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
.base-upgrade-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 1, 0.6);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    > .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 5.44rem;
        height: 6.33rem;
        border-radius: 0.1rem;
        position: relative;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        > .top {
            position: absolute;
            top: 0.6rem;
            left: 0.7rem;
            display: flex;
            flex-direction: column;
            > h3 {
                font-size: 0.37rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
            > h4 {
                margin-top: 0.24rem;
                font-size: 0.29rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
        }
        > .center {
            position: absolute;
            top: 2.8rem;
            left: 0.7rem;
            right: 0.7rem;
            font-size: 0.28rem;
            font-weight: bold;
            line-height: 1.4;
        }
        > .bottom {
            position: absolute;
            bottom: 0.02rem;
            left: 0.22rem;
            right: 0.22rem;
            height: 0.9rem;
            > .content {
                height: 100%;
                display: flex;
                justify-content: space-around;
                border-top: 1px solid #e7e8ea;
                > span {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;

                    font-size: 0.29rem;
                    font-weight: bold;
                    color: rgba(132, 132, 132, 1);
                    &:nth-child(1) {
                        border-right: 1px solid #e7e8ea;
                    }
                    &:nth-child(2) {
                        color: #5461eb;
                    }
                }
            }
        }
        > .close {
            position: absolute;
            top: -0.5rem;
            right: -0.5rem;
            width: 0.45rem;
            height: 0.45rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>
<style lang="less">
.base-upgrade-pop {
    > .wrap {
        > .center {
            position: absolute;
            top: 2.8rem;
            left: 0.7rem;
            font-size: 0.27rem;
            font-weight: 500;
            color: rgba(0, 0, 0, 1);
            padding-top: 0.15rem;
        }
    }
}
</style>


