<template>
    <div class="material">
        <NavHeader>推广素材</NavHeader>
        <BaseTop></BaseTop>
        <div class="content">
            <MaterialList></MaterialList>
        </div>
    </div>
</template>
<script>
import NavHeader from '../componentss/NavHeader';
import MaterialList from '../componentss/MaterialList';
export default {
    components: { NavHeader, MaterialList }
};
</script>
