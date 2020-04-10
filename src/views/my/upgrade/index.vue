<template>
    <div class="upgrade">
        <BaseNav>成为代理人</BaseNav>
        <BaseTop></BaseTop>
        <div class="content">
            <BasePlaceholder></BasePlaceholder>
            <div class="item">
                <div class="title">姓名</div>
                <div class="inputWrap">
                    <input
                        type="text"
                        placeholder="请输入本人真实姓名"
                        v-model="TrueName"
                        :disabled="disabled"
                    />
                </div>
                <div class="intro">
                    <i>*</i> 个人信息将影响审核及收入提现，请确保信息真实有效
                </div>
            </div>
            <div class="item">
                <div class="title">身份证号</div>
                <div class="inputWrap">
                    <input
                        type="text"
                        placeholder="请输入本人真实身份证"
                        v-model="CardNo"
                        :disabled="disabled"
                    />
                </div>
            </div>
            <div class="item">
                <div class="title">手机号</div>
                <div class="inputWrap">
                    <input type="text" placeholder="请输入本人真实身份证" v-model="Mobile" disabled="false" />
                </div>
            </div>
            <div class="item">
                <div class="title">设置密码</div>
                <div class="inputWrap">
                    <input type="password" placeholder="请输入账户密码" v-model="password" />
                </div>
            </div>
            <div class="item">
                <div class="title">图片验证码</div>
                <div class="inputWrap inputWrapCode">
                    <input class="code" type="text" placeholder="请输入图片验证码" v-model="imgCode" />
                    <img class="imgCode" @click.stop="getImgCode" :src="base64Img" />
                </div>
            </div>
            <div class="item">
                <div class="title">手机号验证码</div>
                <div class="inputWrap inputWrapCode">
                    <input v-model="msgCode" class="code" type="text" placeholder="请输入短信验证码" />
                    <base-send-msg :mobile="Mobile" :needImgCode="true" :imgCode="imgCode"></base-send-msg>
                </div>
            </div>
            <div class="xieyi">
                <img @click.stop="agree=!agree" v-if="agree" src="@images/select-1.png" />
                <img @click.stop="agree=!agree" v-if="!agree" src="@images/select-2.png" />
                <div class="text">
                    我同意《
                    <i @click.stop="$router.push('/agreement?id=5')">用户注册协议》</i>
                </div>
            </div>
            <div class="submitBtn" @click.stop="submit">
                <div>提交</div>
            </div>
            <div class="bottom"></div>
        </div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
    </div>
</template>
<script>
import { getImgCode, checkCode } from '_api/func';
import { upDaili } from '_api/my';
import { textEncrypt } from '_utils/encrypt';
import { getMemberInfo, getMenus } from '_api/my';
import { saveUser } from '_utils/local';
export default {
    async mounted() {
        try {
            this.init();
            await this.getImgCode();
        } catch (err) {}
    },
    data() {
        return {
            agree: true,
            CardNo: '',
            Mobile: '',
            password: '',
            TrueName: '',
            imgCode: '',
            base64Img: '',
            msgCode: '',
            disabled: '',
            isBaseLoad: false
        };
    },
    methods: {
        init() {
            let base = this.$getUser();
            if (base) {
                this.CardNo = base.CardNo;
                this.Mobile = base.Mobile;
                this.TrueName = base.TrueName;
                this.disabled = base.isinfo == 1 ? true : false;
            }
        },
        // 获取图文验证码
        async getImgCode() {
            let imgBuffer = await getImgCode();
            let imgString = new Buffer(imgBuffer, 'binary').toString('base64');
            this.base64Img = `data:image/png;base64,${imgString}`;
        },
        // 检查短信
        async checkCode() {
            await checkCode({
                code: this.msgCode,
                mobile: this.Mobile
            });
        },
        async getMemberInfo() {
            this.userInfoData = await getMemberInfo();
            saveUser(this.userInfoData);
        },
        // 表单提交
        async submit() {
            try {
                this.isBaseLoad = true;
                if (!this.agree) {
                    throw '请同意协议';
                }
                await this.checkCode();
                await upDaili({
                    CardNo: textEncrypt(this.CardNo),
                    TrueName: textEncrypt(this.TrueName),
                    pwd: textEncrypt(this.password)
                });
                await this.getMemberInfo();
                this.$msg.success('您已成为代理', () => {
                    this.$goUrl('/home');
                });
                this.isBaseLoad = false;
            } catch (err) {
                this.$textTip(err);
                this.isBaseLoad = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.upgrade {
    > .content {
        > .item {
            margin-top: 0.65rem;
            box-sizing: border-box;
            padding: 0px 0.3rem;
            > .title {
                font-size: 0.3rem;
                color: rgba(41, 47, 61, 1);
            }
            > .inputWrap {
                height: 0.96rem;
                border-bottom: 1px solid #e7e9ed;
                > input {
                    border: none;
                    outline: none;
                    width: 100%;
                    height: 100%;
                    font-size: 0.26rem;
                    box-sizing: border-box;
                    display: block;
                    color: #a8a8a8;
                    background-color: #fff;
                    &::placeholder {
                        color: #a8a8a8;
                    }
                }
                > .code {
                    width: 4rem;
                }
                > .imgCode {
                    width: 1.5rem;
                    height: 0.48rem;
                }
            }
            > .inputWrapCode {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            > .intro {
                margin-top: 0.18rem;
                font-size: 0.24rem;
                > i {
                    color: red;
                }
            }
        }
        > .xieyi {
            display: flex;
            align-items: center;
            margin-top: 0.76rem;
            box-sizing: border-box;
            padding: 0px 0.3rem;
            > img {
                width: 0.24rem;
                height: 0.24rem;
            }
            > .text {
                margin-left: 0.1rem;
                display: flex;
                align-items: center;
                height: 0.25rem;
                font-size: 0.26rem;
                color: #9d9d9d;
                > i {
                    color: #5562ee;
                }
            }
        }
        > .submitBtn {
            margin-top: 0.56rem;
            padding: 0px 0.3rem;
            > div {
                background: rgba(85, 98, 238, 1);
                box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.3);
                border-radius: 0.06rem;
                box-sizing: border-box;
                height: 0.86rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 0.32rem;
                color: #fff;
            }
        }
        > .bottom {
            height: 0.6rem;
            background-color: #fff;
        }
    }
}
</style>
