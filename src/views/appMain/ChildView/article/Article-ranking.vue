<template>
  <div class='articleRinking'>
   <el-card class="topContent">
    <h4>文章排名</h4>
   </el-card>
   <el-card class="tabContent">
    <el-table :data="articleList"   v-loading="loading" :max-height="tableHeight.value" style="width:100%">
      <el-table-column label="排名" prop="rank"/>
      <el-table-column label="文章标题" prop="articleTitle"/>
      <el-table-column label="发布时间">
        <template #default={row}>
        {{formatTime(row.articleTime)}}
      </template>
      </el-table-column>
      <el-table-column label="发布人" prop="author"/>
      <el-table-column fixed="right">
        <template #default={row}>
          <el-button type="primary" @click="openDetail(row.articleText)">
            点击查看文章
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="文章详情"
      v-model="isOpenDetail"
      width="50%"
    >
    <div class="detailContent" v-html="articleHtml">
    </div>
    </el-dialog>
   </el-card>
    <el-pagination
        v-model:currentPage="option.currentPage"
        v-model:page-size="option.pageSize"
        :page-sizes="[3, 5, 7, 30, 40, 50]"
        small="small"
        layout="total, sizes, prev, pager, next, jumper"
        :total="option.total"
        @current-change="getClassFn()"
        @size-change="getClassFn()"
      />
  </div>
</template>
<script setup>
import {ref,onActivated,onDeactivated} from "vue"
import {useRouter} from "vue-router"
import "@/assets/css/vue.css"
import formatTime from "@/assets/js/formatTime"
import getAutoHeight from "@/assets/js/computeHeight"
import reqArticleList from "@/reqApi/reqArticle/reqArticleList"
import showdown from "showdown"

const articleList = ref([]);
const option = ref({
  currentPage:1,
  pageSize:3,
  total:0
})
const router = useRouter();
const loading = ref(false);
const tableHeight = ref(null);
const isOpenDetail = ref(false);
const articleHtml = ref('')
tableHeight.value = getAutoHeight(300,router);
//定义一个发起请求文章列表的方法
const getArticleList =async ()=>{
    loading.value = true
   setTimeout( async ()=>{
    loading.value = false
     const {data} = await reqArticleList(option.value);
    option.value.total = data.total;
    console.log(data);
    articleList.value = data.data
   },800)
}
const getClassFn = ()=>{
  getArticleList();
}

//定义打开详情页面的方法
const openDetail = (text)=>{
  isOpenDetail.value = true
  //把md转为html
  const converter = new showdown.Converter();
  //开发表格功能
  converter.setOption('tables',true);
  //开发checkbox功能
  converter.setOption('tasklists',true);

 articleHtml.value = converter.makeHtml(text);

}
onActivated(()=>{
  getArticleList();
  console.log('123');
})
getArticleList();
</script>
<style lang="scss" scoped>
:deep(.el-table){
  .cell{
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
:deep(.el-dialog){
  max-height: 600px;
  overflow: auto;

}
</style>