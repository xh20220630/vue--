<template>
  <div class='error401'>
    <error :msg="'你没有权限访问该页面'" :toRoute="routeObj">
      <el-icon :size=300><Warning /></el-icon>
    </error>
  </div>
</template>
<script setup>
import error from "@/components/error.vue";
import {Warning} from '@element-plus/icons-vue'
const routeObj = {
  title:"登录页面",
  route:'/login'
}
</script>
<style lang="scss" scoped>

</style>