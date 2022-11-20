<template>
  <div class="editLive">
    <el-dialog
      v-model="isOpenDialog"
      width="30%"
      title="编辑直播"
      :close-on-click-modal="false"
      :before-close="close"
    >
      <el-form :model="cloenLiveDate" :rules="addLiveRules" ref="editLiveRef">
        <el-form-item prop="liveName" label="直播标题">
          <el-input v-model="cloenLiveDate.liveName"></el-input>
        </el-form-item>
        <el-form-item prop="liveTime" label="直播时间">
          <el-date-picker
            v-model="cloenLiveDate.liveTime"
            type="datetime"
            placeholder="选择直播时间"
            :disabled-date="disabledDate"
            @focus="getLiveTime(cloenLiveDate.liveTime)"
            :default-time="new Date(2000, 1, 1, 20, 30, 0)"
          />
        </el-form-item>
        <el-form-item prop="liveDuration" label=" 直播时长 ">
          <el-input v-model.number="cloenLiveDate.liveDuration"></el-input>
        </el-form-item>
        <el-form-item prop="liveTeacher" label=" 讲师">
          <el-select
            class="teacher"
            v-model="cloenLiveDate.liveTeacher"
            disabled
            :placeholder="cloenLiveDate.liveTeacher"
          >
            <el-option
              :lable="cloenLiveDate.liveTeacher"
              :value="cloenLiveDate.liveTeacher"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="closeDialogMth('alertClose')"
          >取消</el-button
        >
        <el-button type="primary" @click="submitEditLive">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, defineProps, defineExpose,defineEmits,nextTick } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import reqEidtLive from "@/reqApi/reqClassLive/reqEditLive";
import { clone } from "@/assets/js/cloen";
const cloenLiveDate = ref({
  liveTeacher:""
});
const props = defineProps(["editLiveDate"]);
const emit = defineEmits(["updata"])
const isOpenDialog = ref(false);
const liveStartTime = ref(0);
const openDialogMth = () => {
  isOpenDialog.value = true;
  nextTick(() => {
    clone(props.editLiveDate, cloenLiveDate.value);
  });
};
const editLiveRef = ref({});
const getLiveTime = (time) => {
  console.log("111");
  liveStartTime.value = time;
};
//表单规则
const addLiveRules = ref({
  liveName: [
    {
      type: "string",
      trigger: "blur",
      required: true,
      message: "直播名称是必填项",
    },
  ],
  liveTime: [
    {
      trigger: "blur",
      required: true,
      message: "直播时间是必填项",
    },
  ],
  liveDuration: [
    {
      type: "number",
      trigger: "blur",
      message: "直播时长是必须是数字类型",
    },
    {
      trigger: "blur",
      required: true,
      message: "直播时长是必填项",
    },
  ]
});

const disabledDate = (data) => {
  const nowTime = new Date().getTime(); //当前的时间
  if (liveStartTime.value >= nowTime) {
    //表明未开播或者直播中
    return (
      nowTime - 1000 * 60 * 60 * 24 * 30 > data ||
      data > nowTime / 1 + 1000 * 60 * 60 * 24 * 30
    );
  } else {
    //表明直播已经结束
    return data > liveStartTime.value + 1000 * 60 * 60 * 24 * 30;
  }
};

//向后端请求修改直播
const submitEditLive = async () => {
  //通过验证发起请求
  editLiveRef.value.validate(async (val) => {
    if (val) {
        //表单验证通过
      const { data } = await reqEidtLive({
        ...cloenLiveDate.value,
      });
      emit('updata')  
      if(data.status == '400'){
        isOpenDialog.value = false;
        cloenLiveDate.value = {};
         ElMessage.success("修改成功");
      }else{
         ElMessage.error("修改失败");
      }
    }
  });
};
/* 
@type:传入关闭对话框的类型，分为直接关闭，和弹出框
*/
const closeDialogMth = (type) => {
  if (type == "close") {
    isOpenDialog.value = false;
    cloenLiveDate.value = {liveTeacher:""};
    editLiveRef.value.resetFields()
    ElMessage.success("关闭成功");
  }
  if (type == "alertClose") {
    ElMessageBox.confirm("当前内容还未保存你确定关闭吗", {
      type: "warning",
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(() => {
        closeDialogMth("close");
      })
      .catch(() => {});
  }
};
const close = ()=>{
   closeDialogMth('close') 
}
defineExpose({
  openDialogMth,
});
</script>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  width: 100px;
}
.teacher {
  :deep(.el-input--suffix) {
    width: 100px !important;
  }
}
:deep(.el-input) {
  width: 417px;
}
</style>