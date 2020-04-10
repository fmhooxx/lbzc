<template>
    <transition
        appear
        appear-class="base-pay-enter"
        appear-active-class="base-pay-active"
        leave-to-class="base-pay-enter"
        leave-active-class="base-pay-active"
    >
        <div class="base-pay" @click.stop="close" @touchmove.prevent>
            <transition
                appear
                appear-class
                appear-active-class="animated bounceInUp"
                leave-active-class="animated bounceOutDown"
            >
                <div v-if="isAnimation" class="wrap" @click.stop>
                    <div class="title">
                        <div class="text">确认支付</div>
                        <div class="img" @click.stop="close">
                            <img src="@/assets/images/close-2.png" />
                        </div>
                    </div>
                    <cube-scroll :options="options" class="content">
                        <div class="base">
                            <div class="content">
                                <div class="top">
                                    已有
                                    <i>{{data.total_num}}</i>
                                    人购买了{{data.AgentInfo.Name}}
                                </div>
                                <div class="bottom">
                                    <div class="item">
                                        <div class="left">产品名称</div>
                                        <div class="right">{{data.AgentInfo.Name}}</div>
                                    </div>
                                    <div class="item" @click.stop="isBaseCouponPop=true">
                                        <div class="left">优惠券</div>
                                        <div class="right" v-if="!coupon">请选择优惠券</div>
                                        <div class="right coupon" v-if="coupon">{{coupon.price}} 元</div>
                                    </div>
                                    <div class="item">
                                        <div class="left">订单金额</div>
                                        <div class="right">
                                            <i class="before-discount">{{data.AgentInfo.Price}} 元</i>
                                            <i class="after-discount">{{resultPrice}} 元</i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="payMode">
                            <div class="item" @tap.stop="payWay='wei'">
                                <div class="left">
                                    <img src="@/assets/images/wei-1.png" />
                                    <div>
                                        <span>微信支付</span>
                                        <span>微信第三方快捷支付</span>
                                    </div>
                                </div>
                                <div class="right" :class="{selected:payWay!='wei'}">
                                    <div class="no-select" v-show="payWay!='wei'"></div>
                                    <img
                                        class="select"
                                        v-show="payWay=='wei'"
                                        src="@/assets/images/select-5.png"
                                    />
                                </div>
                            </div>
                            <div class="item" v-if="!this.$isWeiXin()" @tap.stop="payWay='zhi'">
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
                            <div class="item" @tap.stop="payWay='yu'">
                                <div class="left">
                                    <img src="@/assets/images/yu-1.png" />
                                    <div>
                                        <span>余额支付</span>
                                        <span>余额快捷支付</span>
                                    </div>
                                </div>

                                <div class="right">
                                    <div class="no-select" v-show="payWay!='yu'"></div>
                                    <img
                                        class="select"
                                        v-show="payWay=='yu'"
                                        src="@/assets/images/select-5.png"
                                    />
                                </div>
                            </div>
                        </div>
                        <div class="btn">
                            <div @tap.stop="pay">确认支付</div>
                        </div>
                        <div style="height:1rem"></div>
                    </cube-scroll>
                </div>
            </transition>
            <BaseCouponPop v-if="isBaseCouponPop" type="2" :isBaseCouponPop.sync="isBaseCouponPop"></BaseCouponPop>
            <BasePop
                v-if="isBasePop"
                :text="basePopText"
                :isBasePop="isBasePop"
                @cancel="cancelBasePop"
                @confirm="confirmBasePop"
            ></BasePop>
            <BaseLoad v-if="isBaseLoad"></BaseLoad>
        </div>
    </transition>
</template>
<script>
import 'animate.css';
import { getPayOrder } from '_api/func';
import { wechatPay } from '_utils/func';
import { payMoney } from '_api/center';
import { mapState } from 'vuex';

