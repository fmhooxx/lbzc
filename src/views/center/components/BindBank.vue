<template>
    <div class="bind-bank">
        <div class="content">
            <div class="title">绑定银行卡</div>
            <div class="item">
                <div>银行卡号</div>
                <input type="tel" v-model="account" placeholder="请输入银行卡号" />
            </div>
            <div class="item">
                <div>开户行</div>
                <input type="text" v-model="openBank" placeholder="请输入开户行名称" />
            </div>
            <div class="item">
                <div>持卡人姓名</div>
                <input type="tel" v-model="trueName" placeholder="请输入真实姓名" />
            </div>
            <div class="code">
                <div class="left">
                    <div>校验码</div>
                    <input type="tel" v-model="imgCode" placeholder="请输入右侧校验码" />
                </div>
                <img class="right" @click.stop="getImgCode" :src="base64Img" />
            </div>
            <div class="code">
                <div class="left">
                    <div>验证码</div>
                    <input type="tel" v-model="msgCode" placeholder="点击右侧发送短信验证码" />
                </div>
                <BaseSendMsg :mobile="mobile" :needImgCode="true" :imgCode="imgCode"></BaseSendMsg>
            </div>
            <div class="tips">
                <p>验证码将发送到 {{mobile|mobileHide}}，请妥善保管您的账户信息</p>
            </div>
            <div class="btn" @click.stop="bindBank">提交</div>
        </div>
        <BaseLoad v-if="isBaseload"></BaseLoad>
    </div>
</template>
<script>
import { getImgCode } from '_api/func';
import { bindBank } from '_api/center';
import { getMemberInfo } from '_api/login';
import { saveUser } from '_utils/local';
export default {
    props: {
        userData: {
            type: Object,
            default: null,
            required: true
        }
    },
    data() {
        return {
            account: '',
            openBank: '',
            trueName: '',
            imgCode: '',
            msgCode: '',
            mobile: '',
            base64Img: '',
            isBaseload: false
        };
    },
    mounted() {
        this.getImgCode();
    },
    methods: {
        async getImgCode() {
            let imgBuffer = await getImgCode();
            let imgString = new Buffer(imgBuffer, 'binary').toString('base64');
            this.base64Img = `data:image/png;base64,${imgString}`;
        },
        async bindBank() {
            try {
                this.isBaseload = true;
                await bindBank({
                    msgCode: this.msgCode,
                    imgYZM: this.imgCode,
                    trueName: this.trueName,
                    mobile: this.mobile,
                    banknum: this.account,
                    open_bank: this.openBank
                });
                await this.getMemberInfo();
                this.$msg.success('绑定成功', () => {
                    this.$goBack();
                });
                this.isBaseload = false;
            } catch (err) {
                this.$textTip(err);
                this.isBaseload = false;
            }
        },

        async getMemberInfo() {
            let user = await getMemberInfo();
            saveUser(user);
        }
    },
    watch: {
        userData: {
            handler: function() {
                this.mobile = this.userData.Mobile;
                this.openBank = this.userData.OpenBank;
                this.trueName = this.userData.BankName;
                this.account = this.userData.Bank;
            },
            immediate: true
        }
    }
};
</script>

<style lang="less" scoped>
.bind-bank {
    > .content {
        padding: 0rem 0.3rem;
        > .title {
            height: 1.15rem;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e7e8ea;
            font-size: 0.31rem;
            font-weight: bold;
            color: rgba(85, 98, 236, 1);
        }
        > .item {
            height: 1.15rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e7e8ea;
            > div {
                font-size: 0.26rem;
                font-weight: bold;
                color: rgba(0, 0, 0, 1);
            }
            > input {
                height: 0.7rem;
                border: none;
                outline: none;
                text-align: right;
                font-size: 0.26rem;
                font-weight: 500;
                color: rgba(111, 111, 111, 1);
            }
        }
        > .code {
            height: 1.15rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e7e8ea;
            > .left {
                display: flex;
                align-items: center;
                > div {
                    font-size: 0.26rem;
                    font-weight: bold;
                    color: rgba(0, 0, 0, 1);
                }
                > input {
                    height: 0.7rem;
                    margin-left: 0.3rem;
                    border: none;
                    outline: none;
                    font-size: 0.26rem;
                    font-weight: 500;
                    color: rgba(111, 111, 111, 1);
                    &::placeholder {
                        font-size: 0.26rem;
                        font-weight: 500;
                        color: rgba(111, 111, 111, 1);
                    }
                }
            }
            > img {
                width: 1.5rem;
                height: 0.48rem;
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }
        }
        > .tips {
            margin-top: 0.52rem;
            > p {
                font-size: 0.24rem;
                font-weight: bold;
                color: rgba(251, 83, 55, 1);
                margin-bottom: 0.1rem;
            }
        }
        > .btn {
            margin-top: 0.8rem;
            height: 0.86rem;
            background: rgba(85, 98, 238, 1);
            box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.3);
            border-radius: 0.06rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.32rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
        }
    }
}
</style>
