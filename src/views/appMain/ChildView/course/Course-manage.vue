<template>
  <div class="CourseManage">
    <el-card class="topContent">
      <h4>课程管理</h4>
    </el-card>
    <el-card>
      <div class="findContent">
        <el-select
          v-model="courseOptions.courseKind"
          placeholder="项目名称"
          size="large"
          @change="reqCourseList()"
          clearable
        >
          <el-option v-for="item in courseKindArr" :key="item" :value="item" />
        </el-select>
        <el-input
          v-model="courseOptions.courseName"
          placeholder="请输入需要查找的课程名字"
          @input="reqCourseList()"
        />
      </div>
    </el-card>
    <!-- 表格区域 -->
    <div class="tabContent">
      <el-table
        v-loading="loading"
        :data="courseList"
        style="width: 100%"
        size="large"
        ref="tableRef"
      >
        <el-table-column
          align="center"
          prop="courseKind"
          label="课程类别"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="courseName"
          label="课程名称"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="salePrice"
          label="课程价格"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="lowPrice"
          label="
        课程最低价"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="originPrice"
          label="课程原价"
          width="300"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="courseCount"
          label="课程数量"
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
        <el-table-column align="center" label="更新时间" width="300">
          <template v-slot:default="{ row }">
            {{ formatTime(row.updataTime) }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="300" align="center">
          <template v-slot:default="{ row }">
            <el-button @click="openEditCourse(row)" type="primary"
              >编辑课程</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination
        @size-change="reqCourseList"
        @current-change="reqCourseList"
        v-model:current-page="courseOptions.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        v-model:page-size="courseOptions.pageSum"
        layout="total, sizes, prev, pager, next, jumper"
        :total="courseOptions.total"
      >
      </el-pagination>
      <edit-course
        @reqCourseList="reqCourseList()"
        :courseMessage="courseMessage"
        ref="editCouseRef"
      ></edit-course>
    </div>
  </div>
</template>
<script setup>
import { ref,onActivated,onDeactivated } from "vue";
import reqCourseMessage from "@/reqApi/reqCourse/reqCourseMessage";
import editCourse from "./compents/editCourse.vue";
import formatTime from "@/assets/js/formatTime";
const courseOptions = ref({
  //项目名称
  courseKind: "",
  //课程名称
  courseName: "",
  //当前页数
  currentPage: 1,
  //需要返回的页数
  pageSum: 10,
  //总页数
  total: 0,
});
const courseList = ref([]);
const courseKindArr = ref([]);
const loading = ref(true);
const editCouseRef = ref({});
const courseMessage = ref({});
//请求课程
const reqCourseList = async () => {
  loading.value = true;
  setTimeout(async () => {
    const res = await reqCourseMessage(courseOptions.value);
    courseKindArr.value = res.data.courseKindArr;
    courseList.value = res.data.courseMeesage;
    loading.value = false;
    courseOptions.value.total = res.data.total;
  }, 500);
};
reqCourseList();

//编辑课程
const openEditCourse = (value) => {
  //打开编辑课程组件
  console.log(value);
  editCouseRef.value.openEditCourse();
  courseMessage.value = value;
};
onActivated(()=>{
  reqCourseList();
})
</script>
<style lang="scss" scoped>
.findContent {
  width: 40%;
}
</style>