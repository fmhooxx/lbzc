<template>
    <div class="material-list">
        <BaseTabNav v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></BaseTabNav>
        <div class="content">
            <keep-alive>
                <ProductList v-if="selected==0" :keywords="keywords"></ProductList>
                <MaterialList v-if="selected==1" :keywords="keywords"></MaterialList>
                <NewList v-if="selected==2" :keywords="keywords"></NewList>
            </keep-alive>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage" style="z-index:1"></BaseLoadPage>
    </div>
</template>
<script>
import NewList from './NewList';
import ProductList from './ProductList';
import MaterialList from './MaterialList';
export default {
    components: { NewList, ProductList, MaterialList },
    props: {
        keywords: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            tabs: ['产品', '推广素材', '资讯'],
            selected: 0,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            await this.$waitTime(500);
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    }
};
</script>
<style lang="less">
.material-list {
    height: 100%;
    position: relative;
    > .content {
        position: absolute;
        top: 0.8rem;
        left: 0px;
        right: 0px;
        bottom: 0px;
    }
    /deep/ .base-tab-nav {
        > .content-tab {
            > .tab-item {
                > div {
                    color: #777;
                }
            }
            &:after {
                border: none;
            }
        }
    }
}
</style>

