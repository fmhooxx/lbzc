<template>
    <div class="test" ref="test">
        <BaseNav ref="nav">Test</BaseNav>
        <BaseTop></BaseTop>
        <div class="text" v-for="(item,index) in 4" :key="index">{{item}}</div>

        <div class="func">
            <div @click.stop="sel('disable')">disable</div>
            <div @click.stop="sel('enable')">enable</div>
        </div>
        <div class="scroll-list-wrap" ref="scroll-container">
            <cube-scroll ref="scroll" :data="items" :options="options">
                <div v-for="(item,index) in items" :key="`cube_${index}`">{{index}}</div>
            </cube-scroll>
        </div>
        <div class="text" v-for="(item,index) in 8" :key="`second_${index}`">{{item}}</div>
    </div>
</template>
<script>
import scroll from './scroll';
export default {
    components: { scroll },
    data() {
        return {
            items: [1, 2, 3, 4, 5, 6, 7, 9],
            options: {
                bounceTime: 200
            }
        };
    },
    mounted() {
        let navHeight = this.$refs.nav.$el.clientHeight;
        let offsetTop = this.$refs['scroll-container'].offsetTop;
        window.addEventListener('scroll', () => {
            console.log(window.scrollY - navHeight);
            if (window.scrollY >= offsetTop - navHeight) {
                this.$refs['scroll-container'].style.position = 'fixed';
                this.$refs['scroll-container'].style.top = navHeight + 'px';
                this.$refs['scroll-container'].style.left = '0px';
                this.$refs['scroll-container'].style.right = '0px';
                this.sel('enable');
            } else {
                this.sel('disable');
            }
        });
        this.$nextTick(() => {
            this.sel('disable');
        });
    },
    methods: {
        sel(pwd) {
            if (pwd == 'enable') {
                this.$refs.scroll.enable();
            } else {
                this.$refs.scroll.disable();
            }
            this.$refs.scroll.refresh();
        }
    }
};
</script>
<style lang="less" scoped>
.test {
    .text {
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .func {
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        font-size: 0.3rem;
    }
    .scroll-list-wrap {
        width: 100%;
        height: 5rem;
        overflow: hidden;
        border: 1px solid #ddd;
    }
}
</style>


