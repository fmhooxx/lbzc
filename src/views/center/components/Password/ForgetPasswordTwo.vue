<template>
    <div class="forget-password-two">
        <h2>请输入验证码</h2>
        <h3>短信验证码已发送至 +86 {{mobile}}</h3>
        <div class="content">
            <div class="item">
                <input
                    v-focus
                    type="tel"
                    maxlength="1"
                    v-model.trim="inp_1"
                    ref="inp_1"
                    @input="inputWrite(1)"
                    @keydown="deleteCode($event)"
                >
            </div>
            <div class="item">
                <input
                    type="tel"
                    maxlength="1"
                    v-model.trim="inp_2"
                    ref="inp_2"
                    @input="inputWrite(2)"
                    @keydown="deleteCode($event)"
                >
            </div>
            <div class="item">
                <input
                    type="tel"
                    maxlength="1"
                    v-model.trim="inp_3"
                    ref="inp_3"
                    @input="inputWrite(3)"
                    @keydown="deleteCode($event)"
                >
            </div>
            <div class="item">
                <input
                    type="tel"
                    maxlength="1"
                    v-model.trim="inp_4"
                    ref="inp_4"
                    @input="inputWrite(4)"
                    @keydown="deleteCode($event)"
                >
            </div>
            <div class="item">
                <input
                    type="tel"
                    maxlength="1"
                    v-model.trim="inp_5"
                    ref="inp_5"
                    @input="inputWrite(5)"
                    @keydown="deleteCode($event)"
                >
            </div>
            <div class="item">
                <input
                    type="tel"
                    maxlength="1"
                    v-model.trim="inp_6"
                    ref="inp_6"
                    @input="inputWrite(6)"
                    @keydown="deleteCode($event)"
                >
            </div>
        </div>
        <div class="btn" @click.stop="next">下一步</div>
        <div class="tip">
            <div class="sendMessage">
                <div class="send" @click.stop="reSend" v-show="showItem=='send'">重新发送验证码</div>
                <div class="resend" v-show="showItem=='resend'">{{time}} 秒后重新发送</div>
            </div>
        </div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getMsgCode, checkCode } from '_api/func';
export default {
    data() {
        return {
            mobile: '',
            inp_1: '',
            inp_2: '',
            inp_3: '',
            inp_4: '',
            inp_5: '',
            inp_6: '',
            showItem: 'resend',
            time: 60,
            timer: null,
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.mobile = this.$route.query.mobile;
        this.countdown();
        this.isBaseLoadPage = false;
    },
    computed: {
        code() {
            return `${this.inp_1}${this.inp_2}${this.inp_3}${this.inp_4}${this.inp_5}${this.inp_6}`;
        }
    },
    methods: {
        // 当前input输入数字之后跳到下一个input输入框
        inputWrite(num) {
            if (this[`inp_${num}`].length > 0) {
                this.$refs[`inp_${num}`].blur();
                if (num == 6) return 0;
                this.$refs[`inp_${num + 1}`].focus();
            }
        },
        // 当键盘输入删除键就回退到第一个
        deleteCode(event) {
            if (event.keyCode == 8) {
                this.toInit();
            }
        },
        toInit() {
            for (let i = 0; i < 6; i++) {
                this[`inp_${i + 1}`] = '';
                this.$refs[`inp_${i + 1}`].blur();
            }
            this.$refs[`inp_${1}`].focus();
        },
        // 加载页面就自动倒计时
        countdown() {
            clearInterval(this.timer);
            this.$nextTick(() => {
                this.timer = setInterval(() => {
                    this.time--;
                    if (this.time == 0) {
                        clearInterval(this.timer);
                        this.time = 60;
                        this.showItem = 'send';
                    }
                }, 1000);
            });
        },
        reSend() {
            this.$textTip('发送成功');
            this.showItem = 'resend';
            this.countdown();
            getMsgCode({
                mobile: this.mobile
            });
        },
        async next() {
            try {
                this.isBaseLoad = true;
                let reg = /\d{6}/;
                if (!reg.test(this.code)) {
                    throw '验证码格式不正确';
                }
                await checkCode({
                    code: this.code,
                    mobile: this.mobile
                });
                this.isBaseLoad = false;
                // this.$goReplace(`/password?type=f3&mobile=${this.mobile}`);
                this.$reloadPage(`/password?type=f3&mobile=${this.mobile}`)
            } catch (err) {
                this.isBaseLoad = false;
                this.toInit();
                this.$textTip(err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.forget-password-two {
    padding: 0px 0.3rem;
    > h2 {
        margin-top: 0.1rem;
        line-height: normal;
        font-size: 0.44rem;
        font-weight: bold;
        color: rgba(18, 28, 50, 1);
    }
    > h3 {
        margin-top: 0.1rem;
        line-height: normal;
        font-size: 0.26rem;
        color: rgba(146, 146, 146, 1);
    }
    > .content {
        height: 1.18rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-around;
        > .item {
            display: flex;
            margin-right: 0.34rem;
            > input {
                text-align: center;
                height: 100%;
                border: none;
                outline: none;
                width: 100%;
                font-size: 0.5rem;
                color: rgba(18, 28, 50, 1);
                font-weight: bold;
                box-sizing: border-box;
                letter-spacing: 0.05rem;
                border-bottom: 1px solid #e7e8ea;
                &::placeholder {
                    font-size: 0.48rem;
                    color: #929292;
                }
            }
        }
    }
    > .btn {
        margin-top: 0.6rem;
        height: 0.86rem;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(85, 98, 238, 1);
        box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.22);
        border-radius: 0.06rem;
        font-size: 0.3rem;
        font-weight: bold;
        color: #fff;
    }
    > .tip {
        margin-top: 0.4rem;
        display: flex;
        justify-content: flex-end;
        > .sendMessage {
            display: flex;
            justify-content: center;
            > .send {
                font-size: 0.26rem;
                color: rgba(85, 98, 238, 1);
            }
            > .resend {
                font-size: 0.28rem;
                color: rgba(146, 146, 146, 1);
            }
        }
    }
}
</style>

