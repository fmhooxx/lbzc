<template>
    <div class="newTD_page">
        <!-- 个人信息 -->
        <div class="banner" :style="{backgroundImage:`url(${banner_1})`}">
            <div class="title">
                <div class="title-1">信用评分</div>
                <div class="title-2">{{reportData.note}}</div>
            </div>
            <div class="personInfo" :style="{backgroundImage:`url(${banner_2})`}">
                <div class="top">
                    <div class="avatar" :style="{backgroundImage:`url(${avatarImg})`}"></div>
                    <div class="base">
                        <div class="base_top">
                            <div class="name">{{orderData.realname}}</div>
                            <div class="age">{{orderData.age}}岁</div>
                            <div class="gender">{{orderData.sex}}</div>
                        </div>
                        <div class="base_bottom">
                            <div class="report_name">报告编号：</div>
                            <div class="report_id">{{orderData.order_no}}</div>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <div class="phone_company">
                        <div class="phone">
                            <div class="img" :style="{backgroundImage:`url(${icon_1})`}"></div>
                            <div class="text">{{orderData.phone}}</div>
                        </div>
                        <div class="phone_company">
                            <div class="img" :style="{backgroundImage:`url(${icon_2})`}"></div>
                            <div class="text">{{orderData.age}}</div>
                        </div>
                    </div>
                    <div class="idCard_location">
                        <div class="idCard">
                            <div class="img" :style="{backgroundImage:`url(${icon_3})`}"></div>
                            <div class="text">{{orderData.id_card}}</div>
                        </div>
                        <div class="location">
                            <div class="img" :style="{backgroundImage:`url(${icon_4})`}"></div>
                            <div class="text">{{orderData.area}}</div>
                        </div>
                    </div>
                    <div class="lastShowTime" v-if="orderData.endtime">报告过期时间：{{orderData.endtime}}</div>
                </div>
            </div>
            <div class="score" :style="{backgroundImage:`url(${scoreImg})`}">
                <span>{{user_score}}</span>
            </div>
        </div>
        <div style="height:1.8rem"></div>
        <div class="reportTips" v-if="$route.query.demo=='default'">提示：样例报告数据仅供参考，最终报告结果根据个人信用状况进行展示</div>
        <div class="big_title">风险信息检测</div>
        <div class="content" v-if="reportData.risk_items">
            <div class="grxx_con">
                <!-- '5230679' => '7天内申请人在多个平台申请借款',
        '5230683' => '3个月内申请人在多个平台申请借款',
        '5215401' => '身份证归属地是否有高风险',
        '5215371' => '手机号是否命中虚假号码库',
        '5215429' => '身份证是否命中法院失信名单',
        '5215453' => '身份证是否命中犯罪通缉名单',
        '5215459' => '身份证是否命中法院执行名单',
        '5215463' => '身份证对应人是否存在助学贷款欠费历史',
        '5215465' => '身份证是否命中信贷逾期名单',
        '5215471' => '身份证是否命中高风险关注名单',
        '5215499' => '身份证是否命中车辆租赁违约名单',
        '5215503' => '身份证是否命中法院结案名单',
        '5215527' => '身份证是否命中故意违章乘车名单',
        '5215495' => '手机号是否命中车辆租赁违约名单',
        '5215469' => '手机号是否命中信贷逾期名单',
        '5215541' => '3个月内身份证关联多个申请信息',
        '5215543' => '3个月内申请信息关联多个身份证',
        '18'=>'申请人信息是否命中中风险关注名单'
        '19'=>'36个月内申请人在多个平台申请借款'

          "5230683" => "3个月内申请人在多个平台申请借款",
        "21"      => "6个月内申请人在多个平台申请借款",
        "22"      => "9个月内申请人在多个平台申请借款",
        "23"      => "12个月内申请人在多个平台申请借款",
