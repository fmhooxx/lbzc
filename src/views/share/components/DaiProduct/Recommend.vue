<template>
    <div class="recommend">
        <div class="title">
            <base-title size="0.32rem" style="border:none">推荐</base-title>
            <h4 @click.stop="getRecommend">换一批</h4>
        </div>
        <div class="content">
            <div
                class="item"
                v-for="item in recommendData"
                :key="`recommend_${item.ID}`"
                @click.stop="goDetail(item.ID)"
            >
                <div class="item-content">
                    <div class="set-time">{{item.Settletime}}</div>
                    <img :src="item.Logurl">
                    <div class="name">{{item.Name}}</div>
                    <div class="rate" v-html="rateFilter(item.ReferMoney)"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        recommendData: {
            type: Array,
            default: []
        }
    },
    methods: {
        rateFilter(str) {
            if (!str) return '';
            let arr = str.split('');
            let reg = /^[0-9]+.?[0-9]*$/;
            let domStr = '';
            for (var i = 0; i < arr.length; i++) {
                if (reg.test(arr[i])) {
                    domStr = domStr + `<i style="font-size:0.28rem;color: #4564f2">${arr[i]}</i>`;
                } else {
                    domStr = domStr + `${arr[i]}`;
                }
            }
            return domStr;
        },
        getRecommend() {
            this.$emit('getRecommend');
        },
        goDetail(id) {
            this.$goUrl(`/shareDetail?id=${id}&type=1`);
        }
    }
};
</script>

<style lang="less" scoped>
.recommend {
    > .title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 0.3rem;
        > h4 {
            font-size: 0.26rem;
            font-weight: bold;
            color: rgba(41, 47, 61, 1);
        }
    }
    > .content {
        display: flex;
        padding-left: 0.3rem;
        overflow-x: scroll;
        -webkit-overflow-scrolling: auto;
        padding-bottom: 0.3rem;
        &::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
        }
        > .item {
            display: flex;
            flex-shrink: 0;
            width: 2.38rem;
            height: 3.68rem;
            > .item-content {
                margin-top: 0.16rem;
                width: 2.38rem;
                height: 3.08rem;
                box-shadow: 0 0.1rem 42px 0.18rem rgba(169, 185, 221, 0.1);
                border-radius: 0.22rem;
                margin-right: 0.26rem;
                > .set-time {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: normal;
                    margin-top: 0.23rem;
                    width: 0.99rem;
                    height: 0.33rem;
                    background-image: linear-gradient(to right, #fcad1e, #f96f4f);
                    border-top-right-radius: 0.15rem;
                    border-bottom-right-radius: 0.15rem;
                    font-size: 0.22rem;
                    font-weight: 500;
                    color: #fff;
                }
                > img {
                    display: block;
                    margin: 0 auto;
                    margin-top: 0.24rem;
                    width: 0.93rem;
                    height: 0.93rem;
                }
                > .name {
                    text-align: center;
                    margin-top: 0.31rem;
                    font-size: 0.32rem;
                    line-height: 0.32rem;
                    font-weight: 500;
                    color: rgba(41, 47, 61, 1);
                }
                > .rate {
                    margin-top: 0.2rem;
                    text-align: center;
                    font-size: 0.2rem;
                    font-weight: 500;
                    color: rgba(69, 100, 242, 1);
                    white-space: nowrap;
                }
            }
        }
    }
}
</style>