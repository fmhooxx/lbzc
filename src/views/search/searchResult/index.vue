<template>
    <div class="search-result">
        <div class="top">
            <img @click.stop="$goBack" src="@images/arrow-3.png">
            <div class="input">
                <img src="@images/icon-4.png">
                <input type="text" maxlength="12" v-model.trim="searchWord" placeholder="请输入搜索关键词">
            </div>
            <div class="text" @click.stop="goSearch">搜索</div>
        </div>
        <div class="bottom">
            <SearchList :keywords="keywords"></SearchList>
        </div>
        <BasePlaceholder></BasePlaceholder>
    </div>
</template>
<script>
import SearchList from '../components/SearchList';
export default {
    components: { SearchList },
    data() {
        return {
            keywords: '',
            searchWord: ''
        };
    },
    mounted() {
        this.keywords = this.$route.query.key ? this.$route.query.key : '';
        this.searchWord = this.keywords;
    },
    methods: {
        goSearch() {
            if (!this.$isNull(this.searchWord)) {
                this.keywords = this.searchWord;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.search-result {
    padding-top: 1.48rem;
    > .top {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 1.48rem;
        padding: 0rem 0.3rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        > img {
            width: 0.17rem;
            height: 0.31rem;
        }
        > .input {
            display: flex;
            align-items: center;
            flex-shrink: 0;
            width: 5.5rem;
            height: 0.56rem;
            background: rgba(246, 247, 251, 1);
            border-radius: 0.27rem;
            overflow: hidden;
            > img {
                flex-shrink: 0;
                width: 0.31rem;
                height: 0.27rem;
                margin-left: 0.36rem;
            }
            > input {
                margin-left: 0.18rem;
                border: none;
                outline: none;
                width: 100%;
                height: 100%;
                font-size: 0.26rem;
                color: #757d90;
                display: block;
                background-color: #f6f7fb;
                &::placeholder {
                    color: #757d90;
                }
            }
        }
        > .text {
            font-size: 0.28rem;
            color: #4564f2;
        }
    }
    > .bottom {
        position: fixed;
        top: 1.68rem;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
}
</style>

