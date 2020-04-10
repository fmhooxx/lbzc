<template>
    <div class="reset-password">
        <h3>修改登录密码</h3>
        <h4>密码须为字母+数字形式，不能用纯数字/字母为密码</h4>
        <div class="formTable">
            <div class="item">
                <span>原密码</span>
                <div>
                    <input type="password" placeholder="请输入原密码" v-model.trim="oldpass">
                </div>
            </div>
            <div class="item">
                <span>新密码</span>
                <div>
                    <input type="password" placeholder="请输入新密码" v-model.trim="newpass">
                </div>
            </div>
            <div class="item">
                <span>确认密码</span>
                <div>
                    <input type="password" placeholder="请再次确认密码" v-model.trim="repass">
                </div>
            </div>
        </div>
        <div class="btn" @click.stop="submit">确定</div>
        <BaseLoad v-if="isBaseLoad"></BaseLoad>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { savePassword } from '_api/center';
import { textEncrypt } from '_utils/encrypt';
import { removeAll } from '_utils/local';
export default {
    data() {
        return {
            oldpass: '',
            newpass: '',
            repass: '',
            isBaseLoad: false,
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.isBaseLoadPage = false;
    },
    computed: {
        isNull() {
            if (
                this.$isNull(this.oldpass) ||
                this.$isNull(this.newpass) ||
                this.$isNull(this.repass)
            ) {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
        async submit() {
            try {
                this.isBaseLoad = true;
                if (this.isNull) {
                    throw '不能为空';
                }
                await savePassword({
                    oldpass: textEncrypt(this.oldpass),
                    newpass: textEncrypt(this.newpass),
                    repass: textEncrypt(this.repass)
                });
                removeAll();
                this.isBaseLoad = false;
                this.$msg.success('退出成功', () => {
                    this.$goReplace('/login');
                });
            } catch (err) {
                this.$textTip(err);
                this.isBaseLoad = false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.reset-password {
    padding: 0px 0.3rem;
    > h3 {
        margin-top: 0.45rem;
        font-size: 0.46rem;
        font-weight: bold;
        color: rgba(18, 28, 50, 1);
    }
    > h4 {
        margin-top: 0.2rem;
        font-size: 0.27rem;
        color: rgba(146, 146, 146, 1);
    }
    > .formTable {
        margin-top: 0.65rem;
        > .item {
            display: flex;
            align-items: center;
            height: 1.06rem;
            box-sizing: border-box;
            border-bottom: 1px solid #e5e5e5;
            &:last-child {
                > div {
                    margin-left: 0px;
                }
            }
            > span {
                font-size: 0.24rem;
                font-weight: bold;
                color: rgba(18, 28, 50, 1);
            }
            > div {
                display: flex;
                flex: 1;
                height: 100%;
                margin-left: 0.2rem;
                > input {
                    border: none;
                    outline: none;
                    height: 100%;
                    width: 100%;
                    box-sizing: border-box;
                    padding: 0px 0.4rem;
                    font-size: 0.24rem;
                    color: #333;
                    &::placeholder {
                        color: rgba(185, 194, 207, 1);
                    }
                }
            }
        }
    }
    > .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.62rem;
        height: 0.86rem;
        background: rgba(85, 98, 238, 1);
        box-shadow: 0px 12px 28px 1px rgba(85, 98, 238, 0.22);
        border-radius: 0.06rem;
        font-size: 0.31rem;
        font-weight: bold;
        color: #fff;
    }
}
</style>

