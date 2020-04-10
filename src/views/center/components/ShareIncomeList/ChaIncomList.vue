<template>
    <div class="cha-income-list">
        <BaseScroll ref="base-scroll" @refresh="refresh" @loadMore="loadMore">
            <div class="list-top">
                <div class="content" ref="content" v-for="(item,index) in listData" :key="index">
                    <div
                        ref="date"
                        class="date"
                        v-if="$isDate(item.addtime,index,listData,'addtime')"
                    >{{item.addtime.split(" ")[0]}}</div>
                    <div class="item">
                        <div class="top">
                            <div class="name">{{item.title}}</div>
                            <div class="order">订单号：{{item.OrderSn}}</div>
                        </div>
                        <div class="bottom" ref="bottom">
                            <div class="left">
                                <img :src="item.HeadImg">
                                <div class="desc">
                                    <div class="mobile">手机号码: {{item.Mobile}}</div>
                                    <div class="addtime">{{item.addtime}}</div>
                                </div>
                            </div>
                            <div class="right">+{{item.Amount}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-bottom" v-if="isBaseEmpty">
                <base-bottom></base-bottom>
                <base-bottom></base-bottom>
                <base-empty url="/poster" text="您还没有征信收入呢"></base-empty>
            </div>
        </BaseScroll>
    </div>
</template>
<script>
import { getChaIncome } from '_api/center';
export default {
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
                    data = await getChaIncome({
                        num: this.num,
                        page: this.page
                    });
                    this.isBaseEmpty = false;
                    this.$refs['base-scroll'].setLoadText(true);
                    this.listData = data.data;
                    this.$refs['base-scroll'].stopRefresh();
                    this.$textTip('刷新成功');
                } else {
                    this.page = this.page + 1;
                    data = await getChaIncome({
                        num: this.num,
                        page: this.page
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
    }
};
</script>

<style lang="less" scoped>
.cha-income-list {
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
                    > .name {
                        font-size: 0.26rem;
                        color: #000;
                    }
                    > .order {
                        font-size: 0.24rem;
                        color: rgba(132, 142, 158, 1);
                    }
                }
                > .bottom {
                    display: flex;
                    height: 1.5rem;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #efefef;
                    > .left {
                        display: flex;
                        align-items: center;
                        > img {
                            width: 0.64rem;
                            height: 0.64rem;
                        }
                        > .desc {
                            margin-left: 0.26rem;
                            display: flex;
                            justify-content: center;
                            flex-direction: column;
                            > .mobile {
                                line-height: normal;
                                font-size: 0.25rem;
                                color: #000;
                            }
                            > .addtime {
                                line-height: normal;
                                margin-top: 0.15rem;
                                font-size: 0.24rem;
                                color: rgba(89, 104, 128, 0.8);
                            }
                        }
                    }
                    > .right {
                        display: flex;
                        flex-direction: column;
                        font-size: 0.34rem;
                        font-weight: bold;
                        color: #f96951;
                    }
                }
            }
        }
    }
}
</style>
