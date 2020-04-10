<template>
    <div></div>
</template>
<script>
export default {
    created() {
        let r = this.$route.query.url;
        this.$goReplace(decodeURIComponent(r));
    }
};
</script>

