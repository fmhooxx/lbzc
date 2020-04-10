<template>
    <div class="threeInOne">
        <!-- 个人信息 -->
        <div
            class="banner"
            :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-banner-1.png')})`}"
        >
            <div class="title">
                <div class="title-1">信用评分</div>
                <div class="title-2">{{threeInOneData.risk_1.note}}</div>
            </div>
            <div
                class="personInfo"
                :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-banner-2.png')})`}"
            >
                <div class="top">
                    <div
                        class="avatar"
                        :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-avatar.png')})`}"
                    ></div>
                    <div class="base">
                        <div class="base_top">
                            <div class="name">{{threeInOneData.risk_3.user_basic.user_name}}</div>
                            <div class="age">{{threeInOneData.risk_3.user_basic.user_age}}岁</div>
                            <div class="gender">{{threeInOneData.risk_3.user_basic.user_gender}}</div>
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
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-1.png')})`}"
                            ></div>
                            <div class="text">{{threeInOneData.risk_3.user_basic.user_phone}}</div>
                        </div>
                        <div class="phone_company">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-2.png')})`}"
                            ></div>
                            <div
                                class="text"
                            >{{threeInOneData.risk_3.user_basic.user_phone_operator}}</div>
                        </div>
                    </div>
                    <div class="idCard_location">
                        <div class="idCard">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-3.png')})`}"
                            ></div>
                            <div class="text">{{threeInOneData.risk_3.user_basic.user_idcard}}</div>
                        </div>
                        <div class="location">
                            <div
                                class="img"
                                :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-4.png')})`}"
                            ></div>
                            <div
                                class="text"
                            >{{threeInOneData.risk_3.user_basic.user_city}} · {{threeInOneData.risk_3.user_basic.user_region}}</div>
                        </div>
                    </div>
                    <div class="lastShowTime" v-if="orderData.endtime">报告过期时间：{{orderData.endtime}}</div>
                </div>
            </div>
            <div
                class="score"
                :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-score.png')})`}"
            >
                <span>{{ user_score}}</span>
            </div>
        </div>
        <div class="zhanwei"></div>
        <div
            class="reportTips"
            v-if="$route.query.order_no=='default'"
        >提示：样例报告数据仅供参考，最终报告结果根据个人信用状况进行展示</div>
        <!--运营商-->
        <div class="carrier" v-if="threeInOneData.carrier">
            <div
                class="big_title"
                style="margin-top: 0.66rem"
                v-if="threeInOneData.carrier.cell_behavior"
            >通话数据概况</div>
            <div class="content" v-if="threeInOneData.carrier.cell_behavior">
                <canvas
                    v-if="threeInOneData.carrier.is_pay"
                    id="probably_line"
                    width="340"
                    height="200"
                ></canvas>
                <div
                    class="chart-desc-1"
                    v-if="threeInOneData.carrier.is_pay&&threeInOneData.carrier.cell_behavior"
                >
                    <div class="left">
                        <div>
                            <img :src="line2" style="width:0.2rem;height:0.3rem" alt>
                            <span style="color:#a9a9a9;margin-left: 0.1rem;font-size:0.24rem">主叫次数</span>
                        </div>
                        <div>
                            <span style="color:#a9a9a9;font-size:0.24rem">月均话费</span>
                            <span
                                style="color: #39B2FF;margin-left: 0.1rem;font-size:0.24rem"
                            >{{threeInOneData.carrier.cell_behavior.avg_amount}}</span>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <img :src="line1" alt style="width:0.2rem;height:0.3rem">
                            <span style="color:#a9a9a9;margin-left: 0.1rem;font-size:0.24rem">被叫次数</span>
                        </div>
                        <div>
                            <span style="color:#a9a9a9;font-size:0.24rem">月均通话次数</span>
                            <span
                                style="color:#FF5F3B;margin-left: 0.1rem;font-size:0.24rem"
                            >{{threeInOneData.carrier.cell_behavior.avg_call_cnt}}</span>
                        </div>
                    </div>
                </div>
                <div class="dt_hj" v-if="cell_behavior_data.monthData.length>0">
                    <div class="dt_btn_check">
                        <div class="m_pre">
                            <img src="@/assets/threeInOne/btn_l.png" alt>
                        </div>
                        <span
                            class="label"
                            v-if="cell_behavior_data.monthData.length>0"
                        >{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].cell_mth}}</span>
                        <div class="m_next">
                            <img src="@/assets/threeInOne/btn_r.png" alt>
                        </div>
                    </div>
                    <div id="cor_box" style="overflow:hidden;position:relative;height: 4.66rem;">
                        <div id="lunbo" style="position:absolute" class="clearfix">
                            <div
                                style="width: 100%;padding: 0 0.3rem;box-sizing: border-box"
                                class="item_list"
                                v-for="(item,index) in cell_behavior_data.monthData"
                                :key="index"
                            >
                                <div class="dt_msg_li">
                                    <div class="msg-li-dec">
                                        <span>主叫次数</span>
                                        <span>{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].dial_cnt}}</span>
                                    </div>
                                    <div class="msg-li-dec">
                                        <span>被叫次数</span>
                                        <span>{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].dialed_cnt}}</span>
                                    </div>
                                    <div class="msg-li-dec">
                                        <span>通话时长（分）</span>
                                        <span>{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].call_time}}</span>
                                    </div>
                                    <div class="msg-li-dec">
                                        <span>话费（元）</span>
                                        <span>{{cell_behavior_data.monthData[cell_behavior_data.monthIndex].total_amount}}</span>
                                    </div>
                                </div>
                            </div>
                            <div
                                v-if="cell_behavior_data.monthData.length==0"
                                class="reportItem-nodata"
                            >无记录</div>
                        </div>
                    </div>
                    <div
                        class="analysisWrods"
                        v-if="threeInOneData.carrier.text"
                    >{{threeInOneData.carrier.text.behavior_text}}</div>
                </div>
            </div>
            <div
                class="big_title"
                style="margin-top: 0.66rem"
                v-if="threeInOneData.carrier.call_risk_analysis"
            >通话类型分析</div>
            <div
                class="content"
                style="margin-top: 0.3rem"
                v-if="threeInOneData.carrier.call_risk_analysis"
            >
                <div style="background: #F9FAFC;padding: 0px 0.28rem 0.54rem">
                    <div class="carrier-m-circle-t">金融类通话</div>
                    <div v-if="call_risk_analysis_data.analysis_point1">
                        <div
                            v-for="(item,index) in call_risk_analysis_data.analysis_point1"
                            :key="`crad_analysis_point1_${index}`"
                        >
                            <div class="carrier-s-title" style="margin: 0.4rem auto 0.3rem">
                                <span></span>
                                <span>{{item.analysis_desc}}通话</span>
                            </div>
                            <div class="carrier_msg_li">
                                <div class="msg-li-dec">
                                    <span>通话次数</span>
                                    <span>{{item.call_cnt_6m}}</span>
                                </div>
                                <div class="msg-li-dec">
                                    <span>被叫次数</span>
                                    <span>{{item.call_dialed_cnt_6m}}</span>
                                </div>
                                <div class="msg-li-dec">
                                    <span>通话时长（分）</span>
                                    <span>{{item.call_time_6m}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="reportItem-nodata">无记录</div>

                    <div
                        class="analysisWrods"
                        v-if="threeInOneData.carrier.text"
                    >{{threeInOneData.carrier.text.analysis_point1_text}}</div>
                </div>
            </div>
            <div
                class="big_title"
                style="margin-top: 0.66rem"
                v-if="threeInOneData.carrier.call_duration_detail"
            >通话活跃分析</div>
            <div
                class="content"
                style="margin-top: 0.3rem"
                v-if="threeInOneData.carrier.call_duration_detail"
            >
                <div class="analysisType" style="background: #F9FAFC;padding: 0.32rem;">
                    <canvas
                        v-if="threeInOneData.carrier.is_pay&&call_duration_detail.duration_list"
                        id="analysisType_line"
                        width="340"
                        height="200"
                    ></canvas>
                    <div
                        class="chart-desc-2"
                        v-if="threeInOneData.carrier.is_pay"
                        style="background: #FFf;height: 0.8rem;padding: 0 0.36rem;"
                    >
                        <div class="left">
                            <img :src="line2" style="width:0.2rem">
                            <span style="color:#121C32;margin-left: 0.1rem;font-size: 0.26rem;">通话时长</span>
                        </div>
                        <div class="right">
                            <img :src="line1" alt style="width:0.2rem">
                            <span style="color:#121C32;margin-left: 0.1rem;font-size: 0.26rem;">通话次数</span>
                        </div>
                    </div>
                    <div
                        class="analysisWrods"
                        v-if="threeInOneData.carrier.text"
                        style="background: #fff;padding:0.15rem 0.2rem;margin-top: 0.3rem;"
                    >{{threeInOneData.carrier.text.duration_text}}</div>
                    <div class="carrier-s-title" style="margin: 0.6rem auto 0.3rem">
                        <span></span>
                        <span style="font-size: 0.24rem;">活跃天数</span>
                    </div>
                    <div
                        class="carrier_msg_li"
                        v-if="threeInOneData.carrier.is_pay&&threeInOneData.carrier.active_degree"
                    >
                        <div class="msg-li-dec">
                            <span>活跃天数</span>
                            <span>{{threeInOneData.carrier.active_degree.item.max_power_on_day}}</span>
                        </div>
                        <div class="msg-li-dec">
                            <span>非活跃天数</span>
                            <span>{{threeInOneData.carrier.active_degree.item.no_call_day}}</span>
                        </div>
                        <div class="msg-li-dec">
                            <span>连续3天以上关机次数</span>
                            <span>{{threeInOneData.carrier.active_degree.item.continue_power_off_cnt}}</span>
                        </div>
                        <div class="msg-li-dec">
                            <span>关机天数</span>
                            <span>{{threeInOneData.carrier.active_degree.item.power_off_day}}</span>
                        </div>
                    </div>
                    <div
                        class="analysisWrods"
                        v-if="threeInOneData.carrier.text"
                    >{{threeInOneData.carrier.text.active_degree}}</div>
                    <div class="carrier-s-title" style="margin: 0.6rem auto 0.3rem">
                        <span></span>
                        <span style="font-size: 0.24rem;">活跃地区</span>
                    </div>
                    <div v-if="threeInOneData.carrier.is_pay&&threeInOneData.carrier.friend_circle">
                        <div
                            class="hyarea_list_li"
                            v-for="(item, index) in threeInOneData.carrier.friend_circle.location_top_list"
                            :key="`fc_location_top_list_${index}`"
                        >
                            <img :src="location" class="areaicon" style alt>
                            <br>
                            <span class="area">{{item.location}}</span>
                            <span class="call">通话{{item.call_cnt}}次</span>
                            <br>
                            <span class="times">时长{{item.call_time}}</span>
                        </div>
                    </div>
                    <div v-else class="reportItem-nodata">无记录</div>
                    <div
                        class="analysisWrods"
                        v-if="threeInOneData.carrier.text"
                    >{{threeInOneData.carrier.text.location_top_list_text}}</div>
                </div>
            </div>
            <div
                class="big_title"
                style="margin-top: 0.66rem"
                v-if="threeInOneData.carrier.call_contact_detail"
            >联系人深度分析</div>
            <div
                class="content"
                style="margin-top: 0.3rem"
                v-if="threeInOneData.carrier.call_contact_detail"
            >
                <div
                    v-if="threeInOneData.carrier.is_pay"
                    style="padding: 0.46rem 0.35rem;background: #F9FAFC"
                >
                    <div
                        class="concatDepth"
                        v-for="(item,index) in threeInOneData.carrier.call_contact_detail"
                        :key="`c_call_contact_detail_${index}`"
                        :style="{marginTop:index==0?'0':'0.35rem'}"
                    >
                        <div class="phone">
                            <span
                                class="timecolor"
                                :style="{background:colorFomat(item.call_time_6m)}"
                            ></span>
                            <span
                                style="font-size:0.24rem;margin:0 0.3rem 0 0.23rem ;color:#4a4a4a;font-weight: bold;"
                            >{{item.peer_num}}</span>
                            <span style="font-size:0.24rem;color: #a9a9a9;">{{item.city}}</span>
                        </div>
                        <div class="phone_detial">
                            <div class="phone_detialitem">
                                <span>{{item.dial_cnt_6m}}</span>
                                <span>主叫次数</span>
                            </div>
                            <div class="phone_detialitem">
                                <span>{{item.dialed_cnt_6m}}</span>
                                <span>被叫次数</span>
                            </div>
                            <div class="phone_detialitem">
                                <span>{{item.call_time_6m}}</span>
                                <span>通话时长(分)</span>
                            </div>
                            <div class="phone_detialitem">
                                <span>{{item.call_cnt_6m}}</span>
                                <span>通话次数</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="big_title"
                style="margin-top: 0.66rem"
                v-if="threeInOneData.carrier.call_family_detail"
            >风险状况</div>
            <div
                class="content"
                style="margin-top: 0.3rem"
                v-if="threeInOneData.carrier.call_family_detail"
            >
                <div class="carrier_dt_qk" style="overflow:hidden;">
                    <div
                        class="carrier-s-title"
                        style="padding: 0.4rem 0.3rem 0.3rem;background: #F9FAFC;"
                    >
                        <span></span>
                        <span>风险统计</span>
                    </div>
                    <div class="dt_title" style="background: #F9FAFC; ">
                        <span>风险统计</span>
                        <span>近1月</span>
                        <span>近3月</span>
                        <span>近6月</span>
                        <span>近3月均</span>
                        <span>近6月均</span>
                    </div>
                    <div v-if=" threeInOneData.carrier.call_risk_analysis_list">
                        <div
                            class="fx_th_dt"
                            v-for="(item,index) in threeInOneData.carrier.call_risk_analysis_list"
                            :key="index"
                        >
                            <div style="width: 100%">
                                <div class="th_dt_item">
                                    <span class="first">与{{item.analysis_desc}}通话次数</span>
                                    <span>{{item.analysis_point.call_cnt_1m?item.analysis_point.call_cnt_1m:0}}</span>
                                    <span>{{item.analysis_point.call_cnt_3m?item.analysis_point.call_cnt_3m:0}}</span>
                                    <span>{{item.analysis_point.call_cnt_6m?item.analysis_point.call_cnt_6m:0}}</span>
                                    <span>{{item.analysis_point.avg_call_cnt_3m?item.analysis_point.avg_call_cnt_3m:0}}</span>
                                    <span>{{item.analysis_point.avg_call_cnt_6m?item.analysis_point.avg_call_cnt_6m:0}}</span>
                                </div>
                                <div class="th_dt_item">
                                    <span class="first">与{{item.analysis_desc}}通话时长</span>
                                    <span>{{item.analysis_point.call_time_1m?item.analysis_point.call_time_1m:0}}</span>
                                    <span>{{item.analysis_point.call_time_3m?item.analysis_point.call_time_3m:0}}</span>
                                    <span>{{item.analysis_point.call_time_6m?item.analysis_point.call_time_6m:0}}</span>
                                    <span>{{item.analysis_point.avg_call_time_3m?item.analysis_point.avg_call_time_3m:0}}</span>
                                    <span>{{item.analysis_point.avg_call_time_6m?item.analysis_point.avg_call_time_6m:0}}</span>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="threeInOneData.carrier.call_risk_analysis_list.length<0"
                            class="reportItem-nodata"
                        >无记录</div>
                    </div>
                </div>
                <div class="carrier_dt_qk" style="overflow:hidden;">
                    <div
                        class="carrier-s-title"
                        style="padding: 0.4rem 0.3rem 0.3rem;background: #F9FAFC;"
                    >
                        <span></span>
                        <span>稳定性</span>
                    </div>
                    <div class="dt_title" style="background: #F9FAFC; ">
                        <span style="flex: 3;">稳定性</span>
                        <span>近1月</span>
                        <span>近3月</span>
                        <span>近6月</span>
                    </div>
                    <div
                        class="item_li"
                        v-for="(item,index) in threeInOneData.carrier.call_family_detail"
                        :key="index"
                    >
                        <span style="flex: 3">{{item.app_point_zh}}</span>
                        <span>{{item.item.item_1m}}</span>
                        <span>{{item.item.item_3m}}</span>
                        <span>{{item.item.item_6m}}</span>
                    </div>
                    <div
                        v-if="threeInOneData.carrier.call_family_detail.length<0"
                        class="reportItem-nodata"
                    >无记录</div>
                </div>
            </div>
            <div
                class="big_title"
                style="margin-top: 0.66rem"
                v-if="threeInOneData.carrier.basic_check_items"
            >风险分析摘要</div>
            <div
                class="content"
                style="margin-top: 0.3rem"
                v-if="threeInOneData.carrier.basic_check_items"
            >
                <div class="carrier_dt_qk" style="overflow:hidden;">
                    <div
                        class="carrier-s-title"
                        style="padding: 0.4rem 0.3rem 0.3rem;background: #F9FAFC;"
                    >
                        <span></span>
                        <span>风险识别</span>
                    </div>
                    <div class="dt_title" style="background: #F9FAFC; ">
                        <span>风险识别</span>
                        <span>近3月</span>
                        <span>近6月</span>
                        <span>备注</span>
                    </div>
                    <div class="item_li">
                        <span>号码沉默度</span>
                        <span>{{threeInOneData.carrier.basic_check_items.mobile_silence['3m'].result}}分</span>
                        <span>{{threeInOneData.carrier.basic_check_items.mobile_silence['6m'].result}}分</span>
                        <span>0-10分</span>
                    </div>
                    <div class="item_li">
                        <span>欠费风险度</span>
                        <span>{{threeInOneData.carrier.basic_check_items.arrearage_risk['3m'].result}}分</span>
                        <span>{{threeInOneData.carrier.basic_check_items.arrearage_risk['6m'].result}}分</span>
                        <span>0-10分</span>
                    </div>
                    <div class="item_li" style="padding-bottom: 0.2rem">
                        <span>亲情网风险度</span>
                        <span
                            style="flex: 2;"
                        >{{threeInOneData.carrier.basic_check_items.binding_risk.result}}</span>
                        <span>0-10分</span>
                    </div>
                </div>
                <div class="carrier_dt_qk" style="overflow:hidden;padding-top: 0.3rem;">
                    <div class="dt_title" style="background: #F9FAFC; ">
                        <span style="flex: 4;">风险识别</span>
                        <span>结果</span>
                    </div>
                    <div class="item_li" style="background: #F9FAFC; ">
                        <span style="flex: 4;">申请人姓名+身份证号码是否出现在法院黑名单</span>
                        <span>{{threeInOneData.carrier.basic_check_items.is_name_and_idcard_in_court_black.result}}</span>
                    </div>
                    <div class="item_li" style="background: #F9FAFC; ">
                        <span style="flex: 4;">申请人姓名+身份证号码是否出现在金融机构黑名单</span>
                        <span>{{threeInOneData.carrier.basic_check_items.is_name_and_idcard_in_finance_black.result}}</span>
                    </div>
                    <div class="item_li" style="background: #F9FAFC; ">
                        <span style="flex: 4;">申请人姓名+手机号码是否出现在金融机构黑名单</span>
                        <span>{{threeInOneData.carrier.basic_check_items.is_name_and_mobile_in_finance_black.result}}</span>
                    </div>
                </div>
            </div>
            <div
                class="big_title"
                style="margin-top: 0.66rem"
                v-if="threeInOneData.carrier.active_degree_list"
            >活跃程度</div>
            <div
                class="content"
                style="margin-top: 0.3rem"
                v-if="threeInOneData.carrier.active_degree_list"
            >
                <div class="carrier_dt_qk" style="overflow:hidden;">
                    <div class="dt_title" style="background: #F9FAFC; ">
                        <span>通话活跃</span>
                        <span>近1月</span>
                        <span>近3月</span>
                        <span>近6月</span>
                        <span>近3月均</span>
                        <span>近6月均</span>
                    </div>
                    <div
                        class="item_li"
                        v-for="(item,index) in threeInOneData.carrier.active_degree_list"
                        :key="index"
                    >
                        <span>{{item.app_point_zh}}</span>
                        <span>{{item.item.item_1m?item.item.item_1m:'无'}}</span>
                        <span>{{item.item.item_3m?item.item.item_3m:'无'}}</span>
                        <span>{{item.item.item_6m?item.item.item_6m:'无'}}</span>
                        <span>{{item.item.avg_item_3m?item.item.avg_item_3m:'无'}}</span>
                        <span>{{item.item.avg_item_6m?item.item.avg_item_6m:'无'}}</span>
                    </div>
                    <div
                        v-if="threeInOneData.carrier.active_degree_list.length==0"
                        class="reportItem-nodata"
                    >无记录</div>
                </div>
                <div style="height: 0.8rem;background: #F9FAFC;margin-top: 0.4rem"></div>
            </div>
        </div>
        <div v-else @click="authorizationCarrier" class="authorizationCarrier">授权运营商</div>

        <div class="big_title" style="margin-top: 0.66rem" v-if="threeInOneData.risk_1">多头借贷情况</div>
        <div class="content" style="margin-top: 0.3rem" v-if="threeInOneData.risk_1">
            <div class="dt_qk">
                <div class="dt_tips_label">
                    <span></span>
                    <span>手机借款</span>
                </div>
                <div class="dt_title">
                    <span>调用平台数</span>
                    <span>7天</span>
                    <span>1个月</span>
                    <span>3个月</span>
                </div>
                <div class="item_li" v-for="(item,index) in TD_dt_data.phone" :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.mounth3}}</span>
                    <span>{{item.mounth6}}</span>
                    <span>{{item.mounth9}}</span>
                </div>
                <div v-if="TD_dt_data.phone.length==0" class="reportItem-nodata">无记录</div>
            </div>
            <div class="dt_qk">
                <div class="dt_tips_label">
                    <span></span>
                    <span>身份证借款</span>
                </div>
                <div class="dt_title">
                    <span>调用平台数</span>
                    <span>7天</span>
                    <span>1个月</span>
                    <span>3个月</span>
                </div>
                <div class="item_li" v-for="(item,index) in TD_dt_data.id_card" :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.mounth3}}</span>
                    <span>{{item.mounth6}}</span>
                    <span>{{item.mounth9}}</span>
                </div>
                <div v-if="TD_dt_data.id_card.length==0" class="reportItem-nodata">无记录</div>
            </div>
            <div style="height: 0.6rem;background: #F9FAFC"></div>
        </div>
        <div class="big_title" style="margin-top: 0.66rem">逾期行为详情</div>
        <div class="content" style="margin-top: 0.3rem">
            <div class="yqxw_content">
                <div class="t-c">
                    <div class="t-c_li_t">
                        <span class="t_label">评估项目</span>
                        <span class="t_label">评估结果</span>
                    </div>
                    <div v-if="threeInOneData.xinYan&&threeInOneData.xinYan.result_detail">
                        <div class="t-c_li_c">
                            <span class="t_name">逾期平台数</span>
                            <span
                                class="t_value"
                            >{{threeInOneData.xinYan.result_detail.member_count}}家</span>
                        </div>
                        <div class="t-c_li_c">
                            <span class="t_name">逾期订单数</span>
                            <span
                                class="t_value"
                            >{{threeInOneData.xinYan.result_detail.order_count}}笔</span>
                        </div>
                        <div class="t-c_li_c">
                            <span class="t_name">逾期总金额</span>
                            <span
                                class="t_value"
                            >{{threeInOneData.xinYan.result_detail.debt_amount}}元</span>
                        </div>
                    </div>

                    <div v-else class="reportItem-nodata">无记录</div>
                </div>
                <div class="tips_label yqxw_st">
                    <span></span>
                    <span>逾期详情</span>
                </div>
                <div class="fzxq_t-b">
                    <table
                        class="fzxq_t-b_table"
                        v-if="threeInOneData.xinYan&&threeInOneData.xinYan.result_detail.debt_detail"
                    >
                        <tr class="table-b-li_t">
                            <td>逾期时间</td>
                            <td>逾期金额（元）</td>
                            <td>逾期时长</td>
                            <td>是否结清</td>
                        </tr>
                        <tr
                            class="table-b-li_v"
                            v-for="(item,index) in threeInOneData.xinYan.result_detail.debt_detail"
                            :key="index"
                            :class="index%2==0?'odd':'even'"
                        >
                            <td>{{item.endDay}}</td>
                            <td>{{item.endMoney}}</td>
                            <td>{{item.billType}}</td>
                            <td>{{item.endFlag=='Y'?'是':'否'}}</td>
                        </tr>
                    </table>
                    <div v-else class="reportItem-nodata">无记录</div>
                </div>
            </div>
        </div>
        <div class="big_title" style="margin-top: 0.66rem">负债情况详情</div>
        <div class="content" style="margin-top: 0.3rem">
            <div class="yqxw_content">
                <div class="t-c">
                    <div class="t-c_li_t">
                        <span class="t_label">评估项目</span>
                        <span class="t_label">评估结果</span>
                    </div>
                    <div v-if="threeInOneData.xinYan&&threeInOneData.xinYan.result_detail">
                        <div class="t-c_li_c">
                            <span class="t_name">负债平台数</span>
                            <span
                                class="t_value"
                            >{{threeInOneData.xinYan.result_detail.current_org_count}}家</span>
                        </div>
                        <div class="t-c_li_c">
                            <span class="t_name">负债订单数</span>
                            <span
                                class="t_value"
                            >{{threeInOneData.xinYan.result_detail.current_order_count}}笔</span>
                        </div>
                        <div class="t-c_li_c">
                            <span class="t_name">负债订单已还金额</span>
                            <span
                                class="t_value"
                            >{{threeInOneData.xinYan.result_detail.current_order_amt}}元</span>
                        </div>
                        <div class="t-c_li_c">
                            <span class="t_name">负债订单金额</span>
                            <span
                                class="t_value"
                            >{{threeInOneData.xinYan.result_detail.current_order_lend_amt}}元</span>
                        </div>
                    </div>
                    <div v-else class="reportItem-nodata">无记录</div>
                </div>
                <div class="tips_label yqxw_st">
                    <span></span>
                    <span>近6个月负债情况</span>
                </div>
                <div class="fzxq_t-b">
                    <table
                        class="fzxq_t-b_table"
                        v-if="threeInOneData.xinYan&&threeInOneData.xinYan.result_detail.totaldebt_detail"
                    >
                        <tr class="table-b-li_t">
                            <td>统计时间</td>
                            <td>平台数</td>
                            <td>订单数</td>
                            <td>订单金额</td>
                            <td>已还款金额</td>
                            <!-- <td>借新还旧</td>-->
                        </tr>
                        <tr
                            class="table-b-li_v"
                            v-for="(item,index) in threeInOneData.xinYan.result_detail.totaldebt_detail"
                            :key="index"
                            :class="index%2==0?'odd':'even'"
                        >
                            <td>{{item.totaldebt_date}}</td>
                            <td>{{item.totaldebt_org_count}}</td>
                            <td>{{item.totaldebt_order_count}}</td>
                            <td>{{item.totaldebt_order_lend_amt}}</td>
                            <td>{{item.totaldebt_order_amt}}</td>
                            <!-- <td>{{item.new_or_old=='Y'?'是':'否'}}</td>-->
                        </tr>
                    </table>
                    <div v-else class="reportItem-nodata">无记录</div>
                </div>
            </div>
        </div>
        <div class="big_title" v-if="threeInOneData.risk_3" style="margin-top: 0.66rem">联系人存疑信息</div>
        <div class="content" v-if="threeInOneData.risk_3">
            <div class="lxr_cy_detial">
                <div class="item_li">
                    <span class="label">主动联系人数</span>
                    <span
                        class="num"
                    >{{threeInOneData.risk_3.user_gray.contacts_number_statistic.cnt_to_all}}</span>
                </div>
                <div class="item_li">
                    <span class="label">主动联系的黑号数</span>
                    <span
                        class="num"
                        style="color:#EB615E"
                    >{{threeInOneData.risk_3.user_gray.contacts_number_statistic.cnt_to_black}}</span>
                </div>
                <div class="item_li">
                    <span class="label">主动联系人中曾为申请人的人数</span>
                    <span
                        class="num"
                    >{{threeInOneData.risk_3.user_gray.contacts_number_statistic.cnt_to_applied}}</span>
                </div>
                <div class="item_li">
                    <span class="label">被动联系人数</span>
                    <span
                        class="num"
                    >{{threeInOneData.risk_3.user_gray.contacts_number_statistic.cnt_be_all}}</span>
                </div>
                <div class="item_li">
                    <span class="label">被动联系的黑号数</span>
                    <span
                        class="num"
                        style="color:#EB615E"
                    >{{threeInOneData.risk_3.user_gray.contacts_number_statistic.cnt_be_black}}</span>
                </div>
                <div class="item_li">
                    <span class="label">被动联系人曾为申请人的人数</span>
                    <span
                        class="num"
                    >{{threeInOneData.risk_3.user_gray.contacts_number_statistic.cnt_be_applied}}</span>
                </div>
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
                        <span
                            class="t_label"
                        >{{threeInOneData.risk_1.risk_items['5215541'].risk_name}}</span>
                        <span
                            class="t_num"
                        >{{threeInOneData.risk_1.risk_items['5215541'].frequency_detail_list.length}}</span>
                    </div>
                    <div
                        class="sqxw_jc_li_item"
                        v-if="threeInOneData.risk_1.risk_items['5215541'].frequency_detail_list.length>0"
                    >
                        <div class="sqxw_jc_li_item_label">关联借款人手机号列表</div>
                        <div class="sqxw_jc_li_item_con">
                            <span
                                v-for="(item,index) in threeInOneData.risk_1.risk_items['5215541'].frequency_detail_list"
                                :key="`rr5215541_frequency_detail_list_${index}`"
                            >{{item}}</span>
                        </div>
                    </div>
                    <div v-else class="reportItem-nodata">无记录</div>
                </div>
                <div class="sqxw_jc_li">
                    <div class="sqxw_jc_li_t">
                        <span class="t_circle"></span>
                        <span
                            class="t_label"
                        >{{threeInOneData.risk_1.risk_items['5215543'].risk_name}}</span>
                        <span
                            class="t_num"
                        >{{threeInOneData.risk_1.risk_items['5215543'].frequency_detail_list.length}}</span>
                    </div>
                    <div
                        class="sqxw_jc_li_item"
                        v-if="threeInOneData.risk_1.risk_items['5215543'].frequency_detail_list.length>0"
                    >
                        <div class="sqxw_jc_li_item_label">关联借款人身份证列表</div>
                        <div class="sqxw_jc_li_item_con">
                            <span
                                style="width: 100%"
                                v-for="(item,index) in threeInOneData.risk_1.risk_items['5215543'].frequency_detail_list"
                                :key="`rr5215543_frequency_detail_list_${index}`"
                            >{{item}}</span>
                        </div>
                    </div>
                    <div v-else class="reportItem-nodata">无记录</div>
                </div>
            </div>
        </div>
        <div class="big_title" style="margin-top: 0.66rem" v-if="threeInOneData.risk_1">风险信息检测</div>
        <div class="content" v-if="threeInOneData.risk_1">
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

                -->
                <div class="tips_label grxx_st">
                    <span></span>
                    <span>个人基本信息核查</span>
                </div>
                <div class="fx_li">
                    <!--手机号是否命中虚假号码库-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215371'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215371'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215371'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215371'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215371'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证归属地是否有高风险-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215401'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215401'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215401'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215401'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215401'].fraud_type_display_name}}</span>
                    </div>
                </div>

                <div class="tips_label grxx_st">
                    <span></span>
                    <span>风险信息扫描</span>
                </div>
                <div class="fx_li">
                    <div class="fx_msg">
                        <!--身份证是否命中犯罪通缉名单-->
                        <span>{{threeInOneData.risk_1.risk_items['5215453'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215453'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215453'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215453'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215453'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <div class="fx_msg">
                        <!--身份证是否命中法院执行名单-->
                        <span>{{threeInOneData.risk_1.risk_items['5215459'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215459'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215459'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215459'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215459'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证对应人是否存在助学贷款欠费历史-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215463'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215463'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215463'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215463'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215463'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证是否命中信贷逾期名单-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215465'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215465'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div class="fx_xd">
                        <div
                            class="fx_xdli"
                            v-for="(item,index) in threeInOneData.risk_1.risk_items['5215465'].court_details"
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
                        <span>{{threeInOneData.risk_1.risk_items['5215469'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215469'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215469'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215469'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215469'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证是否命中高风险关注名单-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215471'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215471'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215471'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215471'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215471'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <div class="fx_msg">
                        <!-- 申请人信息是否命中中风险关注名单-->
                        <span>{{threeInOneData.risk_1.risk_items['18'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['18'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['18'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{threeInOneData.risk_1.risk_items['18'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['18'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--手机号是否命中车辆租赁违约名单-->

                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215495'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215495'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215495'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215495'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215495'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证是否命中车辆租赁违约名单-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215499'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215499'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215499'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215499'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215499'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证是否命中故意违章乘车名单-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215527'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215527'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215527'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215527'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215527'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!-- 手机号命中高风险关注名单-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['26'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['26'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['26'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{threeInOneData.risk_1.risk_items['26'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['26'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!-- 申请人信息命中低风险关注名单-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['27'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['27'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['27'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{threeInOneData.risk_1.risk_items['27'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['27'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!-- 敏感时间段申请1点至5点-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['28'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['28'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['28'].fraud_type_display_name!=''"
                    >
                        <span class="name">{{threeInOneData.risk_1.risk_items['28'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['28'].fraud_type_display_name}}</span>
                    </div>
                </div>
                <div class="fx_li">
                    <!--身份证是否命中法院失信名单-->
                    <div class="fx_msg">
                        <span>{{threeInOneData.risk_1.risk_items['5215429'].risk_name}}</span>
                        <span
                            v-if="threeInOneData.risk_1.risk_items['5215429'].fraud_type_display_name!=''"
                            class="yes"
                        >是</span>
                        <span v-else class="no">否</span>
                    </div>
                    <div
                        class="fx_msg-type"
                        v-if="threeInOneData.risk_1.risk_items['5215429'].fraud_type_display_name!=''"
                    >
                        <span
                            class="name"
                        >{{threeInOneData.risk_1.risk_items['5215429'].description}}</span>
                        <span>{{threeInOneData.risk_1.risk_items['5215429'].fraud_type_display_name}}</span>
                    </div>
                </div>
            </div>
        </div>
        <!--失信情况-->
        <div
            class="muchHead"
            style="overflow: hidden"
            v-if="threeInOneData.risk_1.risk_items['5215503'].fraud_type_display_name!=''"
        >
            <div class="headline">失信情况</div>
            <div class="lostletter_subtitle">失信明细</div>
            <div
                class="lostLetter"
                v-for="(item,index) in threeInOneData.risk_1.risk_items['5215503'].court_details"
                :key="`rr5215503_court_details_${index}`"
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
import F2 from '@antv/f2';
export default {
    name: 'index',
    props: {
        reportData: {
            type: Object,
            default: () => {}
        },
        orderData: {
            type: Object,
            default: () => {}
        },
        order_no: {
            type: String,
            default: ''
        },
        jumpUrl: {
            type: String,
            default: ''
        }
    },
    watch: {
        reportData: function() {
            /*app拉取返回到报告页 数据更新*/
            this.threeInOneData = this.reportData.data;
            this.init();
        }
    },
    data() {
        return {
            line1: require('@/assets/line1.png'),
            line2: require('@/assets/line2.png'),
            location: require('@/assets/location.png'),
            cell_behavior_data: {
                monthIndex: 0,
                monthData: []
            },
            gk_line_data: [],
            hy_line_data: [],
            call_risk_analysis_data: [], //类型分析
            call_duration_detail: [], //活跃分析

            lunboTouchIndex: 1,
            threeInOneData: {},
            user_score: 0,
            TD_dt_data: {
                id_card: [],
                phone: []
            }
        };
    },
    created() {
        this.threeInOneData = this.reportData.data;
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            var self = this;
            this.Score_progress(this.threeInOneData.risk_1.final_score);
            this.TD_duotou_dataFormate();
            this.initReportData();
            this.$nextTick(() => {
                if (this.threeInOneData.carrier) {
                    if (
                        this.threeInOneData.carrier.cell_behavior.behavior &&
                        this.threeInOneData.carrier.cell_behavior
                    ) {
                        var lunbo = new this.cor();
                        lunbo.domInit(index => {
                            self.cell_behavior_data.monthIndex = index - 1;
                        });
                        document.querySelector('.m_pre').onclick = function() {
                            lunbo.pre(index => {
                                self.cell_behavior_data.monthIndex = index - 1;
                            });
                        };
                        document.querySelector('.m_next').onclick = function() {
                            lunbo.next(index => {
                                self.cell_behavior_data.monthIndex = index - 1;
                            });
                        };
                    }
                }
            });
        },
        TD_duotou_dataFormate() {
            /*
                "5230679" =>7天内申请人在多个平台申请借款
                "20" =>1个月内申请人在多个平台申请借款
                "5230683" =>3个月内申请人在多个平台申请借款*/
            var self = this;
            var TD_duotou_day7 = this.threeInOneData.risk_1.risk_items['5230679']
                .platform_detail_dimension;
            var TD_duotou_month1 = this.threeInOneData.risk_1.risk_items['20']
                .platform_detail_dimension;
            var TD_duotou_month3 = this.threeInOneData.risk_1.risk_items['5230683']
                .platform_detail_dimension;

            function getArrEqual(arr1) {
                var arrId_card = arr1.id_card.detail;
                var arrPhone = arr1.phone.detail;
                for (let i = 0; i < arrId_card.length; i++) {
                    self.TD_dt_data.id_card.push({
                        name: arrId_card[i].industry_display_name,
                        mounth9: arrId_card[i].count
                    });
                }
                for (let i = 0; i < arrPhone.length; i++) {
                    self.TD_dt_data.phone.push({
                        name: arrPhone[i].industry_display_name,
                        mounth9: arrPhone[i].count
                    });
                }
            }
            getArrEqual(TD_duotou_month3);
            /*mounth9=>三个月
             * mounth6=>一个月
             * mounth3=>7天
             * */
            function getArrEqual2(arr1, arr2, month_type) {
                var arrId_card_1 = arr1.id_card.detail;
                var arrId_card_2 = arr2.id_card.detail;
                var arrPhone_1 = arr1.phone.detail;
                var arrPhone_2 = arr2.phone.detail;

                for (let j = 0; j < arrId_card_1.length; j++) {
                    switch (month_type) {
                        case 'mounth6':
                            self.TD_dt_data.id_card[j].mounth6 = '无';
                            break;
                        case 'mounth3':
                            self.TD_dt_data.id_card[j].mounth3 = '无';
                            break;
                    }
                    for (let i = 0; i < arrId_card_2.length; i++) {
                        if (
                            arrId_card_1[j].industry_display_name ===
                            arrId_card_2[i].industry_display_name
                        ) {
                            switch (month_type) {
                                case 'mounth6':
                                    self.TD_dt_data.id_card[j].mounth6 = arrId_card_2[i].count;
                                    break;
                                case 'mounth3':
                                    self.TD_dt_data.id_card[j].mounth3 = arrId_card_2[i].count;
                                    break;
                            }
                        }
                    }
                }
                for (let i = 0; i < arrPhone_1.length; i++) {
                    switch (month_type) {
                        case 'mounth6':
                            self.TD_dt_data.phone[i].mounth6 = '无';
                            break;
                        case 'mounth3':
                            self.TD_dt_data.phone[i].mounth3 = '无';
                            break;
                    }
                    for (let j = 0; j < arrPhone_2.length; j++) {
                        if (
                            arrPhone_1[i].industry_display_name ===
                            arrPhone_2[j].industry_display_name
                        ) {
                            switch (month_type) {
                                case 'mounth6':
                                    self.TD_dt_data.phone[i].mounth6 = arrPhone_2[j].count;
                                    break;
                                case 'mounth3':
                                    self.TD_dt_data.phone[i].mounth3 = arrPhone_2[j].count;
                                    break;
                            }
                        }
                    }
                }
            }
            getArrEqual2(TD_duotou_month3, TD_duotou_month1, 'mounth6');
            getArrEqual2(TD_duotou_month3, TD_duotou_day7, 'mounth3');
        },
        authorizationCarrier() {
            this.$open(this.jumpUrl);
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
        },
        cor() {
            this.lunbTimer = null;
            this.duration = 2000;
            this.autoplay = false;
            this.touchstartX = 0;
            this.touchstartY = 0;
            this.disX = 0;
            this.disY = 0;
            this.touchendX = 0;
            this.moveX = 0;
            this.currentIndex = 1;
            this.lunboq = true;
            this.childrens = [];
            this.touchDom = null;
            var self = this;
            this.domInit = function(cb) {
                this.childrens = document.getElementById('lunbo').children;
                this.touchDom = document.getElementById('lunbo');

                for (var i = 0; i < this.childrens.length; i++) {
                    //给列表初始化属性
                    this.childrens[i].style.float = 'left';
                    this.childrens[i].style.width =
                        document.getElementById('cor_box').offsetWidth + 'px';
                }
                var clonefirstLi = this.childrens[0].cloneNode(true); //初始化列表数量
                var clonelastLi = this.childrens[this.childrens.length - 1].cloneNode(true);
                this.touchDom.appendChild(clonefirstLi);
                this.touchDom.insertBefore(clonelastLi, this.childrens[0]);
                this.touchendX = self.moveX = -this.childrens[0].offsetWidth;

                this.touchDom.style.left = self.moveX + 'px';
                this.touchDom.style.width =
                    this.childrens.length * this.childrens[0].offsetWidth + 'px';
                document.getElementById('cor_box').style.height =
                    document.getElementById('lunbo').offsetHeight + 10 + 'px'; //设定盒子高度
                /*事件绑定*/
                this.touchDom.addEventListener('touchstart', self.touchstart, false);
                this.touchDom.addEventListener('touchmove', self.touchmove, false);
                this.touchDom.addEventListener(
                    'touchend',
                    function() {
                        self.touchend();
                        if (cb) {
                            cb(self.getIndex());
                        }
                    },
                    false
                );
                this.touchDom.addEventListener('touchcancle', self.touchcancle, false);
                this.touchDom.addEventListener(
                    'click',
                    function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                    },
                    false
                );
                if (self.autoplay) {
                    //轮播
                    this.lunboInit();
                }
            };
            this.lunboInit = function() {
                var self = this;
                self.lunbTimer = setInterval(() => {
                    self.touchAction();
                }, self.duration);
            };
            this.touchstart = function(e) {
                clearInterval(self.lunbTimer);
                if (!self.lunboq) return;
                self.touchstartX = e.clientX || e.touches[0].clientX;
                self.touchstartY = e.clientY || e.touches[0].clientY;
            };
            this.touchmove = function(e) {
                if (!self.lunboq) return;
                self.touchDom.style.transition = 'none';
                self.touchDom.webkitTransform = 'none';

                var c_x = e.clientX || e.touches[0].clientX;
                var c_y = e.clientY || e.touches[0].clientY;
                self.disX = c_x - self.touchstartX;
                self.disY = c_y - self.touchstartY;

                if (Math.abs(self.disY) < Math.abs(self.disX)) {
                    //处理手指触摸方向，
                    e.preventDefault();
                    self.moveX = self.touchendX + self.disX;
                } else {
                    self.moveX = self.touchendX;
                }
                self.touchDom.style.left = self.moveX + 'px';
            };
            this.touchend = function(e) {
                if (!self.lunboq) return;
                if (Math.abs(self.disX) > self.childrens[0].offsetWidth / 3) {
                    self.touchAction(self.disX < 0);
                } else {
                    self.touchendX = -self.childrens[0].offsetWidth * self.currentIndex;
                    self.moveX = self.touchendX;
                    self.touchDom.style.transition = 'left .3s ease-in';
                }
                self.touchDom.style.left = self.moveX + 'px';
                if (self.autoplay) {
                    self.lunboInit();
                }
            };
            this.touchAction = function(go, cb) {
                if (go) {
                    self.currentIndex += 1;
                } else {
                    self.currentIndex -= 1;
                }
                self.touchendX =
                    self.currentIndex == 0 ? 0 : -self.childrens[0].offsetWidth * self.currentIndex;
                self.moveX = self.touchendX;
                self.touchstartX = 0;
                self.touchDom.style.transition = 'left .3s ease-in';
                self.touchDom.style.left = self.moveX + 'px';

                if (self.currentIndex == self.childrens.length - 1) {
                    self.lunboq = false;
                    function nextInit() {
                        //触摸滚动到头尾 初始化
                        self.currentIndex = 1;
                        self.touchendX = -self.childrens[0].offsetWidth * self.currentIndex;
                        self.touchDom.style.left = self.touchendX + 'px';
                        self.touchDom.style.transition = 'none';
                        self.touchDom.webkitTransform = 'none';
                        self.lunboq = true;
                        self.touchDom.removeEventListener('transitionend', nextInit);
                    }
                    self.touchDom.addEventListener('transitionend', nextInit, false);
                } else if (self.currentIndex == 0) {
                    self.lunboq = false;
                    function preInit() {
                        //触摸滚动到头尾 初始化
                        self.currentIndex = self.childrens.length - 2;
                        self.touchendX = -self.childrens[0].offsetWidth * self.currentIndex;
                        self.touchDom.style.left = self.touchendX + 'px';
                        self.touchDom.style.transition = 'none';
                        self.touchDom.webkitTransform = 'none';
                        self.lunboq = true;
                        self.touchDom.removeEventListener('transitionend', preInit);
                    }
                    self.touchDom.addEventListener('transitionend', preInit, false);
                }
                self.disX = 0;
                if (cb) {
                    var index = self.getIndex();
                    cb(index);
                }
            };
            var flag = true;
            this.next = function(cb) {
                if (!flag) return;
                setTimeout(() => {
                    flag = true;
                }, 500);
                self.touchAction(true, cb);
                flag = false;
            };
            this.pre = function(cb) {
                if (!flag) return;
                setTimeout(() => {
                    flag = true;
                }, 500);
                self.touchAction(false, cb);
                flag = false;
            };
            this.getIndex = function() {
                var dotLi = self.childrens.length - 2;
                var curIndex = self.currentIndex;
                if (curIndex == dotLi + 1) curIndex = 1;
                if (curIndex == 0) curIndex = dotLi;
                return curIndex;
            };
        },
        initReportData() {
            if (!this.threeInOneData.carrier) return;
            /*通话概况*/
            this.cell_behavior_data.monthData = this.threeInOneData.carrier.cell_behavior.behavior;

            for (let i in this.cell_behavior_data.monthData) {
                this.gk_line_data.push({
                    //主叫
                    name: '主叫',
                    value1: this.cell_behavior_data.monthData[i].cell_mth,
                    value2: this.cell_behavior_data.monthData[i].dial_cnt
                });
                this.gk_line_data.push({
                    //被叫
                    name: '被叫',
                    value1: this.cell_behavior_data.monthData[i].cell_mth,
                    value2: this.cell_behavior_data.monthData[i].dialed_cnt
                });
            }
            this.$nextTick(() => {
                this.initline(this.gk_line_data, 'probably_line');
            });
            //this.cell_behavior_data.monthIndex = this.threeInOneData.carrier.cell_behavior.behavior.length-1;//默认最近一个月

            /*通话类型*/
            this.call_risk_analysis_data = this.threeInOneData.carrier.call_risk_analysis;
            /*活跃时段*/
            this.call_duration_detail = this.threeInOneData.carrier.call_duration_detail;
            for (let i in this.call_duration_detail.duration_list) {
                this.hy_line_data.push({
                    //
                    name: '通话时长（分）',
                    value1: this.call_duration_detail.duration_list[i].time_step_zh,
                    value2: this.call_duration_detail.duration_list[i].total_time
                });
                this.hy_line_data.push({
                    //被叫
                    name: '通话次数',
                    value1: this.call_duration_detail.duration_list[i].time_step_zh,
                    value2: this.call_duration_detail.duration_list[i].total_cnt
                });
            }
            this.$nextTick(() => [this.initline(this.hy_line_data, 'analysisType_line')]);
        },
        initline(Data, canvasId) {
            var Shape = F2.Shape;
            var Util = F2.Util;

            Shape.registerShape('interval', 'text', {
                draw: function draw(cfg, container) {
                    var points = this.parsePoints(cfg.points);
                    // points 顶点的顺序
                    // 1 ---- 2
                    // |      |
                    // 0 ---- 3
                    var style = Util.mix(
                        {
                            fill: cfg.color,
                            z: true // 需要闭合
                        },
                        cfg.style
                    );
                    var intervalShape = container.addShape('rect', {
                        attrs: Util.mix(
                            {
                                x: points[1].x,
                                y: points[1].y,
                                width: points[2].x - points[1].x,
                                height: points[0].y - points[1].y
                            },
                            style
                        )
                    });

                    var origin = cfg.origin._origin; // 获取对应的原始数据记录
                    var textShape = container.addShape('text', {
                        zIndex: 1,
                        attrs: {
                            x: (points[1].x + points[2].x) / 2,
                            y: points[1].y - 5, // 往上偏移 5 像素
                            text: origin['value2'],
                            fill: '#808080',
                            textAlign: 'center',
                            textBaseline: 'bottom',
                            fontSize: 10 // 字体大小
                        }
                    });
                    container.sort();
                    return [intervalShape, textShape];
                }
            });
            var chart = new F2.Chart({
                id: canvasId,
                pixelRatio: window.devicePixelRatio
            });
            chart.source(Data);
            chart.legend(false);

            chart
                .interval()
                .position('value1*value2')
                .color('name', ['l(90) 0:#39B2FF 1:#39B2FF', 'l(90) 0:#FF5F3B 1:#FF5F3B'])
                .shape('text')
                .adjust({
                    type: 'dodge',
                    marginRatio: 0.2
                })
                .style({
                    radius: [0, 0, 0, 0]
                });

            chart.render();
        },
        colorFomat(times) {
            if (times < 200) {
                return '#50dc64';
            } else if (times >= 200 && times < 400) {
                return '#FFC130';
            } else {
                return '#FF5F3B';
            }
        }
    }
};
</script>

<style lang="less" scoped>
.threeInOne {
    line-height: normal;
    box-sizing: border-box;
    background-color: #fff;
    .authorizationCarrier {
        width: 4rem;
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 0.4rem;
        font-size: 0.28rem;
        border-radius: 0.4rem;
        color: #fff;
        margin: 0 auto;
        text-align: center;
        background-image: linear-gradient(to right bottom, #ff5722, #ff5722);
    }
    .reportTips {
        font-size: 0.26rem;
        padding: 0 0.3rem;
        color: red;
        margin-bottom: 0.1rem;
    }
    .lostletter_subtitle {
        color: #3d4ae8;
        font-size: 0.26rem;
        margin-top: 0.25rem;
    }
    .headline {
        color: #121c32;
        font-size: 0.32rem;
        font-weight: bold;
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
    .carrier-m-circle-t {
        display: flex;
        line-height: normal;
        font-size: 0.24rem;
        color: #3d4ae8;
        background: #e6f1fc;
        height: 0.42rem;
        line-height: 0.42rem;
        text-align: center;
        display: inline-block;
        padding: 0 0.3rem;
        border-radius: 0.21rem;
    }
    .carrier-s-title {
        display: flex;
        align-items: center;
        span:nth-of-type(1) {
            width: 6px;
            height: 6px;
            background: #3d4ae8;
            border-radius: 50%;
        }
        span:nth-of-type(2) {
            margin-left: 0.14rem;
            color: #121c32;
            font-size: 0.26rem;
            font-weight: bold;
        }
        span:nth-of-type(3) {
            margin-left: 0.19rem;
            color: #3d4ae8;
            font-size: 0.26rem;
            font-weight: bold;
        }
    }
    .pop_up {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5.26rem;
        height: 5.97rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        border-radius: 0.05rem;
        font-size: 0.28rem;
        padding: 0.3rem;
        box-sizing: border-box;
        > .close {
            width: 0.45rem;
            height: 0.45rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 50%;
            bottom: -0.85rem;
            transform: translateX(-50%);
        }
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
                        > div {
                            color: #fff;
                        }
                        > .name {
                            font-size: 0.29rem;
                            font-weight: bold;
                        }
                        > .age {
                            margin-left: 0.4rem;
                            font-size: 0.21rem;
                        }
                        > .gender {
                            margin-left: 0.3rem;
                            font-size: 0.21rem;
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
                color: #fff;
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
    > .zhanwei {
        height: 2.3rem;
        background-color: #fff;
    }
    .big_title {
        display: inline-block;
        padding: 0 0.24rem 0 0.37rem;
        height: 0.55rem;
        box-sizing: border-box;
        line-height: 0.55rem;
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
        .lxr_cy_detial {
            margin-top: 0.3rem;
            background: #f9fafc;
            padding: 0.54rem 0.33rem 0.16rem;
            .item_li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 0.24rem;
                margin-bottom: 0.3rem;
                span {
                    font-size: 0.24rem;
                }
                .label {
                    color: #121c32;
                }
                .num {
                    color: #8e94a4;
                }
            }
        }
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 0.34rem;
            padding: 0.2rem 0;
            margin-top: 0.45rem;
            span {
                flex: 1;
                text-align: center;
                font-size: 0.24rem;
                color: #121c32;
                font-weight: bold;
            }
        }
        .sfz_cy_detial {
            background: #f9fafc;
            .item_li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 0.6rem;
                margin-bottom: 0.3rem;

                span {
                    font-size: 0.24rem;
                    flex: 1;
                    text-align: center;
                }
                .label {
                    color: #838997;
                }
                .num {
                    color: #838997;
                }
            }
        }
        .sfz_data_type {
            padding: 0 0.2rem 0.36rem 0.2rem;
            background: #f9fafc;
            .item_li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: 0.76rem;
                background: #fff;
                border-bottom: 1px solid #f9fafc;
                &:last-child {
                    border-bottom: none;
                }
                span {
                    font-size: 0.24rem;
                    flex: 1;
                    text-align: center;
                }
                .label {
                    color: #838997;
                }
                .num {
                    color: #838997;
                }
            }
        }
        .dt_qk {
            background: #f9fafc;
            .dt_tips_label {
                display: flex;
                align-items: center;
                padding: 0.5rem 0.3rem 0.3rem 0.33rem;
                span:nth-of-type(1) {
                    display: inline-block;
                    width: 6px;
                    height: 6px;
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
            .dt_title {
                padding: 0 0.33rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 0.77rem;
                background: #fafcff;
                span:first-child {
                    text-align: left;
                    flex: 2;
                }
                span {
                    flex: 1;
                    font-size: 0.24rem;
                    color: #121c32;
                    font-weight: bold;
                    text-align: center;
                }
            }
            .item_li {
                padding: 0 0.33rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 0.53rem;
                background: #fefeff;
                span:first-child {
                    text-align: left;
                    flex: 2;
                    color: #121c32;
                }
                span {
                    flex: 1;
                    text-align: center;
                    color: #8e94a4;
                    font-size: 0.22rem;
                }
            }
        }
        .carrier_dt_qk {
            background: #f9fafc;
            .fx_th_dt {
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .th_dt_item {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    padding: 0.1rem 0.3rem;
                    span {
                        flex: 1;
                        font-size: 0.2rem;
                        text-align: center;
                    }
                    span.first {
                        flex: 2;
                        text-align: left;
                    }
                }
            }
            .dt_tips_label {
                padding: 0.5rem 0.3rem 0.3rem 0.33rem;
                span:nth-of-type(1) {
                    display: inline-block;
                    width: 0.13rem;
                    height: 0.13rem;
                    background: rgba(61, 74, 232, 1);
                    border-radius: 50%;
                }
                span:nth-of-type(2) {
                    margin-left: 0.19rem;
                    color: #3d4ae8;
                    font-size: 0.2rem;
                    font-weight: bold;
                }
            }
            .dt_title {
                padding: 0 0.33rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 0.77rem;
                background: #fafcff;
                span:first-child {
                    text-align: left;
                    flex: 2;
                }
                span {
                    flex: 1;
                    font-size: 0.2rem;
                    color: #121c32;
                    font-weight: bold;
                    text-align: center;
                }
            }
            .item_li {
                padding: 0 0.33rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                height: 0.53rem;
                background: #fefeff;
                span:first-child {
                    text-align: left;
                    flex: 2;
                    color: #121c32;
                }
                span {
                    flex: 1;
                    text-align: center;
                    color: #8e94a4;
                    font-size: 0.22rem;
                }
            }
        }
        .yqxw_content {
            background: #f9fafc;
            padding: 0.55rem 0.31rem 0.59rem 0.31rem;
            .yqxw_st {
                margin-top: 0.7rem;
                margin-bottom: 0.4rem;
            }
            .t-c {
                background: #fff;
                .t-c_li_t {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    height: 0.81rem;
                    .t_label {
                        flex: 1;
                        font-size: 0.26rem;
                        font-weight: bold;
                        color: #3d4ae8;
                        text-align: center;
                    }
                }
                .t-c_li_c {
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    height: 0.68rem;
                    border-top: 1px solid #f6f6f7;
                    > span {
                        font-size: 0.22rem;
                        flex: 1;
                        text-align: center;
                        &.t_name {
                            color: #121c32;
                        }
                        &.t_value {
                            color: #8e94a4;
                        }
                    }
                }
            }
            .t-b {
                display: flex;
                justify-content: space-between;
                align-items: center;
                > div {
                    text-align: center;
                    font-size: 0.2rem;
                    line-height: 0.2rem;
                }
                .t-b-li_name {
                    color: #121c32;
                    font-weight: bold;
                }
                .t-b-li_value {
                    color: #838997;
                    margin-top: 0.3rem;
                }
            }
            table.fzxq_t-b_table {
                width: 100%;
                box-sizing: border-box;
                text-align: center;
                > tr.table-b-li_t {
                    color: #121c32;
                    height: 0.52rem;
                    font-size: 0.2rem;
                    td {
                        font-weight: bold;
                    }
                }
                > tr.table-b-li_v {
                    color: #838997;
                    height: 0.52rem;
                    font-size: 0.2rem;
                }
            }
        }
        .tips_label {
            display: flex;
            align-items: center;
            span:nth-of-type(1) {
                width: 6px;
                height: 6px;
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
            .grxx_st {
                margin-top: 0.5rem;
            }
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
                    // padding: 0.2rem;
                    // background: #fff;
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
        .dt_hj {
            margin-top: 0.45rem;
            background: #f9fafc;
            padding: 0.2rem 0.33rem 0.3rem;
            .dt_t_all {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .dt_t_li {
                    width: 50%;
                    span {
                        font-size: 0.24rem;
                        color: #8e94a3;
                    }
                    span:nth-of-type(2) {
                        color: #121c32;
                    }
                }
            }
            .dt_btn_check {
                display: flex;
                align-items: center;
                justify-content: space-between;
                width: 3.27rem;
                height: 0.68rem;
                background-color: #fff;
                border-radius: 0.34rem;
                margin: 0.4rem auto 0.35rem;
                box-shadow: 0px 0.05rem 0.07rem 0px rgba(204, 206, 209, 0.17);
                .label {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #4466f7;
                    font-size: 0.28rem;
                }
                .m_pre {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 1rem;
                    height: 100%;
                    > img {
                        width: 0.13rem;
                        height: 0.25rem;
                    }
                }
                .m_next {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 1rem;
                    height: 100%;
                    > img {
                        width: 0.13rem;
                        height: 0.25rem;
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
        }
        .dt_zq {
            margin: 0.32rem auto 0.8rem;
            background: #f9fafc;
            padding: 0.49rem 0.32rem 0.5rem;
            .dt-zq-T {
                .circle {
                    display: inline-block;
                    width: 0.13rem;
                    height: 0.13rem;
                    border-radius: 0.65rem;
                    margin-right: 0.2rem;
                    background-color: #3d4ae8;
                }
                .label {
                    font-size: 0.24rem;
                    color: #3d4ae8;
                    font-weight: bold;
                }
                .tips {
                    font-size: 0.24rem;
                    color: #8e94a3;
                    margin-left: 0.23rem;
                }
            }
            .dt-zq-msg {
                margin-top: 0.13rem;
                .zq-msg-li {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 0.55rem;
                    span:nth-of-type(1) {
                        font-size: 0.24rem;
                        color: #121c32;
                    }
                    span:nth-of-type(2) {
                        font-size: 0.24rem;
                        color: #8e94a3;
                    }
                }
            }
        }
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
                        width: 4px;
                        height: 4px;
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
        .carrier_msg_li {
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
        .hyarea_list_li {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 1rem;
            .areaicon {
                width: 0.23rem;
                vertical-align: middle;
                margin-right: 0.18rem;
            }
            .area {
                flex: 1;
                font-size: 0.24rem;
                color: #121c32;
            }
            .call {
                font-size: 0.24rem;
                color: #121c32;
                flex: 2;
            }
            .times {
                font-size: 0.24rem;
                color: #8e94a4;
                flex: 1;
            }
        }
        .concatDepth {
            background: #fff;
            -webkit-border-radius: 0.1rem;
            -moz-border-radius: 0.1rem;
            border-radius: 0.1rem;
            padding: 0.36rem 0.28rem 0.25rem;
            .phone {
                display: flex;
                align-items: center;
                margin-bottom: 0.1rem;
                .timecolor {
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                }
            }
            .phone_detial {
                margin-top: 0.1rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .phone_detialitem {
                    display: flex;
                    flex-direction: column;
                    text-align: center;
                    justify-content: center;
                    span:nth-of-type(1) {
                        color: #39b2ff;
                        font-size: 0.36rem;
                    }
                    span:nth-of-type(2) {
                        color: #8e94a4;
                        font-size: 0.24rem;
                    }
                }
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
}
.reportItem-nodata {
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.28rem;
}
.chart-desc-1 {
    padding: 0px 0.2rem;
    display: flex;
    justify-content: space-between;
    height: auto;
    > .left,
    .right {
        display: flex;
        flex-direction: column;
        > div {
            display: flex;
        }
    }
}
.chart-desc-2 {
    display: flex;
    justify-content: space-between;
    height: auto;
    > .left,
    .right {
        display: flex;
        align-items: center;
    }
}
.analysisWrods {
    font-size: 0.24rem;
    color: #a9a9a9;
    line-height: 0.34rem;
    margin-top: 0.5rem;
    .pay_showRP {
        text-align: right;
        margin-top: 0.2rem;
        span {
            display: inline-block;
            border: 1px solid #ff5f3b;
            font-size: 0.24rem;
            border-radius: 0.06rem;
            line-height: 0.4rem;
            padding: 0 0.2rem;
            color: #ff5f3b;
        }
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
