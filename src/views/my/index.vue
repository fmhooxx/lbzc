<template>
    <section class="my">
        <div class="content" v-if="userInfoData">
            <div class="top">
                <div class="info">
                    <img
                        class="animated jackInTheBox"
                        @click.stop="$goUrl('/baseInfo')"
                        :src="userInfoData.HeadImgVal"
                    >
                    <div class="name_num">
                        <div class="name">{{userInfoData.NickName|nameHide}}</div>
                        <div class="num">{{userInfoData.Mobile|mobileHide}}</div>
                    </div>
                </div>
            </div>
            <base-placeholder></base-placeholder>
            <!-- <task-progress></task-progress> -->
            <transition appear appear-class="enter" appear-active-class="active">
                <menu-list :menus="menus"></menu-list>
            </transition>
        </div>
        <base-load-page v-if="isBaseLoadPage"></base-load-page>
        <base-bottom></base-bottom>
        <base-bottom-nav></base-bottom-nav>
    </section>
</template>
<script>
import 'animate.css';
import { getMemberInfo, getMenus } from '_api/my';
import { saveUser } from '_utils/local';
import MenuList from './components/MenuList';
import scroll from '_mixins/scroll';
import TaskProgress from './components/TaskProgress';
export default {
    mixins: [scroll],
    components: { MenuList, TaskProgress },
    data: () => {
        return {
            isBaseLoadPage: true,
            menus: [],
            userInfoData: null
        };
    },
    async activated() {
        try {
            await this.getMemberInfo();
            this.menus = await getMenus({
                type: 2
            });
            this.isBaseLoadPage = false;
        } catch (err) {
            this.isBaseLoadPage = false;
        }
    },
    methods: {
        async getMemberInfo() {
            this.userInfoData = await getMemberInfo();
            saveUser(this.userInfoData);
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
.my {
    background-color: #fff;
    > .content {
        > .top {
            height: 2.54rem;
            display: flex;
            align-items: center;
            padding: 0px 0.3rem;
            box-sizing: border-box;
            > .info {
                display: flex;
                > img {
                    width: 1.12rem;
                    height: 1.12rem;
                    border-radius: 50%;
                }
                > .name_num {
                    margin-left: 0.4rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    > .name {
                        font-size: 0.43rem;
                        font-weight: bold;
                        color: rgba(41, 47, 61, 1);
                    }
                    > .num {
                        font-size: 0.26rem;
                        font-weight: 400;
                        color: rgba(118, 124, 142, 1);
                    }
                }
            }
        }
    }
}
</style>

