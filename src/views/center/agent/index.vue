<template>
    <div class="agent">
        <BaseNav>代理购买</BaseNav>
        <BaseTop></BaseTop>
        <div class="content" v-if="agentData.length>0">
            <div v-stopMove>
                <AgentSlide :slideData="agentData" @slideChange="slideChange"></AgentSlide>
            </div>
            <div class="title">
                <div class="top">蓝冰众创·智能金融分发系统 {{agentData[productIndex].Name|productTitle}}</div>
                <div class="bottom">时限：永久有效</div>
            </div>
            <div class="intro">
                <div class="title">权益</div>
                <div
                    class="content"
                    style="font-size:0.28rem"
                    v-html="agentData[productIndex].rights"
                ></div>
            </div>
            <AgentPay :data="agentData[productIndex]" :hasPrice="hasPrice"></AgentPay>
            <div class="extra-intro">
                <div class="title">升级说明</div>
                <div class="text">本产品属于线上服务类产品，一经购买即享受平台所有功能，因而不支持退货行为</div>
            </div>
        </div>
        <BaseBottom></BaseBottom>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import AgentSlide from '../components/AgentSlide';
import AgentPay from '../components/AgentPay';
import { getAgent } from '_api/center';
export default {
    components: { AgentSlide, AgentPay },
    data() {
        return {
            agentData: [],
            productIndex: 0,
            isBaseLoadPage: true
        };
    },
    computed: {
        hasPrice() {
            for (let i = 0; i < this.agentData.length; i++) {
                if (this.agentData[i].Name == this.$getUser().Rule) {
                    return this.agentData[i].Price;
                }
            }
        }
    },
    async mounted() {
        try {
            this.agentData = await getAgent();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        slideChange(val) {
            this.productIndex = val;
        }
    },
    filters: {
        productTitle(text) {
            if (text == '初级代理') {
                return '通用版';
            } else if (text == '中级代理') {
                return '增强版';
            } else {
                return '高级版';
            }
        }
    }
};
</script>
<style lang="less" scoped>
.agent {
    > .content {
        margin-top: 0.4rem;
        > .title {
            margin-top: 0.4rem;
            > .top {
                font-size: 0.32rem;
                text-align: center;
                color: #000;
            }
            > .bottom {
                font-size: 0.32rem;
                margin-top: 0.26rem;
                text-align: center;
            }
        }
        > .intro {
            margin-top: 0.45rem;
            > .title {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1rem;
                height: 0.4rem;
                line-height: normal;
                background: rgba(85, 98, 238, 0.1);
                border-top-right-radius: 0.2rem;
                border-bottom-right-radius: 0.2rem;
                font-size: 0.26rem;
                color: #5562ee;
            }
            > .content {
                margin-top: 0.36rem;
                padding: 0px 0.3rem;
                min-height: 4rem;
                /deep/p {
                    line-height: normal;
                }
            }
        }
        > .extra-intro {
            margin-top: 0.8rem;
            padding: 0px 0.3rem;
            > .title {
                color: #000;
                font-size: 0.29rem;
                font-weight: bold;
            }
            > .text {
                line-height: 1.5;
                margin-top: 0.2rem;
                font-size: 0.23rem;
                color: rgba(249, 105, 81, 1);
            }
        }
    }
}
</style>
