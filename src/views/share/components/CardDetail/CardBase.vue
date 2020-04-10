<template>
    <div class="card-base">
        <img :src="productData.info.Logurl">
        <div class="desc">
            <div class="top">
                <div class="title">{{productData.info.Name}}</div>
                <div class="money">{{productData.info.money}}</div>
            </div>
            <div class="bottom">
                <div class="left">
                    <i></i>
                    <div class="text">全额取现</div>
                    <div class="block"></div>
                </div>
                <div class="right">
                    已有
                    <i>{{productData.info.AppNumbs}}</i>人申请
                </div>
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
    }
};
</script>

<style lang="less" scoped>
.card-base {
    display: flex;
    flex-direction: column;
    padding: 0px 0.3rem;
    > img {
        margin-top: 0.2rem;
        width: 4.27rem;
        height: 2.72rem;
        margin: 0 auto;
        display: block;
    }
    > .desc {
        margin-top: 0.47rem;
        display: flex;
        flex-direction: column;
        > .top {
            display: flex;
            align-items: center;
            > .title {
                font-size: 0.3rem;
                font-weight: bold;
                color: #000;
            }
            > .money {
                display: flex;
                align-items: center;
                justify-content: center;
                line-height: normal;
                height: 0.36rem;
                background-color: rgba(250, 79, 39, 1);
                border-radius: 0.18rem;
                margin-left: 0.4rem;
                font-size: 0.24rem;
                font-weight: 500;
                color: #fff;
                padding: 0px 0.16rem;
            }
        }
        > .bottom {
            margin-top: 0.3rem;
            display: flex;
            align-items: center;
            > .left {
                display: flex;
                align-items: center;
                > i {
                    width: 6px;
                    height: 6px;
                    background-color: #8f8f8f;
                    border-radius: 50%;
                }
                > .text {
                    margin-left: 0.1rem;
                    font-size: 0.23rem;
                    font-weight: 500;
                    color: rgba(143, 143, 143, 1);
                }
                > .block {
                    margin-left: 0.2rem;
                    width: 0.02rem;
                    height: 0.24rem;
                    background-color: #bab3b3;
                }
            }
            > .right {
                margin-left: 0.2rem;
                font-size: 0.23rem;
                font-weight: 500;
                color: rgba(143, 143, 143, 1);
                > i {
                    color: #5461eb;
                }
            }
        }
    }
}
</style>
