
<template>
  <svg class="svg-icon" aria-hidden="true">
    <use :xlink:href="innerIcon" />
  </svg>
  <!-- 使用图片的方式 -->
  <!-- <img :src="imgSrc" alt=""> -->
</template>
<script setup>
//自定义的全局svg组件
import { computed,defineProps } from "vue";

//负责接受传递的props参数，通过props.icon的值去找我们本地的svg文件，进行展示
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});
//需要对我们的路径进行相应的处理
const innerIcon = computed(() => "#icon-" + props.icon);
const imgSrc =  require('@/icons/svg/'+props.icon+'.svg')
</script>
<style lang="scss" scoped>
.svg-icon{
    display: inline-block;
    width: 20px;
    height: 20px;
}
</style>>