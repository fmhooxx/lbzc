<template>
    <div class="base-slide-vertical">
        <cube-slide
            ref="slide"
            :data="slideData"
            direction="vertical"
            :options="options"
            :showDots="false"
        >
            <cube-slide-item
                v-for="(item, index) in slideData"
                :key="index"
                @click.native.stop="$router.push(`/noticeDetail?id=${item.ID}`)"
            >
                <div>{{item.title|threePoints(16)}}</div>
            </cube-slide-item>
        </cube-slide>
    </div>
</template>
<script>
export default {
    props: {
        slideData: {
            type: Array,
            required: true,
            default: []
        }
    },
    data() {
        return {
            options: {
                scrollY: true
            }
        };
    },
    mounted() {
        window.addEventListener('resize', this._onresize);
        window.addEventListener('visibilitychange', this._browserEvent);
    },
    activated() {
        if (this.slideData) this.$refs.slide.refresh();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this._onresize);
        window.removeEventListener('visibilitychange', this._browserEvent);
    },
    methods: {
        _onresize() {
            if (this.slideData) this.$refs.slide.refresh();
        },
        _browserEvent() {
            if (this.slideData) this.$refs.slide.refresh();
        }
    }
};
</script>

<style lang="less" scoped>
.base-slide-vertical {
    height: 100%;
    background-color: #fff;
    .cube-slide-item {
        display: flex;
        align-items: center;
        > div {
            display: flex;
            align-items: center;
            font-size: 0.26rem;
            color: #666666;
            line-height: normal;
        }
    }
}
</style>
