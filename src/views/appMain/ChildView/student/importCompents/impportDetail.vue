<template>
  <!-- 导入详情组件 -->
  <div class="importDetail">
    <el-dialog v-model="isOpen" :top="'300px'" width="600px">
      <template #header>
        <h4>展示详情</h4>
      </template>
      <div class="mesBox">
        <div class="successBox">
          <p>成功数据</p>
          <el-table :data="improtDetail.successedStudent" :max-height="150">
            <el-table-column
              :width="200"
              prop="telephone"
              label="电话号码"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div class="errorBox">
          <p>失败数据</p>
          <el-table :data="improtDetail.errorStudent" :max-height="150">
            <el-table-column
              :width="200"
              prop="telephone"
              label="电话号码"
              align="center"
            ></el-table-column>
            <el-table-column
              :width="200"
              prop="errortitle"
              label="失败原因"
              align="center"
              :style="{color:'red'}"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, defineExpose, defineProps } from "vue";
//控制对话框显示与否的变量
const isOpen = ref(false);
//接受父组件传入的值
const importDetailData = defineProps(["improtDetail"]);
//导出的函数，调用使对话框显示
const openFn = () => {
  isOpen.value = true;
};
//暴露
defineExpose({
  openFn,
});
</script>
<style lang="scss" scoped>
.mesBox{
    display: flex;
    justify-content: space-around;
    .successBox{
        :deep(.el-table__inner-wrapper){
            color: forestgreen;
        }
        p{
            margin-left: 65px;
            font-size: 18px;
            color: forestgreen;
            font-weight: 600;
        }
    }
    .errorBox{
        :deep(.el-table__inner-wrapper){
            color: red;
        }
        p{
            margin-left: 166px;
            font-size: 18px;
            color: red;
            font-weight: 600;
        }
    }
}
</style>