<template>
    <div class="material-list">
        <BaseScroll ref="base-scroll" @refresh="refresh" @loadMore="loadMore">
            <div class="list-top">
                <div class="content" ref="content" v-for="(item,index) in listData" :key="index">
                    <div class="title">{{item.title}}</div>
                    <div class="date">{{item.addtime}}</div>
                    <div class="article" style v-html="item.Contents"></div>
                    <div class="slide" @click.stop="showImagePreview(item.pic)">
                        <img v-lazy="pic" v-for="(pic,index) in item.pic" :key="`p_${index}`" />
                    </div>
                    <div class="func">
                        <div class="copy" @click.stop="copyText(item.Contents,item.shareurl)">一键复制</div>
                        <div
                            class="make"
                            @click.stop="makePost(item.tid,item.id,item.Itype,item.D_type)"
                        >生成海报</div>
                        <div
                            class="save"
                            v-if="showBtn&&item.pic.length>0"
                            @click.stop="saveImages(item.pic)"
                        >保存图片</div>
                    </div>
                </div>
            </div>
            <div class="list-bottom" v-if="isBaseEmpty">
                <base-bottom></base-bottom>
                <base-bottom></base-bottom>
                <base-empty></base-empty>
            </div>
        </BaseScroll>
        <BasePoster v-if="isBasePoster" :isBasePoster.sync="isBasePoster" :img="poster"></BasePoster>
        <BaseImgPre
            style="z-index:1"
            v-if="isBaseImgPre"
            :isBaseImgPre.sync="isBaseImgPre"
            :imgs="imgs"
        ></BaseImgPre>
        <BaseYjPop v-if="isBaseYjPop" @closeBaseYjPop="closeBaseYjPop"></BaseYjPop>
        <BaseYjPayPop v-if="isBaseYjPayPop" :isBaseYjPayPop.sync="isBaseYjPayPop" :price="price"></BaseYjPayPop>
        <BaseLoad v-if="isBaseload"></BaseLoad>
    </div>
</template>
<script>
import { makePoster } from '_api/home';
import { getSearch } from '_api/search';
import { saveImagesArr } from '_native/func';
import { checkYjToProduct } from '_api/func';

export default {
    props: {
        keywords: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            page: 0,
            num: 30,
            listData: [],
            poster: '',
            imgs: [],
            type: 2,
            price: 0,
            isBasePoster: false,
            isBaseImgPre: false,
            isBaseEmpty: false,
            isBaseYjPop: false,
            isBaseYjPayPop: false,
            isBaseload: false
        };
    },
    methods: {
        refresh(done) {
            this.getList(done, true);
        },
        loadMore(done) {
            this.getList(done);
        },
        async getList(done, refresh) {
            try {
                let data;
                if (refresh) {
                    this.page = 1;
                    data = await getSearch({
                        num: this.num,
                        page: this.page,
                        type: this.type,
                        keywords: this.keywords
                    });
                    this.isBaseEmpty = false;
                    this.$refs['base-scroll'].setLoadText(true);
                    this.listData = data.data;
                    this.$refs['base-scroll'].stopRefresh();
                    this.$textTip('刷新成功');
                } else {
                    this.page = this.page + 1;
                    data = await getSearch({
                        num: this.num,
                        page: this.page,
                        type: this.type,
                        keywords: this.keywords
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
                    this.listData = [];
                    this.$refs['base-scroll'].setLoadText();
                    this.isBaseEmpty = true;
                }
                if (!arguments.length) {
                    throw err;
                }
            }
        },
        async checkYjToProduct(id) {
            let r = await checkYjToProduct({
                id: id
            });
            if (r.result == 100086) {
                return true; // 需要交押金
            } else if (r.result == 100000) {
                return false; // 不要交押金
            } else {
                throw r.message;
            }
        },
        closeBaseYjPop(action) {
            if (action.type == 'pay') {
                this.isBaseYjPop = false;
                this.isBaseYjPayPop = true;
                this.price = action.price;
            } else {
                this.isBaseYjPop = false;
            }
        },
        async makePost(tid, id, Itype, D_type) {
            try {
                this.isBaseload = true;
                if (Itype == 1 && D_type == 2) {
                    let needPay = await this.checkYjToProduct(tid);
                    if (needPay) {
                        this.isBaseYjPop = true;
                        throw '请支付保证金';
                    }
                }
                this.poster = await makePoster({
                    type: this.type,
                    tid: tid,
                    uid: this.$getUser().ID,
                    id: id
                });
                await this.$preloadImg(this.poster);
                this.isBaseload = false;
                this.isBasePoster = true;
            } catch (err) {
                this.$textTip(err);
                this.isBaseload = false;
            }
        },
        copyText(t0, url) {
            let t1 = t0.replace(/<\/?.+?>/g, '');
            let t2 = t1.replace(/&nbsp;/g, '');
            let t3 = t2.replace(/&nbsp/g, '');
            let t4 = t3.replace(/ /g, '');
            if (!this.$isNull(url)) {
                t4 = t4 + ' 传送门：' + url;
            }
            this.$copy(t4);
        },
        showImagePreview(imgs) {
            this.imgs = imgs;
            this.isBaseImgPre = true;
        }
    },
    computed: {
        showBtn() {
            return this.$store.getters.platform != 'h5';
        }
    },
    watch: {
        keywords: function(n, o) {
            if (!this.$isNull(o)) {
                this.$refs['base-scroll'].startRefresh();
            }
        }
    }
};
</script>

<style lang="less" scoped>
.material-list {
    height: 100%;
    .list-top {
        > .content {
            padding: 0px 0.3rem;
            border-bottom: 1px solid #e6e6e6;
            > .title {
                line-height: 1.5;
                margin-top: 0.64rem;
                font-size: 0.31rem;
                font-weight: bold;
                color: #000;
            }
            > .date {
                margin-top: 0.1rem;
                line-height: normal;
                font-size: 0.24rem;
                color: #596880;
            }
            > .article {
                margin-top: 0.18rem;
                word-wrap: break-word;
                font-size: 0.28rem;
                line-height: normal;
                > pre {
                    font-size: 0.26rem;
                    color: #000;
                    line-height: 1.5;
                }
            }
            > .slide {
                margin-top: 0.28rem;
                > img {
                    width: 2.1rem;
                    height: auto;
                    margin-right: 0.18rem;
                    margin-bottom: 0.2rem;
                    border-radius: 0.05rem;
                }
            }
            > .func {
                margin-top: 0.45rem;
                display: flex;
                margin-bottom: 0.39rem;
                > div {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: normal;
                    height: 0.46rem;
                    font-size: 0.25rem;
                    border-radius: 0.23rem;
                    padding: 0px 0.24rem;
                }
                > .copy {
                    color: rgba(85, 98, 236, 1);
                    background: rgba(85, 98, 236, 0.1);
                }
                > .make {
                    color: rgba(255, 138, 53, 1);
                    background: rgba(255, 138, 53, 0.1);
                    margin: 0px 0.28rem;
                }
                > .save {
                    color: rgba(68, 177, 254, 1);
                    background: rgba(68, 177, 254, 0.1);
                }
            }
        }
    }
}
</style>
