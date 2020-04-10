<template>
    <div class="base-send-msg">
        <div class="top" @click.stop="sendMsg" v-show="showItem=='top'">发送验证码</div>
        <div class="bottom" v-show="showItem=='bottom'">{{time}} 秒</div>
    </div>
</template>
<script>
import { getMsgCode, checkImgCode } from '_api/func';
import { isPhoneNum } from '_utils/validate';
export default {
    props: {
        mobile: {
            type: String,
            required: true
        },
        needImgCode: {
            type: Boolean,
            default: false
        },
        imgCode: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            showItem: 'top',
            time: 60
        };
    },
    methods: {
        // 点击发送短信验证码
        async sendMsg() {
            try {
                if (this.needImgCode) {
                    if (!this.imgCode) {
                        throw '填写图文验证码';
                    }
                    await checkImgCode({ code: this.imgCode });
                }
                if (!isPhoneNum(this.mobile)) return this.$textTip('手机号码输入有误');
                getMsgCode({
                    mobile: this.mobile
                });
                this.showItem = 'bottom';
                var timer = setInterval(() => {
                    this.time--;
                    if (this.time == 0) {
                        clearInterval(timer);
                        this.time = 60;
                        this.showItem = 'top';
                    }
                }, 1000);
            } catch (err) {
                this.$textTip(err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.base-send-msg {
    display: flex;
    justify-content: center;
    > .top {
        font-size: 0.26rem;
        font-weight: bold;
        color: rgba(85, 98, 238, 1);
    }
    > .bottom {
        font-size: 0.26rem;
        font-weight: bold;
        color: #000;
    }
}
</style>

