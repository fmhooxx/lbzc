<template>
    <section class="hot">
        <div class="title">热门搜索</div>
        <div class="word">
            <div @click.stop="go(item)" v-for="(item,index) in hot" :key="index">{{item}}</div>
        </div>
    </section>
</template>
<script>
export default {
    props:{
        hot:{
            type:Array,
            default:[]
        }
    },
    data() {
        return {
            key: "jrr_history_word",
        }
    },
    methods: {
      
        go(keywords) {
            this.saveHistoryWord(keywords);
        },

        saveHistoryWord(keywords) {
            let arr = this.getHistoryWord();
            arr.unshift(keywords)
            if (arr.length > 6) {
                arr.splice(6)
            }
            window.localStorage.setItem(this.key, JSON.stringify(arr))
            this.$goUrl(`/searchResult?key=${keywords}`)
        },
        getHistoryWord() {
            try {
                var result = JSON.parse(window.localStorage.getItem(this.key))
                return result || []
            }
            catch (err) {
                return []
            }
        }
    }
}
</script>

<style lang="less" scoped>
.hot {
    padding: 0px 0.3rem;
    > .title {
        font-size: 0.26rem;
        color: #292f3d;
    }
    > .word {
        > div {
            display: inline-block;
            font-size: 0.25rem;
            line-height: normal;
            color: rgba(117, 125, 144, 1);
            padding: 0.06rem 0.3rem;
            background: rgba(174, 182, 204, 0.1);
            border-radius: 0.2rem;
            margin: 0.1rem 0.08rem;
        }
    }
}
</style>

