<template>
    <div class="post-detail" @click.stop="hideReplyInput">
        <PostNav @click.native.stop>帖子详情</PostNav>
        <BaseTop></BaseTop>
        <div v-if="postData" class="title">{{postData.subject}}</div>
        <PostContent v-if="postData" :data="postData" style="marginTop:0.4rem"></PostContent>
        <PostComment v-if="postData" ref="postComment" :postData="postData"></PostComment>
        <PostReply
            v-if="postData"
            @click.native.stop
            @reloadComment="reloadComment"
            ref="postReply"
            :postData="postData"
            :emoticon="emoticon"
        ></PostReply>
        <BaseBottom></BaseBottom>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getPostDetail, getSmiles, addView } from '_api/bbs';
import PostNav from '../components/PostDetail/PostNav';
import PostContent from '../components/PostDetail/PostContent';
import PostComment from '../components/PostDetail/PostComment';
import PostReply from '../components/PostDetail/PostReply';
export default {
    components: {
        PostNav,
        PostContent,
        PostComment,
        PostReply
    },
    data() {
        return {
            id: '',
            titile: '',
            emoticon: [],
            postData: null,
            isBaseLoadPage: true
        };
    },
    created() {
        this.$store.dispatch('bbs/SetReplySomeOne', '');
    },
    async mounted() {
        try {
            this.id = this.$route.query.tid;
            this.titile = this.$route.query.title;

            await this.getPostDetail();
            await this.getSmiles();
            this.isBaseLoadPage = false;
            addView({
                tid: this.id
            });
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getPostDetail() {
            this.postData = await getPostDetail({
                tid: this.id
            });
            console.log(this.postData);
        },
        async getSmiles() {
            this.emoticon = await getSmiles();
        },
        // 收起输入框
        hideReplyInput() {
            this.$refs.postReply.hideReplyInput();
        },
        // 重新加载评论
        reloadComment() {
            this.$refs.postComment.getList();
        }
    }
};
</script>
<style lang="less" scoped>
.post-detail {
    > .title {
        margin-top: 0.4rem;
        display: flex;
        // justify-content: center;
        line-height: normal;
        padding: 0px 0.3rem;
        font-size: 0.32rem;
    }
}
</style>

