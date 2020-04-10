<template>
    <div class="post-comment">
        <transition
            appear
            appear-class="enter"
            appear-active-class="done"
            enter-class="enter"
            enter-active-class="done"
        >
            <div v-if="listData.length>0" class="list-content">
                <BasePlaceholder style="margin:0.3rem 0px"></BasePlaceholder>
                <div class="item" v-for="(item,index) in listData" :key="index">
                    <div class="content">
                        <div class="top">
                            <div class="left">
                                <img :src="item.headImg">
                                <div class="base">
                                    <div class="name">蓝冰众创-{{item.jobNum}}</div>
                                    <div class="date">{{item.dateline}}</div>
                                </div>
                            </div>
                            <div class="right">{{item.position}}</div>
                        </div>
                        <div class="center">
                            <PostReference
                                v-if="item.replyContent&&item.postContent"
                                :postData="item"
                            ></PostReference>
                            <div
                                class="comment"
                                v-html="commentShow(item.replyContent,item.postContent)"
                            ></div>
                        </div>
                        <div class="bottom">
                            <div @click.stop="reply(item)">回复</div>
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
            <BaseNoData v-else style="margin:0.4rem 0px">暂无评论</BaseNoData>
        </transition>
    </div>
</template>
<script>
import { getPostComment } from '_api/bbs';
import PostReference from './PostReference';
export default {
    components: {
        PostReference
    },
    props: {
        postData: {
            type: Object,
            default: null,
            required: true
        }
    },
    data() {
        return {
            nomore: false,
            page: 0,
            num: 30,
            done: false,
            listData: []
        };
    },
    mounted() {
        this.getList();
    },
    methods: {
        async getList() {
            this.done = false;
            this.page = this.page + 1;
            try {
                let data = await getPostComment({
                    tid: this.postData.tid,
                    fid: this.postData.fid,
                    page: this.page,
                    pagesize: this.num
                });
                this.listData = this.listData.concat(data.data);
                this.done = true;
                if (data.pages <= 1) {
                    this.nomore = true;
                    this.done = false;
                }
            } catch (err) {
                this.nomore = true;
                this.done = false;
            }
        },
        dropUp() {
            this.getList();
        },
        // replyContent有的话 返回replyContent，replyContent没的话，返回postContent
        commentShow(replyContent, postContent) {
            let res = replyContent ? replyContent : postContent;
            return res;
        },
        reply(item) {
            this.$store.dispatch('bbs/SetReplySomeOne', item);
        }
    }
};
</script>

<style lang="less" scoped>
.enter {
    opacity: 0;
    transform: translateY(0.5rem);
    background-color: #fff;
}
.done {
    transition: all 1s ease;
    transition-delay: 0.2s;
}
.post-comment {
    position: relative;
    > .list-content {
        > .item {
            padding: 0px 0.3rem;
            > .content {
                padding-top: 0.3rem;
                padding-bottom: 0.3rem;
                border-bottom: 1px solid #e9e9e9;
                > .top {
                    display: flex;
                    align-items: stretch;
                    justify-content: space-between;
                    .left {
                        display: flex;
                        align-items: center;
                        img {
                            width: 0.7rem;
                        }
                        .base {
                            margin-left: 0.2rem;
                            div {
                                font-size: 0.28rem;
                                line-height: normal;
                            }
                            .name {
                                color: #5f7ea9;
                            }
                            .date {
                                color: #c5c5c5;
                                margin-top: 0.1rem;
                            }
                        }
                    }
                    .right {
                        transform: translateY(0.04rem);
                        align-self: flex-start;
                        display: flex;
                        align-items: center;
                        color: #c5c5c5;
                        font-size: 0.28rem;
                    }
                }
                > .center {
                    margin-top: 0.2rem;
                    > .comment {
                        padding: 0.3rem 0px;
                        line-height: normal;
                        min-height: 1rem;
                        font-size: 0.28rem;
                    }
                }
                > .bottom {
                    margin-top: 0.3rem;
                    display: flex;
                    justify-content: flex-end;
                    > div {
                        color: #000;
                        font-size: 0.3rem;
                    }
                }
            }
        }
    }
}
</style>

