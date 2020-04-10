<template>
    <div class="new-mi-guan" v-if="reportData">
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
                            <div class="name">{{reportData.user_basic.user_name}}</div>
                            <div class="age">{{reportData.user_basic.user_age}}岁</div>
                            <div class="gender">{{reportData.user_basic.user_gender}}</div>
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
                            <div class="text">{{reportData.user_basic.user_phone}}</div>
                        </div>
                        <div class="phone_company">
                            <div class="img" :style="{backgroundImage:`url(${icon_2})`}"></div>
                            <div class="text">{{reportData.user_basic.user_phone_operator}}</div>
                        </div>
                    </div>
                    <div class="idCard_location">
                        <div class="idCard">
                            <div class="img" :style="{backgroundImage:`url(${icon_3})`}"></div>
                            <div class="text">{{reportData.user_basic.user_idcard}}</div>
                        </div>
                        <div class="location">
                            <div class="img" :style="{backgroundImage:`url(${icon_4})`}"></div>
                            <div
                                class="text"
                            >{{reportData.user_basic.user_city}} · {{reportData.user_basic.user_region}}</div>
                        </div>
                    </div>
                    <div class="lastShowTime" v-if="orderData.endtime">报告过期时间：{{orderData.endtime}}</div>
                </div>
            </div>
            <div class="score" :style="{backgroundImage:`url(${scoreImg})`}">
                <span>{{user_score}}</span>
            </div>
        </div>
        <div class="zhanwei"></div>
        <!-- 黑名单 -->
        <div class="blacklist">
            <div class="title">
                <div class="left">黑名单信息</div>
                <img
                    class="right"
                    @click.stop="showTips(reportData.tips.user_blacklist)"
                    :src="questionImg"
                    alt
                >
            </div>
            <div class="content">
                <div class="wrap">
                    <div class="top">
                        <div class="item">
                            <div class="left">被标记的黑名单分类</div>
                            <div
                                class="right"
                                :class="{green:!reportData.user_gray.blacklist_category}"
                            >{{reportData.user_gray.blacklist_category}}</div>
                        </div>
                        <div class="item">
                            <div class="left">姓名和手机是否在黑名单</div>
                            <div
                                :class="{green:!reportData.user_gray.blacklist_name_with_phone}"
                                class="right"
                            >{{reportData.user_gray.blacklist_name_with_phone?'是':'否'}}</div>
                        </div>
                        <div class="item">
                            <div class="left">身份证和姓名是否在黑名单</div>
                            <div
                                class="right"
                                :class="{green:!reportData.user_gray.blacklist_name_with_idcard}"
                            >{{reportData.user_gray.blacklist_name_with_idcard?'是':'否'}}</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="title">
                            <div class="dot-icon"></div>
                            <div class="name">黑名单详细信息</div>
                        </div>
                        <div class="list" v-if="reportData.user_gray.blacklist_details.length>0">
                            <div class="title">
                                <div class="left">名称</div>
                                <div class="right">内容</div>
                            </div>
                            <div
                                class="item"
                                v-for="(item,index) in reportData.user_gray.blacklist_details"
                                :key="index"
                            >
                                <div class="left">{{item.details_key}}</div>
                                <div class="right">{{item.details_value}}</div>
                            </div>
                        </div>
                        <div v-else class="reportItem-nodata">无记录</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 联系人存疑信息 -->
        <div class="linker">
            <div class="title">
                <div class="left">联系人存疑信息</div>
                <img
                    class="right"
                    @click.stop="showTips(reportData.tips.contacts_number_statistic)"
                    :src="questionImg"
                >
            </div>
            <div class="content">
                <div class="wrap">
                    <div class="item">
                        <div class="left">主动联系人数</div>
                        <div
                            class="right"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_to_all}}</div>
                    </div>
                    <div class="item">
                        <div class="left">主动联系的黑号数</div>
                        <div
                            class="right red"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_to_black}}</div>
                    </div>
                    <div class="item">
                        <div class="left">主动联系人中曾为申请人的人数</div>
                        <div
                            class="right"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_to_applied}}</div>
                    </div>
                    <div class="item">
                        <div class="left">被动联系人数</div>
                        <div
                            class="right"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_be_all}}</div>
                    </div>
                    <div class="item">
                        <div class="left">被动联系的黑号数</div>
                        <div
                            class="right red"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_be_black}}</div>
                    </div>
                    <div class="item">
                        <div class="left">被动联系人曾为申请人的人数</div>
                        <div
                            class="right"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_be_applied}}</div>
                    </div>
                    <div class="item">
                        <div class="left">一阶联系人总数（主动、被动联系人数合并去重）</div>
                        <div
                            class="right"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_all}}</div>
                    </div>
                    <div class="item">
                        <div class="left">一阶联系（直接联系）黑号总数</div>
                        <div
                            class="right red"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_black}}</div>
                    </div>
                    <div class="item">
                        <div class="left">二阶联系（间接联系）黑号总数</div>
                        <div
                            class="right"
                        >{{reportData.user_gray.contacts_number_statistic.cnt_black2}}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 历史查询记录 -->
        <div class="search_hostory">
            <div class="title">
                <div class="left">历史查询记录</div>
                <img
                    @click.stop="showTips(reportData.tips.user_searched_history_by_day)"
                    class="right"
                    :src="questionImg"
                >
            </div>
            <div class="content">
                <div
                    class="wrap"
                    style="padding-left: 0;padding-right: 0"
                    v-if="reportData.user_searched_history_by_day"
                >
                    <div class="time_select">
                        <div class="wrap">
                            <div class="left">
                                <div
                                    class="img m_pre"
                                    :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-arrow-left.png')})`}"
                                ></div>
                            </div>
                            <div class="center">{{dateFormate}}</div>
                            <div class="right">
                                <div
                                    class="img m_next"
                                    :style="{backgroundImage:`url(${require('@/assets/miGuan/newMiGuan-arrow-right.png')})`}"
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div id="cor_box" style="overflow:hidden;position:relative;height: 4.66rem;">
                        <div id="lunbo" style="position:absolute" class="clearfix">
                            <div
                                style="width: 100%;padding: 0 0.3rem;box-sizing: border-box"
                                class="item_list"
                                v-for="(item,index) in historyDate"
                                :key="index"
                            >
                                <div class="item">
                                    <div class="left">查询次数</div>
                                    <div
                                        class="right"
                                    >{{reportData.user_searched_history_by_day[historyDate[index]].cnt}}</div>
                                </div>
                                <div class="item">
                                    <div class="left">查询机构数</div>
                                    <div
                                        class="right"
                                    >{{reportData.user_searched_history_by_day[historyDate[index]].cnt_org}}</div>
                                </div>
                                <div class="item">
                                    <div class="left">现金贷查询次数</div>
                                    <div
                                        class="right"
                                    >{{reportData.user_searched_history_by_day[historyDate[index]].cnt_cash}}</div>
                                </div>
                                <div class="item">
                                    <div class="left">现金贷查询机构数</div>
                                    <div
                                        class="right"
                                    >{{reportData.user_searched_history_by_day[historyDate[index]].cnt_org_cash}}</div>
                                </div>
                                <div class="item">
                                    <div class="left">消费分期查询次数</div>
                                    <div
                                        class="right"
                                    >{{reportData.user_searched_history_by_day[historyDate[index]].cnt_cf}}</div>
                                </div>
                                <div class="item">
                                    <div class="left">消费分期查询机构数</div>
                                    <div
                                        class="right"
                                    >{{reportData.user_searched_history_by_day[historyDate[index]].cnt_org_cf}}</div>
                                </div>
                                <div class="item">
                                    <div class="left">信用卡代还查询次数</div>
                                    <div
                                        class="right"
                                    >{{reportData.user_searched_history_by_day[historyDate[index]].cnt_cc}}</div>
                                </div>
                                <div class="item">
                                    <div class="left">信用卡代还查询机构数</div>
                                    <div
                                        class="right"
                                    >{{reportData.user_searched_history_by_day[historyDate[index]].cnt_org_cc}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 机构历史查询 -->
        <div class="org_search_hostory">
            <div class="title">
                <div class="left">机构历史查询</div>
                <img
                    class="right"
                    @click.stop="showTips(reportData.tips.user_blacklist)"
                    :src="questionImg"
                    alt
                >
            </div>
            <div class="content" v-if="reportData.user_searched_statistic.searched_org_cnt>0">
                <div class="wrap">
                    <div class="search_num">
                        <div class="content">
                            <div class="left">查询机构数</div>
                            <div
                                class="right"
                            >{{reportData.user_searched_statistic.searched_org_cnt}}</div>
                        </div>
                    </div>
                    <div class="item_list">
                        <div class="title">
                            <div class="t1">查询日期</div>
                            <div class="t2">机构类型</div>
                            <div class="t3">是否是本机构查询</div>
                        </div>
                        <div
                            class="item"
                            v-for="(item,index) in reportData.user_searched_history_by_orgs"
                            :key="index"
                        >
                            <div class="c1">{{item.searched_date}}</div>
                            <div class="c2">{{item.searched_org}}</div>
                            <div
                                :class="{red:item.org_self,green:!item.org_self}"
                                class="c3"
                            >{{item.org_self?'是':'否'}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="reportItem-nodata">无记录</div>
        </div>
        <!-- 机构批量查询历史 -->
        <div class="org_batch_search_hostory" v-if="false">
            <div class="title">
                <div class="left">机构批量查询历史</div>
                <img
                    class="right"
                    @click.stop="showTips(reportData.tips.user_blacklist)"
                    :src="questionImg"
                    alt
                >
            </div>
            <div class="content" v-if="reportData.user_batch_searched_history_by_orgs.length>0">
                <div class="wrap">
                    <div class="item_list">
                        <div class="title">
                            <div class="t1">查询日期</div>
                            <div class="t2">机构类型</div>
                            <div class="t3">是否是本机构查询</div>
                        </div>
                        <div
                            class="item"
                            v-for="(item,index) in reportData.user_batch_searched_history_by_orgs"
                            :key="index"
                        >
                            <div class="c1">{{item.searched_date}}</div>
                            <div class="c2">{{item.searched_org}}</div>
                            <div
                                :class="{red:item.org_self,green:!item.org_self}"
                                class="c3"
                            >{{item.org_self?'是':'否'}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="reportItem-nodata">无记录</div>
        </div>
        <!-- 身份证存疑 -->
        <div class="id_doubt">
            <div class="title">
                <div class="left">身份证存疑</div>
                <img
                    class="right"
                    @click.stop="showTips(reportData.tips.user_blacklist)"
                    :src="questionImg"
                    alt
                >
            </div>
            <div class="content">
                <div class="wrap">
                    <div class="top">
                        <div class="item_list">
                            <div class="title">
                                <div class="t1">使用过此身份证的其它姓名</div>
                                <div class="t2">最后使用时间</div>
                            </div>
                            <div
                                class="item"
                                v-for="(item,index) in reportData.user_idcard_suspicion.idcard_with_other_names"
                                :key="index"
                            >
                                <div class="c1">{{item.susp_name}}</div>
                                <div class="c2">{{item.susp_updt}}</div>
                            </div>
                            <div
                                v-if="reportData.user_idcard_suspicion.idcard_with_other_names.length==0"
                                class="reportItem-nodata"
                            >无记录</div>
                        </div>
                    </div>
                    <div class="center">
                        <div class="item_list">
                            <div class="title">
                                <div class="t1">使用过此身份证的其它手机</div>
                                <div class="t2">最后使用时间</div>
                                <div class="t3">出现次数</div>
                            </div>
                            <div
                                class="item"
                                v-for="(item,index) in reportData.user_idcard_suspicion.idcard_with_other_phones"
                                :key="index"
                            >
                                <div class="c1">{{item.susp_phone}}</div>
                                <div class="c2">{{item.susp_updt}}</div>
                                <div class="c3">{{item.times}}</div>
                            </div>
                            <div
                                v-if="reportData.user_idcard_suspicion.idcard_with_other_phones.length==0"
                                class="reportItem-nodata"
                            >无记录</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="item_list">
                            <div class="title">
                                <div class="t1">提供数据的机构类型</div>
                                <div class="t2">最后使用时间</div>
                            </div>
                            <div
                                class="item"
                                v-for="(item,index) in reportData.user_idcard_suspicion.idcard_applied_in_orgs"
                                :key="index"
                            >
                                <div class="c1">{{item.susp_org_type}}</div>
                                <div class="c2">{{item.susp_updt}}</div>
                            </div>
                            <div
                                v-if="reportData.user_idcard_suspicion.idcard_applied_in_orgs.length==0"
                                class="reportItem-nodata"
                            >无记录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 手机存疑 -->
        <div class="phone_doubt">
            <div class="title">
                <div class="left">手机存疑</div>
                <img
                    @click.stop="showTips(reportData.tips.user_phone_suspicion)"
                    class="right"
                    :src="questionImg"
                    alt
                >
            </div>
            <div class="content">
                <div class="wrap">
                    <div class="top">
                        <div class="item_list">
                            <div class="title">
                                <div class="t1">使用过此手机的其它姓名</div>
                                <div class="t2">最后使用时间</div>
                            </div>
                            <div
                                class="item"
                                v-for="(item,index) in reportData.user_phone_suspicion.phone_with_other_names"
                                :key="index"
                            >
                                <div class="c1">{{item.susp_name}}</div>
                                <div class="c2">{{item.susp_updt}}</div>
                            </div>
                            <div
                                v-if="reportData.user_phone_suspicion.phone_with_other_names.length==0"
                                class="reportItem-nodata"
                            >无记录</div>
                        </div>
                    </div>
                    <div class="center">
                        <div class="item_list">
                            <div class="title">
                                <div class="t1">使用过此手机的其它身份证</div>
                                <div class="t2">最后使用时间</div>
                            </div>
                            <div
                                class="item"
                                v-for="(item,index) in reportData.user_phone_suspicion.phone_with_other_idcards"
                                :key="index"
                            >
                                <div class="c1">{{item.susp_idcard}}</div>
                                <div class="c2">{{item.susp_updt}}</div>
                            </div>
                            <div
                                v-if="reportData.user_phone_suspicion.phone_with_other_idcards.length==0"
                                class="reportItem-nodata"
                            >无记录</div>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="item_list">
                            <div class="title">
                                <div class="t1">提供数据的机构类型</div>
                                <div class="t2">最后使用时间</div>
                            </div>
                            <div
                                class="item"
                                v-for="(item,index) in reportData.user_phone_suspicion.phone_applied_in_orgs"
                                :key="index"
                            >
                                <div class="c1">{{item.susp_org_type}}</div>
                                <div class="c2">{{item.susp_updt}}</div>
                            </div>
                            <div
                                v-if="reportData.user_phone_suspicion.phone_applied_in_orgs.length==0"
                                class="reportItem-nodata"
                            >无记录</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 说明 -->
        <div class="instructions">
            <div class="title">报告数据说明</div>
            <div class="text" style="marginTop:0.3rem">本报告由用户本人授权查询。数据来源各大运营商、征信平台、网贷平台，蓝冰众创只做大数据信息的获取及分析。</div>
            <div class="text" style="marginTop:0.1rem">本报告仅供参考使用，如果您对报告有异议，出于对合作平台隐私的保护蓝冰众创不对数据来源做任何解释。</div>
        </div>
        <!-- 弹窗组件 -->
        <base-img-pop v-if="isBaseImgPop" :imgSrc="imgSrc" :isBaseImgPop.sync="isBaseImgPop"></base-img-pop>
    </div>
</template>
<script>
export default {
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
            imgSrc: '',
            isBaseImgPop: false,
            user_score: 0,
            lunboTouchIndex: 0,
            historyDate: [],
            banner_1: require('@miGuan/newMiGuan-banner-1.png'),
            banner_2: require('@miGuan/newMiGuan-banner-2.png'),
            avatarImg: require('@miGuan/newMiGuan-avatar.png'),
            scoreImg: require('@miGuan/newMiGuan-score.png'),
            icon_1: require('@miGuan/newMiGuan-1.png'),
            icon_2: require('@miGuan/newMiGuan-2.png'),
            icon_3: require('@miGuan/newMiGuan-3.png'),
            icon_4: require('@miGuan/newMiGuan-4.png'),
            questionImg: require('@miGuan/newMiGuan-question.png')
        };
    },
    computed: {
        dateFormate() {
            var code = this.historyDate[this.lunboTouchIndex];
            if (code == 'd_7') {
                return '近7天';
            } else if (code == 'd_15') {
                return '近15天';
            } else if (code == 'd_30') {
                return '近1月';
            } else if (code == 'd_60') {
                return '近2月';
            } else if (code == 'd_90') {
                return '近3月';
            } else if (code == 'm_4') {
                return '近4月';
            } else if (code == 'm_5') {
                return '近5月';
            } else if (code == 'm_6') {
                return '近半年';
            } else if (code == 'm_9') {
                return '近9个月';
            } else if (code == 'm_12') {
                return '近1年';
            } else if (code == 'm_18') {
                return '近18个月';
            } else if (code == 'm_24') {
                return '近2年';
            }
        }
    },
    created() {
        this.Score_progress(this.reportData.user_gray.phone_gray_score);
        var arr = this.reportData.user_searched_history_by_day;
        for (let i in arr) {
            this.historyDate.push(i);
        }
    },
    mounted() {
        var self = this;
        if (this.reportData.user_searched_history_by_day) {
            this.$nextTick(() => {
                if (this.reportData.user_searched_history_by_day) {
                    var lunbo = new this.cor();
                    lunbo.domInit(index => {
                        self.lunboTouchIndex = index - 1;
                    });
                    document.querySelector('.m_pre').onclick = function() {
                        lunbo.pre(index => {
                            self.lunboTouchIndex = index - 1;
                        });
                    };
                    document.querySelector('.m_next').onclick = function() {
                        lunbo.next(index => {
                            self.lunboTouchIndex = index - 1;
                        });
                    };
                }
            });
        }
        this.preloadImg(this.reportData.tips);
    },
    methods: {
        // 预加载图片
        preloadImg(tips) {
            if (!tips) return;
            for (var index in tips) {
                let img = new Image();
                img.src = tips[index];
            }
        },
        Score_progress(curNum) {
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
        showTips(url) {
            this.imgSrc = url;
            this.isBaseImgPop = true;
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
        }
    }
};
</script>
<style lang="less" scoped>
.new-mi-guan {
    box-sizing: border-box;
    background-color: #fff;
    .reportTips {
        font-size: 0.26rem;
        padding: 0 0.3rem;
        color: red;
        margin-bottom: 0.1rem;
    }
    > .banner {
        width: 100%;
        height: 4.48rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        box-sizing: border-box;
        position: relative;
        > .title {
            // margin-top: 0.56rem;
            transform: translateY(0.56rem);
            margin-left: 0.3rem;
            > .title-1 {
                font-size: 0.54rem;
                font-weight: 500;
                color: rgba(255, 255, 255, 1);
            }
            > .title-2 {
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
            transform: translateY(1.2rem);
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
                color: rgba(255, 255, 255, 1);
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
        height: 1.78rem;
        background-color: #fff;
    }
    > .blacklist {
        width: 100%;
        box-sizing: border-box;
        > .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            > .left {
                min-width: 2.08rem;
                height: 0.42rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0px 0.2rem;
                font-size: 0.28rem;
                line-height: normal;
                padding: 0.02rem 0.2rem 0.02rem 0.16rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                border-top-right-radius: 0.28rem;
                border-bottom-right-radius: 0.28rem;
                background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
            }
            > .right {
                margin-right: 0.3rem;
                width: 0.4rem;
                height: 0.4rem;
            }
        }
        > .content {
            margin-top: 0.3rem;
            padding: 0px 0.3rem;
            > .wrap {
                padding: 0.36rem 0.3rem;
                background-color: #f9fafc;
                border-radius: 0.1rem;
                > .top {
                    > .item {
                        margin-top: 0.3rem;
                        display: flex;
                        justify-content: space-between;
                        > .left {
                            font-size: 0.24rem;
                            font-weight: 500;
                            color: rgba(18, 28, 50, 1);
                        }
                        > .right {
                            font-size: 0.24rem;
                            font-weight: 500;
                            color: rgba(235, 97, 94, 1);
                        }
                        > .green {
                            color: rgba(57, 196, 109, 1);
                        }
                        &:first-child {
                            margin-top: 0px;
                        }
                    }
                }
                > .bottom {
                    padding: 0px;
                    margin-top: 0.8rem;
                    > .title {
                        display: flex;
                        align-items: center;
                        > .dot-icon {
                            flex: 0 0 0.13rem;
                            height: 0.13rem;
                            background-color: rgba(61, 74, 232, 1);
                            border-radius: 100%;
                        }
                        > .name {
                            margin-left: 0.1rem;
                            font-size: 0.28rem;
                            font-weight: 500;
                            color: rgba(61, 74, 232, 1);
                        }
                    }
                    > .list {
                        margin-top: 0.4rem;
                        box-sizing: border-box;
                        background-color: #fff;
                        > .title {
                            margin-bottom: 0px;
                            display: flex;
                            height: 0.8rem;
                            justify-content: space-between;
                            font-size: 0.26rem;
                            font-weight: bold;
                            color: rgba(61, 74, 232, 1);
                            border-bottom: 1px solid #f3f3f5;
                            > .left {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            > .right {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                        > .item {
                            height: 0.7rem;
                            display: flex;
                            justify-content: space-between;
                            border-bottom: 1px solid #f3f3f5;
                            > .left {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.22rem;
                                font-weight: 500;
                                color: rgba(18, 28, 50, 1);
                            }
                            > .right {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.22rem;
                                font-weight: 500;
                                color: rgba(142, 148, 164, 1);
                            }
                            &:last-child {
                                border-bottom: none;
                            }
                        }
                    }
                }
            }
        }
    }
    > .linker {
        margin-top: 0.7rem;
        width: 100%;
        box-sizing: border-box;
        > .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            > .left {
                min-width: 2.08rem;
                height: 0.42rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0px 0.2rem;
                font-size: 0.28rem;
                line-height: normal;
                padding: 0.02rem 0.2rem 0.02rem 0.16rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                border-top-right-radius: 0.28rem;
                border-bottom-right-radius: 0.28rem;
                background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
            }
            > .right {
                margin-right: 0.3rem;
                width: 0.4rem;
                height: 0.4rem;
            }
        }
        > .content {
            margin-top: 0.3rem;
            padding: 0px 0.3rem;
            > .wrap {
                padding: 0.5rem 0.3rem;
                background-color: #f9fafc;
                border-radius: 0.1rem;
                > .item {
                    margin-top: 0.3rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    > .left {
                        font-size: 0.24rem;
                        font-weight: 500;
                        color: rgba(18, 28, 50, 1);
                    }
                    > .right {
                        font-size: 0.24rem;
                        font-weight: 500;
                        color: rgba(142, 148, 164, 1);
                    }
                    > .red {
                        color: #eb615e;
                    }
                    &:first-child {
                        margin-top: 0px;
                    }
                }
            }
        }
    }
    > .search_hostory {
        margin-top: 0.7rem;
        width: 100%;
        box-sizing: border-box;
        > .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            > .left {
                min-width: 2.08rem;
                height: 0.42rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0px 0.2rem;
                font-size: 0.28rem;
                line-height: normal;
                padding: 0.02rem 0.2rem 0.02rem 0.16rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                border-top-right-radius: 0.28rem;
                border-bottom-right-radius: 0.28rem;
                background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
            }
            > .right {
                margin-right: 0.3rem;
                width: 0.4rem;
                height: 0.4rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
        > .content {
            margin-top: 0.3rem;
            padding: 0px 0.3rem;
            > .wrap {
                padding: 0.5rem 0.3rem;
                background-color: #f9fafc;
                border-radius: 0.1rem;
                > .time_select {
                    display: flex;
                    justify-content: center;
                    > .wrap {
                        margin: 0 auto;
                        height: 0.68rem;
                        display: inline-flex;
                        align-items: center;
                        justify-content: space-between;
                        background: rgba(255, 255, 255, 1);
                        box-shadow: 0px 5px 7px 0px rgba(204, 206, 209, 0.17);
                        border-radius: 33px;
                        box-sizing: content-box;
                        > .left {
                            width: 1rem;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            > .img {
                                width: 0.13rem;
                                height: 0.25rem;
                                background-repeat: no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                        > .center {
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            white-space: nowrap;
                            height: 100%;
                            font-size: 0.28rem;
                            font-weight: bold;
                            color: rgba(68, 102, 247, 1);
                        }
                        > .right {
                            width: 1rem;
                            height: 100%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            > .img {
                                width: 0.13rem;
                                height: 0.25rem;
                                background-repeat: no-repeat;
                                background-size: 100% 100%;
                            }
                        }
                    }
                }
                .item_list {
                    margin-top: 0.6rem;
                    box-sizing: border-box;
                    > .item {
                        margin-top: 0.3rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        > .left {
                            font-size: 0.24rem;
                            font-weight: 500;
                            color: rgba(18, 28, 50, 1);
                        }
                        > .right {
                            font-size: 0.24rem;
                            font-weight: 500;
                            color: rgba(142, 148, 164, 1);
                        }
                        > .red {
                            color: #eb615e;
                        }
                        &:first-child {
                            margin-top: 0px;
                        }
                    }
                }
            }
        }
    }
    > .org_search_hostory {
        margin-top: 0.7rem;
        width: 100%;
        box-sizing: border-box;
        > .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            > .left {
                min-width: 2.08rem;
                height: 0.42rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0px 0.2rem;
                font-size: 0.28rem;
                line-height: normal;
                padding: 0.02rem 0.2rem 0.02rem 0.16rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                border-top-right-radius: 0.28rem;
                border-bottom-right-radius: 0.28rem;
                background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
            }
            > .right {
                margin-right: 0.3rem;
                width: 0.4rem;
                height: 0.4rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
        > .content {
            margin-top: 0.3rem;
            padding: 0px 0.3rem;
            > .wrap {
                padding: 0.5rem 0px;
                background-color: #f9fafc;
                border-radius: 0.1rem;
                > .search_num {
                    padding: 0px 0.3rem;
                    > .content {
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.24rem;
                        font-weight: 500;
                        color: rgba(18, 28, 50, 1);
                    }
                }
                > .item_list {
                    margin-top: 0.46rem;
                    box-sizing: border-box;
                    > .item {
                        padding: 0.15rem 0px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 0.2rem;
                        font-weight: 500;
                        color: rgba(131, 137, 151, 1);
                        background-color: #fff;
                        > div {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        > .green {
                            color: #39c46d;
                        }
                        > .red {
                            color: #eb615e;
                        }
                    }
                    > .title {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 0.24rem;
                        font-weight: bold;
                        color: rgba(18, 28, 50, 1);
                        padding: 0.15rem 0px;
                        background-color: #fafcff;
                        > div {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }
        }
    }
    > .org_batch_search_hostory {
        margin-top: 0.7rem;
        width: 100%;
        box-sizing: border-box;
        > .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            > .left {
                min-width: 2.08rem;
                height: 0.42rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0px 0.2rem;
                font-size: 0.28rem;
                line-height: normal;
                padding: 0.02rem 0.2rem 0.02rem 0.16rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                border-top-right-radius: 0.28rem;
                border-bottom-right-radius: 0.28rem;
                background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
            }
            > .right {
                margin-right: 0.3rem;
                width: 0.4rem;
                height: 0.4rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
        > .content {
            margin-top: 0.3rem;
            padding: 0px 0.3rem;
            > .wrap {
                background-color: #f9fafc;
                border-radius: 0.1rem;
                > .item_list {
                    box-sizing: border-box;
                    > .item {
                        padding: 0.15rem 0px;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 0.2rem;
                        font-weight: 500;
                        color: rgba(131, 137, 151, 1);
                        > div {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        > .green {
                            color: #39c46d;
                        }
                        > .red {
                            color: #eb615e;
                        }
                    }
                    > .title {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        font-size: 0.24rem;
                        font-weight: bold;
                        color: rgba(18, 28, 50, 1);
                        padding: 0.15rem 0px;
                        background-color: #fafcff;
                        > div {
                            flex: 1;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                    }
                }
            }
        }
    }
    > .id_doubt {
        margin-top: 0.7rem;
        width: 100%;
        box-sizing: border-box;
        > .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            > .left {
                min-width: 2.08rem;
                height: 0.42rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0px 0.2rem;
                font-size: 0.28rem;
                line-height: normal;
                padding: 0.02rem 0.2rem 0.02rem 0.16rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                border-top-right-radius: 0.28rem;
                border-bottom-right-radius: 0.28rem;
                background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
            }
            > .right {
                margin-right: 0.3rem;
                width: 0.4rem;
                height: 0.4rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
            }
        }
        > .content {
            margin-top: 0.3rem;
            padding: 0px 0.3rem;
            > .wrap {
                background-color: #f9fafc;
                border-radius: 0.1rem;
                padding-bottom: 0.3rem;
                > .top {
                    box-sizing: border-box;
                    padding: 0px 0.3rem;
                    > .item_list {
                        box-sizing: border-box;
                        > .item {
                            padding: 0.15rem 0px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: rgba(131, 137, 151, 1);
                            background-color: #fff;
                            border-bottom: 1px solid #f9fafc;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                text-align: center;
                            }
                            > .green {
                                color: #39c46d;
                            }
                            > .red {
                                color: #eb615e;
                            }
                            &:last-child {
                                border-bottom: none;
                            }
                        }
                        > .title {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.24rem;
                            font-weight: bold;
                            color: rgba(18, 28, 50, 1);
                            padding: 0.15rem 0px;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }
                }
                > .zhanwei {
                    height: 0.3rem;
                    background-color: #fff;
                }
                > .center {
                    margin-top: 0.4rem;
                    box-sizing: border-box;
                    padding: 0px 0.3rem;
                    > .item_list {
                        box-sizing: border-box;
                        > .item {
                            padding: 0.15rem 0px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: rgba(131, 137, 151, 1);
                            background-color: #fff;
                            border-bottom: 1px solid #f9fafc;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                text-align: center;
                            }
                            > .green {
                                color: #39c46d;
                            }
                            > .red {
                                color: #eb615e;
                            }
                            &:last-child {
                                border-bottom: none;
                            }
                        }
                        > .title {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.24rem;
                            font-weight: bold;
                            color: rgba(18, 28, 50, 1);
                            padding: 0.15rem 0px;
                            background-color: #fafcff;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                text-align: center;
                            }
                            > .t1 {
                                padding-left: 0.1rem;
                            }
                        }
                    }
                }
                > .bottom {
                    margin-top: 0.4rem;
                    padding: 0px 0.3rem;
                    box-sizing: border-box;
                    > .item_list {
                        box-sizing: border-box;
                        > .item {
                            padding: 0.15rem 0px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: rgba(131, 137, 151, 1);
                            background-color: #fff;
                            border-bottom: 1px solid #f9fafc;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            > .green {
                                color: #39c46d;
                            }
                            > .red {
                                color: #eb615e;
                            }
                            &:last-child {
                                border-bottom: none;
                            }
                        }
                        > .title {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.24rem;
                            font-weight: bold;
                            color: rgba(18, 28, 50, 1);
                            padding: 0.15rem 0px;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }
                }
            }
        }
    }
    > .phone_doubt {
        margin-top: 0.7rem;
        width: 100%;
        box-sizing: border-box;
        > .title {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #fff;
            > .left {
                min-width: 2.08rem;
                height: 0.42rem;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0px 0.2rem;
                font-size: 0.28rem;
                line-height: normal;
                padding: 0.02rem 0.2rem 0.02rem 0.16rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                border-top-right-radius: 0.28rem;
                border-bottom-right-radius: 0.28rem;
                background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
            }
            > .right {
                margin-right: 0.3rem;
                width: 0.4rem;
                height: 0.4rem;
            }
        }
        > .content {
            margin-top: 0.3rem;
            padding: 0px 0.3rem;
            > .wrap {
                background-color: #f9fafc;
                border-radius: 0.1rem;
                padding-bottom: 0.3rem;
                > .top {
                    box-sizing: border-box;
                    padding: 0px 0.3rem;
                    > .item_list {
                        box-sizing: border-box;
                        > .item {
                            padding: 0.15rem 0px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: rgba(131, 137, 151, 1);
                            background-color: #fff;
                            border-bottom: 1px solid #f9fafc;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            > .green {
                                color: #39c46d;
                            }
                            > .red {
                                color: #eb615e;
                            }
                            &:last-child {
                                border-bottom: none;
                            }
                        }
                        > .title {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.24rem;
                            font-weight: bold;
                            color: rgba(18, 28, 50, 1);
                            padding: 0.15rem 0px;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }
                }
                > .zhanwei {
                    height: 0.3rem;
                    background-color: #fff;
                }
                > .center {
                    margin-top: 0.4rem;
                    box-sizing: border-box;
                    padding: 0px 0.3rem;
                    > .item_list {
                        box-sizing: border-box;
                        > .item {
                            padding: 0.15rem 0px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: rgba(131, 137, 151, 1);
                            background-color: #fff;
                            border-bottom: 1px solid #f9fafc;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            > .green {
                                color: #39c46d;
                            }
                            > .red {
                                color: #eb615e;
                            }
                            &:last-child {
                                border-bottom: none;
                            }
                        }
                        > .title {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.24rem;
                            font-weight: bold;
                            color: rgba(18, 28, 50, 1);
                            padding: 0.15rem 0px;
                            background-color: #fafcff;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                text-align: center;
                            }
                            > .t1 {
                                padding-left: 0.1rem;
                            }
                        }
                    }
                }
                > .bottom {
                    margin-top: 0.4rem;
                    padding: 0px 0.3rem;
                    box-sizing: border-box;
                    > .item_list {
                        box-sizing: border-box;
                        > .item {
                            padding: 0.15rem 0px;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.2rem;
                            font-weight: 500;
                            color: rgba(131, 137, 151, 1);
                            background-color: #fff;
                            border-bottom: 1px solid #f9fafc;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                            > .green {
                                color: #39c46d;
                            }
                            > .red {
                                color: #eb615e;
                            }
                            &:last-child {
                                border-bottom: none;
                            }
                        }
                        > .title {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            font-size: 0.24rem;
                            font-weight: bold;
                            color: rgba(18, 28, 50, 1);
                            padding: 0.15rem 0px;
                            > div {
                                flex: 1;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                            }
                        }
                    }
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
.instructions {
    padding: 0px 0.3rem;
    margin-top: 0.4rem;
   
    >.title{
        font-weight: 500;
        color: #4a4a4a;
        font-size: .30rem;
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
