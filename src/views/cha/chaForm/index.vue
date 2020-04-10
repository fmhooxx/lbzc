<template>
    <div class="cha-form" ref="chaZhengSon">
        <base-nav v-if="arg">{{arg.title|threePoints(14)}}</base-nav>
        <base-top></base-top>
        <div v-if="arg" class="content">
            <img class="top" :src="arg.pic" />
            <div class="center">
                <div class="wrap">
                    <div class="item">
                        <div>姓名</div>
                        <div>
                            <input type="text" placeholder="请输入您的姓名" v-model="username" />
                        </div>
                    </div>
                    <div class="item">
                        <div>身份证</div>
                        <div>
                            <input type="text" placeholder="请输入您的身份证" v-model="idCard" />
                        </div>
                    </div>
                    <div class="item">
                        <div>手机号</div>
                        <div>
                            <input type="text" placeholder="请输入您的手机号" v-model="mobile" />
                        </div>
                    </div>
                    <div class="yanzhengma">
                        <div>验证码</div>
                        <div>
                            <input type="text" placeholder="请输入图像验证码" v-model="imgCode" />
                            <img @click.stop="getImgCode" :src="base64Img" />
                        </div>
                    </div>
                    <div class="btn" @click.stop="submit">
                        <div>立即查询</div>
                    </div>
                    <div class="xy">
                        <img
                            v-if="agree"
                            @click.stop="agree=!agree"
                            src="@/assets/images/select-3.png"
                        />
                        <img
                            v-if="!agree"
                            @click.stop="agree=!agree"
                            src="@/assets/images/select-4.png"
                        />
                        <div>
                            我阅读并同意
                            <i @click.stop="$goUrl('/agree?id=10')">《数据分析授权协议》</i>
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class="text">
                        <div
                            class="left"
                            @click.stop="$goUrl(`/chaZhengReport?arg=${$route.query.arg}&demo=1`)"
                        >
                            <img src="@/assets/images/file-1.png" />
                            <div>样例报告</div>
                        </div>
                        <div class="right" @click.stop="$goUrl('/chaRecord')">
                            <img src="@/assets/images/clock-1.png" />
                            <div>历史报告</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <base-pay v-if="isBasePay" :isBasePay.sync="isBasePay" :arg="arg" :orderId="orderId"></base-pay>
        <base-load v-if="isBaseLoad"></base-load>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import { getImgCode } from '_api/func';
