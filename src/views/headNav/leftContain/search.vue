<template>
  <!-- 搜索组件 -->
  <div class="search">
    <svg-icon id="four-search" icon="search" class="searchBox" @click.stop="changeIsShow"></svg-icon>
    <el-select
      v-model="Optionvalue"
      class="searchOption"
      :class="{ show: isShow }"
      placeholder="搜索"
      remote
      :remote-method="remoteMethod"
      filterable
      ref="searchInput"
      :loading="loading"
      @change="selectLink"
    >
      <el-option v-for="item in searchSuccessData" :key="item.title" :value="item">{{item.titles.join('>')}}
      </el-option>
    </el-select>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
import {useRouter} from "vue-router"
import search from "./searchDataPool";
const Optionvalue = ref("");
const router = useRouter();
const searchSuccessData = ref([]);
const searchVal = search(); //拿到处理好的数据搜索池
const isShow = ref(false);
const searchInput = ref(null);
const loading = ref(false);
const remoteMethod = async (val) => {
  loading.value = true
  setTimeout(()=>{
          loading.value=false
  },1000)
  let arr = [];
  if (val == "") {
    return (arr = []);
  }
  const data = await searchVal;
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (data[i].titles[0].indexOf(val) !== -1) {
      arr.push(data[i]);
      // console.log(data[i]);
    }
    data[i].children.forEach((item) => {
      let titles = item.titles.join(">");
      if (titles.indexOf(val) !== -1) {
        arr.push(item);
      }
    });
  }
  searchSuccessData.value = arr;
};
const changeIsShow = () => {
   searchInput.value.focus();
  if(isShow.value){
      searchSuccessData.value = [];
      isShow.value = false;
  }else{
     isShow.value = true
  }
};
watch(isShow,(newVal)=>{
  if(newVal){
    document.addEventListener('click',changeIsShow)
  }else{
    document.removeEventListener('click',changeIsShow)
  }
})
const selectLink = (val)=>{
  // console.log(Optionvalue.value);  
  router.push(val.path);
  Optionvalue.value = "";
  searchSuccessData.value = [];
}
</script>
<style lang="scss" scoped>
:deep(.el-select .el-input.is-focus .el-input__wrapper) {
  box-shadow: none !important;
}
.searchBox {
  margin-right: 10px;
  transform: translateY(5px);
  cursor: pointer;
}
.searchOption {
  :deep(.el-input__wrapper) {
    padding: 0;
    width: 0px;
    background: none;
    box-shadow: none !important;
    border-bottom: 1px solid whitesmoke;
    transition: 0.5s;
    .el-input__inner {
      color: white;
    }
  }
  :deep(.el-select .el-input.is-focus .el-input__wrappe) {
    box-shadow: none !important;
  }
}
.show {
  :deep(.el-input__wrapper) {
    width: 214px;
    padding: 0px 11px;
  }
}
</style>