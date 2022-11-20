<template>
  <div class='error401'>
    <error :msg="'你当前访问的页面不存在'" :toRoute="routeObj">
      <el-icon :size=200><WarningFilled /></el-icon>
    </error>
  </div>
</template>
<script setup>
import error from "@/components/error.vue";
import {WarningFilled} from '@element-plus/icons-vue'
const routeObj = {
  title:"个人中心页面",
  route:'/'
}
</script>
<style lang="scss" scoped>

</style>