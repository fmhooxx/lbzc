<template>
    <div class="about">
        <BaseNav>关于我们</BaseNav>
        <BaseTop></BaseTop>
        <BasePlaceholder></BasePlaceholder>
        <div class="content">
            <div class="item" @click.stop="isPublicAccount=true">
                <div>
                    <span>关注公众号</span>
                    <img src="@images/arrow-2.png">
                </div>
            </div>
            <div class="item" @click.stop="isBasePop=true">
                <div style="border-bottom: none;">
                    <span>微信客服</span>
                    <img src="@images/arrow-2.png">
                </div>
            </div>
            <BasePlaceholder></BasePlaceholder>
            <div class="item" @click.stop="$router.push('/agree?id=1')">
                <div style=" border-bottom: none;">
                    <span>企业简介</span>
                    <img src="@images/arrow-2.png">
                </div>
            </div>
        </div>
        <PublicAccount v-if="isPublicAccount" :show.sync="isPublicAccount"></PublicAccount>
        <BasePop v-if="isBasePop" :isBasePop.sync="isBasePop" text="微信客服" @confirm="copy">复制</BasePop>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getBaseicInfo } from '_api/func';
import PublicAccount from '../components/About/PublicAccount';
export default {
    components: { PublicAccount },
    data() {
        return {
            serviceAccount: '',
            isBasePop: false,
            isPublicAccount: false,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            await this.getBaseicInfo();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getBaseicInfo() {
            this.serviceAccount = (await getBaseicInfo({
                name: 'QQa'
            })).QQa;
        },
        copy() {
            this.$copy(this.serviceAccount);
            this.isBasePop = false;
        }
    },
    beforeRouteEnter(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.style.backgroundColor = '#fff';
        next();
    }
};
</script>

<style lang="less" scoped>
.about {
    .content {
        margin-top: 0.2rem;
        background-color: #fff;
        > .item {
            padding: 0px 0.3rem;
            div {
                height: 1.16rem;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #e5e5e5;
                img {
                    width: 0.12rem;
                    height: 0.23rem;
                }
                span {
                    font-size: 0.26rem;
                    color: #000;
                }
            }
        }
    }
}
</style>

