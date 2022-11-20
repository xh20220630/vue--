<template>
  <div class='articleCreate'>
    <el-card class="topContent"><h4>创建文章</h4></el-card>
    <el-card class="tabContent">
      <div class="findContent">
        <el-input v-model="articleTitle" placeholder="请输入文章标题"></el-input>
      </div>
      <vueEidor v-model="articlText" :height="tableHeight.value+'px'"></vueEidor>
      <el-button type="primary" @click="createArticle">创建文章</el-button>
    </el-card>
  </div>
</template>
<script setup>
//导入编辑器
import vueEidor, { async } from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from "prismjs"

import {ref} from "vue"
import getAutoHeight from "@/assets/js/computeHeight"
import {useRouter} from  "vue-router"
import { ElMessage } from "element-plus";
import reqCreateArticle from "@/reqApi/reqArticle/reqCreateArticle"
vueEidor.use(vuepressTheme, {
  Prism,
});
const articlText = ref("");
const articleTitle = ref("");
const tableHeight = ref('');
const router = useRouter();
tableHeight.value = getAutoHeight(420,router)

const createArticle = ()=>{
  if(!articlText.value.trim() || !articlText.value.trim()){
    //说明文章标题或者内容为空
    ElMessage.warning("文章标题和内容不能为空");
    return
  }
  //到这里就可以向后端发起创建文章的请求了
  submitArticle()
}

const submitArticle = async ()=>{
    const {data} = await reqCreateArticle({
      articleText:articlText.value,
      articleTitle:articleTitle.value
    })

    if(data.status == "400"){
      ElMessage.success(data.msg);
      remove()
    }else{
      ElMessage.error(data.msg)
    }
} 

//定义一个清除内容的方法

const remove = ()=>{
  articleTitle.value = "",
  articlText.value = ""
}
//离开当前组件需要把文章标题和内容重新清零
router.afterEach(()=>{
  remove()
})
</script>
<style lang="scss" scoped>
.findContent{
  margin: 20px 0px;
  width: 13%;
  :deep(.el-input__inner){
    height: 50px;
    font-size: 16px
  }
}
:deep(.el-button){
    float: right;
    margin: 12px 
  }
</style>