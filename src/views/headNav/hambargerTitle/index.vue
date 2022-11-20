<template>
  <div class="hambargerTitle" >
    <el-breadcrumb id="five-hambargerTitle" separator="/">
      <transition-group name="dome">
      <el-breadcrumb-item
        v-for="(item,index) in route.matched"
        :key="item.path"
        :to="item.path"
        >
        <span v-if="index !== route.matched.length-1">{{item.meta.title}}</span>
        <a v-else href="/" @click.prevent>{{item.meta.title}}</a>
        </el-breadcrumb-item
      >
      </transition-group>
    </el-breadcrumb>
  </div>
</template>
<script setup>
//获取当前的路由信息(展示的内容要根据当前的路由信息做出不同的改变);
import { useRoute } from "vue-router";

const route = useRoute();

//route.matched 可以拿到关于当前路由子路由和父级路由的信息
</script>
<style lang="scss" scoped>
.el-breadcrumb {
  line-height: 70px;
  span{
    color: #fff;
    font-weight: 400;
  }
}
.dome-enter,.dome-leave-to{
    opacity: 0;
    transform: translateX(20px);
     position: absolute;
}
.dome-enter-to,.dome-leave{
    opacity: 1;
    transform: translateX(0px);
}
.dome-enter-active,
.dome-leave-active {
  transition: 2s;
}
.dome-leave{
    position: absolute;
}


</style>