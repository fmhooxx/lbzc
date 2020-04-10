<template>
    <div class="forget-password-three">
        <h2>设置新密码</h2>
        <h3>密码须为字母+数字形式，不能用纯数字/字母为密码</h3>
        <div class="item">
            <input type="password" placeholder="输入新密码" maxlength="16" v-model="firstPwd" />
        </div>
        <div class="item" style="margin-top:0px;">
            <input type="password" placeholder="再次输入新密码" maxlength="16" v-model="secondPwd" />
        </div>
        <div class="btn" @click.stop="submit">完成</div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { base64 } from '_utils/encrypt';
import { isPassword } from '_utils/validate';
import { forgetTwo } from '_api/center';
export default {
    data() {
        return {
            mobile: '',
            firstPwd: '',
            secondPwd: '',
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.mobile = this.$route.query.mobile;
        this.isBaseLoadPage = false;
    },
    computed: {
        isTrue() {
            let one = isPassword(this.firstPwd) && isPassword(this.secondPwd);
            return one && this.firstPwd === this.secondPwd;
        }
    },
    methods: {
        async submit() {
            try {
                this.isBaseLoad = true;
                if (!this.isTrue) {
                    throw '密码格式错误';
                }
                await forgetTwo({
                    Mobile: this.mobile,
                    pwd: base64(this.firstPwd)
                });
                this.$msg.success('设置成功', () => {
                    this.$goUrl('/login');
                });
                this.isBaseLoad = false;
            } catch (err) {
                this.isBaseLoad = false;
                this.$textTip(err);
            }
        }
    },
};
</script>

<style lang="less" scoped>
.forget-password-three {
    padding: 0px 0.3rem;
    > h2 {
        margin-top: 0.1rem;
        font-size: 0.44rem;
        font-weight: bold;
        line-height: normal;
        color: rgba(18, 28, 50, 1);
    }
    > h3 {
        margin-top: 0.1rem;
        font-size: 0.26rem;
        line-height: normal;
        color: rgba(146, 146, 146, 1);
    }
    > .item {
        display: flex;
        margin-top: 1rem;
        height: 1.18rem;
        border-bottom: 1px solid #e7e8ea;
        > input {
            height: 100%;
            border: none;
            outline: none;
            width: 100%;
            font-size: 0.25rem;
            color: rgba(18, 28, 50, 1);
            box-sizing: border-box;
            letter-spacing: 0.05rem;
            &::placeholder {
                font-size: 0.25rem;
                color: #929292;
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
        color: #fff;
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
</style>

