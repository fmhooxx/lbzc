<template>
    <div class="income-chart" :style="{backgroundImage:`url(${require('@images/b-3.png')})`}">
        <div class="top">
            <div class="left" @click.stop="$goUrl('/income')">
                <div class="income">{{userInfoData.Income}}</div>
                <div class="text">总收入(元)</div>
            </div>
            <div class="right" @click.stop="$goUrl('/takeMoney')">
                <div class="text">提现</div>
                <img src="@images/icon-13.png">
            </div>
        </div>
        <div class="bottom">
            <div class="yet-pay" @click.stop="$goUrl('/income')">
                <div class="account">{{userInfoData.Account}}</div>
                <div class="text">已结算 (元）</div>
            </div>
            <div class="can-pay" @click.stop="$goUrl('/wallet')">
                <div class="balance">{{userInfoData.Balance}}</div>
                <div class="text">可结算 (元）</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        userInfoData: {
            type: Object,
            default: null
        }
    }
};
</script>

<style lang="less" scoped>
.income-chart {
    display:flex;
    flex-direction: column;
    justify-content: center;
    height: 3.15rem;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    > .top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        > .left {
            padding-left: 0.75rem;
            > .income {
                color: #fff;
                font-size: 0.41rem;
                font-weight: bold;
            }
            > .text {
                line-height: normal;
                font-size: 0.29rem;
                color: #fff;
                opacity: 0.8;
            }
        }
        > .right {
            transform: translateY(0.05rem);
            margin-right: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0px 0.24rem;
            height: 0.4rem;
            background-color: #fff;
            border-radius: 0.23rem;
            > .text {
                line-height: normal;
                font-size: 0.25rem;
                font-weight: bold;
                color: rgba(52, 133, 255, 1);
            }
            > img {
                margin-left: 0.12rem;
                width: 0.24rem;
                height: 0.22rem;
                transform: translateY(1px);
            }
        }
    }
    > .bottom {
        width: 100%;
        margin-top: 0.5rem;
        display: flex;
        justify-content: space-between;
        padding-left: 0.75rem;
        padding-right: 2.02rem;
        padding-bottom: 0.2rem;
        > .yet-pay {
            display: flex;
            flex-direction: column;
            > .account {
                font-size: 0.35rem;
                font-weight: bold;
                color: #fff;
            }
            > .text {
                font-size: 0.25rem;
                font-weight: 500;
                color: rgba(235, 244, 255, 1);
                opacity: 0.8;
                line-height: normal;
            }
        }
        > .can-pay {
            display: flex;
            flex-direction: column;
            padding-left: 0.34rem;
            border-left: 1px solid rgba(255, 255, 255, 0.3);
            > .balance {
                font-size: 0.34rem;
                font-weight: bold;
                color: #fff;
            }
            > .text {
                font-size: 0.25rem;
                font-weight: 500;
                color: rgba(235, 244, 255, 1);
                opacity: 0.8;
                line-height: normal;
            }
        }
    }
}
</style>

