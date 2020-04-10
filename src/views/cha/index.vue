<template>
    <div class="cha" ref="chaZheng">
        <BaseNav v-if="isZx">征信查询</BaseNav>
        <BaseTop v-if="isZx"></BaseTop>
        <img v-if="zhengxinList" class="top" :src="zhengxinList.pic" />
        <div v-if="zhengxinList" class="center">
            <div
                class="item"
                v-for="item in zhengxinList.data"
                :key="`zhengxin_${item.ID}`"
                @click.stop="goFormPage(item)"
            >
                <div class="left">
                    <div class="c-1">
                        <div>{{item.title}}</div>
                        <div>¥{{item.price}}</div>
                    </div>
                    <div class="c-2">
                        <div v-for="(son,index) in item.description" :key="index">{{son}}</div>
                    </div>
                </div>
                <img class="right" src="@/assets/images/arrow-4.png" />
            </div>
        </div>
        <base-bottom style="backgroundColor:rgb(246, 246, 246)"></base-bottom>
        <base-real-pop v-if="isBaseRealPop" :isBaseRealPop.sync="isBaseRealPop"></base-real-pop>
        <base-login-pop v-if="isBaseLoginPop" :isBaseLoginPop.sync="isBaseLoginPop"></base-login-pop>
        <base-load v-if="isBaseLoad"></base-load>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
        <base-bottom-nav v-if="!isZx"></base-bottom-nav>
    </div>
</template>
<script>
import scroll from '_mixins/scroll';
import { getZhengxinList } from '_api/cha';
import { checkRealName } from '_api/func';

export default {
    mixins: [scroll],
    data() {
        return {
            zhengxinList: null,
            isRealName: false,
            isBaseLoad: false,
            isBaseLoadPage: true,
            isBaseLoginPop: false,
            isBaseRealPop: false
        };
    },
    computed: {
        isZx() {
            let name = this.$route.name;
            if (name == 'zx') {
                return true;
            } else {
                return false;
            }
        }
    },
    async activated() {
        try {
            this.$initUid(this.$route.query.uid);
            this.zhengxinList = await getZhengxinList();
            this.preloadImg(this.zhengxinList.data);
            if (!this.$getToken()) {
                this.isRealName = false;
                throw '没有登录';
            }
            await checkRealName();
            this.isRealName = true;
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async goFormPage(item) {
            if (this.isRealName) {
                let arg = encodeURIComponent(JSON.stringify(item));
                this.$goUrl(`/chaForm?arg=${arg}`);
                return;
            }
            if (!this.$getToken()) {
                // return this.$goUrl('/login');
                return (this.isBaseLoginPop = true);
            }
            try {
                this.isBaseLoad = true;
                await this.$waitTime(300);
                await checkRealName();
                let arg = encodeURIComponent(JSON.stringify(item));
                this.$goUrl(`/chaForm?arg=${arg}`);
                this.isBaseLoad = false;
            } catch (err) {
                this.isBaseLoad = false;
                this.isBaseRealPop = true;
                this.$textTip(err);
            }
        },
        // 预加载图片
        preloadImg(imgArr) {
            if (!imgArr.length > 0) return;
            for (let i = 0; i < imgArr.length; i++) {
                let img = new Image();
                img.src = imgArr[i].pic;
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        document.documentElement.style.backgroundColor = 'rgb(246, 246, 246)';
        next();
    },
    beforeRouteLeave(to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        document.documentElement.style.backgroundColor = '#fff';
        next();
    }
};
</script>

<style lang="less" scoped>
.cha {
    background-color: rgb(246, 246, 246);
    > .top {
        width: 100%;
        height: 3.99rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        box-sizing: border-box;
        overflow: hidden;
    }
    > .center {
        padding: 0px 0.3rem;
        margin-top: -0.7rem;
        > .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 0.55rem;
            padding-right: 0.4rem;
            height: 2.41rem;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0px 0.1rem 0.28rem 0.01rem rgba(175, 205, 255, 0.32);
            border-radius: 0.14rem;
            margin-bottom: 0.44rem;
            position: relative;
            > .left {
                > .c-1 {
                    display: flex;
                    align-items: baseline;
                    > div {
                        &:nth-child(1) {
                            font-size: 0.35rem;
                            font-weight: bold;
                            color: rgba(41, 47, 61, 1);
                        }
                        &:nth-child(2) {
                            display: flex;
                            align-items: center;
                            margin-left: 0.18rem;
                            padding: 0px 0.1rem;
                            padding-top: 0.02rem;
                            border: 1px solid rgba(82, 117, 244, 1);
                            border-radius: 0.14rem;
                            font-size: 0.22rem;
                            line-height: 1;
                            font-weight: 400;
                            color: rgba(82, 117, 244, 1);
                        }
                    }
                }
                > .c-2 {
                    margin-top: 0.32rem;
                    margin-left: 0.16rem;
                    font-size: 0.25rem;
                    font-weight: 500;
                    line-height: normal;
                    color: rgba(157, 157, 157, 1);
                    > div {
                        position: relative;
                        color: rgba(157, 157, 157, 1);
                        margin-top: 0.2rem;
                        &:first-child {
                            margin-top: 0px;
                        }
                        &:after {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: -0.2rem;
                            width: 5px;
                            height: 5px;
                            border-radius: 50%;
                            background: rgba(157, 157, 157, 1);
                            transform: translateY(-50%);
                        }
                    }
                }
            }
            > .right {
                width: 0.5rem;
                height: 0.5rem;
            }
        }
    }
}
</style>

