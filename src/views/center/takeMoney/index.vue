<template>
    <div class="take-money">
        <base-nav>提现</base-nav>
        <base-top></base-top>
        <div class="content" v-if="userData">
            <div class="brand">
                <div class="phone">{{userData.Mobile|mobileHide}}（ID:{{userData.ID}}）</div>
                <div class="money">
                    <div class="top">可用余额 (元)</div>
                    <div class="bottom">{{userData.Balance}}</div>
                </div>
            </div>
            <div class="platform">
                <div class="item" @click.stop="goTake(1)">
                    <div class="left">
                        <img src="@images/zhi-2.png">
                        <div class="text">
                            <div class="top">
                                支付宝提现
                                <i>（单次20元到5万元）</i>
                            </div>
                            <div class="bottom">
                                推荐使用支付宝，
                                <i>秒到账</i>
                            </div>
                        </div>
                    </div>
                    <div class="right">提现</div>
                </div>
                <div class="item" @click.stop="goTake(2)">
                    <div class="left">
                        <img src="@images/bank-1.png">
                        <div class="text">
                            <div class="top">
                                银行卡提现
                                <i>（单次20元到5万元）</i>
                            </div>
                            <div class="bottom">
                                支持各大银行，
                                <i>1-3个工作日人工打款</i>
                            </div>
                        </div>
                    </div>
                    <div class="right">提现</div>
                </div>
            </div>
        </div>
        <BasePop v-if="isBasePop" :isBasePop.sync="isBasePop" :text="text" @confirm="confirm"></BasePop>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import { takeBase } from '_api/center';
export default {
    data() {
        return {
            userData: null,
            text: '',
            type: '',
            isBasePop: false,
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.userData = this.$getUser();
        this.isBaseLoadPage = false;
    },
    methods: {
        async goTake(type) {
            try {
                this.isBaseLoad = true;
                this.type = type;
                let res = await takeBase({ type: this.type });
                this.isBaseLoad = false;
                if (res.result == 100003 || res.result == 100004) {
                    this.text = res.message;
                    this.isBasePop = true;
                } else if (res.result == 100000) {
                    this.$goUrl(`/takeAccout?type=${type == 1 ? 'zhi' : 'bank'}`);
                } else {
                    throw res.message;
                }
            } catch (err) {
                this.isBaseLoad = false;
                this.$textTip(err);
            }
        },
        confirm() {
            this.$goUrl(`/accountBind?type=${this.type == 1 ? 'zhi' : 'bank'}`);
            this.isBasePop = false;
        }
    }
};
</script>

<style lang="less" scoped>
.take-money {
    > .content {
        margin-top: 0.3rem;
        padding: 0px 0.3rem;
        > .brand {
            margin-top: 0.15rem;
            height: 3.02rem;
            overflow: hidden;
            background-image: linear-gradient(
                to right bottom,
                rgb(52, 129, 255),
                rgb(55, 181, 255)
            );
            border-top-left-radius: 0.16rem;
            border-top-right-radius: 0.16rem;
            > .phone {
                margin-top: 0.34rem;
                margin-left: 0.32rem;
                font-size: 0.25rem;
                color: #fff;
                font-weight: bold;
                line-height: normal;
            }
            > .money {
                margin-top: 0.4rem;
                > .top {
                    display: flex;
                    justify-content: center;
                    color: #fff;
                    font-size: 0.28rem;
                    line-height: normal;
                }
                > .bottom {
                    margin-top: 0.1rem;
                    display: flex;
                    justify-content: center;
                    color: #fff;
                    line-height: normal;
                    font-size: 0.6rem;
                    font-weight: bold;
                }
            }
        }
        > .platform {
            > .item {
                margin-top: 0.76rem;
                height: 1.56rem;
                background-color: #fff;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0px 0.08rem 0.19rem 1px rgba(46, 125, 246, 0.08);
                border-radius: 0.16rem;
                > .left {
                    display: flex;
                    align-items: center;
                    box-sizing: border-box;
                    > img {
                        width: 0.54rem;
                        height: 0.54rem;
                        margin-left: 0.25rem;
                    }
                    > .text {
                        height: 1.56rem;
                        display: flex;
                        justify-content: center;
                        flex-direction: column;
                        margin-left: 0.3rem;
                        > .top {
                            display: flex;
                            align-items: center;
                            font-size: 0.3rem;
                            color: #000;
                            font-weight: bold;
                            > i {
                                font-size: 0.22rem;
                                color: #a0a0a0;
                            }
                        }
                        > .bottom {
                            display: flex;
                            margin-top: 0.2rem;
                            font-size: 0.22rem;
                            color: #a0a0a0;
                            > i {
                                font-size: 0.22rem;
                                color: #f97561;
                            }
                        }
                    }
                }
                > .right {
                    display: flex;
                    align-items: center;
                    margin-right: 0.26rem;
                    height: 0.44rem;
                    line-height: normal;
                    padding: 0px 0.4rem;
                    border-radius: 0.2rem;
                    background-image: linear-gradient(to right bottom, #5c6ff0, #83b7fb);
                    font-size: 0.25rem;
                    color: #fff;
                }
            }
        }
    }
}
</style>

