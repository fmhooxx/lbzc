<template>
    <div class="coupon-list">
        <BaseScroll ref="base-scroll" @refresh="refresh" @loadMore="loadMore">
            <div v-for="(item,index) in listData" :key="`c_${index}`">
                <BaseCoupon
                    v-if="showItem(item.type)"
                    :style="{marginTop:index==0?'0.4rem':''}"
                    :data="item"
                    :current="current"
                    :state="state"
                    @select="select"
                ></BaseCoupon>
            </div>
            <div class="list-bottom" v-if="isBaseEmpty">
                <base-bottom :style="bgcVal"></base-bottom>
                <base-bottom :style="bgcVal"></base-bottom>
                <base-empty>
                    <div class="textTip" v-if="state=='notUse'">您还没有未使用的优惠卷...</div>
                    <div class="textTip" v-if="state=='yetUse'">您还没有已使用的优惠卷...</div>
                    <div class="textTip" v-if="state=='overtime'">您还没有已过期的优惠卷...</div>
                </base-empty>
            </div>
        </BaseScroll>
    </div>
</template>
<script>
import { getCoupon } from '_api/func';
export default {
    props: {
        type: {
            default: 0
        },
        current: {
            default: 'all'
        },
        state: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            page: 0,
            num: 30,
            listData: [],
            isBaseEmpty: false
        };
    },
    computed: {
        showItem() {
            return type => {
                if (this.current == 'all') {
                    return true;
                } else {
                    return type == this.type;
                }
            };
        },
        bgcVal(){
            if(this.$route.name=='coupon'){
                return 'background:rgb(246, 247, 251)'
            }else{
              return  'background:#fff'
            }
        }
    },
    methods: {
        refresh(done) {
            this.getList(done, true);
        },
        loadMore(done) {
            this.getList(done);
        },
        async getList(done, refresh) {
            let newState;
            if (this.state == 'notUse') {
                newState = 1;
            } else if (this.state == 'yetUse') {
                newState = 2;
            } else {
                newState = 3;
            }
            try {
                let data;
                if (refresh) {
                    this.page = 1;
                    data = await getCoupon({
                        num: this.num,
                        page: this.page,
                        type: newState,
                        level: this.$getUser().Mtype
                    });
                    this.isBaseEmpty = false;
                    this.$refs['base-scroll'].setLoadText(true);
                    this.listData = data.data;
                    this.$refs['base-scroll'].stopRefresh();
                    this.$textTip('刷新成功');
                } else {
                    this.page = this.page + 1;
                    data = await getCoupon({
                        num: this.num,
                        page: this.page,
                        type: newState,
                        level: this.$getUser().Mtype
                    });
                    this.listData = this.listData.concat(data.data);
                    done();
                }
                if (data.total_page == 1) {
                    this.$refs['base-scroll'].stopLoad();
                }
            } catch (err) {
                this.$refs['base-scroll'].stopRefresh();
                this.$refs['base-scroll'].stopLoad();
                if (this.listData.length == 0) {
                    this.$refs['base-scroll'].setLoadText();
                    this.isBaseEmpty = true;
                }
                if (arguments.length == 2) {
                    this.$textTip('刷新成功');
                }
                if (!arguments.length) {
                    throw err;
                }
            }
        },
        select() {
            this.$emit('select');
        }
    }
};
</script>
<style lang="less" scoped>
.base-bottom {
    background-color: #f6f7fb;
}
.textTip {
    color: #a2a2a2;
    text-align: center;
}
</style>


