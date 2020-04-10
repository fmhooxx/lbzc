<template>
    <div class="take-apply">
        <div class="title">兑现金额（元）</div>
        <div class="money">
            ¥
            <input type="number" v-model="money" placeholder="请输入金额" />
        </div>
        <div class="desc">
            <div class="text">
                可用余额：
                <i>{{userData.Balance}}元</i>
            </div>
            <div class="text">
                提现手续费：
                <i>{{Number(userData.Balance)*Number(cost)}}元</i>
            </div>
        </div>
        <div class="apply" @click.stop="payTixian">
            <div>提现</div>
        </div>
        <div class="tips">
            <div class="title">温馨提示</div>
            <div class="list">
                <div>1、请仔细核对您的提现信息，如果因信息填写错误导致转账失败或转给他人，责任自负。</div>
                <div>
                    2、提现金额必须
                    <i style="color:red">≥20元</i>，提现实时到账！
                </div>
            </div>
        </div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
    </div>
</template>
<script>
import { payTixian, bankTixian } from '_api/center';
import { takeEncrypt } from '_utils/encrypt';
export default {
    props: {
        type: {
            type: String,
            default: 'zhi',
            required: true
        },
        userData: {
            type: Object,
            default: null,
            required: true
        },
        cost: {
            type: Number,
            default: 0,
            required: true
        }
    },
    data() {
        return {
            money: 0,
            isBaseLoad: false
        };
    },
    methods: {
        async payTixian() {
            try {
                this.isBaseLoad = true;
                let encrypt = takeEncrypt(this.userData, this.money, this.type);
                if (this.type == 'zhi') {
                    await payTixian({
                        CardName: this.userData.AlipayName,
                        CardNo: this.userData.Alipay,
                        Money: this.money,
                        sign: encrypt.sign,
                        timestamp: encrypt.timestamp
                    });
                } else {
                    await bankTixian({
                        holdname: this.userData.BankName,
                        money: this.money,
                        cardNo: this.userData.Bank,
                        sign: encrypt.sign,
                        timestamp: encrypt.timestamp
                    });
                }
                this.$msg.success('提现成功', () => {
                    this.$goBack();
                });
                this.isBaseLoad = false;
            } catch (err) {
                this.$textTip(err);
                this.isBaseLoad = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.take-apply {
    background-color: #fff;
    > .title {
        padding: 0px 0.3rem;
        font-size: 0.25rem;
        font-weight: bold;
        color: rgba(111, 111, 111, 1);
    }
    > .money {
        padding: 0px 0.3rem;
        margin-top: 0.2rem;
        height: 1rem;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #e7e7e7;
        font-size: 0.5rem;
        font-weight: bold;
        color: rgba(18, 28, 50, 1);
        > input {
            flex: 1;
            border: none;
            outline: none;
            margin-left: 0.4rem;
            font-size: 0.4rem;
            &::placeholder {
                color: #ddd;
            }
        }
    }
    > .desc {
        padding: 0px 0.3rem;
        display: flex;
        align-items: center;
        height: 0.9rem;
        > .text {
            font-size: 0.23rem;
            color: rgba(18, 28, 50, 1);
            margin-right: 0.5rem;
            > i {
                color: #4769ee;
            }
        }
    }
    > .apply {
        padding: 0px 0.3rem;
        padding-top: 0.7rem;
        background-color: #f6f7fb;
        > div {
            height: 0.86rem;
            background: rgba(85, 98, 238, 1);
            box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.3);
            border-radius: 0.06rem;
            font-size: 0.3rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    > .tips {
        padding: 0px 0.3rem;
        padding-top: 0.78rem;
        background-color: #f6f7fb;
        > .title {
            font-size: 0.27rem;
            color: #000;
        }
        > .list {
            margin-top: 0.3rem;
            font-size: 0.25rem;
            > div {
                line-height: 1.8;
                margin-bottom: 0.22rem;
                color: rgba(111, 111, 111, 1);
            }
        }
    }
}
</style>
