<template>
    <div all-plates>
        <BaseNav>全部板块</BaseNav>
        <BaseTop></BaseTop>
        <BaseTabNav v-if="tabs.length>0" :selected.sync="selected" :tabs="tabs"></BaseTabNav>
        <PlateList v-if="selected==0" :data="myData" key="myData" @reload="reload"></PlateList>
        <PlateList v-if="selected==1" :data="allData" key="allData" @reload="reload"></PlateList>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getAllPlates, getMyPost } from '_api/bbs';
import PlateList from '../components/PlateList';
export default {
    components: { PlateList },
    data() {
        return {
            tabs: ['我的关注', '所有板块'],
            selected: 0,
            myData: [],
            allData: [],
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            await this.reload();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getAllPlates() {
            this.allData = await getAllPlates();
        },
        async getMyFollow() {
            let r = await getMyPost({
                type: 'favorite',
                idtype: 'fid'
            });
            this.myData = r.data;
        },
        async reload() {
            await this.getMyFollow();
            await this.getAllPlates();
        }
    }
};
</script>

