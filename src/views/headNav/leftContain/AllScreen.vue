<template>
<!-- 全屏组件 -->
  <div class='fullScreen'>
    <svg-icon class="fullIcon" id="three-fullScreen" :icon="fullIcon" @click="changeIsFull"></svg-icon>
  </div>
</template>
<script setup>
import {ref,computed,onMounted} from "vue"
//使用第三方的包screenfull
import screenFull from "screenfull"

const isFull = ref(false) //默认不是全屏状态

const fullIcon = computed(()=> isFull.value?"exit-fullscreen":"fullscreen");

const changeIsFull = ()=>{
    screenFull.toggle()
}
const changeScreen=()=>{
  //把当前是否是全屏的值赋给isFull
  isFull.value = screenFull.isFullscreen;
}
onMounted(()=>{
  //当页面全屏发生变化时，触发里面的函数
  screenFull.on("change",changeScreen);
})
//进行全屏的处理(原生的)
// const enterFull = ()=>{
//   let doc = document.documentElement;
//   //当前不是全屏
//   if(!isFull.value){
//     doc.requestFullscreen() //进入全屏
//   }else{
//     document.exitFullscreen(); //退出全屏
//   }

// }
</script>
<style lang="scss" scoped>
.fullScreen{
  line-height: 80px;
  .fullIcon{
  cursor: pointer;
}
}

</style>