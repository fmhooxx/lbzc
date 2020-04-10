<template>
    <div class="register-one">
        <BaseNav style="border:none"></BaseNav>
        <BaseTop></BaseTop>

        <div class="content">
            <h2>请输入您的手机号</h2>
            <h3>为了方便联系，请输入您的常用手机号</h3>
            <div class="input-content">
                <input type="tel" placeholder="手机号" maxlength="11" v-model.trim="mobile" />
            </div>
            <div class="xy-content">
                <img v-if="agree" @click.stop="agree=!agree" src="@images/select-5.png" />
                <div v-if="!agree" class="gou" @click.stop="agree=!agree"></div>
                <div class="xy">
                    我已阅读并同意
                    <i @click.stop="$goUrl('/agree?id=5')">《用户注册协议》</i>
                </div>
            </div>
            <div class="btn" @click.stop="next">下一步</div>
            <div class="tip">
                <div></div>
                <div class="login">
                    已有蓝冰众创账号？
                    <i @click.stop="$goUrl('/login')">登录</i>
                </div>
            </div>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getMsgCode } from '_api/func';
export default {
    data() {
        return {
            mobile: '',
            agree: true,
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.isBaseLoadPage = false;
    },
    methods: {
        next() {
            if (!this.mobile) {
                this.$textTip('请输入手机号');
            } else if (!this.agree) {
                this.$textTip('请同意用户协议');
            } else {
                this.getMsgCode();
                this.$goUrl('/registerCode?mobile=' + this.mobile);
            }
        },
        async getMsgCode() {
            await getMsgCode({
                mobile: this.mobile
            });
        }
    }
};
</script>

<style lang="less" scoped>
.register-one {
    > .content {
        // overflow: hidden;
        padding: 0px 0.3rem;
        > h2 {
            margin-top: 0.1rem;
            font-size: 0.44rem;
            font-weight: bold;
            color: #121c32;
            line-height: normal;
        }
        > h3 {
            margin-top: 0.1rem;
            font-size: 0.26rem;
            color: #929292;
            line-height: normal;
        }
        > .input-content {
            display: flex;
            margin-top: 1rem;
            height: 1.18rem;
            border-bottom: 1px solid #e7e8ea;
            > input {
                display: flex;
                height: 100%;
                border: none;
                outline: none;
                width: 100%;
                font-size: 0.5rem;
                color: #121c32;
                box-sizing: border-box;
                letter-spacing: 0.05rem;
                &::placeholder {
                    font-size: 0.48rem;
                    color: #929292;
                }
            }
        }
        > .xy-content {
            display: flex;
            align-items: center;
            margin-top: 0.25rem;
            > img {
                width: 0.26rem;
                height: 0.26rem;
            }
            > .gou {
                width: 0.26rem;
                height: 0.26rem;
                border-radius: 50%;
                border: 1px solid #ddd;
            }
            > .xy {
                margin-left: 0.08rem;
                font-size: 0.23rem;
                line-height: normal;
                color: #929292;
                > i {
                    color: #5562ee;
                }
            }
        }
        > .btn {
            margin-top: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 0.86rem;
            background: rgba(85, 98, 238, 1);
            box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.22);
            border-radius: 0.06rem;
            font-size: 0.3rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
        > .tip {
            display: flex;
            justify-content: space-between;
            > .login {
                margin-top: 0.5rem;
                font-size: 0.26rem;
                color: rgba(146, 146, 146, 1);
                > i {
                    color: #5562ee;
                }
            }
        }
    }
}
</style>
