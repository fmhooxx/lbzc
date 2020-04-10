<template>
    <div class="all-cates">
        <div class="top">
            <div class="cate-list">
                <div
                    class="item"
                    v-for="item in cates"
                    :key="item.ID"
                    @click.stop="currentCateid=item.ID"
                >
                    <div :style="{backgroundImage:`url(${item.icon})`}"></div>
                    <span>{{item.Name}}</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div v-for="(item,index) in cates" :key="`daiList_${index}`">
                <dai-list :cateid="item.ID" v-if="item.ID==currentCateid"></dai-list>
            </div>
        </div>
    </div>
</template>
<script>
import DaiList from './DaiList';
import { getProList } from '_api/dai';
export default {
    components: { DaiList },
    data: () => {
        return {
            currentCateid: '1'
        };
    },
    props: {
        cates: {
            type: Array,
            required: true
        }
    },
    created() {
        this.currentCateid = this.cates[0].ID;
    }
};
</script>

<style lang="less">
.all-cates {
    position: relative;
    background-color: #fff;
    > .top {
        > .cate-list {
            display: flex;
            justify-content: space-around;
            > .item {
                width: 1.8rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.1rem 0px;
                &:active {
                    background-color: rgba(244, 244, 244);
                }
                > div {
                    width: 0.9rem;
                    height: 0.9rem;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
                > span {
                    margin-top: 0.24rem;
                    font-size: 0.27rem;
                    font-weight: 500;
                    color: rgba(41, 47, 61, 1);
                }
            }
        }
    }
    > .bottom {
        background-color: #fff;
    }
}
</style>

