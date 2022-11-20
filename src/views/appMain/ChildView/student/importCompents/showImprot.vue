<template>
  <!-- 显示学员导入信息的组件 -->
  <div class="showImport">
    <!-- 显示导入信息的表格 -->
    <el-table
      v-loading="loading"
      :data="importList"
      style="width: 100%"
      :max-height="maxHeight.value"
    >
      <el-table-column
        width="300"
        align="center"
        prop="fileName"
        label="文件名"
      />
      <el-table-column
        width="300"
        align="center"
        prop="successNum"
        label="成功数"
      />
      <el-table-column
        width="300"
        align="center"
        prop="errorNum"
        label="失败数"
      />
      <el-table-column width="300" align="center" label="状态">
        <template #default="{ row }">
          <div class="statusBox" :class="statusClass(row.status)"></div>
        </template>
      </el-table-column>
      <el-table-column width="300" align="center" label="导入时间">
        <template #default="{ row }"
          >{{ formatTime(row.importTime) }}
        </template>
      </el-table-column>
      <el-table-column
        width="300"
        align="center"
        prop="importPeople"
        label="上传文件人员"
      />
      <el-table-column width="300" align="center" label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="showDetail(row)"
            >查看详情</el-button
          >
          <el-button type="primary" size="small" @click="deleteImport($event)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageModel.currentSize"
      v-model:page-size="pageModel.pageSize"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageModel.total"
      @size-change="reqImportFn"
      @current-change="reqImportFn"
    />
    <improtDetail
      :improtDetail="improtDetailValue"
      ref="improtDetailRef"
    ></improtDetail>
  </div>
</template>
<script setup>
import { ref, onMounted, defineExpose } from "vue";
import { useRouter } from "vue-router";
import reqImport from "@/reqApi/reqImport/reqShowImportFile";
import formatTime from "@/assets/js/formatTime";
import computeHeight from "@/assets/js/computeHeight";
import improtDetail from "./impportDetail.vue";
const importList = ref([]);
//设置变量的loading
const loading = ref(true);

const improtDetailRef = ref({});
const improtDetailValue = ref({
  successedStudent: [],
  errorStudent: [],
});
//分页器的model
const pageModel = ref({
  //当前的页数
  currentSize: 1,
  //当前需要返回多少条数据
  pageSize: 10,
  //总数据
  total: 0,
});
const router = useRouter();
const maxHeight = ref(0);
maxHeight.value = computeHeight(620, router);
//组件挂载时的回调
onMounted(() => {
  reqImportFn();
});

//状态的类名
const statusClass = (status) => {
  let className = "";
  switch (status) {
    case "404":
      className = "error";
      break;
    case "401":
      className = "warning";
      break;
    case "400":
      className = "sucess";
      break;
  }
  return className;
};
//后端请求导入列表
const reqImportFn = () => {
  loading.value = true;
  setTimeout(async () => {
    const res = await reqImport(pageModel.value);
    importList.value = res.data.data;
    pageModel.value.total = res.data.total;
    loading.value = false;
  }, 500);
};

//点击展开详情
const showDetail = (data) => {
  improtDetailValue.value.successedStudent = data.successedStudent;
  improtDetailValue.value.errorStudent = data.errorStudent;
  improtDetailRef.value.openFn();
};

//删除导入信息
const deleteImport = (Event)=>{
    let trDom=null;
   let tr = Event.composedPath();
   //因为每个tr所在的下标不一样所以要处理
   if(tr.length == 24){
    trDom = tr[3];
   }else if(tr.length == 25){
    trDom = tr[4];
   }
   let classList = [...trDom.classList];
  if(classList.indexOf("deleteAnnimation")!= -1){
    //说明有了这个类名了
    trDom.classList.remove("deleteAnnimation");
  }else{
     trDom.classList.add("deleteAnnimation");
  }
}   
//导出
defineExpose({
  reqImportFn,
});
</script>
<style lang="scss" scoped>
.statusBox {
  width: 10px;
  height: 10px;
  margin: auto;
  border-radius: 50%;
}
.showImport {
  margin-top: 30px;
}
.sucess {
  background: green;
}

.warning {
  background: yellow;
}

.error {
  background: red;
}
:deep(.el-table--fit) {
  z-index: 0 !important;
}
</style>