<template>
    <div class="post-search">
        <BaseNav>帖子搜索</BaseNav>
        <BaseTop></BaseTop>
        <div class="search">
            <input type="text" v-model.trim="inputContent" placeholder="请输入关键词" />
            <div @click.stop="goSearch">
                <img src="@images/search-3.png" />
            </div>
        </div>
        <ComPostList
            style="padding:0"
            v-if="keywords"
            type="search"
            :keywords.sync="keywords"
            ref="comPostList"
        ></ComPostList>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import scroll from '_mixins/scroll';
import ComPostList from '../components/ComPostList';
export default {
    components: { ComPostList },
    mixins: [scroll],
    data() {
        return {
            keywords: '',
            inputContent: '',
            // noData: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        try {
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        goSearch() {
            if (!this.inputContent) {
                return this.$textTip('请输入关键词');
            } else {
                this.keywords = this.inputContent;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.post-search {
    padding: 0px 0.3rem;
    .search {
        margin-top: 0.2rem;
        height: 0.8rem;
        border: 1px solid #ddd;
        border-radius: 0.06rem;
        overflow: hidden;
        position: relative;
        input {
            padding-left: 0.2rem;
            padding-right: 0.8rem;
            width: 100%;
            display: flex;
            height: 100%;
            border: none;
            outline: none;
            font-size: 0.28rem;
            &::placeholder {
                font-size: 0.28rem;
                color: #ddd;
            }
        }
        div {
            position: absolute;
            top: 0px;
            right: 0px;
            width: 0.8rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 0.34rem;
            }
        }
    }
}
</style>