export default {
    props: {
        arg: {
            type: Object,
            require: true
        },
        sec: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object,
            default: null
        },
        hasPrice: {
            default: 0
        }
    },
    data() {
        return {
            payWay: 'wei',
            orderId: '',
            basePopText: '支付未成功',
            isBasePop: false,
            isBaseCouponPop: false,
            isAnimation: true,
            isBaseLoad: false,
            options: { tap: true, bounce: false }
        };
    },
    async mounted() {
        this.watchPayStatus();
        await this.$store.dispatch('func/setCoupon', null);
    },
    computed: {
        ...mapState({
            openId: state => {
                return state.weixin.openId;
            },
            coupon: state => {
                return state.func.coupon;
            }
        }),
        resultPrice() {
            let result;
            if (!this.coupon) {
                result = this.data.AgentInfo.Price - this.hasPrice;
            } else {
                result = this.data.AgentInfo.Price - this.hasPrice - this.coupon.price;
            }
            if (result < 0) {
                return 0;
            } else {
                return result;
            }
        },
        payType() {
            if (this.payWay == 'wei') {
                return this.$isWeiXin() ? 1 : 4;
            } else if (this.payWay == 'zhi') {
                return 2;
            } else {
                return 3;
            }
        }
    },
    methods: {
        async pay() {
            try {
                this.isBaseLoad = true;
                let payResult = await payMoney({
                    id: this.data.AgentInfo.level,
                    type: this.payType,
                    coupon_id: this.coupon ? this.coupon.id : '',
                    price: this.resultPrice,
                    openid: this.openId
                });
                this.orderId = payResult.order_id;
                if (this.payType == 2) {
                    // if (this.$platform == 'ios') {
                    //     this.iosCheckOrder();
                    // }
                    this.zhiFuBao(payResult.url);
                } else if (this.payType == 1) {
                    // if (this.$platform == 'ios') {
                    //     this.iosCheckOrder();
                    // }
                    wechatPay(
                        payResult.url.jsApiParameters,
                        () => {
                            this.$msg.success('支付成功', () => {
                                this.$goUrl('/center');
                            });
                        },
                        () => {
                            this.$msg.fail('支付失败', () => {
                                this.close();
                            });
                        }
                    );
                } else if (this.payType == 4) {
                    // this.$open(payResult.url);
                    window.location.href = payResult.url;
                } else {
                    this.$msg.success('支付成功', () => {
                        this.$goUrl('/center');
                    });
                }
                this.isBaseLoad = false;
            } catch (err) {
                this.isBaseLoad = false;
                this.$textTip(err);
            }
        },
        // 支付完成之后原生的通知回调
        watchPayStatus() {
            window.payComplete = async () => {
                try {
                    this.isBaseLoad = true;
                    this.$waitTime(2000);
                    await this.checkOrder();
                    this.isBaseLoad = false;
                    this.$msg.success('支付成功', () => {
                        this.$goUrl('/center');
                    });
                } catch (err) {
                    this.isBaseLoad = false;
                    this.$msg.fail('支付失败', () => {
                        this.close();
                    });
                }
            };
        },
        // 检测状态的弹窗（仅仅是兼容ios版本无法回调payComplete方法）
        async iosCheckOrder() {
            await this.$waitTime(2000);
            this.isBasePop = true;
            this.timer = window.setInterval(async () => {
                try {
                    await this.checkOrder();
                    window.clearInterval(this.timer);
                    this.basePopText = '支付成功';
                } catch (err) {
                    this.basePopText = '支付未成功';
                }
            }, 2000);
        },
        cancelBasePop() {
            if (this.basePopText == '支付成功') {
                let arg = JSON.stringify({ zx_id: this.arg.ID, ID: this.orderId });
                this.$goUrl(`/chaZhengReport?arg=${encodeURIComponent(arg)}`);
            } else {
                this.close();
            }
        },
        confirmBasePop() {
            if (this.basePopText == '支付成功') {
                let arg = JSON.stringify({ zx_id: this.arg.ID, ID: this.orderId });
                this.$goUrl(`/chaZhengReport?arg=${encodeURIComponent(arg)}`);
            } else {
                this.close();
            }
        },
        async checkOrder() {
            await getPayOrder({
                type: 1, // type: 1.代理 2.征信
                order_id: this.orderId
            });
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
            // let alipayInfo = this.serializeFormd(document.forms.alipaysubmit);
            // this.$open(alipayInfo);
        },
        close(order) {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$emit('update:isBasePayAgent', false);
            }, 600);
        },
        // 序列化表单,提取表单中的值
        serializeFormd(form) {
            let serialize = form.action;
            for (let i = 0; i < form.length; i++) {
                if (!form[i].name) continue;
                serialize = serialize + `&${form[i].name}=${encodeURIComponent(form[i].value)}`;
            }
            return serialize;
        }
    }
};
</script>

<style lang="less" scoped>
.base-pay-enter {
    opacity: 0;
}
.base-pay-active {
    transition: all 0.4s ease;
}
.base-pay {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 200;
    background-color: rgba(0, 0, 1, 0.6);
    > .wrap {
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        height: 70%;
        background-color: #fff;
        > .title {
            height: 1.1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-bottom: 1px solid rgb(241, 241, 241);
            background-color: #fff;
            position: relative;
            > .text {
                font-size: 0.34rem;
                font-weight: bold;
                color: rgba(18, 28, 50, 1);
            }
            > .img {
                width: 1.2rem;
                height: 100%;
                position: absolute;
                top: 0px;
                right: 0px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                > img {
                    margin-right: 0.3rem;
                    width: 0.25rem;
                    height: 0.25rem;
                }
            }
        }

        > .content {
            position: absolute;
            top: 1.1rem;
            bottom: 0px;
            left: 0px;
            right: 0px;
            overflow: hidden;
            background-color: #fff;
            .base {
                margin-top: 0.4rem;
                padding: 0px 0.3rem;
                .content {
                    overflow: hidden;
                    border-radius: 0.16rem;
                    box-shadow: 1px 0.09rem 0.3rem 1px rgba(221, 221, 221, 0.6);
                    .top {
                        margin-top: 0.4rem;
                        display: flex;
                        justify-content: center;
                        font-size: 0.32rem;
                        color: #000;
                        > i {
                            color: #5461eb;
                            font-size: 0.32rem;
                            font-weight: bold;
                        }
                    }
                    .bottom {
                        margin-top: 0.3rem;
                        padding: 0px 0.3rem;
                        > .item {
                            height: 0.86rem;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            border-bottom: 1px solid #e7e8ea;
                            > .left {
                                font-size: 0.25rem;
                                color: #000;
                            }
                            > .right {
                                font-size: 0.25rem;
                                color: #929292;
                                .before-discount {
                                    color: #929292;
                                    font-size: 0.25rem;
                                    text-decoration: line-through;
                                }
                                .after-discount {
                                    font-size: 0.25rem;
                                    margin-left: 0.15rem;
                                    color: #f96951;
                                }
                            }
                            .coupon {
                                color: red;
                            }
                        }
                    }
                }
            }
            .payMode {
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
                                    color: #000;
                                }
                                &:nth-child(2) {
                                    margin-top: 0.15rem;
                                    font-size: 0.21rem;
                                    color: #aeadad;
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
            .btn {
                padding: 0px 0.3rem;
                margin-top: 0.7rem;
                margin-bottom: 0.8rem;
                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 0.86rem;
                    background: rgba(85, 98, 238, 1);
                    box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.22);
                    border-radius: 0.06rem;
                    font-size: 0.31rem;
                    font-weight: bold;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
    }
}
</style>
