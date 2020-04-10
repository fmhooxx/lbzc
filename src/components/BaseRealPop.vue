<template>
    <div class="base-real-pop" @click.stop="close">
        <transition
            appear
            appear-active-class="animated bounceInUp"
            leave-active-class="animated bounceOutUp faster"
        >
            <div v-if="isAnimation" class="content" @click.stop>
                <div class="title">完善信息</div>
                <div class="inputWrap">
                    <div class="item">
                        <input type="text" v-model="trueName" max="11" placeholder="请输入姓名">
                    </div>
                    <div class="item">
                        <input type="text" v-model="cardNo" placeholder="请输入身份证号">
                    </div>
                </div>
                <div class="shuoming first">实名信息提交后无法修改</div>
                <div class="shuoming">
                    后续填写的申请信息
                    <i>必须与您本次实名信息保持一致</i>，否则会影响您的下款。
                </div>
                <div class="btn">
                    <div v-show="status" class="content" @click.stop="submit">登录</div>
                    <div v-show="!status" class="content gray">登录</div>
                </div>
            </div>
        </transition>
        <base-load v-if="isBaseLoad"></base-load>
    </div>
</template>
<script>
import 'animate.css';
import { setRealName } from '_api/func';
import { getMemberInfo } from '_api/login';
import { textEncrypt } from '_utils/encrypt';
import { saveUser } from '_utils/local';
export default {
    props: {
        isBaseRealPop: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            trueName: '',
            cardNo: '',
            status: '',
            isBaseLoad: false,
            isAnimation: true
        };
    },
    methods: {
        async getMemberInfo() {
            let user = await getMemberInfo();
            saveUser(user);
        },
        async submit() {
            try {
                this.isBaseLoad = true;
                await setRealName({
                    TrueName: textEncrypt(this.trueName),
                    CardNo: textEncrypt(this.cardNo)
                });
                await this.getMemberInfo();
                this.isBaseLoad = false;
                this.$msg.success('实名成功', () => {
                    this.close();
                });
            } catch (err) {
                this.isBaseLoad = false;
                this.$textTip(err);
            }
        },
        close() {
            this.isAnimation = false;
            window.setTimeout(() => {
                this.$emit('update:isBaseRealPop', false);
            }, 400);
        }
    },
    watch: {
        trueName: {
            handler: function() {
                if (this.trueName && this.cardNo) {
                    this.status = true;
                } else {
                    this.status = false;
                }
            },
            immediate: true
        },
        cardNo: {
            handler: function() {
                if (this.trueName && this.cardNo) {
                    this.status = true;
                } else {
                    this.status = false;
                }
            },
            immediate: true
        }
    }
};
</script>
<style lang="less">
.base-real-pop {
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    > .content {
        box-sizing: border-box;
        width: 5.4rem;
        height: 6.4rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.15rem;
        padding: 0.4rem;
        > .title {
            margin-top: 0.1rem;
            font-weight: 600;
            font-size: 0.4rem;
            color: #333;
        }
        > .inputWrap {
            > .item {
                display: flex;
                margin-top: 0.2rem;
                height: 1rem;
                border-bottom: 1px solid #e3e2e2;
                > input {
                    width: 100%;
                    height: 100%;
                    border: none;
                    outline: none;
                    font-size: 0.28rem;
                    font-weight: 500;
                    color: rgba(111, 111, 111, 1);
                }
            }
        }

        > .shuoming {
            margin-top: 0.05rem;
            color: #666;
            font-size: 0.26rem;
            line-height: 1.4;
            > i {
                color: red;
            }
        }
        > .first {
            margin-top: 0.2rem;
            color: red;
        }
        > .btn {
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            > .content {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 0.7rem;
                color: #fff;
                background: #5562ee;
                box-shadow: 0 1.6vw 3.733vw 1px rgba(85, 98, 238, 0.22);
                border-radius: 0.8vw;
                font-size: 4vw;
                font-weight: 700;
            }
            > .gray {
                color: #ccc;
                background-color: #e9e9e9;
                box-shadow: none;
            }
        }
    }
}
</style>
