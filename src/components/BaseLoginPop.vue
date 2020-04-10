<template>
    <transition leave-to-class="leave" leave-active-class="active">
        <div class="base-login-pop" @click.stop="close">
            <transition
                appear
                appear-active-class="animated bounceInUp"
                leave-active-class="animated bounceOutUp faster"
            >
                <div v-if="isAnimation" class="content" @click.stop>
                    <div class="title">
                        <div class="text-1">请先登录</div>
                        <div class="text-2" @click.stop="goLogin">密码登录</div>
                    </div>
                    <div class="inputWrap">
                        <div class="item">
                            <input type="tel" v-model="mobile" max="11" placeholder="请输入本人常用手机号">
                        </div>
                        <div class="code">
                            <input type="tel" v-model="msgCode" max="8" placeholder="请输入手机验证码">
                            <base-send-msg :mobile="mobile"></base-send-msg>
                        </div>
                    </div>
                    <div class="xieyi">
                        <img
                            v-if="agree"
                            @click.stop="agree=!agree"
                            src="@/assets/images/select-1.png"
                        >
                        <img
                            v-if="!agree"
                            @click.stop="agree=!agree"
                            src="@/assets/images/select-2.png"
                        >
                        <div class="text">
                            我同意
                            <i @click.stop="$goUrl('/agree?id=5')">《用户注册协议》</i>
                        </div>
                    </div>
                    <div class="shuoming">若您未注册，验证后自动注册并登录</div>
                    <div class="btn">
                        <div v-show="status" class="content" @click.stop="login">登录</div>
                        <div v-show="!status" class="content gray">登录</div>
                    </div>
                </div>
            </transition>
            <base-load v-if="isBaseLoad"></base-load>
        </div>
    </transition>
</template>
<script>
import 'animate.css';
import { getTimestamp, getMemberInfo, rongLogin } from '_api/login';
import { tokenEncrypt } from '_utils/encrypt';
import { saveEncrypt, saveUser } from '_utils/local';
export default {
    props: {
        isBaseLoginPop: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            agree: true,
            msgCode: '',
            mobile: '',
            status: false,
            isBaseLoad: false,
            isAnimation: true
        };
    },
    methods: {
        async getMemberInfo() {
            let user = await getMemberInfo();
            saveUser(user);
        },
        async login() {
            try {
                this.isBaseLoad = true;
                let timestamp = await getTimestamp();
                let token = tokenEncrypt(
                    this.mobile,
                    timestamp.Val,
                    timestamp.ID,
                    this.$platform(),
                    ''
                );
                let loginRes = await rongLogin({
                    ticks: timestamp.Val,
                    ticksid: timestamp.ID,
                    DeviceToken: this.$store.state.native.deviceToken,
                    mobile: this.mobile,
                    token: token,
                    code: this.msgCode
                });
                saveEncrypt({
                    Token: loginRes.Token,
                    IV: loginRes.IV,
                    KEY: loginRes.KEY,
                    ID: loginRes.ID
                });
                await this.getMemberInfo();
                this.loginSate = true;
                this.isBaseLoad = false;
                this.$msg.success('登录成功', () => {
                    this.close();
                });
            } catch (err) {
                this.isBaseLoad = false;
                this.$msg.fail('登录失败');
            }
        },
        goLogin() {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$goUrl('/login');
                this.$emit('update:isBaseLoginPop', false);
            }, 400);
        },
        close() {
            this.isAnimation = false;
            window.setTimeout(() => {
                if (this.$route.name == 'login' && this.loginSate) this.$goUrl('/my');
                this.$emit('update:isBaseLoginPop', false);
            }, 400);
        }
    },
    watch: {
        msgCode: {
            handler: function() {
                if (this.msgCode && this.mobile && this.agree) {
                    this.status = true;
                } else {
                    this.status = false;
                }
            },
            immediate: true
        },
        mobile: {
            handler: function() {
                if (this.msgCode && this.mobile && this.agree) {
                    this.status = true;
                } else {
                    this.status = false;
                }
            },
            immediate: true
        },
        agree: {
            handler: function() {
                if (this.msgCode && this.mobile && this.agree) {
                    this.status = true;
                } else {
                    this.status = false;
                }
            },
            immediate: true
        }
    }
};
</script>
<style lang="less">
.leave {
    opacity: 0;
}
.active {
    transition: all 0.14s ease;
}
.base-login-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    > .content {
        box-sizing: border-box;
        width: 5.4rem;
        height: 6.4rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.15rem;
        padding: 0.4rem;
        > .title {
            margin-top: 0.1rem;
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            color: #333;
            > .text-1 {
                font-weight: 600;
                font-size: 0.4rem;
            }
            > .text-2 {
                font-size: 0.3rem;
            }
        }
        > .inputWrap {
            box-sizing: border-box;
            > .item {
                display: flex;
                align-items: center;
                margin-top: 0.2rem;
                height: 1rem;
                border-bottom: 1px solid #e3e2e2;
                > input {
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: 0.28rem;
                    font-weight: 500;
                    color: rgba(111, 111, 111, 1);
                }
            }
            > .code {
                margin-top: 0.2rem;
                height: 1rem;
                border-bottom: 1px solid #e3e2e2;
                display: flex;
                align-items: center;
                justify-content: space-between;
                > input {
                    width: 3rem;
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: 0.28rem;
                    font-weight: 500;
                    color: rgba(111, 111, 111, 1);
                }
            }
        }

        > .xieyi {
            margin-top: 0.46rem;
            display: flex;
            align-items: center;
            > img {
                width: 0.24rem;
                height: 0.24rem;
            }
            > .text {
                margin-left: 0.2rem;
                color: #666;
                font-size: 0.26rem;
                line-height: normal;
                > i {
                    color: #5562ee;
                    font-size: 0.26rem;
                }
            }
        }
        > .shuoming {
            margin-top: 0.16rem;
            color: #666;
            font-size: 0.26rem;
        }
        > .btn {
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            > .content {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 0.7rem;
                color: #fff;
                background: #5562ee;
                box-shadow: 0px 0px 0px 1px rgba(85, 98, 238, 0.22);
                border-radius: 0.1rem;
                font-size: 0.3rem;
                font-weight: 700;
            }
            > .gray {
                color: #ccc;
                background-color: #e9e9e9;
                box-shadow: none;
            }
        }
    }
}
</style>
