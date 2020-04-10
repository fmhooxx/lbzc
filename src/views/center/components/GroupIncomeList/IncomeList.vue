<template>
    <div class="income-list">
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
                            <div class="name">{{item.Name}}</div>
                            <div class="order">订单号：{{item.orderSru}}</div>
                        </div>
                        <div class="bottom" ref="bottom">
                            <div class="left">
                                <img :src="item.Logurl">
                                <div class="desc">
                                    <div class="top">
                                        <img :src="item.Mtype|ruleImageFilter" alt>
                                        <div class="id">工号: {{item.ID}}</div>
                                    </div>
                                    <div class="bottom">{{item.Addtime}}</div>
                                </div>
                            </div>
                            <div class="right">+{{item.bonusMoney}}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="list-bottom" v-if="isBaseEmpty">
                <base-bottom></base-bottom>
                <base-bottom></base-bottom>
                <base-empty url="/poster" :text="type=='dai'?'您还没有网贷收入呢':'您还没有信用卡收入呢'"></base-empty>
            </div>
        </BaseScroll>
    </div>
</template>
<script>
import { getGroupIncome } from '_api/center';
export default {
    props: {
        type: {
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
                    data = await getGroupIncome({
                        num: this.num,
                        page: this.page,
                        Srutype: this.type == 'dai' ? 2 : 3
                    });
                    this.isBaseEmpty = false;
                    this.$refs['base-scroll'].setLoadText(true);
                    this.listData = data.data;
                    this.$refs['base-scroll'].stopRefresh();
                    this.$textTip('刷新成功');
                } else {
                    this.page = this.page + 1;
                    data = await getGroupIncome({
                        num: this.num,
                        page: this.page,
                        Srutype: this.type == 'dai' ? 2 : 3
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
        },
        // 去除底部实线
        async removeBorder() {
            await this.$nextTick(() => {
                let date = this.$refs['date'];
                if (!date) return;
                if (Object.prototype.toString.call(date) == '[object Array]') {
                    date.forEach(item => {
                        let dom = item.parentElement;
                        let preDom = dom.previousElementSibling;
                        if (preDom && preDom.className == 'content') {
                            let bottom = preDom.getElementsByClassName('bottom');
                            bottom[0].style.border = 'none';
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.income-list {
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
                            > .top {
                                display: flex;
                                align-items: center;
                                > img {
                                    width: 0.34rem;
                                    height: 0.34rem;
                                }
                                > .id {
                                    margin-left: 0.14rem;
                                    font-size: 0.25rem;
                                    color: #000;
                                    line-height: normal;
                                }
                            }
                            > .bottom {
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
