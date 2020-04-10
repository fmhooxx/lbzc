<template>
    <div class="base-pro-apply" @click.stop="close">
        <transition
            appear
            appear-active-class="animated bounceInUp"
            leave-active-class="animated bounceOutUp faster"
        >
            <div v-if="isAnimation" class="content" @click.stop>
                <div class="top">
                    <div class="tip">
                        <div class="title">重要提示</div>
                        <div class="content">
                            后续填写的申请信息
                            <i>必须与您注册平台身份信息保持一致，</i>请仔细确认，否则将无法查询订单。
                        </div>
                    </div>
                    <div class="info" v-if="user">
                        <div class="item">
                            <span class="left">姓名：</span>
                            <span class="right">{{user.TrueName}}</span>
                        </div>
                        <div class="item">
                            <span class="left">手机：</span>
                            <span class="right">{{user.Mobile|mobileHide}}</span>
                        </div>
                        <div class="item">
                            <span class="left">身份证：</span>
                            <span class="right">{{user.CardNo}}</span>
                        </div>
                    </div>
                </div>
                <div class="bottom">
                    <span @click.stop="close">取消</span>
                    <span @click.stop="apply">确定申请</span>
                </div>
            </div>
        </transition>
        <base-load v-if="isBaseLoad"></base-load>
    </div>
</template>
<script>
import 'animate.css';
import { applyLocalProduct, applyOtherProduct } from '_api/func';
export default {
    props: {
        product: {
            type: Object,
            required: true
        },
        isBaseProApply: {
            type: Boolean,
            required: true
        },
        from: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            uid: '',
            user: null,
            isAnimation: true,
            isBaseLoad: false
        };
    },

    mounted() {
        this.user = this.$getUser();
        let uid = this.$route.query.uid;
        this.uid = this.$initUid(uid);
    },
    computed: {
        singVal() {
            return sign => {
                if (this.$getUser().Mtype >= 2) {
                    return 1;
                } else {
                    return sign;
                }
            };
        }
    },
    methods: {
        // sign 标识 1：我要申请  2：表单提交
        async apply() {
            try {
                this.isBaseLoad = true;
                let r;
                if (this.product.info.from_type == 1) {
                    r = await applyLocalProduct({
                        uid: this.uid,
                        sign: this.singVal(1),
                        id: this.product.info.ID
                    });
                } else {
                    r = await applyOtherProduct({
                        uid: this.uid,
                        sign: this.singVal(2),
                        id: this.product.info.ID
                    });
                }
                this.isBaseLoad = false;
                if (r.result == 100007 || r.result == 100000) {
                    this.$msg.success('申请成功', () => {
                        this.$open(r.data);
                        this.close();
                    });
                } else {
                    this.$textTip(r.message);
                }
            } catch (err) {
                this.$textTip(err);
                this.isBaseLoad = false;
            }
        },
        close() {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$emit('update:isBaseProApply', false);
            }, 400);
        }
    }
};
</script>

<style lang="less" scoped>
.base-pro-apply {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 1, 0.6);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    > .content {
        width: 4.96rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.1rem;
        position: relative;
        > .top {
            padding: 0.35rem;
            > .tip {
                padding: 0.3rem;
                border: 1px solid #f5edd5;
                color: #000;
                background-color: rgb(255, 252, 243);
                border-radius: 0.05rem;
                > .title {
                    font-size: 0.28rem;
                    font-weight: bold;
                }
                > .content {
                    margin-top: 0.2rem;
                    font-size: 0.26rem;
                    line-height: 1.6;
                    > i {
                        color: red;
                    }
                }
            }
            > .info {
                margin-top: 0.3rem;
                > .item {
                    padding: 0.1rem 0rem;
                    font-size: 0.26rem;
                    > .left {
                        color: #868383;
                    }
                    > .rigth {
                        color: #000;
                    }
                }
            }
        }
        > .bottom {
            height: 0.8rem;
            display: flex;
            justify-content: space-around;
            border-top: 1px solid #e7e8ea;
            > span {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.3rem;
                font-weight: bold;
                color: rgba(96, 96, 96, 1);
                &:nth-child(1) {
                    flex: 1;
                    border-right: 1px solid #e7e8ea;
                }
                &:nth-child(2) {
                    flex: 1;
                    color: #5461eb;
                }
            }
        }
        > .close {
            position: absolute;
            left: 50%;
            bottom: -0.95rem;
            transform: translate(-50%);
            width: 0.45rem;
            height: 0.45rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
}
</style>