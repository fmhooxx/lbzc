<template>
    <div class="wallet">
        <div class="content" v-if="userData">
            <div class="top">
                <div class="nav">
                    <div class="arrow" @click.stop="$goBack">
                        <img src="@images/arrow-8.png">
                    </div>
                    <div class="text">我的钱包</div>
                    <div class="btn" @click.stop="$goUrl('/takeMoney')">提现</div>
                </div>
            </div>
            <div class="center">
                <div class="top">
                    <div class="val">{{userData.balance}}</div>
                    <div class="text">账户余额(元)</div>
                </div>
                <div class="bottom">
                    <div class="left">
                        <div class="val">{{userData.all_money}}</div>
                        <div class="text">累计佣金（元）</div>
                    </div>
                    <div class="right">
                        <div class="val">{{userData.cur_month}}</div>
                        <div class="text">本月佣金（元）</div>
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div @click.stop="$goUrl('/income')">
                    <img class="left" src="@images/icon-23.png">
                    <div class="text">收入明细</div>
                    <img class="right" src="@images/arrow-2.png">
                </div>
                <div @click.stop="$goUrl('/takeDetail')">
                    <img class="left" src="@images/icon-24.png">
                    <div class="text">提现明细</div>
                    <img class="right" src="@images/arrow-2.png">
                </div>
            </div>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getWallet } from '_api/center';
export default {
    data() {
        return {
            userData: null,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.userData = await getWallet();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    beforeRouteEnter(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    }
};
</script>

<style lang="less" scoped>
.wallet {
    background-color: #f6f7fb;
    > .content {
        > .top {
            height: 3.62rem;
            background-image: linear-gradient(to right, #2e7cf6, #35a8fd);
            overflow: hidden;
            padding: 0px 0.3rem;
            position: relative;
            > .nav {
                margin-top: 0.37rem;
                display: flex;
                align-items: center;
                > .arrow {
                    width: 1rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    > img {
                        width: 0.17rem;
                        height: 0.31rem;
                    }
                }
                > .text {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 0.36rem;
                    font-weight: bold;
                    color: #fff;
                    text-align: center;
                }
                > .btn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 0.4rem;
                    position: absolute;
                    right: 0.3rem;
                    line-height: normal;
                    font-size: 0.26rem;
                    font-weight: 500;
                    color: rgba(47, 130, 247, 1);
                    background-color: #fff;
                    padding: 0px 0.2rem;
                    border-radius: 0.2rem;
                }
            }
        }
        > .center {
            position: absolute;
            left: 0.3rem;
            right: 0.3rem;
            top: 1.42rem;
            height: 3.72rem;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            box-shadow: 0px 0.08rem 0.29rem 0.02rem rgba(46, 125, 246, 0.1);
            background-color: #fff;
            border-radius: 0.16rem;
            > .top {
                margin-top: 0.6rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                > .val {
                    line-height: normal;
                    font-size: 0.56rem;
                    font-weight: bold;
                    color: rgba(85, 98, 236, 1);
                }
                > .text {
                    line-height: normal;
                    font-size: 0.29rem;
                    font-weight: 500;
                    color: rgba(89, 104, 128, 1);
                    opacity: 0.8;
                }
            }
            > .bottom {
                margin-top: 0.7rem;
                display: flex;
                > div {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    &:first-child {
                        border-right: 1px solid #e6e8ec;
                    }
                    > .val {
                        line-height: normal;
                        font-size: 0.34rem;
                        font-weight: bold;
                        color: rgba(57, 66, 86, 1);
                    }
                    > .text {
                        line-height: normal;
                        margin-top: 0.05rem;
                        font-size: 0.25rem;
                        font-weight: 500;
                        color: rgba(89, 104, 128, 1);
                        opacity: 0.8;
                    }
                }
            }
        }
        > .bottom {
            margin-top: 2.45rem;
            display: flex;
            flex-direction: column;
            padding: 0px 0.3rem;
            align-items: center;

            > div {
                margin-top: 0.48rem;
                width: 100%;
                display: flex;
                align-items: center;
                height: 1.02rem;
                box-shadow: 0px 0.05rem 0.18rem 0px rgba(54, 171, 254, 0.1);
                border-radius: 0.5rem;
                background-color: #fff;
                position: relative;
                &:first-child {
                    margin-top: 0px;
                }
                > .left {
                    margin-left: 0.36rem;
                    width: 0.5rem;
                    height: 0.5rem;
                }
                > .text {
                    margin-left: 0.2rem;
                    font-size: 0.28rem;
                    color: rgba(0, 0, 0, 1);
                }
                > .right {
                    position: absolute;
                    right: 0.58rem;
                    width: 0.12rem;
                    height: 0.23rem;
                }
            }
        }
    }
}
</style>

