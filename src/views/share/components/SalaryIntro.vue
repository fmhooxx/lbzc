<template>
    <div class="salary-intro">
        <base-title size="0.32rem" style="border:none">工资介绍</base-title>
        <div class="list">
            <div class="item">
                <i></i>
                <div class="text">您的每月工资=推荐会员收入+推荐办卡收入+推荐贷款收入 +推荐信用查询收入</div>
            </div>
        </div>
        <div class="chart">
            <img class="top" src="@images/icon-8.png">
            <img class="right" src="@images/icon-9.png">
            <div class="content">
                <div class="title">
                    <div class="item one">
                        <i style="background:rgba(144, 152, 245, 1);"></i>
                        <div
                            class="text"
                        >{{priceFilter(productData.info.StepBase,productData.info.Yjtype)}}</div>
                    </div>
                    <div class="item two">
                        <i style="background:rgba(43, 160, 250, 1);"></i>
                        <div
                            class="text"
                        >{{priceFilter1(productData.info.StepBase,productData.info.StepInc1,productData.info.Yjtype)}}</div>
                    </div>
                    <div class="item three">
                        <i style="background:rgba(255, 129, 65, 1);"></i>
                        <div class="text">
                            {{priceFilter2(productData.info.StepBase,productData.info.StepInc2,productData.info.StepInc3,productData.info.Yjtype)}}
                            <i>（高级专享）</i>
                        </div>
                    </div>
                </div>
                <div class="cell" style="margin-top:0.7rem;">
                    <div class="item three">
                        <div class="text">
                            <div style="padding-bottom: 0.05rem;color:#ff8141">高级</div>
                            <div style="color:#ff8141">代理</div>
                        </div>
                        <div class="square">
                            <div
                                class="s"
                                style="background-color:#ff8141;"
                            >{{priceFilter(productData.info.StepBase,productData.info.Yjtype)}}</div>
                            <div
                                class="s"
                                style="background-color:#ff9863;"
                            >{{priceFilter(productData.info.StepInc2,productData.info.Yjtype)}}</div>
                            <div
                                class="s"
                                style="background-color:#ffb893;"
                            >{{priceFilter(productData.info.StepInc3,productData.info.Yjtype)}}</div>
                        </div>
                    </div>
                    <div class="item two" style="margin-top:0.4rem;">
                        <div class="text">
                            <div style="padding-bottom:0.05rem;color:#2ba0fa;">中级</div>
                            <div style="color:#2ba0fa;">代理</div>
                        </div>
                        <div class="square">
                            <div
                                class="s"
                                style="background-color: #2ba0fa;"
                            >{{priceFilter(productData.info.StepBase,productData.info.Yjtype)}}</div>
                            <div
                                class="s"
                                style="background-color: #65bcff;"
                            >{{priceFilter(productData.info.StepInc1,productData.info.Yjtype)}}</div>
                        </div>
                    </div>
                    <div class="item one" style="margin-top:0.4rem;">
                        <div class="text">
                            <div style="padding-bottom:0.05rem;color:#9098f5;">初级</div>
                            <div style="color:#9098f5;">代理</div>
                        </div>
                        <div class="square">
                            <div
                                class="s"
                                style="background-color:#9098f5;"
                            >{{priceFilter(productData.info.StepBase,productData.info.Yjtype)}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tips">
            <div class="top">
                <i class="red"></i>
                <div class="text">{{productData.info.StepFee}}</div>
            </div>
            <div class="bottom" style="marginTop:0.2rem">
                <i class="blue"></i>
                <div class="text">{{productData.info.BaseFee}}</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        productData: {
            type: Object,
            default: null
        }
    },
    methods: {
        // type 1  按照比例   2 按照金额
        priceFilter(p1, type) {
            if (type == 1) {
                return `${p1}%`;
            } else {
                return `${p1}元`;
            }
        },
        priceFilter1(p1, p2, type) {
            let val = parseFloat(p1) + parseFloat(p2);
            if (type == 1) {
                return `${val.toFixed(2)}%`;
            } else {
                return `${val.toFixed(2)}元`;
            }
        },
        priceFilter2(p1, p2, p3, type) {
            let val = parseFloat(p1) + parseFloat(p2) + parseFloat(p3);
            if (type == 1) {
                return `${val.toFixed(2)}%`;
            } else {
                return `${val.toFixed(2)}元`;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.salary-intro {
    > .list {
        > .item {
            display: flex;
            padding: 0.1rem 0.36rem;
            > i {
                flex-shrink: 0;
                width: 6px;
                height: 6px;
                border-radius: 50%;
                transform: translateY(0.1rem);
                background-color: #8f8f8f;
            }

            > .text {
                margin-left: 0.2rem;
                line-height: normal;
                font-size: 0.26rem;
                color: #8f8f8f;
            }
        }
    }
    > .chart {
        margin-top: 0.55rem;
        display: flex;
        padding-left: 0.38rem;
        padding-right: 0.5rem;
        position: relative;
        > .top {
            width: 0.16rem;
            height: 0.16rem;
            position: absolute;
            top: -0.03rem;
            left: 0.315rem;
        }
        > .right {
            width: 0.16rem;
            height: 0.16rem;
            position: absolute;
            bottom: -0.07rem;
            right: 0.49rem;
        }
        > .content {
            width: 6.49rem;
            height: 4.04rem;
            border-left: 0.02rem solid #bcbcbc;
            border-bottom: 0.02rem solid #bcbcbc;
            box-sizing: border-box;
            padding-left: 30px;
            > .title {
                display: flex;
                align-items: center;
                margin-top: 0.3rem;
                > .item {
                    margin-right: 0.4rem;
                    display: flex;
                    align-items: center;
                    > i {
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        margin-right: 0.15rem;
                    }
                    > .text {
                        line-height: normal;
                        white-space: nowrap;
                        font-size: 0.21rem;
                        color: rgba(41, 47, 61, 1);
                        > i {
                            color: #fa4f27;
                        }
                    }
                }
            }
            > .cell {
                > .item {
                    display: flex;
                    align-items: center;
                    > .text {
                        display: flex;
                        flex-direction: column;
                        margin-right: 0.24rem;
                        > div {
                            font-size: 0.22rem;
                            font-weight: bold;
                        }
                    }
                    > .square {
                        display: flex;
                        > .s {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            line-height: normal;
                            width: 1.42rem;
                            height: 0.5rem;
                            font-size: 0.24rem;
                            color: rgba(255, 255, 255, 1);
                        }
                    }
                }
            }
        }
    }
    > .tips {
        margin-top: 0.45rem;
        padding: 0px 0.3rem;
        > .top,
        .bottom {
            display: flex;
            > i {
                width: 0.2rem;
                height: 0.2rem;
                border-radius: 0.05rem;
                transform: translateY(0.06rem);
            }
            > .text {
                margin-left: 0.2rem;
                font-size: 0.22rem;
                color: #8f8f8f;
                line-height: normal;
            }
            > .red {
                background-color: rgba(255, 112, 25, 1);
            }
            > .blue {
                background-color: #424ee2;
            }
        }
    }
}
</style>

