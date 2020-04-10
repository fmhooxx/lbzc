<template>
    <div class="material-list">
        <BaseTabNav v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></BaseTabNav>
        <div class="content">
            <BaseTop style="height:0.8rem"></BaseTop>
            <div v-for="(item,index) in tabs" :key="index">
                <keep-alive>
                    <!-- <ListItem v-if="index==selected" :type="parseInt(cates[index].ID)"></ListItem> -->
                    <TabList v-if="index==selected" :type="parseInt(cates[index].ID)"></TabList>
                </keep-alive>
            </div>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getMaterialCate } from '_api/home';
import TabList from './TabList';
export default {
    components: { TabList },
    data() {
        return {
            tabs: [],
            cates: [],
            selected: 0,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.cates = await getMaterialCate();
            this.cates.forEach(item => {
                this.tabs.push(item.Name);
            });
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
    position: relative;
    /deep/ .base-tab-nav {
        position: fixed;
        width: 100%;
        z-index: 1;
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

