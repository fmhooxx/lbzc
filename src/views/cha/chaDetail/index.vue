<template>
    <div class="cha-detail">
        <base-nav>报告详情</base-nav>
        <base-top></base-top>
        <three-in-one
            v-if="reportData&&arg.zx_id==6"
            :reportData="reportData"
            :orderData="orderData"
            :jumpUrl="jumpUrl"
        ></three-in-one>
        <new-mi-guan
            v-if="reportData&&arg.zx_id==5"
            :reportData="reportData"
            :orderData="orderData"
        ></new-mi-guan>
        <new-tong-dun
            v-if="reportData&&arg.zx_id==4"
            :reportData="reportData"
            :orderData="orderData"
        ></new-tong-dun>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
        <base-bottom style="height:0.4rem"></base-bottom>
    </div>
</template>
<script>
import { getReportDetail, getReportDemo } from '_api/cha';
import NewMiGuan from '../components/NewMiGuan';
import ThreeInOne from '../components/ThreeInOne';
import NewTongDun from '../components/NewTongDun';

export default {
    components: { ThreeInOne, NewMiGuan, NewTongDun },
    data: () => {
        return {
            arg: {},
            reportData: null,
            orderData: null,
            jumpUrl: '',
            isBaseLoadPage: true
        };
    },
    // zx_id : 2 大数据信用黑名单 new miguan
    // zx_id : 3 综合风险查询 => new tongdun
    async mounted() {
        try {
            this.isBaseLoadPage = true;
            await this.$waitTime(3000);
            let arg = JSON.parse(decodeURIComponent(this.$route.query.arg));
            let demo = this.$route.query.demo;
            let allData;
            if (demo) {
                this.arg = { ...arg, zx_id: arg.ID };
                allData = await getReportDemo({
                    cate_id: this.arg.from_type
                });
                this.reportData = allData.data.data;
                this.orderData = allData.order;
            } else {
                this.arg = { ...arg };
                allData = await getReportDetail({
                    id: this.arg.ID,
                    url_domain: this.$basePath() + '/chaZhengReport'
                });
                this.reportData = allData.data.LoanInfos;
                this.orderData = allData.order;
                if (allData.jump_url) {
                    this.jumpUrl = allData.jump_url;
                }
            }
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    }
};
</script>
<style lang="less">
.cha-detail {
    background-color: #fff;
}
</style>

