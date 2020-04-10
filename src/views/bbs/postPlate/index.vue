<template>
    <div class="post-plate">
        <BaseNav>论坛详情</BaseNav>
        <BaseTop></BaseTop>
        <PlateHeader v-if="headerData" :headerData="headerData" @getPlateBase="getPlateBase"></PlateHeader>
        <PlateLabel v-if="label.length>0" :selIndex.sync="selIndex" :label="label"></PlateLabel>
        <div v-if="label.length>0">
            <div v-for="(item,index) in label" :key="`c_p_${index}`">
                <ComPostList v-if="index===selIndex" type="plate" :label="label[index]"></ComPostList>
            </div>
        </div>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import { getPlateBase, getLabel } from '_api/bbs';
import PlateHeader from '../components/PostPlate/PlateHeader';
import PlateLabel from '../components/PostPlate/PlateLabel';
import ComPostList from '../components/ComPostList';
export default {
    components: { PlateHeader, PlateLabel, ComPostList },
    data() {
        return {
            fid: '',
            label: [],
            selIndex: 0,
            headerData: null,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.fid = this.$route.query.fid;
            await this.getPlateBase();
            await this.getLabel();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getPlateBase() {
            this.headerData = await getPlateBase({
                fid: this.fid
            });
        },
        async getLabel() {
            this.label = await getLabel({
                check: 1,
                fid: this.fid
            });
        }
    }
};
</script>

