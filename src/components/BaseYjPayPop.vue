<template>
    <transition leave-to-class="leave" leave-active-class="active">
        <div class="base-yj-pay-pop" @click.stop="close">
            <transition
                appear
                appear-active-class="animated bounceInUp"
                leave-active-class="animated bounceOutUp faster"
            >
                <div class="wrap" v-if="isAnimation" @click.stop>
                    <div class="content">
                        <div class="title">
                            <div class="text">支付方式</div>
                            <img @click.stop="close" class="close" src="@images/close-2.png" />
                        </div>
                        <div class="payMode">
                            <div class="item" @click="payWay='wei'">
                                <div class="left">
                                    <img src="@/assets/images/wei-1.png" />
                                    <div>
                                        <span>微信支付</span>
                                        <span>微信第三方快捷支付</span>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="no-select" v-show="payWay!='wei'"></div>
                                    <img
                                        class="select"
                                        v-show="payWay=='wei'"
                                        src="@/assets/images/select-5.png"
                                    />
                                </div>
                            </div>
                            <div class="item" v-if="!this.$isWeiXin()" @click.stop="payWay='zhi'">
                                <div class="left">
                                    <img src="@/assets/images/zhi-1.png" />
                                    <div>
                                        <span>支付宝支付</span>
                                        <span>支付宝快捷支付</span>
                                    </div>
                                </div>

                                <div class="right">
                                    <div class="no-select" v-show="payWay!='zhi'"></div>
                                    <img
                                        class="select"
                                        v-show="payWay=='zhi'"
                                        src="@/assets/images/select-5.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="btn">
                            <div @click.stop="payMoney">确认支付</div>
                        </div>
                        <div style="height:0.4rem"></div>
                    </div>
                </div>
            </transition>
            <BaseLoad v-if="isBaseLoad"></BaseLoad>
        </div>
    </transition>
</template>
<script>
import { payYJ, getPayOrder } from '_api/func';
import { mapState } from 'vuex';
import { wechatPay } from '_utils/func';
export default {
    props: {
        isBaseYjPayPop: {
            type: Boolean,
            default: false
        },
        price: {
            default: 0
        }
    },
    data() {
        return {
            payWay: 'wei',
            orderId: '',
            isBaseLoad: false,
            isAnimation: true
        };
    },

    computed: {
        ...mapState({
            openId: state => {
                return state.weixin.openId;
            }
        }),

        payType() {
            if (this.payWay == 'wei') {
                return this.$isWeiXin() ? 1 : 3;
            } else {
                return 2;
            }
        }
    },
    mounted() {
        this.watchPayStatus();
    },
    methods: {
        close() {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$emit('update:isBaseYjPayPop', false);
            }, 400);
        },
        // 支付完成之后原生的通知回调
        watchPayStatus() {
            window.payComplete = async () => {
                try {
                    this.isBaseLoad = true;
                    this.$waitTime(2000);
                    await this.checkOrder();
                    this.$msg.success('支付成功', () => {
                        this.close();
                    });
                    this.isBaseLoad = false;
                } catch (err) {
                    this.$msg.fail('支付失败', () => {
                        this.close();
                    });
                    this.isBaseLoad = false;
                }
            };
        },
        async checkOrder() {
            await getPayOrder({
                type: 3, // type: 1.代理 2.征信 3.押金
                order_id: this.orderId
            });
        },

        async payMoney() {
            try {
                this.isBaseLoad = true;
                let payResult = await payYJ({
                    type: this.payType, // PayType: 支付方式 1：jsapi  2:支付宝 3：余额 4 微信h5
                    price: this.price,
                    openid: this.openId
                });
                this.orderId = payResult.order_id;

                if (this.payType == 2) {
                    this.zhiFuBao(payResult.url);
                } else if (this.payType == 1) {
                    wechatPay(
                        payResult.url.jsApiParameters,
                        () => {
                            this.$msg.success('支付成功', () => {
                                this.close();
                            });
                        },
                        () => {
                            this.$msg.fail('支付失败', () => {
                                this.close();
                            });
                        }
                    );
                } else {
                    window.location.href = payResult.url;
                }
                this.isBaseLoad = false;
            } catch (err) {
                this.isBaseLoad = false;
                this.$textTip(err);
            }
        },
        zhiFuBao(url) {
            if (document.getElementById('zhifubao')) {
                document.body.removeChild(document.getElementById('zhifubao'));
            }
            this.zhifubaoEle = document.createElement('div');
            this.zhifubaoEle.setAttribute('id', 'zhifubao');
            this.zhifubaoEle.innerHTML = url;
            document.body.appendChild(this.zhifubaoEle);
            document.forms.alipaysubmit.submit();
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
.base-yj-pay-pop {
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
    > .wrap {
        width: 100%;
        padding: 0px 0.6rem;
        > .content {
            border-radius: 0.2rem;
            background-color: #fff;
            > .title {
                height: 0.94rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #e7e8ea;
                position: relative;
                .text {
                    font-size: 0.3rem;
                    color: rgba(85, 98, 238, 1);
                }
                .close {
                    position: absolute;
                    top: 50%;
                    right: 0.3rem;
                    transform: translateY(-50%);
                    width: 0.25rem;
                    height: 0.25rem;
                }
            }
            > .payMode {
                width: 100%;
                margin-top: 0.8rem;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0px 0.3rem;
                .item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0px 0.3rem;
                    height: 1.12rem;
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 0px 0.05rem 0.18rem 0px rgba(54, 171, 254, 0.18);
                    border-radius: 0.55rem;
                    margin-bottom: 0.4rem;
                    > .left {
                        display: flex;
                        align-items: center;
                        > img {
                            width: 0.43rem;
                            height: 0.43rem;
                        }
                        > div {
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            margin-left: 0.4rem;
                            > span {
                                &:nth-child(1) {
                                    font-size: 0.29rem;
                                    font-weight: bold;
                                    color: rgba(18, 28, 50, 1);
                                }
                                &:nth-child(2) {
                                    margin-top: 0.15rem;
                                    font-size: 0.21rem;
                                    font-weight: 500;
                                    color: rgba(119, 119, 119, 1);
                                }
                            }
                        }
                    }
                    > .right {
                        display: flex;
                        align-content: center;
                        > .select {
                            width: 0.3rem;
                            height: 0.3rem;
                            flex-shrink: 0;
                        }
                        > .no-select {
                            width: 0.3rem;
                            height: 0.3rem;
                            flex-shrink: 0;
                            border: 1px solid #d3d3d3;
                            border-radius: 100%;
                        }
                    }
                    &:first-child {
                        margin-top: 0px;
                    }
                }
            }
            > .btn {
                padding: 0px 0.3rem;
                margin-top: 0.4rem;
                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 0.86rem;
                    background-color: #5562ee;
                    box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.22);
                    border-radius: 0.6rem;
                    font-size: 0.3rem;
                    font-weight: bold;
                    color: #fff;
                }
            }
        }
    }
}
</style>

