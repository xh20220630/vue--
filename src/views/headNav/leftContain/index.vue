<template>
  <div class="leftContain">
    <search></search>
    <guide></guide>
    <fullContain></fullContain>
    <div class="userIMg">
      <!-- <img :src="imgSrc" alt=""> -->
      <el-dropdown trigger="click">
        <el-avatar :src="imgSrc" class="userIcon" shape="square" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="routerLink.routerHome">返回首页</el-dropdown-item>
            <el-dropdown-item divided @click="routerLink.routerLogin">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import fullContain from "./AllScreen.vue";
import search from "./search.vue";
import guide from "./guide.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const routerLink = {
  routerHome(){
    router.push('/');
  },
  routerLogin(){
    store.dispatch('userInfo/exitLoginFn')
    // router.push('/login')
  }
}
const imgSrc = computed(() => store.getters.userImgSrc);
// console.log(fullContain)

</script>
<style lang="scss" scoped>
.leftContain {
  display: flex;
  // width: 400px;
  justify-content: space-around;
  height: 100%;
  position: relative;
  top: -70px;
  float: right;
  align-content: center;
  line-height: 70px;
  div {
    margin-right: 20px;
  }
  .userIMg {
    margin-top: 13px;
    .userIcon{
      cursor: pointer;
    }
  }
}

</style>