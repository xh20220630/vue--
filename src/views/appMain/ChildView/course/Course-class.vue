<template>
  <div class="CourseClass">
    <el-card class="topContent">
      <h4>课程班期</h4>
    </el-card>
    <el-card>
      <div class="findContent">
        <el-date-picker
          v-model="classTime"
          type="daterange"
          unlink-panels
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          size="default"
          clearable
          @change="changeTime()"
        />
      </div>
    </el-card>
   <el-table
        v-loading="loading"
        :data="classList"
        style="width: 100%"
        size="large"
        ref="tableRef"
      >
         <el-table-column
          align="center"
          label="开始时间"
          width="300"
        >
        <template #default={row}>
            {{formatTime(row.enrollStdent[0])}}
        </template>
        </el-table-column>
      <el-table-column
          align="center"
          label="结束时间"
          width="300"
        >
        <template #default={row}>
            {{formatTime(row.enrollStdent[1])}}
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="className"
          label="课程名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="studentNumber"
          label="学员人数"
          width="100"
        >
        </el-table-column>

        <el-table-column
          align="center"
          prop="liveNumber"
          label="直播数量"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="updataPeople"
          label="更新人"
          width="300"
        >
        </el-table-column>
         <el-table-column
          align="center"
          label="更新时间"
          width="300"
        >
        <template #default={row}>
            {{formatTime(row.updataTime/1)}}
        </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template v-slot:default="{ row }">
            <el-button  type="primary" plain
              >进入直播</el-button
            >
            <el-button @click="openAddLive(row)" type="primary" plain
              >新增直播</el-button
            >
          </template>
        </el-table-column>
   </el-table>
   <!-- 分页器 -->
      <el-pagination
        @size-change="reqClassListFn"
        @current-change="reqClassListFn"
        v-model:current-page="classOption.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        v-model:page-size="classOption.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="classOption.total"
      >
      </el-pagination>
   <showLive :classID = "classID" ref="addLiveRef" @reqClassListFn = "reqClassListFn" :liveList="liveList" ></showLive>
  </div>
</template>
<script setup>
import { ref,onActivated,onDeactivated } from "vue";
import reqClassList from "@/reqApi/reqClassLive/reqClass";
import formatTime from "@/assets/js/formatTime"
import showLive from "./compents/showLive.vue"
const classTime = ref("");
const classList = ref([]);
const loading = ref(true);
const addLiveRef = ref({});
const classID = ref("");
const liveList = ref({
  courseName:"",
  className:"",
  liveid:""
});
const classOption = ref({
  startTime:"",
  endTime:"",
  currentPage: 1,
  pageSize: 10,
  total:0
});

//用户选定时间触发
const changeTime = (time)=>{
  //发起请求
  if(classTime.value == null ||classTime.value.length==0 ){
     classOption.value.startTime = ""
     classOption.value.endTime = ""
  }else{
     classOption.value.startTime = new Date(classTime.value[0]).getTime();
     classOption.value.endTime =  new Date(classTime.value[1]).getTime();
  }
   reqClassListFn();
  
} 

//点击新增直播触发的函数
const openAddLive = (row)=>{
  //调用ref暴露的方法
  init(row);
  addLiveRef.value.openDrawer();
}
const reqClassListFn = async () => {
  loading.value = true;
  setTimeout(async ()=>{
  const res = await reqClassList(classOption.value);
  classList.value = res.data.data;
  classOption.value.total = res.data.total;
  loading.value = false;
  },500)
};

//配置liveList
const init = (row)=>{
  const courseArr = row.className.split("--");
  liveList.value.courseName = courseArr[0];
  liveList.value.className = courseArr[1];
  liveList.value.liveid = row.liveList;
  classID.value = row._id;
}

onActivated(()=>{
  reqClassListFn();
})
</script>
<style lang="scss" scoped>
.findContent {
  width: 30%;
}
</style>