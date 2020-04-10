<template>
    <div class="post-reply" ref="post-reply">
        <div class="func-1" v-if="!isTextarea" @click.stop="showReplyInput">
            <div class="left">
                <img src="@images/icon-44.png" />
                <div class="text">我也说一句</div>
            </div>
            <div class="right">
                <img v-if="!isCollection" @click.stop="collection" src="@images/icon-42.png" />
                <img v-if="isCollection" @click.stop="collection" src="@images/icon-46.png" />
                <img
                    v-if="!isLike"
                    @click.stop="likePost"
                    style="marginLeft:0.2rem"
                    src="@images/icon-43.png"
                />
                <img
                    v-if="isLike"
                    @click.stop="likePost"
                    style="marginLeft:0.2rem"
                    src="@images/icon-47.png"
                />
            </div>
        </div>
        <div class="func-2" v-if="isTextarea">
            <div class="left">
                <textarea
                    ref="textArea"
                    v-focus
                    v-model.trim="replyText"
                    :placeholder="placeholderText"
                ></textarea>
            </div>
            <div class="right">
                <img src="@images/icon-45.png" @click.stop="isEmoticon=!isEmoticon" />
                <div class="text" @click.stop="replyPost">发送</div>
            </div>
        </div>
        <transition
            appear
            appear-class="enter"
            appear-active-class="active"
            appear-to-class="done"
            enter-class="enter"
            enter-active-class="active"
            enter-to-class="done"
            leave-active-class="active"
            leave-class="done"
            leave-to-class="enter"
            v-on:after-enter="afterEnter"
        >
            <div class="emoticon" v-if="isEmoticon&&isTextarea">
                <cube-scroll ref="scroll" v-if="emoticon.length>0&&isEmoticon">
                    <img
                        :src="item.url"
                        @click.stop="selEmoticon(item)"
                        v-for="(item,index) in emoticon"
                        :key="index"
                    />
                </cube-scroll>
            </div>
        </transition>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { getFavorite, getLike, replyPost } from '_api/bbs';
export default {
    props: {
        postData: {
            type: Object,
            default: null,
            required: true
        },
        emoticon: {
            type: Array,
            default: [],
            required: true
        }
    },
    data() {
        return {
            initHeight: 0,
            changeHeight: 0,
            containerHeight: 0,
            replyText: '',
            isCollection: false,
            isLike: false,
            isTextarea: false,
            isEmoticon: false
            // placeholderText: '我也想说一句'
        };
    },
    computed: {
        ...mapState({
            // ...
            replySomeOne: state => {
                return state.bbs.replySomeOne;
            }
        }),
        placeholderText() {
            if (this.replySomeOne) {
                return `回复：蓝冰众创-${this.replySomeOne.jobNum}`;
            } else {
                return '我也想说一句';
            }
        }
    },
    mounted() {
        this.initHeight = document.documentElement.clientHeight;
        this.isLike = this.postData.recommend_add;
        this.isCollection = this.postData.isfavorite;
        // this.$nextTick(() => {
        //     this.containerHeight = this.$refs['post-reply'].style.clientHeight;
        // });
        // window.addEventListener('resize', this._onresize);
    },
    methods: {
        async collection() {
            if (!this.$getToken()) {
                return this.$textTip('您还未登录');
            }
            try {
                this.isCollection = this.isCollection == 1 ? 0 : 1;
                await getFavorite({
                    idtype: 'tid',
                    id: this.postData.tid,
                    status: this.isCollection
                });
                if (this.isCollection) {
                    this.$textTip('关注成功');
                } else {
                    this.$textTip('取消成功');
                }
            } catch (err) {
                this.$textTip(err);
            }
        },
        async likePost() {
            if (!this.$getToken()) {
                return this.$textTip('您还未登录');
            }
            try {
                this.isLike = this.isLike == 1 ? 0 : 1;
                await getLike({
                    tid: this.postData.tid,
                    fid: this.postData.fid
                });
                if (this.isLike) {
                    this.$textTip('点赞成功');
                } else {
                    this.$textTip('取消成功');
                }
            } catch (err) {
                this.$textTip(err);
            }
        },
        afterEnter(el) {
            this.$refs.scroll.refresh();
        },
        showReplyInput() {
            if (!this.$getToken()) {
                return this.$textTip('您还未登录');
            }
            this.isTextarea = true;
        },
        hideReplyInput() {
            this.isEmoticon = false;
            this.isTextarea = false;
            this.$store.dispatch('bbs/SetReplySomeOne', '');
        },

        selEmoticon(item) {
            this.replyText = this.replyText + item.code;
            let t = this.$refs.textArea;
            t.focus();
        },
        async replyPost() {
            try {
                if (!this.replyText) {
                    throw '内容不能为空';
                }
                let r = await replyPost({
                    pid: this.replySomeOne ? this.replySomeOne.pid : this.postData.pid,
                    comment: this.replyText,
                    remark: this.replySomeOne ? 1 : 0
                });
                this.$msg.success('评论成功', () => {
                    this.$reloadPage(this.$route.fullPath);
                });
            } catch (err) {
                this.$textTip(err);
                console.log(err);
            }
        },
        // 输入法弹起，高度变化之后重新定位input输入框（解决app内部不无法自动适应高度的bug）
        _onresize() {
            this.changeHeight = document.documentElement.clientHeight;
            console.log(this.initHeight - this.changeHeight);
            this.$refs['post-reply'].style.top = `${this.initHeight -
                this.changeHeight -
                this.containerHeight}px`;
        }
    },
    watch: {
        replySomeOne: {
            handler: function(n) {
                if (n) {
                    this.showReplyInput();
                } else {
                    this.hideReplyInput();
                }
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.enter {
    max-height: 0px;
}
.done {
    max-height: 3.4rem;
}
.active {
    transition: all 0.2s ease;
}
.post-reply {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    > .func-1 {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #f1f1f1;
        padding: 0px 0.3rem;
        .left {
            display: flex;
            align-items: center;
            width: 5.4rem;
            height: 0.6rem;
            background-color: #fff;
            border-radius: 0.4rem;
            img {
                width: 0.4rem;
                margin-left: 0.2rem;
            }
            .text {
                margin-left: 0.1rem;
                line-height: normal;
                color: #9e9494;
                font-size: 0.28rem;
            }
        }
        .right {
            display: flex;
            align-items: center;
            img {
                width: 0.4rem;
            }
        }
    }
    > .func-2 {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #f1f1f1;
        padding: 0px 0.3rem;
        .left {
            display: flex;
            align-items: center;
            width: 5.4rem;
            height: 0.6rem;
            background-color: #fff;
            border-radius: 0.4rem;
            overflow: hidden;
            textarea {
                display: flex;
                line-height: 0.6rem;
                width: 100%;
                height: 100%;
                font-size: 0.28rem;
                border: none;
                outline: none;
                padding: 0px 0.2rem;
                color: #9e9494;
                ::placeholder {
                    font-size: 0.28rem;
                    color: #9e9494;
                    line-height: normal;
                }
            }
        }
        .right {
            display: flex;
            align-items: center;
            img {
                width: 0.4rem;
            }
            .text {
                margin-left: 0.2rem;
                line-height: normal;
                color: #9e9494;
                font-size: 0.28rem;
            }
        }
    }
    .emoticon {
        overflow: hidden;
        height: 3rem;
        background-color: #fff;
        /deep/ .cube-scroll-content {
            padding: 0px 0.2rem !important;
        }
        img {
            width: 0.48rem;
            height: 0.48rem;
            margin: 0.054rem;
        }
    }
}
</style>

