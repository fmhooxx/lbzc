<template>
    <div class="detail-list">
        <BaseScroll ref="base-scroll" @refresh="refresh" @loadMore="loadMore">
            <div class="list-top">
                <div class="content" ref="content" v-for="(item,index) in listData" :key="index">
                    <div
                        ref="date"
                        class="date"
                        v-if="$isDate(item.Addtime,index,listData,'Addtime')"
                    >{{item.Addtime.split(" ")[0]}}</div>
                    <div class="item">
                        <div class="top">
                            <div class="left">
                                <img :src="item.Logurl" />
                                <div class="name">{{item.goodname|threePoints(9)}}</div>
                            </div>
                            <div class="right">订单号：{{item.OrderSn}}</div>
                        </div>
                        <div class="center">
                            <div class="userName">
                                <div class="top">姓名</div>
                                <div class="bottom">{{item.username}}</div>
                            </div>
                            <div class="mobileNum">
                                <div class="top">手机号</div>
                                <div class="bottom">{{item.Mobile}}</div>
                            </div>
                            <div class="reason">
                                <div class="top">{{state|stateName(type)}}</div>
                                <div
                                    class="bottom"
                                    :style="state|stateColor"
                                >{{state|stateVal(item.Ymoney,type,item.remark)}}</div>
                            </div>
                        </div>
                        <div class="bottom">
                            <div class="left">
                                <img src="@images/icon-28.png" />
                                <div class="time">{{item.Addtime}}</div>
                            </div>
                            <div class="right">{{item.Settletime}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-bottom" v-if="isBaseEmpty">
                <base-bottom></base-bottom>
                <base-bottom></base-bottom>
                <base-empty url="/poster" :text="tipText"></base-empty>
            </div>
        </BaseScroll>
    </div>
</template>
<script>
import { getShareIncome } from '_api/center';
export default {
    props: {
        type: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            page: 0,
            num: 30,
            listData: [],
            isBaseEmpty: false
        };
    },
    methods: {
        refresh(done) {
            this.getList(done, true);
        },
        loadMore(done) {
            this.getList(done);
        },
        async getList(done, refresh) {
            try {
                let data;
                if (refresh) {
                    this.page = 1;
                    data = await getShareIncome({
                        num: this.num,
                        page: this.page,
                        Itype: this.type == 'dai' ? 1 : 2,
                        isdab: this.stateVal,
                        sign: 1
                    });
                    this.isBaseEmpty = false;
                    this.$refs['base-scroll'].setLoadText(true);
                    this.listData = data.data;
                    this.$refs['base-scroll'].stopRefresh();
                    this.$textTip('刷新成功');
                } else {
                    this.page = this.page + 1;
                    data = await getShareIncome({
                        num: this.num,
                        page: this.page,
                        Itype: this.type == 'dai' ? 1 : 2,
                        isdab: this.stateVal,
                        sign: 1
                    });
                    this.listData = this.listData.concat(data.data);
                    done();
                }
                if (data.total_page == 1) {
                    this.$refs['base-scroll'].stopLoad();
                }
            } catch (err) {
                this.$refs['base-scroll'].stopRefresh();
                this.$refs['base-scroll'].stopLoad();
                if (this.listData.length == 0) {
                    this.$refs['base-scroll'].setLoadText();
                    this.isBaseEmpty = true;
                }
                if (arguments.length == 2) {
                    this.$textTip('刷新成功');
                }
                if (!arguments.length) {
                    throw err;
                }
            }
        }
    },
    computed: {
        stateVal() {
            if (this.state == 'commit') {
                return 0;
            } else if (this.state == 'useless') {
                return 2;
            } else {
                return 1;
            }
        },
        tipText() {
            if (this.type == 'dai') {
                if (this.state == 'commit') {
                    return '您还没有待达标订单呢';
                } else if (this.state == 'useless') {
                    return '您还没有已失效订单呢';
                } else {
                    return '您还没有已达标订单呢';
                }
            } else {
                if (this.state == 'commit') {
                    return '您还没有已提交订单呢';
                } else if (this.state == 'useless') {
                    return '您还没有已失效订单呢';
                } else {
                    return '您还没有已结算订单呢';
                }
            }
        }
    }
};
</script>
<style lang="less" scoped>
.detail-list {
    height: 100%;
    .list-top {
        > .content {
            > .date {
                height: 0.7rem;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: #f6f7fb;
                font-size: 0.22rem;
                color: #a0a0a0;
            }
            > .item {
                padding: 0px 0.3rem;
                > .top {
                    height: 0.78rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px dashed #e7e8ea;
                    > .left {
                        display: flex;
                        align-items: center;
                        > img {
                            flex-shrink: 0;
                            width: 0.4rem;
                            height: 0.4rem;
                        }
                        > .name {
                            margin-left: 0.2rem;
                            font-size: 0.26rem;
                            color: #000;
                        }
                    }
                    > .right {
                        font-size: 0.24rem;
                        color: #848e9e;
                    }
                }
                > .center {
                    height: 1.5rem;
                    display: flex;
                    justify-content: space-around;
                    > div {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        position: relative;
                        > .top {
                            line-height: normal;
                            font-size: 0.23rem;
                            color: #848e9e;
                        }
                        > .bottom {
                            line-height: normal;
                            margin-top: 0.15rem;
                            font-size: 0.24rem;
                            color: #000;
                        }
                        &:after {
                            content: '';
                            position: absolute;
                            top: 50%;
                            right: 0px;
                            transform: translateY(-50%);
                            width: 1px;
                            height: 0.8rem;
                            background-color: #e7e8ea;
                        }
                    }
                    > .reason {
                        &:after {
                            width: 0px;
                        }
                    }
                }
                > .bottom {
                    display: flex;
                    height: 0.8rem;
                    align-items: center;
                    justify-content: space-between;
                    > .left {
                        display: flex;
                        align-items: center;
                        > img {
                            flex-shrink: 0;
                            width: 0.24rem;
                            height: 0.24rem;
                        }
                        > .time {
                            margin-left: 0.2rem;
                            font-size: 0.26rem;
                            color: #848e9e;
                        }
                    }
                    > .right {
                        padding: 0px 0.2rem;
                        height: 0.34rem;
                        display: flex;
                        line-height: normal;
                        align-items: center;
                        justify-content: center;
                        background: rgba(85, 98, 236, 0.1);
                        color: #5562ec;
                        font-size: 0.22rem;
                    }
                }
            }
        }
    }
}
</style>
