<template>
    <div class="agent-income">
        <div class="title">您的推荐下级代理获得收益</div>
        <div class="content">
            <table style="width:100%;">
                <tr style="background: rgb(244, 250, 255);">
                    <td rowspan="2" class="h_1" style="vertical-align:middle">本人级别</td>
                    <td rowspan="2" class="h_1" style="vertical-align:middle">推荐级别</td>
                    <td colspan="2" class="h_2">直推</td>
                    <td colspan="2" class="h_2">团队</td>
                </tr>
                <tr style="background: rgb(244, 250, 255);">
                    <td>比例</td>
                    <td>佣金</td>
                    <td>比例</td>
                    <td>佣金</td>
                </tr>
                <tr>
                    <td rowspan="3" style="vertical-align:middle">初级</td>
                    <td>初级</td>
                    <td>{{priceList.level[0].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,0,0)}}</td>
                    <td>{{priceList.level[0].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,0,0)}}</td>
                </tr>
                <tr>
                    <td>中级</td>
                    <td>{{priceList.level[0].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,0,1)}}</td>
                    <td>{{priceList.level[0].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,0,1)}}</td>
                </tr>
                <tr>
                    <td>高级</td>
                    <td>{{priceList.level[0].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,0,2)}}</td>
                    <td>{{priceList.level[0].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,0,2)}}</td>
                </tr>

                <tr>
                    <td rowspan="3" style="vertical-align:middle">中级</td>
                    <td>初级</td>
                    <td>{{priceList.level[1].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,1,0)}}</td>
                    <td>{{priceList.level[1].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,1,0)}}</td>
                </tr>
                <tr>
                    <td>中级</td>
                    <td>{{priceList.level[1].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,1,1)}}</td>
                    <td>{{priceList.level[1].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,1,1)}}</td>
                </tr>
                <tr>
                    <td>高级</td>
                    <td>{{priceList.level[1].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,1,2)}}</td>
                    <td>{{priceList.level[1].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,1,2)}}</td>
                </tr>

                <tr>
                    <td rowspan="3" style="vertical-align:middle">高级</td>
                    <td>初级</td>
                    <td>{{priceList.level[2].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,2,0)}}</td>
                    <td>{{priceList.level[2].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,2,0)}}</td>
                </tr>
                <tr>
                    <td>中级</td>
                    <td>{{priceList.level[2].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,2,1)}}</td>
                    <td>{{priceList.level[2].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,2,1)}}</td>
                </tr>
                <tr>
                    <td>高级</td>
                    <td>{{priceList.level[2].mem_daili_1}}%</td>
                    <td>￥{{priceFormat(0,2,2)}}</td>
                    <td>{{priceList.level[2].mem_daili_2}}%</td>
                    <td>￥{{priceFormat(1,2,2)}}</td>
                </tr>
            </table>
        </div>
        <div class="tips">注：高级代理可以直接购买也可以优先购买初级、中级、以后再补差价升级</div>
    </div>
</template>
<script>
export default {
    props: {
        priceList: {
            type: Object,
            default: null
        }
    },
    methods: {
        priceFormat(num, moneyIndex, type) {
            let income = 0;
            if (num == 0) {
                income =
                    (this.priceList.level[moneyIndex].mem_daili_1 / 100) *
                    this.priceList.level[type].Price;
            } else {
                income =
                    (this.priceList.level[moneyIndex].mem_daili_2 / 100) *
                    this.priceList.level[type].Price;
            }

            return income.toFixed(1);
        }
    }
};
</script>
<style lang="less" scoped>
.agent-income {
    padding: 0 0.3rem;
    > .title {
        font-size: 0.3rem;
        color: #292f3d;
        font-weight: bold;
    }
    > .content {
        margin-top: 0.4rem;
        > table {
            border-right: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            tr {
                td {
                    line-height: normal;
                    border-left: 1px solid #ccc;
                    border-top: 1px solid #ccc;
                    text-align: center;
                    font-size: 0.22rem;
                    padding: 0.2rem 0;
                }
            }
        }
    }
    > .tips {
        line-height: normal;
        font-size: 0.24rem;
        color: #292f3d;
        margin-top: 0.56rem;
    }
}
</style>

