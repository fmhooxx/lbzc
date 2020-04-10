<template>
    <scroller ref="scroller" :noDataText="noDataText" :on-refresh="refresh" :on-infinite="infinite">
        <slot></slot>
    </scroller>
</template>
<script>
export default {
    data() {
        return {
            noDataText: '没有更多数据...'
        };
    },
    methods: {
        refresh(done) {
            this.$emit('refresh', done);
        },
        infinite(done) {
            this.$emit('loadMore', done);
        },
        // 主动触发下拉刷新
        startRefresh(){
            this.$refs.scroller.triggerPullToRefresh();
        },
        stopRefresh() {
            this.$refs.scroller.finishPullToRefresh();
        },
        stopLoad() {
            this.$refs.scroller.finishInfinite(true);
        },
        setLoadText(isDefault, text) {
            if (isDefault) {
                this.noDataText = '没有更多数据...';
            } else {
                this.noDataText = text || '';
            }
        }
    }
};
</script>

<style lang="less" scoped>
/deep/.pull-to-refresh-layer {
    margin-top: -1rem !important;
    height: 1rem !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    .spinner-holder {
        .text {
            font-size: 0.24rem !important;
        }
        .arrow {
            width: 0.4rem !important;
            height: 0.4rem !important;
        }
        .spinner {
            margin-top: 0px !important;
            width: 0.4rem !important;
            height: 0.4rem !important;
        }
    }
}
/deep/.loading-layer {
    height: 1rem !important;
    .spinner-holder {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .spinner {
            margin-top: 0px !important;
            width: 0.6rem !important;
            height: 0.6rem !important;
        }
    }
    .no-data-text {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.24rem;
    }
}
</style>
