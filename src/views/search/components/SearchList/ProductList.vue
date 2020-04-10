<template>
    <div class="product-list">
        <BaseScroll ref="base-scroll" @refresh="refresh" @loadMore="loadMore">
            <div class="list-top">
                <div class="content" ref="content" v-for="(item,index) in listData" :key="index">
                    <div v-if="item.Itype==1" class="dai" @click.stop="go(item.Itype,item.ID)">
                        <img class="left" :src="item.Logurl" />
                        <div class="right">
                            <div class="text-left">
                                <div class="top">
                                    <div class="name">{{item.Name}}</div>
                                    <div class="number">申请{{item.AppNumbs}}人</div>
                                </div>
                                <div class="bottom">{{item.Intro|threePoints(12)}}</div>
                            </div>
                            <div class="text-right">
                                <div class="top" v-html="rateFilter(item.ReferMoney)"></div>
                                <div class="bottom">
                                    <div>立即推广</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="item.Itype==2" class="card" @click.stop="go(item.Itype,item.ID)">
                        <div class="left">
                            <img :src="item.Logurl" />
                            <div class="text">
                                <div class="name">{{item.Name}}</div>
                                <div class="intro">{{item.Intro|threePoints(12)}}</div>
                                <div class="amount">
                                    <span>{{item.AppNumbs}}</span>人已申请
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="top" v-html="rateFilter(item.ReferMoney)"></div>
                            <span class="bottom">立即申请</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-bottom" v-if="isBaseEmpty">
                <base-bottom></base-bottom>
                <base-bottom></base-bottom>
                <base-empty></base-empty>
            </div>
        </BaseScroll>
        <BaseLoad v-if="isBaseload"></BaseLoad>
    </div>
</template>
<script>
import { getSearch } from '_api/search';
export default {
    props: {
        keywords: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            page: 0,
            num: 30,
            listData: [],
            type: 1,
            isBaseEmpty: false,
            isBaseload: false
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
                    data = await getSearch({
                        num: this.num,
                        page: this.page,
                        type: this.type,
                        keywords: this.keywords
                    });
                    this.isBaseEmpty = false;
                    this.$refs['base-scroll'].setLoadText(true);
                    this.listData = data.data;
                    this.$refs['base-scroll'].stopRefresh();
                    this.$textTip('刷新成功');
                } else {
                    this.page = this.page + 1;
                    data = await getSearch({
                        num: this.num,
                        page: this.page,
                        type: this.type,
                        keywords: this.keywords
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
                    this.listData = [];
                    this.$refs['base-scroll'].setLoadText();
                    this.isBaseEmpty = true;
                }
                if (!arguments.length) {
                    throw err;
                }
            }
        },
        rateFilter(str) {
            if (!str) return '';
            let arr = str.split('');
            let reg = /^[0-9]+.?[0-9]*$/;
            let domStr = '';
            for (var i = 0; i < arr.length; i++) {
                if (reg.test(arr[i])) {
                    domStr = domStr + `<i>${arr[i]}</i>`;
                } else {
                    domStr = domStr + `${arr[i]}`;
                }
            }
            return domStr;
        },
        go(type, id) {
            this.$goUrl(`/shareDetail?id=${id}&type=${type}`);
        }
    },
    watch: {
        keywords: function(n, o) {
            if (!this.$isNull(o)) {
                this.$refs['base-scroll'].startRefresh();
            }
        }
    }
};
</script>

<style lang="less" scoped>
.product-list {
    height: 100%;
    .list-top {
        > .content {
            padding: 0px 0.3rem;
            > .dai {
                height: 1.97rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgb(244, 245, 247);
                > .left {
                    flex-shrink: 0;
                    width: 0.81rem;
                    height: 0.81rem;
                }
                > .right {
                    flex: 1;
                    display: flex;
                    justify-content: space-between;
                    margin-left: 0.29rem;
                    height: 100%;
                    > .text-left {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        > .top {
                            display: flex;
                            align-items: center;
                            > .name {
                                line-height: normal;
                                font-size: 0.34rem;
                                color: rgba(41, 47, 61, 1);
                            }
                            > .number {
                                margin-left: 0.19rem;
                                font-size: 0.19rem;
                                color: #f96e4c;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                height: 0.34rem;
                                padding: 0px 0.18rem;
                                border: 1px solid #f96e4c;
                                border-radius: 0.3rem;
                                white-space: nowrap;
                                line-height: normal;
                            }
                        }
                        > .bottom {
                            line-height: normal;
                            margin-top: 0.19rem;
                            font-size: 0.23rem;
                            color: rgba(144, 144, 144, 1);
                        }
                    }
                    > .text-right {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        > .top {
                            display: flex;
                            align-items: baseline;
                            color: #5461eb;
                            font-size: 0.23rem;
                            /deep/ i {
                                color: #5461eb;
                                font-size: 0.36rem;
                                font-weight: bold;
                            }
                        }
                        > .bottom {
                            margin-top: 0.08rem;
                            width: 100%;
                            display: flex;
                            justify-content: flex-end;
                            > div {
                                white-space: nowrap;
                                display: flex;
                                align-items: center;
                                height: 0.45rem;
                                padding: 0px 0.33rem;
                                font-size: 0.23rem;
                                color: #fff;
                                border-radius: 0.3rem;
                                background-image: linear-gradient(
                                    to right bottom,
                                    #4564f2,
                                    #8cc7fe
                                );
                            }
                        }
                    }
                }
                &:last-child {
                    > .right {
                        border-bottom: none;
                    }
                }
            }
            > .card {
                height: 1.97rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgb(241, 241, 241);
                > .left {
                    display: flex;
                    align-items: center;
                    > img {
                        width: 1.5rem;
                        height: 1.09rem;
                    }
                    > .text {
                        margin-left: 0.25rem;
                        > .name {
                            line-height: normal;
                            font-size: 0.32rem;
                            color: rgba(41, 47, 61, 1);
                            overflow: hidden;
                        }
                        > .intro {
                            line-height: normal;
                            font-size: 0.23rem;
                            color: #909090;
                            margin: 0.1rem 0rem;
                        }
                        > .amount {
                            line-height: normal;
                            font-size: 0.23rem;
                            color: #909090;
                            > span {
                                color: #ff6927;
                            }
                        }
                    }
                }
                > .right {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    > .top {
                        display: flex;
                        align-items: baseline;
                        color: #5461eb;
                        font-size: 0.23rem;
                        /deep/ i {
                            color: #5461eb;
                            font-size: 0.36rem;
                            font-weight: bold;
                        }
                    }
                    > .bottom {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        margin-top: 0.1rem;
                        height: 0.45rem;
                        padding: 0px 0.33rem;
                        font-size: 0.23rem;
                        color: #fff;
                        border-radius: 0.3rem;
                        background-image: linear-gradient(to right bottom, #4564f2, #8cc7fe);
                        white-space: nowrap;
                        line-height: normal;
                    }
                }
            }
        }
    }
}
</style>
