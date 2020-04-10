<template>
    <div class="history">
        <div class="top">
            <div>历史搜索</div>
            <div @click.stop="clear">清除历史</div>
        </div>
        <div class="bottom">
            <div class="item" v-for="(item,index) in arr" :key="index" @click.stop="go(item)">
                <div>{{item}}</div>
                <img @click.stop="deleteItem(index)" src="@images/close-2.png">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            key: 'jrr_history_word',
            arr: []
        };
    },
    mounted() {
        this.getHistory();
    },
    methods: {
        getHistory() {
            try {
                var result = JSON.parse(window.localStorage.getItem(this.key));
                this.arr = result || [];
            } catch (err) {
                this.arr = [];
            }
        },
        deleteItem(index) {
            try {
                if (this.arr.length > 0) {
                    this.arr.splice(index, 1);
                    window.localStorage.setItem(this.key, JSON.stringify(this.arr));
                }
            } catch (err) {
                console.log(err);
            }
        },
        go(keywords) {
            this.$goUrl(`/searchResult?key=${keywords}`)
        },
        clear() {
            try {
                this.arr = [];
                window.localStorage.setItem(this.key, JSON.stringify(this.arr));
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.history {
    width: 100%;
    padding: 0px 0.3rem;
    > .top {
        display: flex;
        justify-content: space-between;
        padding-top: 0.3rem;
        padding-bottom: 0.3rem;
        border-bottom: 1px solid rgb(243, 244, 247);
        > div {
            font-size: 0.26rem;
            color: #292f3d;
        }
    }
    > .bottom {
        > .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 0.3rem;
            padding-bottom: 0.3rem;
            border-bottom: 1px solid rgb(243, 244, 247);
            > div {
                font-size: 0.26rem;
                color: #757d90;
            }
            > img {
                width: 0.2rem;
                height: 0.2rem;
            }
        }
    }
}
</style>

