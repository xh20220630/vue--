<template>
  <div class='appMain' ref="appMainRef">
  <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
  </router-view>
  </div>
</template>
<script setup>
</script>
<style lang="scss" scoped>

</style>