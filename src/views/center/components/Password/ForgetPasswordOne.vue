<template>
    <div class="forget-password-one">
        <h2>找回密码</h2>
        <div class="inputContent">
            <input type="tel" placeholder="请输入注册手机号" maxlength="11" v-model="mobile">
        </div>
        <div class="btn" @click.stop="next">下一步</div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { checkVip } from '_api/center';
import { getMsgCode } from '_api/func';
export default {
    data() {
        return {
            mobile: '',
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.isBaseLoadPage = false;
    },
    methods: {
        async next() {
            try {
                this.isBaseLoad = true;
                if (this.$isNull(this.mobile)) {
                    throw '手机号码不能为空';
                }
                await checkVip({
                    Mobile: this.mobile
                });
                await getMsgCode({
                    mobile: this.mobile
                });
                this.isBaseLoad = false;
                // this.$goReplace(`/password?type=f2&mobile=${this.mobile}`);
                this.$reloadPage(`/password?type=f2&mobile=${this.mobile}`)
            } catch (err) {
                this.$textTip(err);
                this.isBaseLoad = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.forget-password-one {
    padding: 0px 0.3rem;
    > h2 {
        margin-top: 0.4rem;
        font-size: 0.44rem;
        font-weight: bold;
        color: rgba(18, 28, 50, 1);
    }
    > .inputContent {
        display: flex;
        margin-top: 1rem;
        height: 1.18rem;
        border-bottom: 1px solid #e7e8ea;
        > input {
            height: 100%;
            border: none;
            outline: none;
            width: 100%;
            font-size: 0.48rem;
            color: rgba(18, 28, 50, 1);
            box-sizing: border-box;
            letter-spacing: 0.05rem;
            &::placeholder {
                font-size: 0.48rem;
                color: #929292;
            }
        }
    }
    > .btn {
        margin-top: 1.29rem;
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
}
</style>

