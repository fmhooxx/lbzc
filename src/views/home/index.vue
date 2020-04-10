<template>
    <div class="home">
        <NoticeSearch :isNewMessage="isNewMessage"></NoticeSearch>
        <BaseTop height="1.1rem"></BaseTop>
        <div v-stopMove>
            <BaseSlide v-if="slideDataTop.length>0" :slideData="slideDataTop" :point="true"></BaseSlide>
        </div>
        <AdSlide style="marginTop:0.3rem" v-if="noticeData.length>0" :noticeData="noticeData"></AdSlide>
        <ProCategory v-if="categoryData.length>0" :categoryData="categoryData"></ProCategory>
        <GoodProduct
            v-if="goodProductData.length>0"
            :goodProductData="goodProductData"
            @getGoodProduct="getGoodProduct"
        ></GoodProduct>
        <CenterSlide v-if="slideDataCenter.length>0" :slideData="slideDataCenter"></CenterSlide>
        <HotProduct></HotProduct>
        <MessagePop v-if="isMessagePop" :isMessagePop.sync="isMessagePop" :data="messageData"></MessagePop>
        <CouponPop v-if="isCouponPop" :isCouponPop.sync="isCouponPop" :couponData="couponData"></CouponPop>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
        <BaseBottom></BaseBottom>
        <BaseBottomNavAgent></BaseBottomNavAgent>
    </div>
</template>
<script>
import { getIndexRotation } from '_api/func';
import { getMsgNew } from '_api/center';
import {
    getIndexNotice,
    getGoodProduct,
    getCategory,
    getMessagePop,
    getCouponOne,
    getCouponTwo
} from '_api/home';
import NoticeSearch from './componentss/NoticeSearch';
import AdSlide from './componentss/AdSlide';
import GoodProduct from './componentss/GoodProduct';
import CenterSlide from './componentss/CenterSlide';
import ProCategory from './componentss/ProCategory';
import HotProduct from './componentss/HotProduct';
import MessagePop from './componentss/MessagePop';
import CouponPop from './componentss/CouponPop';
import scroll from '_mixins/scroll';
export default {
    components: {
        NoticeSearch,
        AdSlide,
        GoodProduct,
        CenterSlide,
        ProCategory,
        HotProduct,
        MessagePop,
        CouponPop
    },
    data() {
        return {
            slideDataTop: [],
            slideDataCenter: [],
            noticeData: [],
            goodProductData: [],
            categoryData: [],
            messageData: [],
            couponData: [],
            isCouponPop: false,
            isMessagePop: false,
            isNewMessage: false,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            await this.getIndexRotationTop();
            await this.getIndexRotationCenter();
            await this.getIndexNotice();
            await this.getGoodProduct();
            await this.getCategory();
            await this.getMsgNew();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
        await this.getCouponOne();
        await this.getCouponTwo();
        await this.getMessagePop();
    },
    mixins: [scroll],
    methods: {
        // 页面顶部的轮播图
        async getIndexRotationTop() {
            this.slideDataTop = await getIndexRotation({
                rows: 4,
                aid: 1
            });
        },
        // 页面中部的轮播图
        async getIndexRotationCenter() {
            this.slideDataCenter = await getIndexRotation({
                rows: 4,
                aid: 8
            });
        },
        // 平台公告
        async getIndexNotice() {
            this.noticeData = await getIndexNotice({
                rows: 5
            });
        },
        // 随机4个商品
        async getGoodProduct() {
            this.goodProductData = await getGoodProduct({
                rows: 4
            });
        },
        // 获取商品种类
        async getCategory() {
            this.categoryData = await getCategory({
                type: 1
            });
        },
        // 是否有新的消息
        async getMsgNew() {
            if (!this.$getToken()) return;
            let r = await getMsgNew({
                type: 2
            });
            for (let i in r) {
                if (r[i] > 0) {
                    return (this.isNewMessage = true);
                }
            }
        },
        // 广告弹窗
        async getMessagePop() {
            try {
                this.messageData = await getMessagePop();
                if (this.messageData.length > 0) {
                    for (let i = 0; i < this.messageData.length; i++) {
                        await this.$preloadImg(this.messageData[i].Pic);
                    }
                    this.isMessagePop = true;
                }
            } catch (err) {
                this.isMessagePop = false;
            }
        },

        // 获取有优惠卷第一步（不管有没有都去获取）
        async getCouponOne() {
            try {
                await getCouponOne({
                    sign: 1
                });
            } catch (err) {
                return false;
            }
        },

        // 获取有优惠卷第二步
        async getCouponTwo() {
            try {
                this.couponData = await getCouponTwo();
                if (this.couponData.length > 0) {
                    this.isCouponPop = true;
                }
            } catch (err) {
                this.isCouponPop = false;
            }
        },

        // 阻止冒泡
        stopMove() {
            let startPos = 0,
                endPos = 0,
                isScrolling = 0;
            let dom = this.$refs['slide-content'];
            dom.addEventListener(
                'touchstart',
                function(event) {
                    let touch = event.targetTouches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
                    startPos = { x: touch.pageX, y: touch.pageY, time: +new Date() }; //取第一个touch的坐标值
                    isScrolling = 0; //这个参数判断是垂直滚动还是水平滚动
                },
                false
            );
            //解绑事件 web前端开发
            dom.addEventListener(
                'touchend',
                function(event) {
                    dom.removeEventListener('touchmove', this, false);
                    dom.removeEventListener('touchend', this, false);
                },
                false
            );
            dom.addEventListener(
                'touchmove',
                function(event) {
                    //当屏幕有多个touch或者页面被缩放过，就不执行move操作
                    if (event.targetTouches.length > 1 || (event.scale && event.scale !== 1)) {
                        return;
                    }
                    let touch = event.targetTouches[0];
                    endPos = { x: touch.pageX - startPos.x, y: touch.pageY - startPos.y };
                    isScrolling = Math.abs(endPos.x) < Math.abs(endPos.y) ? 1 : 0; //isScrolling为1时，表示纵向滑动，0为横向滑动
                    if (isScrolling === 0) {
                        event.preventDefault(); //阻止触摸事件的默认行为，即阻止滚屏
                    }
                },
                false
            );
        }
    }
};
</script>
