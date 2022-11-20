<template>
  <div class="homepage" :class="{ low: homepageIsLow }">
    <!-- 存放三个位置不同的组件 -->
    <sideBar></sideBar>
    <headNav :homepageIsLow="homepageIsLow"></headNav>
    <div class="app-box">
      <appMain></appMain>
    </div>
  </div>
</template>
<script setup>
//引入三个组件
import { ref, onMounted, nextTick } from "vue";
import sideBar from "@/views/SideBar";
import appMain from "@/views/appMain";
import headNav from "@/views/headNav";
import computedHeights from "@/assets/js/computeHeight";

const homepageIsLow = ref(false);

</script>
<style lang="scss" scoped>
.app-box {
  position: absolute;
  width: calc(100% - $sideBarWidth);
  height: 100%;
  left: $sideBarWidth;
  margin-left: 20px;
  top: 130px;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: initial;
  max-height: calc(100% - 130px);
  overflow-y: scroll;
  background: #ffff;
  transition: $sideBarDuration;
}
.low {
  z-index: -1;
}
</style>