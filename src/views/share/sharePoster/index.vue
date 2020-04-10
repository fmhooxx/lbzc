<template>
    <div class="share-poster">
        <BaseNav>{{title}}</BaseNav>
        <BaseTop></BaseTop>
        <PosterSlide style="marginTop:0.4rem" v-if="posterData" :posterData="posterData"></PosterSlide>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import PosterSlide from '../components/SharePoster/PosterSlide';
import { getProductPost } from '_api/share';
export default {
    components: { PosterSlide },
    data() {
        return {
            id: '',
            title: '',
            posterData: null,
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.id = this.$route.query.id;
            this.title = this.$route.query.title;
            await this.getProductPost();
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getProductPost() {
            this.posterData = await getProductPost({
                id: this.id
            });
        }
    }
};
</script>

