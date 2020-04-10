<template>
    <div class="cha-income">
        <div class="title">推荐信用查询赚佣金</div>
        <table style="width: 100%;">
            <tr>
                <td class="type" style="color:#5562EE">您的级别</td>
                <td class="per" style="color:#5562EE">佣金比例</td>
            </tr>

            <tr>
                <td class="type">初级代理</td>
                <td class="per">{{priceList.zenxin.Zenxinsy2}}%</td>
            </tr>
            <tr style="background: #F4FAFF">
                <td class="type">中级代理</td>
                <td class="per">{{priceList.zenxin.Zenxinsy3}}%</td>
            </tr>
            <tr style="border-bottom: 1px solid #F3F3F3">
                <td class="type">高级代理</td>
                <td class="per">{{priceList.zenxin.Zenxinsy4}}%</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default {
    props: {
        priceList: {
            type: Object,
            default: null
        }
    }
};
</script>

<style lang="less" scoped>
.cha-income {
    padding: 0px 0.3rem;
    > .title {
        font-size: 0.3rem;
        font-weight: bold;
    }
    > table {
        margin-top: 0.4rem;
        tr {
            height: 0.7rem;

            td {
                font-size: 0.22rem;
                color: #626262;
                vertical-align: middle;
                white-space: nowrap;
            }
            td.type {
                padding-left: 0.76rem;
                text-align: left;
            }
            td.per {
                width: 1rem;
                text-align: center;
                padding-right: 0.76rem;
                text-align: right;
            }
        }
    }
}
</style>
