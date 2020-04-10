<template>
    <div class="password">
        <BaseNav style="border:none"></BaseNav>
        <BaseTop></BaseTop>
        <ResetPassword v-if="type=='reset'"></ResetPassword>
        <ForgetPasswordOne v-if="type=='f1'"></ForgetPasswordOne>
        <ForgetPasswordTwo v-if="type=='f2'"></ForgetPasswordTwo>
        <ForgetPasswordThree v-if="type=='f3'"></ForgetPasswordThree>
    </div>
</template>
<script>
import { getToken } from '_utils/local';
import ResetPassword from '../components/Password/ResetPassword';
import ForgetPasswordOne from '../components/Password/ForgetPasswordOne';
import ForgetPasswordTwo from '../components/Password/ForgetPasswordTwo';
import ForgetPasswordThree from '../components/Password/ForgetPasswordThree';
export default {
    components: { ResetPassword, ForgetPasswordOne, ForgetPasswordTwo, ForgetPasswordThree },
    data() {
        return {
            type: ''
        };
    },
    mounted() {
        this.type = this.$route.query.type;
    },
    beforeRouteEnter(to, from, next) {
        let type = to.query.type;
        if (type == 'f1' || type == 'f2' || type == 'f3') {
            if (getToken()) {
                next({ path: '/', replace: true });
            } else {
                next();
            }
        } else {
            next();
        }
    }
};
</script>

