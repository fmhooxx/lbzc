<template>
    <div class="agent-pay">
        <div class="agree">
            <img @click.stop="agree=!agree" v-show="agree" src="@images/icon-34.png" />
            <div @click.stop="agree=!agree" v-show="!agree" class="circle"></div>
            <div class="text">
                我已阅读并同意
                <i @click.stop="$goUrl('/agree?id=7')">《购买协议》</i>
            </div>
        </div>
        <div class="payBtn">
            <div @click.stop="payMoney">立即购买</div>
        </div>
        <BasePayAgent
            v-if="isBasePayAgent"
            :isBasePayAgent.sync="isBasePayAgent"
            :data="agentDetail"
            :hasPrice="hasPrice"
        ></BasePayAgent>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
    </div>
</template>
<script>
import { getAgentDetail } from '_api/center';
export default {
    props: {
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
            agree: true,
            agentDetail: null,
            isBaseLoad: false,
            isBasePayAgent: false
        };
    },
    mounted() {
        console.log(this.hasPrice);
    },
    computed: {
        productType() {
            return text => {
                if (text == '初级代理') {
                    return 2;
                } else if (text == '中级代理') {
                    return 3;
                } else {
                    return 4;
                }
            };
        }
    },
    methods: {
        async payMoney() {
            try {
                this.isBaseLoad = true;
                if(!this.agree) throw '请同意购买协议'
                this.agentDetail = await getAgentDetail({
                    type: this.productType(this.data.Name)
                });
                this.isBaseLoad = false;
                this.isBasePayAgent = true;
            } catch (err) {
                this.$textTip(err);
                this.isBaseLoad = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.agent-pay {
    > .agree {
        margin-top: 0.4rem;
        display: flex;
        align-items: center;
        padding: 0px 0.3rem;
        > img {
            flex-shrink: 0;
            width: 0.27rem;
            height: 0.27rem;
        }
        > .circle {
            flex-shrink: 0;
            width: 0.27rem;
            height: 0.27rem;
            border-radius: 100%;
            border: 1px solid #ddd;
            border-radius: 50%;
        }
        > .text {
            line-height: normal;
            margin-left: 0.14rem;
            font-size: 0.23rem;
            color: #929292;
            > i {
                color: #5562ee;
            }
        }
    }
    > .payBtn {
        margin-top: 0.38rem;
        padding: 0rem 0.3rem;
        > div {
            height: 0.83rem;
            background: rgba(85, 98, 238, 1);
            box-shadow: 0px 0.12rem 0.28rem 0.01rem rgba(85, 98, 238, 0.37);
            border-radius: 0.05rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.3rem;
            font-weight: bold;
            color: #fff;
        }
    }
}
</style>

