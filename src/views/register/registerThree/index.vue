<template>
    <section class="register-three">
        <BaseNav style="border:none"></BaseNav>
        <BaseTop></BaseTop>
        <div class="content">
            <h2>请设置密码</h2>
            <h3>密码须以英文字母开头，为字母+数字形式</h3>
            <div class="input-content">
                <input
                    ref="pwdInput"
                    type="password"
                    placeholder="请输入密码"
                    v-model="password"
                    maxlength="16"
                />
                <img v-if="isPwd" @click.stop="showPwd" src="@images/eye-open.png" />
                <img v-if="!isPwd" @click.stop="showPwd" src="@images/eye-close.png" />
            </div>
            <div class="tip">
                <div></div>
                <div class="text">6-16位字符</div>
            </div>
            <div class="btn" @click.stop="finish">完成</div>
        </div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </section>
</template>
<script>
import hasToken from '_mixins/hasToken';
import { register } from '_api/register';
import { noticeToken } from '_native/func';
import { isPassword } from '_utils/validate';
import { saveEncrypt, saveUser } from '_utils/local';
import { base64, md5Encrypt, tokenEncrypt } from '_utils/encrypt';
import { getTimestamp, getMemberInfo, userlogin } from '_api/login';

export default {
    data() {
        return {
            code: '',
            mobile: '',
            password: '',
            isPwd: false,
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mixins: [hasToken],
    mounted() {
        this.code = this.$route.query.code;
        this.mobile = this.$route.query.mobile;
        this.isBaseLoadPage = false;
    },
    methods: {
        // 展示密码
        showPwd() {
            this.isPwd = !this.isPwd;
            if (this.isPwd) {
                this.$refs.pwdInput.type = 'text';
            } else {
                this.$refs.pwdInput.type = 'password';
            }
        },
        async finish() {
            try {
                this.isBaseLoad = true;
                if (!isPassword(this.password)) {
                    throw '密码格式不正确';
                }
                await this.register();
                await this.login();
                this.isBaseLoad = false;
            } catch (err) {
                this.$textTip(err);
                this.isBaseLoad = false;
            }
        },
        async register() {
            let r = await register({
                Mobile: this.mobile,
                Code: this.code,
                Password: base64(this.password),
                sign: 3 // 标识   1：金融日  2：郁金香  3：蓝冰众创
            });
            if (r.result != 100000) {
                throw r.message;
            }
        },

        async getMemberInfo() {
            let user = await getMemberInfo();
            saveUser(user);
        },
        async login() {
            try {
                let timestamp = await getTimestamp();
                let token = tokenEncrypt(
                    this.mobile,
                    timestamp.Val,
                    timestamp.ID,
                    this.$platform(),
                    md5Encrypt(this.password)
                );
                let loginRes = await userlogin({
                    ticks: timestamp.Val,
                    ticksid: timestamp.ID,
                    DeviceToken: this.$store.state.native.deviceToken,
                    mobile: this.mobile,
                    token: token
                });
                noticeToken(loginRes.Token);
                saveEncrypt({
                    Token: loginRes.Token,
                    IV: loginRes.IV,
                    KEY: loginRes.KEY,
                    ID: loginRes.ID
                });
                await this.getMemberInfo();
                this.$msg.success('登录成功', () => {
                    this.$goUrl('/');
                });
            } catch (err) {
                console.log(err);
                this.$msg.fail('登录失败');
                this.isBaseLoad = false;
                throw err;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.register-three {
    > .content {
        padding: 0px 0.3rem;
        > h2 {
            margin-top: 0.1rem;
            font-size: 0.44rem;
            font-weight: bold;
            line-height: normal;
            color: #121c32;
        }
        > h3 {
            margin-top: 0.1rem;
            font-size: 0.26rem;
            line-height: normal;
            color: #929292;
        }
        > .input-content {
            margin-top: 1rem;
            display: flex;
            justify-content: space-around;
            box-sizing: border-box;
            height: 1.18rem;
            border-bottom: 1px solid #e7e8ea;
            position: relative;
            > input {
                display: flex;
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                font-size: 0.5rem;
                color: #121c32;
                letter-spacing: 0.05rem;
                &::placeholder {
                    font-size: 0.48rem;
                    color: #929292;
                }
            }
            > img {
                width: 0.37rem;
                height: 0.21rem;
                position: absolute;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        > .tip {
            margin-top: 0.4rem;
            display: flex;
            justify-content: space-between;
            > .text {
                font-size: 0.26rem;
                color: rgba(146, 146, 146, 1);
            }
        }
        > .btn {
            margin-top: 0.56rem;
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
    }
}
</style>
