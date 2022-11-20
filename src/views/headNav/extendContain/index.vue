<template>
  <div class="extend-contain">
      <div class="icon">
        <svg-icon
          @click="changeIsOpen"
          class="iconHamburger"
          :icon="hamburgerIcon"
          id="second-hambarger"
        ></svg-icon>
      </div>
      <hamburgerTitle></hamburgerTitle>
    </div>
</template>
<script setup>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import hamburgerTitle from "../hambargerTitle"
const isOpend = ref(true);
const store = useStore();
const hamburgerIsOpend = computed(() => store.getters.getterIsOpend.status);
const hamburgerIcon = computed(() =>
  hamburgerIsOpend.value ? "hamburger-opened" : "hamburger-closed"
);

const changeIsOpen = () => {
  store.dispatch('hamburger/actionIsOpned');
   decsideBarWidth();
//   console.log(hamburgerIsOpend);
};
const decsideBarWidth = ()=>{
  if(!hamburgerIsOpend.value){
    document.getElementsByTagName('body')[0].style.setProperty('--changeSidebar','66px');// 括号里写root中定义的变量和改变后的值
  }else{
    document.getElementsByTagName('body')[0].style.setProperty('--changeSidebar','210px');
  }
}
onMounted(()=>{
  decsideBarWidth()
})
</script>
<style lang="scss" scoped>
.extend-contain {
    width: 150px;
    line-height: 70px;
    height: 70px;
    display: flex;
    justify-content: space-around;
    .icon {
      height: 20px;
      line-height: 80px;
      .iconHamburger {
        cursor: pointer;
      }
    }
  }
</style>