import { sumitZXForm, getUserInfo } from '_api/cha';
export default {
    data() {
        return {
            uid: '',
            arg: null,
            agree: true,
            isBasePay: false,
            isBaseLoad: false,
            isBaseLoadPage: true,
            imgCode: '',
            base64Img: '',
            username: '',
            idCard: '',
            mobile: '',
            zx_id: '',
            orderId: ''
        };
    },
    async mounted() {
        try {
            let uid = this.$route.query.uid;
            this.uid = this.$initUid(uid);
            this.arg = JSON.parse(decodeURIComponent(this.$route.query.arg));
            await this.getImgCode();
            let user = await getUserInfo();
            if (user) {
                this.username = user.TrueName;
                this.mobile = user.Mobile;
                this.idCard = user.CardNo;
            }
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    computed: {
        from() {
            // from: 1：首页 2：融客店
            // 0：自己提交  1 ：通过推荐提交
            let leavel = this.$getUser().Mtype;
            return leavel >= 2 ? 0 : 1;
        }
    },
    methods: {
        async getImgCode() {
            let imgBuffer = await getImgCode();
            let imgString = new Buffer(imgBuffer, 'binary').toString('base64');
            this.base64Img = `data:image/png;base64,${imgString}`;
        },
        // 提交表单
        async submit() {
            try {
                this.isBaseLoad = true;
                if (!this.agree) throw '请同意授权协议';
                let order = await sumitZXForm({
                    username: this.username,
                    idCard: this.idCard,
                    mobile: this.mobile,
                    type: this.from, // 0：自己提交  1 ：通过推荐提交
                    uid: this.uid,
                    zx_id: this.arg.ID,
                    code: this.imgCode
                });
                this.orderId = order.id; // 49447
                this.isBasePay = true;
                this.isBaseLoad = false;
            } catch (err) {
                this.isBaseLoad = false;
                this.$textTip(err);
            }
        }
    }
};
</script>


<style lang="less" scoped>
.cha-form {
    padding-bottom: 1rem;
    background-color: rgb(246, 246, 246);
    > .content {
        > .top {
            width: 100%;
            height: 3.99rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            box-sizing: border-box;
            overflow: hidden;
        }
        > .center {
            width: 100%;
            padding: 0px 0.4rem;
            box-sizing: border-box;
            margin-top: -1rem;
            position: relative;
            > .wrap {
                padding: 0px 0.4rem;
                overflow: hidden;
                background-color: #fff;
                border-radius: 0.15rem;
                > .item {
                    margin-top: 0.5rem;
                    border-bottom: 1px solid rgb(241, 241, 241);
                    > div {
                        &:nth-child(1) {
                            font-size: 0.29rem;
                            font-weight: bold;
                            color: rgba(41, 47, 61, 1);
                        }
                        &:nth-child(2) {
                            margin-top: 0.1rem;
                            display: flex;
                            align-items: center;
                            height: 0.85rem;
                            > input {
                                height: 100%;
                                border: none;
                                outline: none;
                                font-size: 0.25rem;
                                &::placeholder {
                                    font-size: 0.25rem;
                                    font-family: PingFang-SC-Regular;
                                    font-weight: 400;
                                    color: rgba(173, 173, 173, 1);
                                }
                            }
                        }
                    }
                }
                > .yanzhengma {
                    margin-top: 0.5rem;
                    border-bottom: 1px solid rgb(241, 241, 241);
                    > div {
                        &:nth-child(1) {
                            font-size: 0.29rem;
                            font-weight: bold;
                            color: rgba(41, 47, 61, 1);
                        }
                        &:nth-child(2) {
                            margin-top: 0.1rem;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;
                            height: 0.85rem;
                            > input {
                                height: 100%;
                                border: none;
                                outline: none;
                                font-size: 0.25rem;
                                &::placeholder {
                                    font-size: 0.25rem;
                                    font-weight: 400;
                                    color: rgba(173, 173, 173, 1);
                                }
                            }
                            > img {
                                width: 1.5rem;
                                height: 0.48rem;
                            }
                        }
                    }
                }
                > .btn {
                    margin-top: 0.68rem;
                    height: 0.86rem;
                    background: rgba(85, 98, 238, 1);
                    box-shadow: 0px 0.12rem 0.28rem 1px rgba(85, 98, 238, 0.3);
                    border-radius: 0.06rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.3rem;
                    font-weight: bold;
                    > div {
                        color: rgba(255, 255, 255, 1);
                    }
                }
                > .xy {
                    margin-top: 0.35rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    > img {
                        width: 0.22rem;
                        height: 0.22rem;
                        transform: translateY(-0.02rem);
                    }
                    > div {
                        margin-left: 0.1rem;
                        font-size: 0.23rem;
                        font-weight: 400;
                        color: rgba(157, 157, 157, 1);
                        > i {
                            color: #5461eb;
                        }
                    }
                }
                > .line {
                    margin-top: 0.6rem;
                    width: 6.6rem;
                    height: 1px;
                    position: relative;
                    border-top: 1px dashed #e7e8ea;
                    transform: translateX(-0.35rem);
                    &:before {
                        content: '';
                        position: absolute;
                        top: -0.25rem;
                        left: -0.3rem;
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 100%;
                        background-color: rgb(246, 246, 246);
                    }
                    &:after {
                        content: '';
                        position: absolute;
                        top: -0.25rem;
                        right: -0.3rem;
                        width: 0.5rem;
                        height: 0.5rem;
                        border-radius: 100%;
                        background-color: rgb(246, 246, 246);
                    }
                }
                > .text {
                    height: 1.14rem;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    > div {
                        line-height: normal;
                        display: flex;
                        align-items: center;
                        > img {
                            width: 0.32rem;
                            height: 0.32rem;
                            transform: translateY(-0.01rem);
                        }
                        > div {
                            margin-left: 0.15rem;
                            font-size: 0.29rem;
                            font-weight: bold;
                            color: rgba(41, 47, 61, 1);
                        }
                    }
                }
            }
        }
    }
}
</style>

