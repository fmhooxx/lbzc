<template>
    <div class="center-slide">
        <cube-slide ref="slide" :options="options" :data="slideData">
            <cube-slide-item v-for="(item, index) in slideData" :key="`center_slide_${index}`">
                <img :src="item.Pic" @click.stop="toPage(item.type,item.Url,item.x_id)" />
            </cube-slide-item>
            <template slot="dots" slot-scope="props">
                <span
                    class="my-dot"
                    :class="{active: props.current === index}"
                    v-for="(item, index) in props.dots"
                    :key="`dots_${index}`"
                >{{index + 1}}</span>
            </template>
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
                eventPassthrough: 'vertical'
            }
        };
    },
    methods: {
        toPage(type, url, x_id) {
            if (type == 1) {
                // 项目内
                this.$goUrl(url);
            } else {
                // 项目外
                if (x_id == 1) {
                    // 需要带token
                    let token = this.$getToken();
                    if (!token) {
                        return this.$goUrl(url);
                    } else {
                        if (url.indexOf('?') > -1) {
                            this.$open(`${url}&token=${token}`);
                        } else {
                            this.$open(`${url}?token=${token}`);
                        }
                    }
                } else {
                    this.$open(url);
                }
            }
        }
    },
    activated() {
        if (this.slideData) this.$refs.slide.refresh();
    }
};
</script>

<style lang="less" scoped>
.center-slide {
    height: 2.87rem;
    img {
        width: 100%;
        height: 100%;
    }
    .cube-slide-dots {
        bottom: 0.5rem !important;
    }
    .my-dot {
        transform: translateY(-0.2rem);
        width: 0.3rem;
        height: 0.03rem;
        opacity: 0.5;
        margin-right: 0.2rem;
        background-color: #b8babd;
    }
    .active {
        background-color: #5461eb;
    }
}
</style>
