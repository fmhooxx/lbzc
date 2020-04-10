<template>
    <div class="account-bind">
        <base-nav>{{type=='zhi'?'支付宝绑定':'银行卡绑定'}}</base-nav>
        <base-top></base-top>
        <base-placeholder></base-placeholder>
        <BindZhi v-if="type=='zhi'&&userData" :userData="userData"></BindZhi>
        <BindBank v-if="type=='bank'&&userData" :userData="userData"></BindBank>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
    </div>
</template>
<script>
import BindZhi from '../components/BindZhi';
import BindBank from '../components/BindBank';
export default {
    components: { BindZhi, BindBank },
    data() {
        return {
            type: '',
            userData: null,
            isBaseLoadPage: true
        };
    },
    mounted() {
        this.type = this.$route.query.type ? this.$route.query.type : 'zhi';
        this.userData = this.$getUser();
        this.isBaseLoadPage = false;
    }
};
</script>

