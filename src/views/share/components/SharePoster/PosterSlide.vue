<template>
    <div class="poster-slide">
        <div class="slide">
            <div class="content">
                <cube-slide
                    ref="slide"
                    :showDots="false"
                    :data="posterData.images"
                    @change="changePage"
                    :options="options"
                >
                    <cube-slide-item
                        v-for="(item, index) in posterData.images"
                        :key="`poster_slide_${index}`"
                        @click.native="clickHandler(item, index)"
                    >
                        <img :src="item" />
                    </cube-slide-item>
                </cube-slide>
            </div>
            <div class="dots">
                <div
                    :class="{active:index==current}"
                    v-for="(item,index) in posterData.images"
                    :key="`d_${index}`"
                ></div>
            </div>
            <img src="@images/icon-17.png" class="arrow-left" @click.stop="prevPage" />
            <img src="@images/icon-18.png" class="arrow-right" @click.stop="nextPage" />
        </div>
        <FuncButton
            v-if="posterData"
            :current="current"
            :slideData="posterData"
            style="marginTop:0.4rem"
        ></FuncButton>
    </div>
</template>
<script>
import FuncButton from './FuncButton';
export default {
    components: { FuncButton },
    props: {
        posterData: {
            type: Object
        }
    },
    data() {
        return {
            current: 0,
            options: {
                eventPassthrough: 'vertical'
            }
        };
    },
    async mounted() {
        if (this.posterData) this.$refs.slide.refresh();
    },

    async activated() {
        if (this.posterData) this.$refs.slide.refresh();
    },
    methods: {
        changePage(current) {
            this.current = current;
        },
        prevPage() {
            this.$refs.slide.slide.prev();
        },
        nextPage() {
            this.$refs.slide.slide.next();
        }
    }
};
</script>
<style lang="less" scoped>
.poster-slide {
    > .slide {
        position: relative;
        > .content {
            width: 5.34rem;
            height: 7.74rem;
            margin: 0 auto;
            img {
                width: 100%;
                height: 100%;
            }
        }
        > .dots {
            margin-top: 0.4rem;
            display: flex;
            justify-content: center;
            > div {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                margin-right: 0.2rem;
                background-color: #b8babd;
            }
            > .active {
                background-color: #9ea6ff;
            }
        }
        > .arrow-left {
            position: absolute;
            top: 3.3rem;
            left: 0.3rem;
            width: 0.25rem;
            height: 0.39rem;
        }
        > .arrow-right {
            position: absolute;
            top: 3.3rem;
            right: 0.3rem;
            width: 0.25rem;
            height: 0.39rem;
        }
    }
    /deep/.base-load {
        > .content {
            transform: translateY(6%);
        }
    }
}
</style>
