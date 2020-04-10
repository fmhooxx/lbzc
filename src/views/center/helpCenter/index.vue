<template>
    <div class="help-center">
        <base-nav>新手帮助</base-nav>
        <base-top></base-top>
        <div class="content">
            <div class="nav">
                <div
                    class="item"
                    @click.stop="selItem(index)"
                    v-for="(item,index) in cates"
                    :key="`c_${item.ID}`"
                >
                    <img :src="selIndex==index?item.on_img:item.blur_img">
                    <div class="name">{{item.Name}}</div>
                </div>
            </div>
            <div v-for="(item,index) in cates" :key="`l_${index}`">
                <HelpList v-if="index==selIndex" :type="parseInt(item.ID)"></HelpList>
            </div>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getHelpCate } from '_api/center';
import HelpList from '../components/HelpList';
export default {
    components: { HelpList },
    data() {
        return {
            cates: [],
            selIndex: 0,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            await this.getHelpCate();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getHelpCate() {
            this.cates = await getHelpCate({ pid: 3 });
        },
        selItem(index) {
            this.selIndex = index;
        }
    }
};
</script>

<style lang="less" scoped>
.help-center {
    > .content {
        > .nav {
            height: 3rem;
            display: flex;
            align-items: center;
            overflow-x: scroll;
            -webkit-overflow-scrolling: auto;
            &::-webkit-scrollbar {
                display: none;
                width: 0;
                height: 0;
            }
            > .item {
                margin-left: 0.22rem;
                flex-shrink: 0;
                width: 2rem;
                height: 1.58rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-shadow: 0px 1px 0.45rem 0px rgba(169, 185, 221, 0.36);
                border-radius: 0.1rem;
                > img {
                    width: 0.64rem;
                    height: 0.66rem;
                }
                > .name {
                    line-height: normal;
                    margin-top: 0.16rem;
                    font-size: 0.23rem;
                    font-weight: 500;
                    color: rgba(41, 47, 61, 1);
                }
            }
        }
    }
}
</style>
