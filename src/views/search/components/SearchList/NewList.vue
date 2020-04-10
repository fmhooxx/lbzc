<template>
    <div class="new-list">
        <BaseScroll ref="base-scroll" @refresh="refresh" @loadMore="loadMore">
            <div class="list-top">
                <div class="content" v-for="(item,index) in listData" :key="index">
                    <div class="item" @click.stop="go(item.ID,item.cate)">
                        <div class="left">
                            <div class="title" v-html="item.Title"></div>
                            <div class="desc">
                                <span class="date">{{item.Addtime}}</span>
                                <span class="number">{{item.ViewCounk}} 阅读</span>
                            </div>
                        </div>
                        <img class="right" :src="item.CoverImage">
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
            type: 3,
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
                if (data.page_total == 1) {
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
        go(id, cate) {
            this.$goUrl(`/newDetail?id=${id}&cate=${cate}`);
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
.new-list {
    height: 100%;
    .list-top {
        > .content {
            padding: 0px 0.3rem;
            > .item {
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid rgb(244, 245, 247);
                > .left {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    > .title {
                        width: 3.94rem;
                        font-size: 0.26rem;
                        color: #000;
                        line-height: normal;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    > .desc {
                        display: flex;
                        margin-top: 0.4rem;
                        > .date {
                            font-size: 0.24rem;
                            color: rgba(105, 114, 126, 1);
                        }
                        > .number {
                            font-size: 0.24rem;
                            margin-left: 0.3rem;
                            color: rgba(105, 114, 126, 1);
                        }
                    }
                }
                > .right {
                    width: 2.5rem;
                    height: 1.15rem;
                    border-radius: 0.1rem;
                }
            }
        }
    }
}
</style>
