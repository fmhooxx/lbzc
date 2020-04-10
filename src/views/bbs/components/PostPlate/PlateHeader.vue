<template>
    <div class="plate-header">
        <img :src="headerData.icons" />
        <div class="name">{{headerData.name}}</div>
        <div class="base">
            <div class="topic-num">主题 {{headerData.threads}}</div>
            <i>|</i>
            <div class="follow-num">关注 {{headerData.favtimes}}</div>
        </div>
        <div class="btn" @click.stop="$goUrl('/share')">立即借款</div>
        <div class="follow">
            <div v-if="headerData.status===0" @click.stop="follow('confirm')">关注</div>
            <div v-if="headerData.status===1" @click.stop="follow('cancel')">已关注</div>
        </div>
    </div>
</template>
<script>
import { followPlate } from '_api/bbs';

export default {
    props: {
        headerData: {
            type: Object,
            default: null,
            required: true
        }
    },
    methods: {
        async follow(status) {
            if (!this.$getToken()) {
                return this.$textTip('您还未登录');
            }
            try {
                this.isBaseload = true;
                await followPlate({
                    idtype: 'fid',
                    id: this.headerData.fid,
                    status: status == 'confirm' ? 1 : 0
                });
                this.isBaseload = false;
                if (status == 'confirm') {
                    this.$msg.success('关注成功', () => {
                        this.$emit('getPlateBase');
                    });
                } else {
                    this.$msg.success('取消成功', () => {
                        this.$emit('getPlateBase');
                    });
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
};
</script>

<style lang="less" scoped>
.plate-header {
    height: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #4564f2;
    img {
        width: 1.4rem;
        height: 1.4rem;
    }
    .name {
        margin-top: 0.3rem;
        font-size: 0.3rem;
        color: #fff;
    }
    .base {
        margin-top: 0.3rem;
        display: flex;
        align-items: center;
        i,
        .topic-num,
        .follow-num {
            font-size: 0.28rem;
            color: #fff;
        }
        i {
            padding: 0px 0.2rem;
        }
    }
    .btn {
        margin-top: 0.3rem;
        width: 2rem;
        height: 0.5rem;
        font-size: 0.28rem;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: normal;
        border-radius: 0.4rem;
        border: 1px solid #fff;
    }
    .follow {
        position: absolute;
        top: 1.8rem;
        right: 1rem;
        div {
            width: 1.4rem;
            height: 0.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.28rem;
            color: #fff;
            line-height: normal;
            border: 1px solid #fff;
        }
    }
}
</style>

