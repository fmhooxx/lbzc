<template>
    <div class="center">
        <UserBase
            v-if="userInfoData"
            style="marginTop:0.4rem"
            :userInfoData="userInfoData"
            :isNewMessage="isNewMessage"
        ></UserBase>
        <IncomeChart v-if="userInfoData" style="marginTop:0.2rem" :userInfoData="userInfoData"></IncomeChart>
        <FuncIcon style="marginTop:0.4rem"></FuncIcon>
        <base-placeholder style="marginTop:0.8rem"></base-placeholder>
        <transition appear appear-class="enter" appear-active-class="active">
            <menu-list :menus="menus"></menu-list>
        </transition>
        <BaseLoadPage v-if="isBaseLoadPage"></BaseLoadPage>
        <base-bottom></base-bottom>
        <base-bottom-nav-agent></base-bottom-nav-agent>
    </div>
</template>
<script>
import scroll from '_mixins/scroll';
import UserBase from './components/UserBase';
import IncomeChart from './components/IncomeChart';
import FuncIcon from './components/FuncIcon';
import MenuList from './components/MenuList';
import { getMsgNew } from '_api/center';
import { getMemberInfo, getMenus } from '_api/my';
import { saveUser } from '_utils/local';

export default {
    components: { UserBase, IncomeChart, FuncIcon, MenuList },
    data: () => {
        return {
            isBaseLoadPage: true,
            menus: [],
            isNewMessage: false,
            userInfoData: null
        };
    },
    mixins: [scroll],
    async mounted() {
        try {
            await this.getMemberInfo();
            await this.getMsgNew();
            this.menus = await getMenus({
                type: 1
            });
            this.isBaseLoadPage = false;
            this.isActivated = true;
        } catch (err) {
            this.isBaseLoadPage = false;
            this.isActivated = true;
        }
    },
    methods: {
        async getMemberInfo() {
            this.userInfoData = await getMemberInfo();
            saveUser(this.userInfoData);
        },
        // 是否有新的消息
        async getMsgNew() {
            let r = await getMsgNew({
                type: 2
            });
            for (let i in r) {
                if (r[i] > 0) {
                    return (this.isNewMessage = true);
                }
            }
        }
    },
    activated() {
        if (this.isActivated) {
            this.getMemberInfo();
        }
    }
};
</script>
<style lang="less" scoped>
.enter {
    opacity: 0.5;
    transform: translateY(1rem);
}
.active {
    transition: all 0.6s ease;
}
</style>


