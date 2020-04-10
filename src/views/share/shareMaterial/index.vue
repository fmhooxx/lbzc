<template>
    <div class="share-material">
        <BaseNav>{{title?title:''}}推广素材</BaseNav>
        <div class="content">
            <MaterialList v-if="typeCate" :type="typeCate" :id="id" :isCPA="isCPA"></MaterialList>
        </div>
    </div>
</template>
<script>
import MaterialList from '../components/MaterialList';
import { getProductDetail } from '_api/share';

export default {
    components: { MaterialList },
    data() {
        return {
            type: '',
            title: '',
            productData: null
        };
    },
    async mounted() {
        try {
            this.id = this.$route.query.id;
            this.title = this.$route.query.title;
            this.type = this.$route.query.type;
            await this.getProductDetail();
        } catch (err) {
            console.log(err);
        }
    },
    computed: {
        typeCate() {
            if (this.type == 'dai') {
                return 1;
            } else if (this.type == 'card') {
                return 2;
            } else {
                return 0;
            }
        },
        isCPA() {
            if (
                this.productData &&
                this.productData.info.D_type == 2 &&
                this.productData.info.Itype == 1
            ) {
                return true;
            } else {
                false;
            }
        }
    },
    methods: {
        async getProductDetail() {
            this.productData = await getProductDetail({
                id: this.id
            });
        }
    }
};
</script>
<style lang="less" scoped>
.share-material {
    > .content {
        position: fixed;
        top: 1.05rem;
        bottom: 0px;
        left: 0px;
        right: 0px;
        z-index: 200;
    }
}
</style>


