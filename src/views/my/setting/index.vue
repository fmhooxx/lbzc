<template>
    <div class="setting">
        <BaseNav>设置</BaseNav>
        <BaseTop></BaseTop>
        <transition appear appear-class="enter" appear-active-class="active">
            <div class="content">
                <base-placeholder></base-placeholder>
                <div class="item" v-if="!isCenter" @click.stop="$goUrl('/upgrade')">
                    <div class="wrap" style="border:none">
                        <div class="left">关于我们</div>
                        <div class="right">
                            <img class="arrow" src="@/assets/images/arrow-2.png" />
                        </div>
                    </div>
                </div>
                <div class="item" v-if="isCenter" @click.stop="$goUrl('/password?type=reset')">
                    <div class="wrap" style="border:none">
                        <div class="left">修改密码</div>
                        <div class="right">
                            <img class="arrow" src="@/assets/images/arrow-2.png" />
                        </div>
                    </div>
                </div>
                <BasePlaceholder v-if="isNative"></BasePlaceholder>
                <div class="item" v-if="isNative" @click.stop="isBasePop=true">
                    <div class="wrap">
                        <div class="left">清理缓存</div>
                        <div class="right">
                            <div class="text">{{this.cacheSize}}</div>
                            <img class="arrow" src="@/assets/images/arrow-2.png" />
                        </div>
                    </div>
                </div>
                <div class="item" v-if="isNative">
                    <div class="wrap" style="border:none">
                        <div class="left">当前版本</div>
                        <div class="right">
                            <div class="text">{{$store.getters.version}}</div>
                            <img class="arrow" src="@/assets/images/arrow-2.png" />
                        </div>
                    </div>
                </div>
                <div class="btn" @click.stop="loginOut">
                    <div class="content">退出登录</div>
                </div>
            </div>
        </transition>
        <BasePop v-if="isBasePop" :isBasePop.sync="isBasePop" text="确定清理缓存？" @confirm="clear"></BasePop>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import { removeAll } from '_utils/local';
import { loginOut } from '_api/center';
export default {
    data: () => {
        return {
            cacheSize: 0,
            isBasePop: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        try {
            this.getCacheSize();
            this.noticeNative();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    computed: {
        isCenter() {
            let type = this.$route.query.type;
            return type == 'center';
        },
        isNative() {
            let platform = this.$platform();
            return platform != 'h5';
        }
    },
    methods: {
        async loginOut() {
            try {
                await loginOut();
                removeAll();
                this.$msg.success('退出成功', () => {
                    this.$goUrl('/');
                });
            } catch (err) {
                if (err.indexOf('已经是退出状态') >= 0) {
                    removeAll();
                    this.$msg.success('退出成功', () => {
                        this.$goUrl('/');
                    });
                } else {
                    this.$textTip(err);
                }
            }
        },
        noticeNative() {
            if (this.$platform() == 'h5') return;
            if (this.$platform() == 'ios') {
                window.webkit.messageHandlers.requestCacheSize.postMessage({
                    mainTitle: '蓝冰众创'
                });
            } else {
                window.android.requestCacheSize();
            }
        },
        getCacheSize() {
            if (this.$platform() == 'h5') return;
            var _this = this;
            window.setCacheSize = cacheSize => {
                console.log(cacheSize);
                this.cacheSize = cacheSize;
            };
        },
        clear() {
            if (this.$platform() == 'ios') {
                window.webkit.messageHandlers.cleanCacheSize.postMessage({
                    mainTitle: '蓝冰众创'
                });
            } else {
                window.android.cleanCacheSize();
            }
            this.isBasePop = false;
            this.$textTip('清理成功');
        }
    },
    beforeRouteEnter(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.style.backgroundColor = '#fff';
        next();
    }
};
</script>

<style lang="less" scoped>
.enter {
    opacity: 0.5;
    transform: translateY(1rem);
}
.active {
    transition: all 0.6s ease;
}
.setting {
    > .content {
        background-color: #f6f7fb;
        > .item {
            padding: 0px 0.3rem;
            background-color: #fff;
            > .wrap {
                height: 1.16rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #e9e9e9;
                > .left {
                    font-size: 0.28rem;
                    color: #000;
                    // color: rgba(97, 105, 125, 1);
                }
                > .right {
                    display: flex;
                    align-items: center;
                    font-size: 0.28rem;
                    font-weight: 500;
                    color: rgba(97, 105, 125, 1);
                    > .text {
                        margin-right: 0.2rem;
                        font-size: 0.28rem;
                        color: rgba(97, 105, 125, 1);
                    }
                    > .arrow {
                        width: 0.12rem;
                        height: 0.23rem;
                    }
                }
            }
        }
        > .btn {
            margin-top: 0.76rem;
            padding: 0px 0.3rem;
            > .content {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 0.86rem;
                background: rgba(85, 98, 238, 1);
                box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.3);
                border-radius: 0.06rem;
                font-size: 0.32rem;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
}
</style>
