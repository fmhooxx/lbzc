<template>
    <section class="dai-detail">
        <base-nav>{{proInfo?proInfo.info.Name:""|threePoints(8)}}</base-nav>
        <base-top></base-top>
        <div v-if="proInfo" class="content">
            <div class="nameplate">
                <img :src="proInfo.info.Logurl" />
                <div class="desc">
                    <div>
                        <span>{{proInfo.info.Name}}</span>
                        <img src="@images/hot.png" />
                    </div>
                    <div>{{proInfo.info.Intro}}</div>
                    <div>{{proInfo.info.PassRate}}通过率</div>
                </div>
            </div>
            <div class="numberList">
                <div>
                    <div class="numberList-content">
                        <span>额度（元）</span>
                        <span>{{proInfo.info.eduname}}</span>
                    </div>
                </div>
                <div>
                    <div class="numberList-content">
                        <span>借款期限</span>
                        <span>{{proInfo.info.Jkdays}}</span>
                    </div>
                </div>
                <div>
                    <div class="numberList-content">
                        <span>日费率</span>
                        <span>{{proInfo.info.DayfeeRate}}</span>
                    </div>
                </div>
            </div>
            <base-placeholder></base-placeholder>
            <div class="condition">
                <div class="title">
                    <div></div>
                    <div>申请条件</div>
                </div>
                <div class="join-list">
                    <div class="item" v-for="(item,index) in proInfo.info.Jjcondition" :key="index">
                        <span></span>
                        <span>{{item}}</span>
                    </div>
                </div>
            </div>
            <div class="cailiao">
                <div class="title">
                    <div></div>
                    <div>所需材料</div>
                </div>
                <div class="content">
                    <div v-for="(cai,index) in proInfo.condition" :key="index">{{cai}}</div>
                </div>
            </div>
            <div class="img">
                <img src="@images/file-2.png" alt />
                <div>
                    申请人数
                    <i>{{proInfo.info.AppNumbs}}人</i>
                </div>
            </div>
            <div class="btn" @click.stop="apply">
                <div :style="{backgroundImage:`url(${require('@images/btn-1.png')})`}">立即申请</div>
            </div>
        </div>

        <base-bottom></base-bottom>
        <base-pro-apply
            v-if="isBaseProApply"
            :product="proInfo"
            :isBaseProApply.sync="isBaseProApply"
        ></base-pro-apply>
        <base-real-pop v-if="isBaseRealPop" :isBaseRealPop.sync="isBaseRealPop"></base-real-pop>
        <base-login-pop v-if="isBaseLoginPop" :isBaseLoginPop.sync="isBaseLoginPop"></base-login-pop>
        <base-load v-if="isBaseLoad" :isBaseLoad="isBaseLoad"></base-load>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </section>
