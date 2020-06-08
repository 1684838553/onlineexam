<template>
    <div class="sys">
        <viewHeader />
        <leftNav />
        <div class="main_view">
            <router-view />
        </div>
    </div>
</template>
<script>
import viewHeader from "./viewHeader.vue"
import leftNav from "./leftNav.vue"
export default {
    name: 'sys',
    components: {
        viewHeader,
        leftNav
    },
    data() {
        return {
        }
    }
}
</script>
<style scoped lang='less'>
.sys {
    height: 100%;

    img {
        width: 500px;
        height: 300px;
    }

    .main_view{
       overflow: auto;
       padding-top: 0.1rem;
       padding-left: 2%;
       box-sizing: border-box;
    }
}
</style>