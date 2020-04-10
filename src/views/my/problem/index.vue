<template>
    <div class="problem">
        <base-nav>常见问题</base-nav>
        <base-top></base-top>
        <div class="content" v-if="problemData.length>0">
            <base-placeholder></base-placeholder>
            <answer-list
                :num="index"
                :answer="item"
                v-for="(item,index) in problemData"
                :key="item.ID"
            ></answer-list>
        </div>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
    </div>
</template>
<script>
import { getProblem } from '_api/my';
import AnswerList from '../components/AnswerList';
export default {
    components: { AnswerList },
    data() {
        return {
            problemData: [],
            isBaseLoadPage: true
        };
    },
    async mounted() {
        try {
            this.problemData = (await getProblem({
                type: 1,
                page: 1,
                num: 50
            })).data;
            console.this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    }
};
</script>

<style lang="less" scoped>
.problem {
    background-color: #fff;
}
</style>

