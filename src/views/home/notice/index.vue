<template>
    <div class="notice">
        <BaseNav>平台公告</BaseNav>
        <BaseTop></BaseTop>
        <BaseScroll class="content" ref="base-scroll" @refresh="refresh" @loadMore="loadMore">
            <div class="list-top">
                <div
                    class="item"
                    @click.stop="$goUrl(`/noticeDetail?id=${item.ID}`)"
                    v-for="item in listData"
                    :key="item.ID"
                >
                    <div class="top">{{item.AddTime}}</div>
                    <div class="bottom">
                        <div class="title">{{item.Title}}</div>
                        <div class="desc" v-html="item.Subtitle"></div>
                        <div class="see">
                            <div class="text">查看</div>
                            <img src="@images/arrow-6.png">
                        </div>
                    </div>
                </div>
            </div>
            <div class="list-bottom" v-if="isBaseEmpty">
                <base-bottom style="background:#f6f7fb"></base-bottom>
                <base-bottom style="background:#f6f7fb"></base-bottom>
                <base-empty></base-empty>
            </div>
        </BaseScroll>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getContent } from '_api/func';
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
    async mounted() {
        try {
            await this.$waitTime(1000);
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
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
                    data = await getContent({
                        type: 2,
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
                    data = await getContent({
                        type: 2,
                        num: this.num,
                        page: this.page
                    });
                    this.listData = this.listData.concat(data.data);
                    done();
                }
                if (data.pages == 1) {
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
    beforeRouteEnter(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.style.backgroundColor = '#fff';
        next();
    }
};
</script>
<style lang="less" scoped>
.notice {
    > .content {
        position: fixed;
        top: 1.05rem;
        bottom: 0px;
        left: 0px;
        right: 0px;
        .list-top {
            > .item {
                padding: 0px 0.3rem;
                > .top {
                    height: 0.6rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #8b8b8b;
                    font-size: 0.24rem;
                }
                > .bottom {
                    overflow: hidden;
                    border-radius: 0.1rem;
                    background-color: #fff;
                    > .title {
                        margin-top: 0.39rem;
                        font-size: 0.3rem;
                        padding: 0px 0.3rem;
                        color: #000;
                    }
                    > .desc /deep/ {
                        margin-top: 0.26rem;
                        font-size: 0.24rem;
                        color: #6e6e6e;
                        line-height: 1.5;
                        padding: 0px 0.3rem;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                    > .see {
                        margin-top: 0.34rem;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 0.78rem;
                        border-top: 1px solid #f4f4f4;
                        padding: 0 0.3rem;
                        > .text {
                            font-size: 0.24rem;
                            color: #8b8b8b;
                        }
                        > img {
                            width: 0.1rem;
                            height: 0.2rem;
                        }
                    }
                }
            }
        }
    }
}
</style>