26  手机号命中高风险关注名单
27  申请人信息命中低风险关注名单
28  敏感时间段申请1点至5点
                -->
                <div class="tips_label">
                    <span></span>
                    <span>个人基本信息核查</span>
                </div>
                <div class="fx_li">
                    <!--手机号是否命中虚假号码库-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215371'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215371'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215371'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215371'].description}}</span>
                        <span>{{reportData.risk_items['5215371'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证归属地是否有高风险-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215401'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215401'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215401'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215401'].description}}</span>
                        <span>{{reportData.risk_items['5215401'].fraud_type_display_name}}</span>
                    </div>
                </div>

                <div class="tips_label">
                    <span></span>
                    <span>风险信息扫描</span>
                </div>
                <div class="fx_li">
                    <div class="fx_msg">
                        <!--身份证是否命中犯罪通缉名单-->
                        <span>{{reportData.risk_items['5215453'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215453'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215453'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215453'].description}}</span>
                        <span>{{reportData.risk_items['5215453'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <div class="fx_msg">
                        <!--身份证是否命中法院执行名单-->
                        <span>{{reportData.risk_items['5215459'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215459'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215459'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215459'].description}}</span>
                        <span>{{reportData.risk_items['5215459'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!-- 身份证对应人是否存在助学贷款欠费历史-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215463'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215463'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215463'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215463'].description}}</span>
                        <span>{{reportData.risk_items['5215463'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证是否命中信贷逾期名单-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215465'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215465'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div class="fx_xd">
                        <div
                            class="fx_xdli"
                            v-for="(item,index) in reportData.risk_items['5215465'].court_details"
                            :key="index"
                        >
                            <div class="fx-li-item">
                                <span>逾期金额：</span>
                                <span>{{item.overdue_amount_range}}</span>
                            </div>
                            <div class="fx-li-item">
                                <span>逾期笔数：</span>
                                <span>{{item.overdue_count}}</span>
                            </div>
                            <div class="fx-li-item hastop">
                                <span>逾期天数：</span>
                                <span>{{item.overdue_day_range}}</span>
                            </div>
                            <div class="fx-li-item hastop">
                                <span>逾期入库时间：</span>
                                <span>{{item.overdue_time}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fx_li">
                    <!--手机号是否命中信贷逾期名单-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215469'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215469'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215469'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215469'].description}}</span>
                        <span>{{reportData.risk_items['5215469'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证是否命中高风险关注名单-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215471'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215471'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215471'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215471'].description}}</span>
                        <span>{{reportData.risk_items['5215471'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <div class="fx_msg">
                        <!-- 申请人信息是否命中中风险关注名单-->
                        <span>{{reportData.risk_items['18'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['18'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['18'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['18'].description}}</span>
                        <span>{{reportData.risk_items['18'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!-- 手机号是否命中车辆租赁违约名单-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215495'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215495'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215495'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215495'].description}}</span>
                        <span>{{reportData.risk_items['5215495'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!-- 身份证是否命中车辆租赁违约名单-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215499'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215499'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215499'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215499'].description}}</span>
                        <span>{{reportData.risk_items['5215499'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!-- 身份证是否命中故意违章乘车名单-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215527'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215527'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215527'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215527'].description}}</span>
                        <span>{{reportData.risk_items['5215527'].fraud_type_display_name}}</span>
                    </div>
                </div>

                <div class="fx_li">
                    <!-- 身份证是否命中法院失信名单-->
                    <div class="fx_msg">
                        <span>{{reportData.risk_items['5215429'].risk_name}}</span>
                        <span
                            v-if="reportData.risk_items['5215429'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="reportData.risk_items['5215429'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{reportData.risk_items['5215429'].description}}</span>
                        <span>{{reportData.risk_items['5215429'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="big_title" style="margin-top: 0.66rem">多平台借贷检测</div>
        <div class="content">
            <div class="duoPT_btn">
                <span
                    :class="TD_duotou_cur=='5230679'?'select':''"
                    @click="TD_duotou_select('5230679')"
                >七天内</span>
                <span :class="TD_duotou_cur=='20'?'select':''" @click="TD_duotou_select('20')">一个月内</span>
                <span
                    :class="TD_duotou_cur=='5230683'?'select':''"
                    @click="TD_duotou_select('5230683')"
                >三个月内</span>
            </div>
            <div style="padding: 0.3rem 0.32rem 0.4rem;background: #F9FAFC;margin-top: 0.45rem;">
                <div class="dt_msg_li">
                    <div class="msg-li-dec" v-for="(item,index) in TD_duotou_Data" :key="index">
                        <span>{{item.industry_display_name}}</span>
                        <span>{{item.count}}</span>
                    </div>
                </div>
                <div class="reportItem-nodata" v-if="TD_duotou_Data.length==0">无记录</div>
            </div>
        </div>
        <div class="big_title" style="margin-top: 0.66rem">申请行为检测</div>
        <div class="content">
            <!--    '3个月内身份证关联多个申请信息'], '5215541'
'3个月内申请信息关联多个身份证'], '5215543'
'3个月内申请人手机号作为联系人手机号出现的次数过多'], '24'
            '3个月内申请人手机号作为联系人手机号出现的次数过多'], '25'-->
            <div class="sqxw_jc_gz">频度规则详情</div>
            <div class="sqxw_jc">
                <div class="sqxw_jc_li">
                    <div class="sqxw_jc_li_t">
                        <span class="t_circle"></span>
                        <span class="t_label">{{reportData.risk_items['5215541'].risk_name}}</span>
                        <span
                            class="t_num"
                        >{{reportData.risk_items['5215541'].frequency_detail_list.length}}</span>
                    </div>
                    <div
                        class="sqxw_jc_li_item"
                        v-if="reportData.risk_items['5215541'].frequency_detail_list.length>0"
                    >
                        <div class="sqxw_jc_li_item_label">关联借款人手机号列表</div>
                        <div class="sqxw_jc_li_item_con">
                            <span
                                v-for="(item,index) in reportData.risk_items['5215541'].frequency_detail_list"
                                :key="`sqxw_jc_li_item_con_${index}`"
                            >{{item}}</span>
                        </div>
                    </div>
                    <div v-else class="reportItem-nodata">无记录</div>
                </div>
                <div class="sqxw_jc_li">
                    <div class="sqxw_jc_li_t">
                        <span class="t_circle"></span>
                        <span class="t_label">{{reportData.risk_items['5215543'].risk_name}}</span>
                        <span
                            class="t_num"
                        >{{reportData.risk_items['5215543'].frequency_detail_list.length}}</span>
                    </div>
                    <div
                        class="sqxw_jc_li_item"
                        v-if="reportData.risk_items['5215543'].frequency_detail_list.length>0"
                    >
                        <div class="sqxw_jc_li_item_label">关联借款人身份证列表</div>
                        <div class="sqxw_jc_li_item_con">
                            <span
                                style="width: 100%"
                                v-for="(item,index) in reportData.risk_items['5215543'].frequency_detail_list"
                                :key="`sqxw_jc_li_item_con_2_${index}`"
                            >{{item}}</span>
                        </div>
                    </div>
                    <div v-else class="reportItem-nodata">无记录</div>
                </div>
            </div>
        </div>
        <!--失信情况-->
        <div
            class="muchHead"
            style="overflow: hidden"
            v-if="reportData.risk_items['5215503'].fraud_type_display_name!=''"
        >
            <div class="headline">失信情况</div>
            <div class="lostletter_subtitle">失信明细</div>
            <div
                class="lostLetter"
                v-for="(item,index) in reportData.risk_items['5215503'].court_details"
                :key="`lostLetter_${index}`"
            >
                <div class="name" style>{{item.evidence_court}}</div>
                <div class="subtitle" style="margin:0 0.16rem  0.2rem 0">{{item.province}}</div>
                <div class="subtitle">{{item.case_date}}</div>
                <div class="letter-item" v-if="item.execute_court">
                    <span>做出执行依据单位：</span>
                    <span>{{item.execute_court}}</span>
                </div>
                <div class="letter-item" v-if="item.case_code">
                    <span>执行依据文号：</span>
                    <span>{{item.case_code}}</span>
                </div>
                <div class="letter-item" v-if="item.carry_out">
                    <span>被执行人的履行性质：</span>
                    <span>{{item.carry_out}}</span>
                </div>
                <div class="letter-item" v-if="item.specific_circumstances">
                    <span>失信被执行人行为具体情形：</span>
                    <span>{{item.specific_circumstances}}</span>
                </div>
                <div class="letter-item" v-if="item.term_duty">
                    <span>生效法律文书确定的义务：</span>
                    <span>{{item.term_duty}}</span>
                </div>
            </div>
        </div>
        <!-- 说明 -->
        <div class="instructions">
            <div class="title">报告数据说明</div>
            <div
                class="text"
                style="marginTop:0.3rem"
            >本报告由用户本人授权查询。数据来源各大运营商、征信平台、网贷平台，蓝冰众创只做大数据信息的获取及分析。</div>
            <div
                class="text"
                style="marginTop:0.1rem"
            >本报告仅供参考使用，如果您对报告有异议，出于对合作平台隐私的保护蓝冰众创不对数据来源做任何解释。</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'index',
    props: {
        reportData: {
            type: Object,
            default: null
        },
        orderData: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            user_score: 0,
            TD_duotou_cur: '5230679',
            TD_duotou_Data: [],
            banner_1: require('@miGuan/newMiGuan-banner-1.png'),
            banner_2: require('@miGuan/newMiGuan-banner-2.png'),
            avatarImg: require('@miGuan/newMiGuan-avatar.png'),
            scoreImg: require('@miGuan/newMiGuan-score.png'),
            icon_1: require('@miGuan/newMiGuan-1.png'),
            icon_2: require('@miGuan/newMiGuan-2.png'),
            icon_3: require('@miGuan/newMiGuan-3.png'),
            icon_4: require('@miGuan/newMiGuan-4.png')
        };
    },
    created() {
        this.TD_duotou_select(this.TD_duotou_cur);
    },
    mounted() {
        this.$nextTick(() => {
            this.Score_progress(this.reportData.final_score);
        });
    },
    methods: {
        TD_duotou_select(val) {
            /*
                "5230679" =>7天内申请人在多个平台申请借款
                "20" =>1个月内申请人在多个平台申请借款
                "5230683" =>3个月内申请人在多个平台申请借款*/
            this.TD_duotou_cur = val;
            this.TD_duotou_Data = this.reportData.risk_items[this.TD_duotou_cur].platform_detail;
        },

        Score_progress(curNum) {
            curNum = curNum >= 100 ? 100 : curNum;
            var self = this;
            function run() {
                self.user_score += 1;
                var stop = window.requestAnimationFrame(run);
                if (self.user_score >= curNum) {
                    window.cancelAnimationFrame(stop); //取消动画。
                    return;
                }
            }
            run();
        }
    }
};
</script>

<style scoped lang="less">
.newTD_page {
    background: #fff;
    .headline {
        color: #121c32;
        font-size: 0.32rem;
        font-weight: bold;
    }
    .lostletter_subtitle {
        color: #3d4ae8;
        font-size: 0.26rem;
        margin-top: 0.25rem;
    }
    .subtitle {
        margin-top: 0.4rem;
        font-size: 0.24rem;
        color: #3d4ae8;
        background: rgba(58, 161, 255, 0.1);
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        display: inline-block;
        padding: 0 0.3rem;
        border-radius: 0.21rem;
    }
    > .banner {
        width: 100%;
        height: 4.48rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border: 1px solid transparent;
        box-sizing: border-box;
        position: relative;
        > .title {
            margin-top: 0.56rem;
            margin-left: 0.3rem;
            > .title-1 {
                font-size: 0.54rem;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
            }
            > .title-2 {
                width: 5rem;
                margin-top: 0.3rem;
                font-size: 0.24rem;
                font-weight: 500;
                line-height: normal;
                color: rgba(255, 255, 255, 0.6);
            }
        }
        > .personInfo {
            margin: 0 auto;
            width: 6.85rem;
            height: 3.2rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            transform: translateY(0.5rem);
            padding: 0px 0.3rem;
            box-sizing: border-box;
            border: 1px solid transparent;
            position: relative;
            line-height: normal;
            .lastShowTime {
                position: absolute;
                bottom: 0;
                left: 0.3rem;
                line-height: 0.8rem;
                color: #fff;
            }
            > .top {
                margin-top: 0.4rem;
                display: flex;
                align-items: center;
                > .avatar {
                    width: 0.65rem;
                    height: 0.65rem;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
                > .base {
                    margin-left: 0.3rem;
                    > .base_top {
                        display: flex;
                        align-items: center;
                        color: rgba(255, 255, 255, 1);
                        > .name {
                            font-size: 0.29rem;
                            font-weight: bold;
                            color: #fff;
                        }
                        > .age {
                            margin-left: 0.4rem;
                            font-size: 0.21rem;
                            color: #fff;
                        }
                        > .gender {
                            margin-left: 0.3rem;
                            font-size: 0.21rem;
                            color: #fff;
                        }
                    }
                    > .base_bottom {
                        margin-top: 0.1rem;
                        display: flex;
                        align-items: center;
                        font-size: 0.21rem;
                        font-weight: 500;
                        > div {
                            color: #fff;
                        }
                    }
                }
            }
            > .bottom {
                margin-top: 0.3rem;
                font-size: 0.21rem;
                font-weight: 500;
                padding: 0px;
                > .phone_company {
                    display: flex;
                    justify-content: space-between;
                    > .phone {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        > .img {
                            width: 0.18rem;
                            height: 0.24rem;
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                        > .text {
                            color: #fff;
                            margin-left: 0.24rem;
                        }
                    }
                    > .phone_company {
                        padding-left: 0.8rem;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        > .img {
                            width: 0.23rem;
                            height: 0.23rem;
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                        > .text {
                            color: #fff;

                            margin-left: 0.24rem;
                        }
                    }
                }
                > .idCard_location {
                    margin-top: 0.2rem;
                    display: flex;
                    justify-content: space-between;
                    > .idCard {
                        flex: 1;
                        display: flex;
                        align-items: center;
                        > .img {
                            width: 0.25rem;
                            height: 0.19rem;
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                        > .text {
                            color: #fff;

                            margin-left: 0.24rem;
                        }
                    }
                    > .location {
                        padding-left: 0.8rem;
                        flex: 1;
                        display: flex;
                        align-items: center;
                        > .img {
                            width: 0.18rem;
                            height: 0.24rem;
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                        }
                        > .text {
                            color: #fff;

                            margin-left: 0.24rem;
                        }
                    }
                }
            }
        }
        > .score {
            width: 2rem;
            height: 2rem;
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: absolute;
            top: 0.16rem;
            right: 0.3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            > span {
                font-size: 0.4rem;
                font-weight: bold;
                color: rgba(67, 101, 247, 1);
            }
        }
    }
    .reportTips {
        font-size: 0.26rem;
        padding: 0 0.3rem;
        color: red;
        margin-bottom: 0.1rem;
    }
    .big_title {
        display: inline-flex;
        align-items: center;
        padding: 0.02rem 0.2rem 0.02rem 0.16rem;
        height: 0.42rem;
        box-sizing: border-box;
        // line-height: 0.55rem;
        line-height: normal;
        font-size: 0.28rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        border-top-right-radius: 0.28rem;
        border-bottom-right-radius: 0.28rem;
        background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
    }
    .content {
        overflow: hidden;
        padding: 0 0.29rem;
        .sqxw_jc_gz {
            margin: 0.32rem 0;
            font-size: 0.24rem;
            font-family: PingFang-SC-Medium;
            font-weight: 500;
            color: rgba(18, 28, 50, 1);
        }
        .sqxw_jc {
            //#3D4AE8FF
            background: #f9fafc;
            padding: 0.58rem 0.32rem 0;
            overflow: hidden;
            .sqxw_jc_li {
                margin-bottom: 0.55rem;
                .sqxw_jc_li_t {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    height: 0.44rem;
                    span {
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                    }
                    span.yes {
                        color: #eb615e;
                    }
                    span.no {
                        color: #3d4ae8;
                    }
                    .t_circle {
                        // width: 0.1rem;
                        // height: 0.1rem;
                        width: 5px;
                        height: 5px;
                        transform: translateY(-2px);
                        background: #3d4ae8;
                        border-radius: 50%;
                    }
                    .t_label {
                        flex-grow: 1;
                        font-size: 0.26rem;
                        color: #3d4ae8;
                        margin-left: 0.2rem;
                    }
                    .t_num {
                        font-size: 0.2rem;
                        color: rgba(131, 137, 151, 1);
                    }
                }
                .sqxw_jc_li_item {
                    padding: 0.5rem 0.34rem;
                    background: #fff;
                    .sqxw_jc_li_item_label {
                        font-size: 0.2rem;
                        font-family: PingFang-SC-Medium;
                        font-weight: 500;
                        color: #121c32;
                    }
                    .sqxw_jc_li_item_con {
                        margin-top: 0.15rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;
                        span {
                            width: 50%;
                            color: #838997;
                            font-size: 0.24rem;
                            line-height: 0.4rem;
                        }
                    }
                }
            }
        }
        .dt_msg_li {
            .msg-li-dec {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 0.54rem;
                span {
                    font-size: 0.24rem;
                }
                span:nth-of-type(1) {
                    color: #121c32;
                }
                span:nth-of-type(2) {
                    color: #8e94a3;
                }
            }
        }
        .tips_label {
            span:nth-of-type(1) {
                display: inline-block;
                width: 7px;
                height: 7px;
                transform: translateY(-2px);
                background: rgba(61, 74, 232, 1);
                border-radius: 50%;
            }
            span:nth-of-type(2) {
                margin-left: 0.19rem;
                color: #3d4ae8;
                font-size: 0.24rem;
                font-weight: bold;
            }
        }
        .grxx_con {
            background: #f9fafc;
            padding: 0 0.31rem 0.44rem;
            margin-top: 0.33rem;
            overflow: hidden;
            .fx_li {
                .fx_msg {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin: 0.48rem 0 0.16rem;
                    span {
                        font-size: 0.24rem;
                        color: #121c32;
                        font-weight: 500;
                    }
                    span.yes {
                        color: #eb615e;
                    }
                    span.no {
                        color: #3d4ae8;
                    }
                }
                .fx_msg-type {
                    display: flex;
                    padding: 0.3rem 0.2rem;
                    background: #fff;
                    span {
                        font-size: 0.2rem;
                        color: #3aa1ff;
                    }
                    .name {
                        color: #838997;
                    }
                }
                .fx_xd {
                    background: #fff;

                    .fx_xdli {
                        padding: 0.3rem 0.22rem 0.22rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        flex-wrap: wrap;

                        .fx-li-item {
                            display: flex;
                            width: 50%;
                            span {
                                font-size: 0.2rem;
                            }
                            span:nth-of-type(1) {
                                color: #838997;
                            }
                            span:nth-of-type(2) {
                                color: #3aa1ff;
                            }
                            &.hastop {
                                margin-top: 0.2rem;
                            }
                        }
                    }
                }
            }
        }
        .duoPT_btn {
            margin-top: 0.62rem;
            span {
                display: inline-block;
                height: 0.44rem;
                line-height: 0.44rem;
                color: #4466f7;
                padding: 0 0.22rem;
                font-size: 0.26rem;
                border: 1px solid #4466f7;
                border-radius: 0.22rem;
                margin-right: 0.55rem;
            }
            span.select {
                color: #fff;
                background: #4466f7;
            }
        }
    }
    .muchHead {
        padding: 0.83rem 0.31rem 0 0.31rem;
        border-top: 0.18rem solid #f5f5f5;
        .lostLetter {
            margin-bottom: 0.42rem;
            padding: 0.35rem 0.36rem 0.46rem 0.32rem;
            margin-top: 0.24rem;
            box-shadow: 0px 0.08rem 0.19rem 0.01rem rgba(46, 125, 246, 0.08);
            border-radius: 0.16rem;
            .name {
                color: #121c32;
                font-size: 0.22rem;
                font-weight: bold;
            }
            .letter-item {
                line-height: 0.4rem;
                span {
                    font-size: 0.2rem;
                }
                span:nth-of-type(1) {
                    color: #121c32;
                }
                span:nth-of-type(2) {
                    color: #888;
                }
            }
        }
    }
    .reportItem-nodata {
        text-align: center;
        line-height: 0.8rem;
        font-size: 0.28rem;
    }
}
.instructions {
    padding: 0px 0.3rem;
    margin-top: 0.4rem;

    > .title {
        font-weight: 500;
        color: #4a4a4a;
        font-size: 0.3rem;
        text-align: center;
    }
    > .text {
        font-size: 0.26rem;
        line-height: 1.8;
        text-indent: 2em;
        color: #a9a9a9;
    }
}
</style>