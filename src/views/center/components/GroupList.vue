<template>
    <div class="group-list">
        <BaseScroll ref="base-scroll" @refresh="refresh" @loadMore="loadMore">
            <div class="list-top" v-if="listData.length>0">
                <div class="total">{{totalNumer}}</div>
                <div class="content" v-for="(item,index) in listData" :key="`m_${index}`">
                    <div
                        class="date"
                        v-if="$isDate(item.RegTime,index,listData,'RegTime')"
                    >{{item.RegTime.split(" ")[0]}}</div>
                    <div class="item">
                        <div class="content">
                            <div class="left">
                                <img :src="item.HeadImg">
                                <div class="desc">
                                    <div class="top">
                                        <div class="id">工号: {{item.ID}}</div>
                                        <BaseGrade
                                            style="marginLeft:0.4rem"
                                            :mtype="item.Mtype"
                                            :grade="item.level_name"
                                        ></BaseGrade>
                                    </div>
                                    <div class="bottom">{{item.RegTime}}</div>
                                </div>
                            </div>
                            <div class="right">
                                <img @click.stop="$sendMsg(`sms:${item.Mobile}`)" class="message" src="@images/icon-32.png">
                                <img @click.stop="$callPhone(`sms:${item.Mobile}`)" class="mobile" src="@images/icon-33.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-bottom" v-if="isBaseEmpty">
                <base-bottom></base-bottom>
                <base-bottom></base-bottom>
                <base-empty type="group" url="/poster" text="您还没有小伙伴呢" btnText="去收徒"></base-empty>
            </div>
        </BaseScroll>
    </div>
</template>
<script>
import { getGroupList, getSonGroup } from '_api/center';
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
            totalNum: 0,
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
                    if (this.type == 'direct') {
                        data = await getGroupList({
                            num: this.num,
                            page: this.page
                        });
                    } else {
                        data = await getSonGroup({
                            num: this.num,
                            page: this.page
                        });
                    }
                    this.isBaseEmpty = false;
                    this.$refs['base-scroll'].setLoadText(true);
                    this.listData = data.data;
                    this.totalNum = data.total_num;
                    this.$refs['base-scroll'].stopRefresh();
                    this.$textTip('刷新成功');
                } else {
                    this.page = this.page + 1;
                    if (this.type == 'direct') {
                        data = await getGroupList({
                            num: this.num,
                            page: this.page
                        });
                    } else {
                        data = await getSonGroup({
                            num: this.num,
                            page: this.page
                        });
                    }
                    this.listData = this.listData.concat(data.data);
                    this.totalNum = data.total_num;
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
        totalNumer() {
            if (this.type == 'direct') {
                return `直推团队（${this.totalNum}人）`;
            } else {
                return `二级团队（${this.totalNum}人）`;
            }
        }
    }
};
</script>
<style lang="less">
.group-list {
    height: 100%;
    .list-top {
        > .total {
            height: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #757373;
            font-size: 0.3rem;
        }
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
                        display: flex;
                        align-items: center;
                        > .message {
                            width: 0.64rem;
                            height: 0.64rem;
                        }
                        > .mobile {
                            margin-left: 0.2rem;
                            width: 0.64rem;
                            height: 0.64rem;
                        }
                    }
                }
            }
        }
    }
}
</style>

