<template>
    <div class="dai-base">
        <div class="left">
            <img :src="productData.info.Logurl">
            <div class="text" v-html="rateFilter(productData.info.money)"></div>
        </div>
        <div class="right">
            <div class="name">{{productData.info.Name}}</div>
            <div class="intro" v-html="rateFilter(productData.info.Intro)"></div>
            <div class="amount">
                推广
                <i>{{productData.info.AppNumbs}}</i>次
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        productData: {
            type: Object,
            default: null
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
                    domStr = domStr + `<i>${arr[i]}</i>`;
                } else {
                    domStr = domStr + `${arr[i]}`;
                }
            }
            return domStr;
        }
    }
};
</script>
<style lang="less" scoped>
.dai-base {
    display: flex;
    align-items: center;
    width: 6.9rem;
    height: 2.54rem;
    background-image: linear-gradient(to right bottom, #3481ff, #37b5ff);
    border-top-left-radius: 0.16rem;
    border-top-right-radius: 0.16rem;
    margin: 0 auto;
    > .left {
        margin-left: 1.15rem;

        margin-right: 0.52rem;
        img {
            width: 0.97rem;
            height: 0.97rem;
        }
        > .text {
            color: #fff;
            font-size: 0.2rem;
            white-space: nowrap;
            /deep/ i {
                color: #fff;
                font-size: 0.36rem;
            }
        }
    }
    > .right {
        > .name {
            font-size: 0.36rem;
            font-weight: bold;
            color: #fff;
        }
        > .intro {
            margin-top: 0.3rem;
            font-size: 0.24rem;
            color: #fff;
            /deep/ i {
                color: #fff;
                font-size: 0.36rem;
            }
        }
        > .amount {
            margin-top: 0.3rem;
            font-size: 0.24rem;
            color: #fff;
            > i {
                color: #fff;
                font-size: 0.36rem;
            }
        }
    }
}
</style>

