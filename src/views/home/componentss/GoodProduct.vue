<template>
    <div class="good-product">
        <base-title>经统计，同时申请以下4家，下款率达90%</base-title>
        <div class="center">
            <div class="item" v-for="item in goodProductData" :key="`good_${item.ID}`">
                <img v-lazy="item.Logurl" @click.stop="goDetail(item.Itype,item.ID)">
                <div class="text">
                    <span>{{item.Name}}</span>
                    <span>{{item.AppNumbs}}人申请</span>
                </div>
            </div>
        </div>
        <div class="bottom" @click.stop="getGoodProduct">
            <img ref="circleImg" src="@images/icon-6.png">
            <div>换一批</div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        goodProductData: {
            type: Array,
            default: []
        }
    },
    methods: {
        goDetail(type, id) {
            this.$goUrl(`/shareDetail?id=${id}&type=${type}`);
        },
        getGoodProduct() {
            this.rotate = this.rotate + 360 || 360;
            this.$refs.circleImg.style.transform = `rotate(${this.rotate}deg)`;
            this.$emit('getGoodProduct');
        }
    }
};
</script>

<style lang="less" scoped>
.good-product {
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    > .top {
        display: flex;
        align-items: center;
        height: 1.08rem;
        padding: 0px 0.3rem;
        border-bottom: 1px solid #f4f4f4;
        > i {
            width: 0.05rem;
            height: 0.28rem;
            background-color: #5461eb;
        }
        > div {
            font-size: 0.28rem;
            font-weight: bold;
            color: rgba(41, 47, 61, 1);
            margin-left: 0.2rem;
        }
    }
    > .center {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2.91rem;
        padding: 0px 0.3rem;
        > .item {
            display: flex;
            flex-direction: column;
            align-items: center;
            > img {
                width: 0.9rem;
                height: 0.9rem;
            }
            > .text {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-top: 0.35rem;
                > span:nth-child(1) {
                    font-size: 0.27rem;
                    font-weight: 500;
                    color: rgba(41, 41, 41, 1);
                }
                > span:nth-child(2) {
                    font-size: 0.23rem;
                    color: rgba(159, 159, 159, 1);
                    margin-top: 0.16rem;
                }
            }
        }
    }
    > .bottom {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 0.82rem;
        border-top: 1px solid #f4f4f4;
        > img {
            width: 0.23rem;
            height: 0.24rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            transition: all 1s;
        }
        > div {
            line-height: normal;
            font-size: 0.23rem;
            color: rgba(128, 128, 128, 1);
            margin-left: 0.09rem;
        }
    }
}
</style>
