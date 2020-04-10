<template>
    <div class="list">
        <BasePull @loadMore="loadMore">
            <div class="list-top">
                <div class="content" v-for="(item,index) in listData" :key="`m_${index}`">
                    <div
                        class="date"
                        v-if="$isDate(item.UpdateTime,index,listData)"
                    >{{item.UpdateTime.split(" ")[0]}}</div>
                    <div class="item">
                        <div class="content">
                            <div class="left">
                                <img :src="item.HeadImg" />
                                <div class="desc">
                                    <div class="top">
                                        <div class="id">工号: {{item.ID}}</div>
                                        <BaseGrade
                                            style="marginLeft:0.4rem"
                                            :mtype="item.Mtype"
                                            :grade="item.Mtypename"
                                        ></BaseGrade>
                                    </div>
                                    <div class="bottom">{{item.UpdateTime}}</div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="amount">+{{item.Amount}}</div>
                                <div class="level">{{item.level}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasePull>
    </div>
</template>
<script>
import { getIncome } from '_api/center';
export default {
    data() {
        return {
            page: 0,
            num: 30,
            listData: [],
            isBaseEmpty: false,
            isBaseLoadPage: true
        };
    },
    methods: {
        pull(done) {
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
                    data = await getIncome({
                        num: this.num,
                        page: this.page
                    });
                    this.isBaseEmpty = false;
                    this.listData = data.data;
                    done();
                    this.$textTip('刷新成功');
                } else {
                    this.page = this.page + 1;
                    data = await getIncome({
                        num: this.num,
                        page: this.page
                    });
                    this.listData = this.listData.concat(data.data);
                    done();
                }
                if (data.total_page == 1) {
                    done(true);
                }
            } catch (err) {
                done(true);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.list {
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
                > .content {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 1.7rem;
                    border-bottom: 1px solid #efefef;
                    > .left {
                        display: flex;
                        align-items: center;
                        > img {
                            flex-shrink: 0;
                            width: 0.64rem;
                            height: 0.64rem;
                        }
                        > .desc {
                            margin-left: 0.26rem;
                            > .top {
                                display: flex;
                                > .id {
                                    font-size: 0.25rem;
                                    color: #000;
                                    line-height: normal;
                                }
                            }
                            > .bottom {
                                margin-top: 0.15rem;
                                font-size: 0.24rem;
                                color: rgba(89, 104, 128, 0.8);
                            }
                        }
                    }
                    > .right {
                        > .amount {
                            text-align: right;
                            font-size: 0.34rem;
                            font-weight: bold;
                            color: #f96951;
                        }
                        > .level {
                            text-align: right;
                            margin-top: 0.12rem;
                            font-size: 0.24rem;
                            color: #848e9e;
                        }
                    }
                }
            }
        }
    }
}
</style>

