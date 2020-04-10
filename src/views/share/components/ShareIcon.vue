<template>
    <div class="share-icon">
        <div class="left">
            <div
                class="idea"
                @click.stop="goMaterial"
                style="paddingRight:0.24rem;borderRight:1px solid #dcdcdc;"
            >
                <img src="@images/icon-10.png" />
                <div class="text">推广素材</div>
            </div>
            <div class="apply" style="marginLeft:0.24rem" @click.stop="apply">
                <img src="@images/icon-11.png" />
                <div class="text">我要申请</div>
            </div>
        </div>
        <div
            class="right"
            @click.stop="sharePoster"
            :style="{backgroundImage:`url(${require('@images/b-2.png')})`}"
        >邀请好友</div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
        <base-pro-apply
            v-if="isBaseProApply"
            :product="productData"
            :isBaseProApply.sync="isBaseProApply"
        ></base-pro-apply>
        <BaseRealPop v-if="isBaseRealPop" :isBaseRealPop.sync="isBaseRealPop"></BaseRealPop>
        <BaseYjPop v-if="isBaseYjPop" @closeBaseYjPop="closeBaseYjPop"></BaseYjPop>
        <BaseYjPayPop v-if="isBaseYjPayPop" :isBaseYjPayPop.sync="isBaseYjPayPop" :price="price"></BaseYjPayPop>
    </div>
</template>
<script>
import { checkRealName, checkYjToProduct } from '_api/func';
export default {
    props: {
        productData: {
            type: Object,
            default: null,
            required: true
        },
        type: {
            type: String,
            default: 0,
            required: true
        }
    },
    data() {
        return {
            price: 0,
            isBaseLoad: false,
            isBaseProApply: false,
            isBaseRealPop: false,
            isBaseYjPop: false,
            isBaseYjPayPop: false
        };
    },
    computed: {
        isCPA() {
            if (
                this.productData &&
                this.productData.info.D_type == 2 &&
                this.productData.info.Itype == 1
            ) {
                return true;
            } else {
                false;
            }
        }
    },
    methods: {
        async checkYjToProduct() {
            let r = await checkYjToProduct({
                id: this.productData.info.ID
            });
            if (r.result == 100086) {
                return true; // 需要交押金
            } else if (r.result == 100000) {
                return false; // 不要交押金
            } else {
                throw r.message;
            }
        },
        async sharePoster() {
            try {
                this.isBaseLoad = true;
                if (this.isCPA) {
                    let needPay = await this.checkYjToProduct();
                    if (needPay) {
                        this.isBaseYjPop = true;
                        throw '请支付保证金';
                    }
                }
                let id = this.productData.info.ID;
                let title = this.productData.info.Name;
                this.$goUrl(`/sharePoster?id=${id}&title=${title}`);
            } catch (err) {
                this.$textTip(err);
                this.isBaseLoad = false;
            }
        },
        goMaterial() {
            this.$goUrl(
                `/shareMaterial?id=${this.productData.info.ID}&title=${this.productData.info.Name}&type=${this.type}`
            );
        },
        closeBaseYjPop(action) {
            if (action.type == 'pay') {
                this.isBaseYjPop = false;
                this.isBaseYjPayPop = true;
                this.price = action.price;
            } else {
                this.isBaseYjPop = false;
            }
        },
        async apply() {
            try {
                this.isBaseLoad = true;
                await checkRealName();
                if (this.isCPA) {
                    this.$open(this.productData.info.Openurl);
                } else {
                    this.isBaseProApply = true;
                }
                this.isBaseLoad = false;
            } catch (err) {
                this.isBaseLoad = false;
                this.isBaseRealPop = true;
                this.$textTip(err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.share-icon {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 1.36rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 0.3rem;
    background-color: #fff;
    box-shadow: 0.1rem 0.05rem 0.25rem #f3f3f3;
    > .left {
        display: flex;
        align-items: center;
        height: 0.78rem;
        > .idea,
        .apply {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            > img {
                width: 0.44rem;
                height: 0.44rem;
            }
            > .text {
                margin-top: 0.1rem;
                white-space: nowrap;
                font-size: 0.24rem;
                color: rgba(116, 116, 116, 1);
            }
        }
    }
    > .right {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
        width: 4.05rem;
        height: 0.78rem;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        font-size: 0.32rem;
        font-weight: bold;
        color: #fff;
    }
}
</style>
