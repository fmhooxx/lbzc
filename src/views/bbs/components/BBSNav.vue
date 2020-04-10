<template>
    <div class="bbs-nav">
        <div class="left">
            <div class="text" @click.stop="$goUrl('/myPost')">我的帖子</div>
            <img src="@images/icon-35.png" @click.stop="sendPost" />
        </div>
        <div class="right">
            <img class="search" src="@images/search-3.png" @click.stop="$goUrl('/postSearch')" />
            <img class="collection" src="@images/icon-36.png" @click.stop="myCollection" />
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        sendPost() {
            if (!this.$getToken()) {
                return this.$textTip('您还未登录');
            }
            this.$goUrl('/sendPost');
        },
        myCollection() {
            if (!this.$getToken()) {
                return this.$textTip('您还未登录');
            }
            this.$goUrl('/postCollection');
        }
    }
};
</script>

<style lang="less" scoped>
.bbs-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 0.3rem;
    > .left {
        display: flex;
        align-items: center;
        .text {
            line-height: normal;
            color: #b3b3b3;
            font-size: 0.28rem;
        }
        img {
            margin-left: 0.2rem;
            width: 0.3rem;
        }
    }
    > .right {
        display: flex;
        align-items: center;
        .search {
            width: 0.34rem;
            height: 0.34rem;
        }
        .collection {
            margin-left: 0.2rem;
            width: 0.34rem;
            height: 0.33rem;
        }
    }
}
</style>
