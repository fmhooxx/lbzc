<template>
    <div class="cha-record">
        <base-nav>查询记录</base-nav>
        <base-top></base-top>
        <transition
            appear
            appear-class="enter"
            appear-active-class="done"
            enter-class="enter"
            enter-active-class="done"
        >
            <div class="list" v-if="listData.length>0">
                <div class="content" v-for="(item,index) in listData" :key="item.ID">
                    <div
                        class="date"
                        v-if="dateFilter(item.addtime,index)"
                    >{{item.addtime.split(" ")[0]}}</div>
                    <div class="list-item">
                        <div
                            class="item"
                            @click.stop="visit(item)"
                            :class="{line:!dateFilter(item.addtime,index)}"
                        >
                            <div class="listItemTop">
                                <span class="proTitle">{{item.title}}</span>
                                <span class="date">{{item.addtime}}</span>
                            </div>
                            <div class="listItemBottom">
                                <div class="listItemBottomItem">
                                    <span class="cellName">姓名</span>
                                    <span class="cellValue">{{item.TrueName}}</span>
                                </div>
                                <div class="listItemBottomItem">
                                    <span class="cellName">手机号</span>
                                    <span class="cellValue">{{item.Mobile}}</span>
                                </div>
                                <div class="listItemBottomItem">
                                    <span
                                        class="orderStatusName"
                                        :style="{color:signColorFilter(item.sign)}"
                                    >{{signTextFilter(item.sign)}}</span>
                                    <span
                                        class="orderStatusValue"
                                        :class="{orderStatusValue_disable:item.sign==3}"
                                    >详情</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <base-drop-up
                    v-if="listData.length>0"
                    :done="done"
                    :nomore="nomore"
                    @dropUp="dropUp"
                ></base-drop-up>
            </div>
        </transition>
        <div v-if="isBaseEmpty">
            <base-bottom></base-bottom>
            <base-bottom></base-bottom>
            <base-empty>
                <div style="color:#a2a2a2;text-align:center;">您还没有网黑查询记录</div>
            </base-empty>
        </div>
        <base-pay
            v-if="isBasePay"
            :sec="true"
            :isBasePay.sync="isBasePay"
            :arg="arg"
            :orderId="orderId"
        ></base-pay>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import { getRecordList } from '_api/cha';
export default {
    data: () => {
        return {
            nomore: false,
            page: 0,
            num: 30,
            done: false,
            listData: [],
            isBaseEmpty: false,
            isBaseLoadPage: true,
            isBasePay: false,
            arg: null,
            orderId: ''
        };
    },
    async mounted() {
        try {
            this.getList();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    computed: {
        from() {
            // from: 1：首页 2：融客店
            let leavel = this.$getUser().Mtype;
            return leavel >= 2 ? 1 : 2;
        }
    },
    methods: {
        async getList() {
            this.done = false;
            this.page = this.page + 1;
            try {
                let data = await getRecordList({
                    type: this.from, //1：首页 2：融客店
                    page: this.page,
                    num: this.num
                });
                this.listData = this.listData.concat(data.data);
                this.done = true;
                if (data.total_page == 1) this.nomore = true;
            } catch (err) {
                if (this.listData.length == 0) this.isBaseEmpty = true;
                this.nomore = true;
            }
        },
        dropUp() {
            this.getList();
        },
        // 查看报告详情页面
        visit(item) {
            if (item.sign == 3) {
                return this.$msg.fail('订单已失效');
            }
            if (item.sign == 2) {
                this.isBasePay = true;
                this.orderId = item.ID;
                return (this.arg = item);
            }
            let arg = encodeURIComponent(JSON.stringify(item));
            this.$goUrl(`/chaZhengReport?arg=${arg}`);
        },
        // 是否显示日期，循环遍历之前的数据，若没有与自己一样的日期则显示本组日期
        dateFilter(time, index) {
            time = time.split(' ')[0];
            for (var i = 0; i < index; i++) {
                if (this.listData[i].addtime.split(' ')[0] == time) {
                    return false;
                }
            }
            return true;
        },
        // sign ：1：已支付 2：未支付 3 ：已失效 4:查询失败 5：已付款未查询
        signTextFilter(id) {
            if (id == 1) {
                return '已付款';
            } else if (id == 2) {
                return '待付款';
            } else if (id == 3) {
                return '已失效';
            } else if (id == 4) {
                return '查询失败';
            } else {
                return '已付款未查询';
            }
        },
        signColorFilter(id) {
            if (id == 1) {
                return '#5E72F0';
            } else if (id == 2) {
                return '#F96951';
            } else {
                return '#FF9F5D';
            }
        }
    }
};
</script>
<style lang="less" scoped>
.enter {
    opacity: 0;
    transform: translateY(0.5rem);
}
.done {
    transition: all 1s ease;
    transition-delay: 0.2s;
}
.cha-record {
    background-color: #fff;
    > .list {
        > .content {
            > .date {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 0.7rem;
                background-color: #f6f7fb;
                font-size: 0.22rem;
                font-weight: 500;
                color: rgba(160, 160, 160, 1);
            }
            > .list-item {
                width: 100%;
                box-sizing: border-box;
                margin-top: 0.44rem;
                padding: 0px 0.3rem;
                > .item {
                    height: 2.28rem;
                    background: rgba(255, 255, 255, 1);
                    &.line {
                        padding-top: 0.2rem;
                        border-top: 1px solid #e6e6e6;
                    }

                    > .listItemTop {
                        height: 0.8rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        box-sizing: border-box;
                        > .proTitle {
                            font-size: 0.27rem;
                            color: rgba(0, 0, 0, 1);
                        }
                        > .date {
                            font-size: 0.23rem;
                            font-weight: 500;
                            color: rgba(132, 142, 158, 1);
                        }
                    }
                    > .listItemBottom {
                        height: 1.48rem;
                        border-top: 1px dashed #e7e8ea;
                        display: flex;
                        justify-content: space-around;
                        > .listItemBottomItem {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            position: relative;
                            > .cellName {
                                font-size: 0.23rem;
                                color: rgba(132, 142, 158, 1);
                            }
                            > .cellValue {
                                margin-top: 0.23rem;
                                font-size: 0.24rem;
                                color: rgba(0, 0, 0, 1);
                            }
                            > .orderStatusName {
                                font-size: 0.23rem;
                                font-weight: bold;
                                color: rgba(249, 105, 81, 1);
                            }
                            > .orderStatusValue {
                                margin-top: 0.23rem;
                                width: 1.12rem;
                                height: 0.38rem;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                background-image: linear-gradient(to right, #5d70f0, #83b6fb);
                                border-radius: 0.19rem;
                                font-size: 0.23rem;
                                font-weight: bold;
                                color: rgba(255, 255, 255, 1);
                            }
                            > .orderStatusValue_disable {
                                background-image: linear-gradient(to right, #83848a, #d0d7e0);
                            }
                            &:after {
                                content: '';
                                position: absolute;
                                top: 50%;
                                right: 0px;
                                transform: translateY(-50%);
                                width: 1px;
                                height: 0.72rem;
                                background-color: #e7e8ea;
                            }
                            &:last-child:after {
                                width: 0px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>

