<template>
  <div class='menuItem'>
    <!-- 定义菜单项 -->
    <el-menu-item v-for="item in childData" :key="item.title" :index="item.path">
      <svg-icon class="icon" :icon="item.icon"></svg-icon>
      <span>{{item.title}}</span>
    </el-menu-item>
  </div>
</template>
<script setup>
//接收二级菜单传递的子菜单项的数据
import {defineProps} from "vue"
const props = defineProps(['childData'])
// console.log(props.childData)



</script>
<style lang="scss" scoped>
span{
  margin-left: 10px;
}
</style>