<template>
    <div class="message-cate">
        <BaseNav>{{title}}</BaseNav>
        <BaseTop></BaseTop>
        <MessageList v-if="cate>=0&&cate!==''" :type="cate"></MessageList>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import MessageList from '../components/Message/MessageList';
export default {
    components: { MessageList },
    data() {
        return {
            cate: '',
            isBaseLoadPage: true
        };
    },
    computed: {
        title() {
            if (this.cate == 0) {
                return '系统公告';
            } else if (this.cate == 1) {
                return '佣金消息';
            } else if (this.cate == 2) {
                return '客户状态消息';
            } else {
                return null;
            }
        }
    },
    mounted() {
        try {
            this.cate = this.$route.query.cate;
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    beforeRouteEnter(to, from, next) {
        document.documentElement.style.backgroundColor = '#f6f7fb';
        next();
    },
    beforeRouteLeave(to, from, next) {
        document.documentElement.style.backgroundColor = '#fff';
        next();
    }
};
</script>



