<template>
    <div class="new-slide">
        <cube-slide
            ref="slide"
            :options="options"
            :showDots="false"
            :data="slideData"
            @change="changePage"
        >
            <cube-slide-item
                v-for="(item, index) in slideData"
                :key="`center_slide_${index}`"
                @click.native="clickHandler(item, index)"
            >
                <img :src="item.CoverImage" />
            </cube-slide-item>
        </cube-slide>
        <div class="title">
            <div class="left">{{titleContent}}</div>
            <div class="right">{{currentPage}}/{{slideData.length}}</div>
        </div>
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
            titleContent: '',
            currentPage: 1,
            options: {
                eventPassthrough: 'vertical'
            }
        };
    },
    mounted() {
        this.changePage(0);
    },
    activated() {
        if (this.slideData) {
            this.changePage(0);
            this.$refs.slide.refresh();
        }
    },
    methods: {
        changePage(current) {
            this.titleContent = this.slideData[current].Title;
            this.currentPage = current + 1;
        },
        clickHandler(item) {
            let r = this.canView(this.$getUser().Rule, item.level_name);
            if (r) {
                this.$goUrl(`/newDetail?id=${item.ID}&cate=0`);
            } else {
                this.$textTip('您需要升级到' + item.level_name);
            }
        },
        conversion(levelName) {
            if (levelName == '初级代理') {
                return 2;
            } else if (levelName == '中级代理') {
                return 3;
            } else if (levelName == '高级代理') {
                return 4;
            } else {
                return 1;
            }
        },
        canView(myLevel, reqLeavel) {
            if (this.conversion(myLevel) >= this.conversion(reqLeavel)) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

<style lang="less" scoped>
.new-slide {
    height: 3.45rem;
    position: relative;
    img {
        width: 100%;
        height: 100%;
    }
    > .title {
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: 0.7rem;
        background-color: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.3rem;
        > .left {
            color: #fff;
            font-size: 0.26rem;
        }
        > .right {
            color: #fff;
            font-size: 0.28rem;
        }
    }
}
</style>
