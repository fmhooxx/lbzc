<template>
    <div class="new-detail">
        <nav-header>资讯信息</nav-header>
        <base-top></base-top>
        <new-content style="marginTop:0.6rem" v-if="newsCon" :newsCon="newsCon"></new-content>
        <new-recommed :cate="parseInt(cate)"></new-recommed>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import NavHeader from '../components/NavHeader';
import NewContent from '../components/NewContent';
import NewRecommed from '../components/NewRecommed';
import { getNewDetail } from '_api/news';
export default {
    components: { NavHeader, NewContent, NewRecommed },
    data() {
        return {
            id: 0,
            cate: 0,
            newsCon: null,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.id = this.$route.query.id;
            this.cate = this.$route.query.cate;
            await this.getNewDetail();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getNewDetail() {
            this.newsCon = await getNewDetail({
                id: this.id
            });
        }
    },
    watch: {
        $route: {
            handler: async function() {
                this.isBaseLoadPage = true;
                try {
                    this.id = this.$route.query.id;
                    this.cate = this.$route.query.cate;
                    await this.getNewDetail();
                    this.isBaseLoadPage = false;
                } catch (err) {
                    this.isBaseLoadPage = false;
                }
            }
        }
    }
};
</script>


