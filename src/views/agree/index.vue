<template>
    <div class="agree">
        <base-nav>{{agreeContent?agreeContent.Title:''}}</base-nav>
        <base-top></base-top>
        <div v-if="agreeContent" class="content" v-html="agreeContent.Contents"></div>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import { getSimpleNews } from '_api/agree';
export default {
    data() {
        return {
            id: '',
            agreeContent: null,
            isBaseLoadPage: true
        };
    },
    async created() {
        this.id = this.$route.query.id;
    },
    async mounted() {
        try {
            this.agreeContent = await getSimpleNews({ id: this.id });
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    }
};
</script>

<style lang="less" scoped>
.agree {
    width: 100%;
    background-color: #fff;
    > .content {
        padding: 0.4rem 0.3rem;
        font-size: 0.28rem;
        line-height: 1.6;
    }
}
</style>

