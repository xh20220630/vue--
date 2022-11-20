<template>
  <!-- <div class="box">app
    <a href="">123</a>
    <svg-icon icon="user"></svg-icon>
  </div> -->
  <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
  </router-view>
   <!-- <detail></detail> -->
</template>
<script setup>
// import detail from "@/views/appMain/ChildView/student/compents/detail.vue"
</script>
<style lang="scss">
.Login,.Register{
  background: linear-gradient(135deg, rgba(30,29,31,1) 0%, rgba(223,64,90,1) 100%);
}

</style>
