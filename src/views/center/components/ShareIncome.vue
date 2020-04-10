<template>
    <div class="share-income">
        <div class="title">推荐办卡借款赚佣金</div>
        <table>
            <tr class="ka_yj_header" style="background: #F4FAFF">
                <td rowspan="2" class="xuhao">序号</td>
                <td rowspan="2" class="zhouqi" style="background: #F4FAFF">结算周期</td>
                <td rowspan="2" class="canp">产品</td>
                <td colspan="2" class="dai_y">代理直推佣金</td>
                <td colspan="2" class="g_dai">高级代理专享</td>
            </tr>
            <tr class="ka_yj_header" style="background: #F4FAFF">
                <td class="cj_hy">初级代理</td>
                <td class="zj_hy">中级代理</td>
                <td class="zt_hy">直推</td>
                <td class="tt_hy">团推</td>
            </tr>
            <tr
                class="ka_yj_header"
                v-for="(item,index)  in priceList.month_list"
                :key="`ka_yj_header_month_list_${index}`"
                :class="index%2!=0?'td_bg':''"
            >
                <td class="xuhao">{{index}}</td>
                <td class="zhouqi" :rowspan="priceList.month_list.length   " v-if="index==0">
                    <p>次月15号至30号</p>
                </td>
                <td
                    class="canp_c"
                    :class="{canp_c_rule_register:item.rake_back_rule==1,canp_c_rule_xiakuan:item.rake_back_rule==2}"
                >{{item.Name}}</td>
                <td class="cj_hy_c">{{yjFormat(item)[1]}}</td>
                <td class="zj_hy_c">{{yjFormat(item)[2]}}</td>
                <td class="zt_hy_c">{{yjFormat(item)[3]}}</td>
                <td class="tt_hy_c">{{yjFormat(item)[4]}}</td>
            </tr>
            <tr>
                <td style="background:#D7DADF;height: 1px;" colspan="8"></td>
            </tr>
            <tr
                class="ka_yj_header"
                v-for="(item,index) in priceList.week_list"
                :key="`ka_yj_header_week_list_${index}`"
                :class="index%2!=0?'td_bg':''"
            >
                <td class="xuhao">{{index+priceList.month_list.length}}</td>
                <td
                    class="zhouqi"
                    style="background: #F6F7FB"
                    :rowspan="priceList.week_list.length   "
                    v-if="index==0"
                >
                    <p>周五结</p>
                </td>
                <td
                    class="canp_c"
                    :class="{canp_c_rule_register:item.rake_back_rule==1,canp_c_rule_xiakuan:item.rake_back_rule==2}"
                >{{item.Name}}</td>
                <td class="cj_hy_c">{{yjFormat(item)[1]}}</td>
                <td class="zj_hy_c">{{yjFormat(item)[2]}}</td>
                <td class="zt_hy_c">{{yjFormat(item)[3]}}</td>
                <td class="tt_hy_c">{{yjFormat(item)[4]}}</td>
            </tr>
            <tr>
                <td style="background:#D7DADF;height: 1px;" colspan="8"></td>
            </tr>
            <tr
                class="ka_yj_header"
                v-for="(item,index) in priceList.day_list"
                :key="`ka_yj_header_day_list_${index}`"
                :class="index%2!=0?'td_bg':''"
            >
                <td class="xuhao">{{index+priceList.month_list.length+priceList.week_list.length}}</td>
                <td class="zhouqi" :rowspan="priceList.day_list.length " v-if="index==0">
                    <p>第二个工作日结算 日结</p>
                </td>
                <td
                    class="canp_c"
                    :class="{canp_c_rule_register:item.rake_back_rule==1,canp_c_rule_xiakuan:item.rake_back_rule==2}"
                >{{item.Name}}</td>
                <td class="cj_hy_c">{{yjFormat(item)[1]}}</td>
                <td class="zj_hy_c">{{yjFormat(item)[2]}}</td>
                <td class="zt_hy_c">{{yjFormat(item)[3]}}</td>
                <td class="tt_hy_c">{{yjFormat(item)[4]}}</td>
            </tr>
        </table>
        <div class="explain">
            <div class="title">说明：</div>
            <div class="list">
                <p>1、所有客户申请的产品必须为首次注册才算做有效</p>
                <p>2、所有结算日期按照客户实际放款到账开始计算</p>
                <p>
                    3、黑色标题产品注册即返佣金，
                    <i style="color:red">红色标题</i>产品需客户下款或下卡激活后返佣金
                </p>
                <p>4、所有产品和价格不定期更新，具体更新信息请留意蓝冰众创系统价格表！</p>
            </div>
        </div>
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
        yjFormat(item) {
            if (item.Yjtype == 1) {
                //百分比
                return [
                    this.formatNull(item.BonusRate1) + '%',
                    this.formatNull(item.BonusRate2) + '%',
                    this.formatNull(item.BonusRate3) + '%',
                    this.formatNull(item.BonusRate4) + '%',
                    this.formatNull(item.BonusRate5) + '%'
                ];
            } else {
                return [
                    this.formatNull(item.Ymoney1) + '元',
                    this.formatNull(item.Ymoney2) + '元',
                    this.formatNull(item.Ymoney3) + '元',
                    this.formatNull(item.Ymoney4) + '元',
                    this.formatNull(item.Ymoney5) + '元'
                ];
            }
        },
        formatNull(val) {
            if (val == null) {
                return '--';
            } else {
                return val;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.share-income {
    padding: 0 0.3rem;
    > .title {
        font-size: 0.3rem;
        color: #292f3d;
        font-weight: bold;
    }
    > table {
        width: 100%;
        margin-top: 0.4rem;
        .td_bg {
            background: #f9fcff;
        }
        td {
            height: 0.65rem;
            line-height: normal;
            vertical-align: middle;
            text-align: center;
        }
        .xuhao {
            font-size: 0.18rem;
            color: #121c32;
            width: 0.6rem;
        }
        .zhouqi {
            font-size: 0.18rem;
            color: #121c32;
            width: 0.66rem;
            background: #f1f2fe;
            p {
                color: #121c32;
                width: 0.22rem;
                margin: 0 auto;
                line-height: 0.4rem;
            }
        }
        .canp {
            font-size: 0.18rem;
            color: #121c32;
            width: 1.1rem;
        }
        .dai_y {
            font-size: 0.18rem;
            color: #121c32;
        }
        .g_dai {
            font-size: 0.18rem;
            color: #121c32;
        }
        .p_hy {
            font-size: 0.18rem;
            color: #fff;
            background: #d3d3d3;
            width: 1.05rem;
        }
        .cj_hy {
            font-size: 0.18rem;
            color: #fff;
            background: #ff8141;
            width: 1.05rem;
        }
        .zj_hy {
            font-size: 0.18rem;
            color: #fff;
            background: #2ba0fa;
            width: 1.05rem;
        }
        .zt_hy {
            font-size: 0.18rem;
            color: #fff;
            background: #7882f3;
            width: 0.9rem;
        }
        .tt_hy {
            font-size: 0.18rem;
            color: #fff;
            background: #afb5ff;
            width: 0.9rem;
        }
        .canp_c {
            font-size: 0.18rem;
            color: #626262;
            width: 0.8rem;
            /* -ms-text-overflow: ellipsis;
                        text-overflow: ellipsis;*/
            overflow: hidden;
            /* white-space: nowrap;*/
        }
        .canp_c_rule_register {
            color: black;
        }
        .canp_c_rule_xiakuan {
            color: red;
        }
        .p_hy_c {
            font-size: 0.18rem;
            color: #626262;
        }
        .cj_hy_c {
            font-size: 0.18rem;
            color: #ff8141;
        }
        .zj_hy_c {
            font-size: 0.18rem;
            color: #2ba0fa;
        }
        .zt_hy_c {
            font-size: 0.18rem;
            color: #7882f3;
        }
        .tt_hy_c {
            font-size: 0.18rem;
            color: #afb5ff;
        }
    }
    > .explain {
        margin-top: 0.6rem;
        > .title {
            font-size: 0.26rem;
            color: #292f3d;
            font-weight: bold;
        }
        > .list {
            margin-top: 0.2rem;
            > p {
                line-height: normal;
                font-size: 0.24rem;
                color: #292f3d;
                margin-bottom: 0.2rem;
            }
        }
    }
}
</style>

