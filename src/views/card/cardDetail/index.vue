<template>
    <div class="card-detail">
        <base-nav>{{cardInfo?cardInfo.info.Name:""|threePoints(14)}}</base-nav>
        <base-top></base-top>
        <div v-if="cardInfo" class="content">
            <div class="card" :style="{backgroundImage:`url(${cardInfo.info.Logurl})`}"></div>
            <div v-if="cardInfo.QuanycontsArr" class="qy">
                <div class="qy-title">
                    <span class="icon"></span>
                    <span class="text">权益</span>
                </div>

                <div class="qy-item" v-for="(item,index) in cardInfo.QuanycontsArr" :key="index">
                    <span class="icon"></span>
                    <span class="text">{{item}}</span>
                </div>

                <div style="height:0.4rem"></div>

                <base-placeholder></base-placeholder>
            </div>

            <div class="baseInfo">
                <span class="icon"></span>
                <span class="text">基本信息</span>
            </div>

            <div class="baseInfo-item">
                <span class="icon"></span>
                <span class="text">
                    <div class="textLeft">年费：{{cardInfo.info.Yearfee}}</div>
                    <div class="textRight">（{{cardInfo.info.Yeardesc}}）</div>
                </span>
            </div>

            <div class="baseInfo-item">
                <span class="icon"></span>
                <span class="text">
                    <div class="textLeft">积分：{{cardInfo.info.Jifen1}}</div>
                    <div class="textRight">（{{cardInfo.info.Jifen2}}）</div>
                </span>
            </div>

            <div class="baseInfo-item">
                <span class="icon"></span>
                <span class="text">
                    <div class="textLeft">免息期：{{cardInfo.info.Freetime}}</div>
                    <div class="textRight">（从刷卡日起至到期还款日止）</div>
                </span>
            </div>

            <div class="baseInfo-item">
                <span class="icon"></span>
                <span class="text">
                    <div class="textLeft">等级：{{cardInfo.info.Katype}}</div>
                </span>
            </div>

            <div class="baseInfo-item">
                <span class="icon"></span>
                <span class="text">
                    <div class="textLeft">发卡组织：</div>
                    <img src="@images/card-1.png" />
                </span>
            </div>
            <div class="btn" @click.stop="apply">
                <div :style="{backgroundImage:`url(${require('@images/btn-1.png')})`}">立即申请</div>
            </div>
        </div>
        <base-bottom></base-bottom>
        <base-pro-apply
            v-if="isBaseProApply"
            :product="cardInfo"
            :isBaseProApply.sync="isBaseProApply"
        ></base-pro-apply>
        <base-real-pop v-if="isBaseRealPop" :isBaseRealPop.sync="isBaseRealPop"></base-real-pop>
        <base-login-pop v-if="isBaseLoginPop" :isBaseLoginPop.sync="isBaseLoginPop"></base-login-pop>
        <base-load v-if="isBaseLoad" :isBaseLoad="isBaseLoad"></base-load>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import { getItemDetail } from '_api/card';
import { checkRealName } from '_api/func';
export default {
    data: () => {
        return {
            id: '',
            uid: '',
            cardInfo: null,
            isBaseProApply: false,
            isBaseRealPop: false,
            isBaseLoginPop: false,
            isBaseLoad: false,
            isBaseLoadPage: true
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
                this.cardInfo = r.data;
                this.$tabTitle(this.cardInfo.info.Name);
            }
        },
        async apply() {
            if (!this.$getToken()) {
                // return this.$goUrl('/login');
                return (this.isBaseLoginPop = true);
            }
            try {
                this.isBaseLoad = true;
                await checkRealName();
                this.isBaseProApply = true;
                this.isBaseLoad = false;
            } catch (err) {
                this.isBaseLoad = false;
                this.isBaseRealPop = true;
                this.$textTip(err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.card-detail {
    background-color: #fff;
    > .content {
        > .card {
            margin: 0 auto;
            margin-top: 0.54rem;
            width: 3.99rem;
            height: 2.44rem;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            box-shadow: 0px 0.08rem 0.2rem 0px rgba(20, 112, 180, 0.18);
        }
        > .qy {
            > .qy-title {
                margin-top: 0.76rem;
                display: flex;
                align-items: center;
                padding: 0px 0.3rem;
                box-sizing: border-box;
                > .icon {
                    width: 0.04rem;
                    height: 0.31rem;
                    background-color: rgb(84, 97, 235);
                }
                > .text {
                    margin-left: 0.25rem;
                    font-size: 0.3rem;
                    font-weight: bold;
                    line-height: normal;
                    color: rgba(41, 47, 61, 1);
                }
            }
            > .qy-item {
                margin-top: 0.22rem;
                display: flex;
                align-items: center;
                padding: 0px 0.3rem;
                > .icon {
                    flex-shrink: 0;
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    transform: translateY(-0.02rem);
                    background: rgba(84, 97, 235, 1);
                }
                > .text {
                    margin-left: 0.18rem;
                    font-size: 0.24rem;
                    font-weight: 500;
                    color: rgba(99, 99, 99, 1);
                }
            }
        }

        > .baseInfo {
            margin-top: 0.6rem;
            display: flex;
            align-items: center;
            padding: 0px 0.3rem;
            box-sizing: border-box;
            > .icon {
                width: 0.04rem;
                height: 0.31rem;
                background-color: rgb(84, 97, 235);
            }
            > .text {
                margin-left: 0.25rem;
                font-size: 0.3rem;
                font-weight: bold;
                line-height: normal;
                color: rgba(41, 47, 61, 1);
            }
        }
        > .baseInfo-item {
            margin-top: 0.22rem;
            display: flex;
            align-items: center;
            padding: 0px 0.3rem;
            box-sizing: border-box;
            position: relative;
            > .icon {
                position: absolute;
                top: 0.05rem;
                width: 5px;
                height: 5px;
                background: rgba(84, 97, 235, 1);
                border-radius: 50%;
            }
            > .text {
                margin-left: 0.26rem;
                display: flex;
                > .textLeft {
                    font-size: 0.24rem;
                    font-weight: 500;
                    color: #292f3d;
                    white-space: nowrap;
                }
                > .textRight {
                    font-size: 0.24rem;
                    font-weight: 500;
                    color: #969595;
                }
                > img {
                    width: 0.48rem;
                    height: 0.31rem;
                }
            }
        }
        > .btn {
            margin-top: 0.9rem;
            margin-bottom: 0.5rem;
            display: flex;
            padding: 0px 0.3rem;
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

