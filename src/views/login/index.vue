<template>
    <div class="login">
        <div class="nav-title">
            <div @click.stop="$goBack" class="arrow">
                <img src="@/assets/images/arrow-3.png" />
            </div>
        </div>
        <img class="logo" @click.stop="$goUrl('/')" src="@/assets/images/logo.png" />
        <div class="form">
            <div class="account">
                <input type="tel" placeholder="请输入您的手机号" v-model="account" />
                <img @click.stop="account=''" src="@/assets/images/delete.png" />
            </div>
            <div class="pwd">
                <input ref="pwdInput" type="password" placeholder="请输入密码" v-model="password" />
                <img v-if="isPwd" @click.stop="showPwd" src="@/assets/images/eye-open.png" />
                <img v-if="!isPwd" @click.stop="showPwd" src="@/assets/images/eye-close.png" />
            </div>
        </div>
        <div class="login-btn" @click.stop="login">
            <div>登录</div>
        </div>
        <div class="pwd-register">
            <div class="left">
                <span @click.stop="isBaseLoginPop=true">短信登录</span>
                <span @click.stop="$goUrl('/password?type=f1')">忘记密码</span>
            </div>
            <div class="right" @click.stop="$goUrl('/register')">立即注册</div>
        </div>
        <base-login-pop v-if="isBaseLoginPop" :isBaseLoginPop.sync="isBaseLoginPop"></base-login-pop>
        <base-load v-if="isBaseLoad"></base-load>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import hasToken from '_mixins/hasToken';
import { noticeToken } from '_native/func';
import { getTimestamp, getMemberInfo, userlogin } from '_api/login';
import { tokenEncrypt, md5Encrypt } from '_utils/encrypt';
import { saveEncrypt, saveUser } from '_utils/local';
export default {
    data() {
        return {
            account: '',
            password: '',
            showLoading: false,
            isPwd: false,
            isBaseLoginPop: false,
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mixins: [hasToken],
    mounted() {
        this.isBaseLoadPage = false;
    },
    methods: {
        async getMemberInfo() {
            let user = await getMemberInfo();
            saveUser(user);
        },
        async login() {
            try {
                this.isBaseLoad = true;
                let timestamp = await getTimestamp();
                let token = tokenEncrypt(
                    this.account,
                    timestamp.Val,
                    timestamp.ID,
                    this.$platform(),
                    md5Encrypt(this.password)
                );
                console.log(
                    `${this.account}<==>${timestamp.Val}<=>${
                        timestamp.ID
                    }<=>${this.$platform()}<=>${this.password}`
                );
                console.log('----------------');
                let loginRes = await userlogin({
                    ticks: timestamp.Val,
                    ticksid: timestamp.ID,
                    DeviceToken: this.$store.state.native.deviceToken,
                    mobile: this.account,
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
                this.isBaseLoad = false;
                this.$msg.success('登录成功', () => {
                    this.$goBack();
                });
            } catch (err) {
                console.log(err);
                this.isBaseLoad = false;
                this.$msg.fail('登录失败');
            }
        },

        // 展示密码
        showPwd() {
            this.isPwd = !this.isPwd;
            if (this.isPwd) {
                this.$refs.pwdInput.type = 'text';
            } else {
                this.$refs.pwdInput.type = 'password';
            }
        },
    }
};
</script>

<style lang="less" scoped>
.login {
    width: 100%;
    background-color: #fff;
    box-sizing: border-box;
    padding-top: 1.05rem;
    > .nav-title {
        position: fixed;
        top: 0px;
        left: 0px;
        right: 0px;
        height: 1.05rem;
        display: flex;
        padding: 0px 0.3rem;
        background-color: #fff;
        > .arrow {
            width: 1rem;
            display: flex;
            align-items: center;
            > img {
                width: 0.17rem;
                height: 0.31rem;
            }
        }
    }
    > .logo {
        margin-left: 0.33rem;
        margin-top: 0.3rem;
        width: 2.45rem;
        height: 0.73rem;
    }
    > .form {
        margin-top: 1.2rem;
        display: flex;
        flex-direction: column;
        padding: 0px 0.34rem;
        > .account {
            flex: 1;
            height: 1.12rem;
            display: flex;
            border-bottom: 1px solid #e7e8ea;
            position: relative;
            > input {
                height: 100%;
                border: none;
                outline: none;
                width: 100%;
                font-size: 0.24rem;
                font-weight: 500;
                color: #333;
                padding-right: 0.4rem;
                &::placeholder {
                    color: rgba(185, 194, 207, 1);
                }
            }
            > img {
                width: 0.25rem;
                height: 0.25rem;
                position: absolute;
                right: 0px;
                top: 50%;
                transform: translateY(-50%);
            }
        }
        > .pwd {
            flex: 1;
            height: 1.12rem;
            display: flex;
            border-bottom: 1px solid #e7e8ea;
            position: relative;
            > input {
                height: 100%;
                border: none;
                outline: none;
                width: 100%;
                font-size: 0.24rem;
                font-weight: 500;
                color: #333;
                padding-right: 0.4rem;
                &::placeholder {
                    color: rgba(185, 194, 207, 1);
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
    }
    > .login-btn {
        margin-top: 0.85rem;
        display: flex;
        justify-content: center;
        padding: 0px 0.33rem;
        box-sizing: border-box;
        > div {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.86rem;
            font-size: 0.3rem;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            background: rgba(85, 98, 238, 1);
            box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.22);
            border-radius: 6px;
        }
    }
    > .pwd-register {
        margin-top: 0.56rem;
        display: flex;
        justify-content: space-between;
        padding: 0px 0.34rem;
        > .left {
            display: flex;
            span {
                font-size: 0.23rem;
                font-weight: 500;
                color: rgba(18, 28, 50, 1);
                margin-right: 0.2rem;
            }
        }
        > .right {
            display: flex;
            font-size: 0.23rem;
            font-weight: 500;
            color: rgba(85, 98, 236, 1);
        }
    }
}
</style>

