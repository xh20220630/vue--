<template>
  <div class="tagviews" id="sixd-tagview">
    <el-tag @click.right.prevent.stop="showLeftMeau(index,$event)"
    class="tagViewitem"
    v-for="(item,index) in routelinkedArr"
    :key="item.fullPath"
    :closable="index == isChecked?false:true"
    color="#d3cce3"
    checked 
    :effect="index == isChecked?'dark':'light'"
    style="margin-right: 8px"
    @close="handleClose(index)"
    @click.stop="linkROute(item)"
    >{{item.meta.title}}</el-tag>
    <left-meau @click.stop="close" :index="leftMeauIndex" :style="position" v-show="isShow"></left-meau>
  </div>
</template>
<script setup>
//获取用户的路由记录
import { computed,ref, watch } from "vue";
import { useStore } from "vuex";

import {useRoute,useRouter} from "vue-router";
import leftMeau from "./leftMeau.vue"
const store = useStore();
const route = useRoute();
const router = useRouter();
const isShow = ref(false);
const position = ref(null);
const appBox = ref(null)
const leftMeauIndex = ref(12)
const routelinkedArr = computed(() => store.getters.getterRouteLinked);
const isChecked = computed(()=>{
    return routelinkedArr.value.findIndex((item)=>{
        return  item.fullPath === route.fullPath;
    })
})
const linkROute = (item)=>{
    close()
    router.push(item.fullPath)
}
const handleClose = (index)=>{
    console.log(isChecked);
    routelinkedArr.value.splice(index,1)
    store.commit('routerData/setRouterLinkedArr',routelinkedArr.value)
}
const showLeftMeau = (index,$event)=>{
    position.value = {
        left:$event.x+'px',
        top:$event.y+'px'
    }
    leftMeauIndex.value = index;
    console.log($event);
    isShow.value = true;
}
const close = ()=>{
    isShow.value = false;
    console.log(isShow)
}
watch(isShow,(newValue)=>{
    if(newValue){
        document.documentElement.addEventListener('click',close)
    }else{
        document.documentElement.removeEventListener('click',close)
    }
})
</script>
<style lang="scss" scoped>
.tagViewitem{
    cursor: pointer;
    user-select: none;
}
</style>