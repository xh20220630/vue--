<template>
  <div class="twoMenu">
    <!-- 二级菜单项 -->
    <el-menu
    :default-active="routePath"
    background-color="#304156" 
    text-color="#326775"
    active-text-color="#fff" 
    unique-opened
    :collapse="isCollapse" 
    router>
      <el-sub-menu ref="elSubMean"
        :class="{ noChild: item.children.length == 0,active:item.children.length==0 && isActived  }"
        v-for="item in meauData"
        :key="item.title"
        :index="item.path"
        @click="link(item)"
      >
        <template #title>
          <svg-icon :icon="item.icon" class="icon"></svg-icon>
          <span>{{ item.title }}</span>
        </template>
        <!-- 子菜单项 -->
        <menu-item @click="changeIsActived" :childData="item.children"></menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>
<script setup>
//获取store中的routerDatd数据
import { useStore } from "vuex";
import { computed,ref,onMounted } from "vue";
//导入菜单项
import menuItem from "./menuItem.vue";
//获取当前的路由信息
import {useRoute,useRouter} from "vue-router";
const store = useStore();
const route = useRoute();
const router = useRouter()
const isActived = ref(false);
const elSubMean =ref(null);
const meauData = computed(() =>  store.state.routerData.routerData);
const routePath = computed(()=> route.path)
const isCollapse = computed(()=> !store.getters.getterIsOpend.status)
const link=(item)=>{
    if(!item.children.length && router.path !== item.path){
        isActived.value=true
        router.push(item.path)
    }
    return item
}
const changeIsActived = ()=>{
    isActived.value = false
}
onMounted(()=>{
    if(route.path == '/profile'){
        isActived.value = true;
    }
})
</script>
<style lang="scss" scoped>
.twoMenu {
  margin-top: 30px;
  color: #fff;
  .el-menu{
    border: none;
  }
  :deep(.noChild) {
    .el-icon {
      display: none;
    }
  }
  :deep(.active){
    span{
        color: #fff;
    }
  }
  span {
    margin-left: 10px;
  }
}
</style>