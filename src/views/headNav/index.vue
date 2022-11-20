<template>
  <div>
    <div class="headNav">
    <extendContain></extendContain>
    <leftContain></leftContain>
    <tagviews></tagviews>
  </div>
  </div>
</template>
<script setup>
import extendContain from "./extendContain";
import leftContain from "./leftContain";
import tagviews from "./tagViews"
</script>
<style lang="scss" scoped>
.headNav {
  position: fixed;
  z-index: 2;
  margin-left: $sideBarWidth;
  height: 110px;
  background: -webkit-linear-gradient(
    to right,
    #f29492,
    #114357
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #f29492,
    #114357
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  box-shadow: 0px 0px 6px 0px;
  width: calc(100% - $sideBarWidth);
  transition: $sideBarDuration;
}
</style>