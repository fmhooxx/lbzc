<template>
    <div class="dai">
        <div v-stopMove>
            <BaseSlide style="marginTop:.2rem" v-if="slideData.length>0" :slideData="slideData"></BaseSlide>
        </div>
        <all-cates v-if="cates.length>0" style="marginTop:.5rem" :cates="cates"></all-cates>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
        <base-bottom></base-bottom>
        <base-bottom-nav></base-bottom-nav>
    </div>
</template>
<script>
import scroll from '_mixins/scroll';
import { getAllCates } from '_api/dai';
import { getIndexRotation } from '_api/func';
import AllCates from './components/AllCates';
export default {
    mixins: [scroll],
    components: { AllCates },
    data: () => {
        return {
            cates: [], // product list data
            slideData: [], // top slide data
            isBaseLoadPage: true // load page animation
        };
    },
    async mounted() {
        try {
            this.$initUid(this.$route.query.uid);
            await this.getIndexRotation();
            await this.getAllCates();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
        this.preloadImg(); // 预加载card页面轮播图片
    },
    methods: {
        async getIndexRotation() {
            this.slideData = await getIndexRotation({
                rows: 4,
                aid: 1
            });
        },
        async getAllCates() {
            this.cates = await getAllCates();
        },
        // 预加载图片
        async preloadImg() {
            let cardRotation = await getIndexRotation({
                rows: 4,
                aid: 10
            });
            if (!cardRotation.length > 0) return;
            for (let i = 0; i < cardRotation.length; i++) {
                let img = new Image();
                img.src = cardRotation[i].Pic;
            }
        }
    }
};
</script>

<style lang="less">
.dai {
    background-color: #fff;
}
</style>