</template>
<script>
import { getItemDetail } from '_api/dai';
import { checkRealName, checkYJ } from '_api/func';
export default {
    data() {
        return {
            id: '',
            uid: '',
            proInfo: null,
            isBaseLoad: false,
            isBaseLoadPage: true,
            isBaseProApply: false,
            isBaseRealPop: false,
            isBaseLoginPop: false
        };
    },
    async mounted() {
        try {
            this.id = this.$route.query.id;
            let uid = this.$route.query.uid;
            this.uid = this.$initUid(uid);
            await this.getItemDetail();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    computed: {
        isCPA() {
            if (this.proInfo && this.proInfo.info.D_type == 2 && this.proInfo.info.Itype == 1) {
                return true;
            } else {
                false;
            }
        }
    },
    methods: {
        async getItemDetail() {
            let r = await getItemDetail({
                id: this.id
            });
            if (r.result == 100010) {
                // 商品下架转到融科店首页
                this.$msg.fail('商品下架', () => {
                    this.$goUrl('/Daibeishop/platweb');
                });
            } else {
                this.proInfo = r.data;
                this.$tabTitle(this.proInfo.info.Name);
            }
        },
        // 申请商品
        async apply() {
            if (!this.$getToken()) {
                // return this.$goUrl('/login');
                return (this.isBaseLoginPop = true);
            }
            try {
                this.isBaseLoad = true;
                await checkRealName();
                if (this.isCPA) {
                    if (!(await this.checkYJ())) {
                        throw 'yjErr';
                    }
                }
                this.isBaseProApply = true;
                this.isBaseLoad = false;
            } catch (err) {
                this.isBaseLoad = false;
                if (err != 'yjErr') {
                    this.isBaseRealPop = true;
                    this.$textTip(err);
                }
            }
        },
        async checkYJ() {
            try {
                await checkYJ({
                    id: this.id,
                    uid: this.uid
                });
                return true;
            } catch (err) {
                this.$textTip(err);
                return false;
            }
        }
    }
};
</script>
<style lang="less" scoped>
.dai-detail {
    background-color: #fff;
    > .content {
        > .nameplate {
            display: flex;
            align-items: center;
            width: 6.9rem;
            height: 2.53rem;
            background-image: linear-gradient(
                to right bottom,
                rgb(52, 129, 255),
                rgb(55, 181, 255)
            );
            border-top-left-radius: 0.16rem;
            border-top-right-radius: 0.16rem;
            margin: 0 auto;
            margin-top: 0.27rem;
            > img {
                margin-left: 1.15rem;
                width: 0.97rem;
                height: 0.97rem;
                margin-right: 0.52rem;
            }
            > .desc {
                height: 100%;
                display: flex;
                flex-direction: column;
                > div:nth-child(1) {
                    > span {
                        color: #fff;
                        font-weight: bold;
                        font-size: 0.36rem;
                    }
                    > img {
                        margin-left: 0.2rem;
                        transform: translateY(-0.14rem);
                        width: 0.56rem;
                        height: 0.2rem;
                    }
                }
                > div:nth-child(2) {
                    margin-top: 0.2rem;
                    font-size: 0.24rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                }
                > div:nth-child(3) {
                    margin-top: 0.2rem;
                    font-size: 0.24rem;
                    font-weight: 500;
                    color: rgba(255, 255, 255, 1);
                }
            }
        }
        > .numberList {
            display: flex;
            align-items: center;
            height: 1.65rem;
            > div {
                flex: 1;
                display: flex;
                align-items: center;
                flex-direction: column;
                > .numberList-content {
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                    > span:first-child {
                        font-size: 0.22rem;
                        font-weight: 500;
                        color: rgba(115, 115, 115, 1);
                        line-height: 0.22rem;
                    }
                    > span:last-child {
                        margin-top: 0.23rem;
                        font-size: 0.3rem;
                        font-weight: bold;
                        color: rgba(41, 47, 61, 1);
                        line-height: 0.43rem;
                    }
                }
            }
            > div:nth-child(2) {
                border-left: 1px solid #f4f4f4;
                border-right: 1px solid #f4f4f4;
            }
            div:nth-child(3) {
                > .numberList-content {
                    > span:last-child {
                        margin-top: 0.23rem;
                        font-size: 0.3rem;
                        font-weight: bold;
                        color: #ff3c00;
                        line-height: 0.43rem;
                    }
                }
            }
        }
        > .condition {
            margin-top: 0.4rem;
            padding: 0px 0.3rem;
            > .title {
                display: flex;
                align-items: center;
                > div {
                    &:nth-child(1) {
                        height: 0.31rem;
                        width: 0.04rem;
                        background-color: rgb(84, 97, 235);
                    }
                    &:nth-child(2) {
                        margin-left: 0.26rem;
                        font-size: 0.31rem;
                        font-weight: bold;
                        line-height: normal;
                        color: rgba(41, 47, 61, 1);
                    }
                }
            }
            > .content {
                margin-top: 0.2rem;
                > div {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    height: 0.49rem;
                    padding: 0px 0.23rem;
                    background: rgba(54, 161, 255, 0.1);
                    border-radius: 0.24rem;
                    font-size: 0.23rem;
                    font-weight: bold;
                    color: rgba(52, 131, 255, 1);
                    margin-bottom: 0.08rem;
                    margin-right: 0.22rem;
                }
            }
            > .join-list {
                > .item {
                    position: relative;
                    padding: 0.15rem 0px;
                    display: flex;
                    align-items: center;
                    span:nth-child(1) {
                        position: absolute;
                        top: 0.24rem;
                        width: 5px;
                        height: 5px;
                        border-radius: 50%;
                        background-color: #5461eb;
                    }
                    > span:nth-child(2) {
                        margin-left: 0.2rem;
                        font-size: 0.26rem;
                        line-height: 0.34rem;
                        font-weight: 500;
                        color: #636363;
                    }
                    &:first-child {
                        margin-top: 10px;
                    }
                }
            }
        }

        > .cailiao {
            margin-top: 0.4rem;
            padding: 0px 0.3rem;
            > .title {
                display: flex;
                align-items: center;
                > div {
                    &:nth-child(1) {
                        height: 0.31rem;
                        width: 0.04rem;
                        background-color: rgb(84, 97, 235);
                    }
                    &:nth-child(2) {
                        margin-left: 0.26rem;
                        font-size: 0.31rem;
                        font-weight: bold;
                        line-height: normal;
                        color: rgba(41, 47, 61, 1);
                    }
                }
            }
            > .content {
                margin-top: 0.2rem;
                > div {
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    height: 0.4rem;
                    padding: 0px 0.23rem;
                    background: rgba(54, 161, 255, 0.1);
                    border-radius: 0.2rem;
                    font-size: 0.23rem;
                    color: rgba(52, 131, 255, 1);
                    margin-bottom: 0.08rem;
                    margin-right: 0.22rem;
                }
            }
        }

        > .img {
            margin-top: 0.7rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            > img {
                width: 2.27rem;
                height: 2.24rem;
            }
            > div {
                background-size: 100% 100%;
                background-repeat: no-repeat;
                font-size: 0.28rem;
                font-weight: bold;
                color: rgba(150, 150, 150, 1);
                > i {
                    color: #5461eb;
                }
            }
        }
        > .btn {
            margin-top: 0.5rem;
            margin-bottom: 0.5rem;
            display: flex;
            padding: 0rem 0.3rem;
            > div {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 0.82rem;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                border-radius: 0.4rem;
                font-size: 0.31rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
            }
        }
    }
}
</style>
