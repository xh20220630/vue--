<template>
  <div class="CourseLive">
    <el-card class="topContent">
      <h4>课程直播</h4>
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
        :data="liveList"
        style="width: 100%"
        size="large"
        ref="tableRef"
      >
        <el-table-column
          align="center"
          prop="courseName"
          label="课程名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="className"
          label="班期名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="liveName"
          label="直播名称"
          width="300"
        >
        </el-table-column>

        <el-table-column
          align="center"
          label="直播时间"
          width="300"
        >
        <template #default={row}>
          {{formatTime(row.liveTime)}}
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="liveTeacher"
          label="讲师"
          width="300"
        >
        </el-table-column>
         <el-table-column
          align="center"
          label="直播时长"
          width="300"
        >
        <template #default={row}>
            {{formatTimeNumber(row.liveDuration)}}
        </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template v-slot:default="{ row }">
            <el-button @click="openEditLive(row)" type="primary" plain
              >编辑直播</el-button
            >
          </template>
        </el-table-column>
   </el-table>
   <el-pagination
        @size-change="reqAllLiveFn"
        @current-change="reqAllLiveFn"
        v-model:current-page="liveOption.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        v-model:page-size="liveOption.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="liveOption.total"
      >
      </el-pagination>
      <edit-live  @updata="reqAllLiveFn()"  :editLiveDate="editLiveDate" ref="editLiveRef"></edit-live>
  </div>
</template>
<script setup>
import { ref,onActivated,onDeactivated } from "vue";
import reqAllLive from "@/reqApi/reqClassLive/reqAllLive";
import formatTime from "@/assets/js/formatTime";
import formatTimeNumber from "@/assets/js/formatTimeNumber";
import editLive from "./compents/editLive.vue"

const classTime = ref("");
//直播筛选项
const liveOption = ref({
  liveName: "",
  startTime:"",
  endTime:"",
  pageSize:10,
  currentPage:1,
  total:0
});
const liveList = ref([]);
const loading = ref(true);
const editLiveRef = ref({});
const editLiveDate = ref({});
//请求全部直播数据
const reqAllLiveFn =async ()=>{
    loading.value = true;
    setTimeout(async ()=>{
      const res = await reqAllLive(liveOption.value);
      liveList.value = res.data.data;
      liveOption.value.total = res.data.total;
      console.log(res);
      loading.value = false;
    },500)
}

//用户选定时间触发
const changeTime = ()=>{
  //发起请求
  if(classTime.value == null ||classTime.value.length==0){
     liveOption.value.startTime = ""
     liveOption.value.endTime = ""
  }else{
     liveOption.value.startTime = new Date(classTime.value[0]).getTime();
     liveOption.value.endTime =  new Date(classTime.value[1]).getTime();
  }
   reqAllLiveFn();
  
} 

//打开编辑直播
const openEditLive = (row)=>{
  editLiveDate.value = row;
  editLiveRef.value.openDialogMth();
}
onActivated(()=>{
  reqAllLiveFn();
})
reqAllLiveFn();
</script>
<style lang="scss" scoped>
.findContent {
  width: 30%;
}
</style>