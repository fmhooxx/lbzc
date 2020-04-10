<template>
    <div class="share">
        <product-nav :sel.sync="sel"></product-nav>
        <base-placeholder height="1.14rem"></base-placeholder>
        <keep-alive>
            <dai-product v-if="sel=='dai'"></dai-product>
            <card-product v-if="sel=='card'"></card-product>
        </keep-alive>
        <base-bottom></base-bottom>
        <base-bottom-nav-agent></base-bottom-nav-agent>
    </div>
</template>
<script>
import ProductNav from './components/ProductNav';
import DaiProduct from './components/DaiProduct';
import CardProduct from './components/CardProduct';


export default {
    components: { ProductNav, DaiProduct, CardProduct },
    data() {
        return {
            sel: ''
        };
    },
    activated() {
        this.sel = this.$route.query.type || 'dai';
    }
};
</script>

