<template>
    <div class="search">
        <div class="top">
            <img @click.stop="$goBack" src="@images/arrow-3.png">
            <div class="input">
                <img src="@images/icon-4.png">
                <input type="text" maxlength="12" v-model="searchWord" placeholder="请输入搜索关键词">
            </div>
            <div class="text" @click.stop="goSearch">搜索</div>
        </div>
        <div class="bottom">
            <Hot v-if="hot.length>0" :hot="hot"></Hot>
            <History style="marginTop:0.4rem"></History>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import Hot from './components/Hot';
import History from './components/History';
import { getHotWord } from '_api/search';
export default {
    components: { Hot, History },
    data() {
        return {
            hot: [],
            key: 'jrr_history_word',
            searchWord: '',
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.hot = await getHotWord();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        goSearch() {
            this.saveHistoryWord();
        },
        saveHistoryWord() {
            if (this.searchWord) {
                let arr = this.getHistoryWord();
                arr.unshift(this.searchWord);
                if (arr.length > 6) {
                    arr.splice(6);
                }
                window.localStorage.setItem(this.key, JSON.stringify(arr));
                this.$router.push(`/searchResult?key=${this.searchWord}`);
            }
        },
        getHistoryWord() {
            try {
                var result = JSON.parse(window.localStorage.getItem(this.key));
                return result || [];
            } catch (err) {
                return [];
            }
        }
    }
};
</script>

<style lang="less" scoped>
.search {
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
    >.bottom{
        margin-top: 0.4rem;
    }
}
</style>

