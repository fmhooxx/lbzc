<template>
    <div class="poster-slide">
        <div class="slide" v-if="slideData">
            <div class="content">
                <cube-slide
                    ref="slide"
                    :showDots="false"
                    :data="slideData[type]"
                    @change="changePage"
                    :options="options"
                >
                    <cube-slide-item
                        v-for="(item, index) in slideData[type]"
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
                    v-for="(item,index) in slideData[type]"
                    :key="`d_${index}`"
                ></div>
            </div>
            <img src="@images/icon-17.png" class="arrow-left" @click.stop="prevPage" />
            <img src="@images/icon-18.png" class="arrow-right" @click.stop="nextPage" />
        </div>
        <FuncButton
            v-if="slideData"
            :type="type"
            :slideData="slideData"
            :current="parseInt(current)"
            style="marginTop:0.4rem"
        ></FuncButton>
        <BaseLoad v-if="isBaseLoad" :nomask="true"></BaseLoad>
    </div>
</template>
<script>
import { getHaibao } from '_api/center';
import FuncButton from '../components/FuncButton';
export default {
    components: { FuncButton },
    props: {
        type: {
            type: String,
            default: '',
            required: true
        }
    },
    data() {
        return {
            current: 0,
            slideData: null,
            isBaseLoad: true,
            options: {
                eventPassthrough: 'vertical'
            }
        };
    },
    async mounted() {
        try {
            this.slideData = await getHaibao({ type: this.type });
            this.$refs.slide.refresh();
            this.isBaseLoad = false;
        } catch (err) {
            this.isBaseLoad = false;
        }
    },

    async activated() {
        if (this.slideData) this.$refs.slide.refresh();
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
