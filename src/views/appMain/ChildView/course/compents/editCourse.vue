<template>
  <div class="editCourse">
    <!-- 编辑课程 -->
    <el-drawer
      v-model="drawer"
      direction="rtl"
      :before-close="handleClose"
      :show-close="false"
      size="50%"
    >
      <!-- 头部 -->
      <template #header>
        <div class="closeBtn" @click="handleClose()">
          <el-icon :size="30"><Close /></el-icon>
        </div>
        <h3 class="title">编辑课程</h3>
      </template>
      <!-- 主体内容部分 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="User" name="first">
          <template #label>
            <span>课程信息</span>
          </template>
          <el-form
            label-position="left"
            label-width="100px"
            :model="courseMeesage"
            style="max-width: 460px"
            :rules="courseRules"
            ref="cousrseFormRef"
          >
            <el-form-item label="项目名称" prop="courseKind">
              <el-input disabled v-model="courseMeesage.courseKind" />
            </el-form-item>
            <el-form-item label="课程名称" prop="courseName">
              <el-input disabled v-model="courseMeesage.courseName" />
            </el-form-item>
            <el-form-item label="原价" prop="originPrice">
              <el-input v-model.number="courseMeesage.originPrice" />
            </el-form-item>
            <el-form-item label="售价" prop="salePrice">
              <el-input v-model.number="courseMeesage.salePrice" />
            </el-form-item>
            <el-form-item label="底价" prop="lowPrice">
              <el-input v-model.number="courseMeesage.lowPrice" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="User" name="second">
          <template #label>
            <span>课程封面</span>
          </template>
          <el-form
            label-position="left"
            label-width="100px"
            :model="couseCover"
            style="max-width: 460px"
            ref="couseCoverRef"
            :rules="couseCoverRules"
          >
            <el-form-item label="课程描述" prop="courseDiscription">
              <el-input
                disabled
                v-model="courseMeesage.courseDiscription"
              ></el-input>
            </el-form-item>
            <el-form-item label="更换封面" prop="fileList">
              <el-upload
                v-model:file-list="couseCover.fileList"
                :auto-upload="true"
                ref="uploadRef"
                :limit="1"
                :show-file-list="false"
                list-type="picture"
                :on-success="successUpload"
                :http-request="uploadCover"
              >
                <template #tip>
                  <div class="el-upload__tip">
                    建议:课程封面大小建议上传1125*633,不超过5M,格式为.jpg,.png
                  </div>
                </template>
                <el-button type="primary">选择封面</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-image
                style="width: 200px; height: 200px"
                :src="url"
                fit="cover"
                :preview-src-list="srcList"
                :initial-index="0"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <!-- 尾部 -->
      <template #footer>
        <el-button @click="uploadCover()">确认</el-button>
        <el-button @click="closeEidtCourse()">取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>
<script setup>
import {
  ref,
  defineProps,
  defineExpose,
  defineEmits,
  nextTick,
  computed,
  reactive,
  watch,
} from "vue";
import { clone } from "@/assets/js/cloen";
import reqEditCourse from "@/reqApi/reqCourse/reqCourseEdit";
import { ElMessageBox, ElMessage } from "element-plus";
import { useStore } from "vuex";
import { Close } from "@element-plus/icons-vue";
const drawer = ref(false);
const store = useStore();
//默认选择第一项
const activeName = ref("first");
//接受父组件传递的课程信息
const props = defineProps(["courseMessage"]);
const emit = defineEmits(["reqCourseList"]);
const courseMeesage = ref({
  courseKind: "",
  courseName: "",
  originPrice: 0,
  salePrice: 0,
  lowPrice: 0,
});
const uploadRef = ref({});
const couseCover = ref({
  courseDiscription: "",
  fileList: [],
});
const srcList = ref([]);
const url = computed(() => {
  if (!courseMeesage.value.courseImgSrc) {
    return;
  }
  return store.state.staticUrl + "/" + courseMeesage.value.courseImgSrc;
});
const cousrseFormRef = ref({});

//指定义效验规则
const courseRules = reactive({
  courseKind: {
    required: true,
    message: "项目名称是必填项",
    trigger: "blur",
  },
  courseName: {
    required: true,
    message: "课程名称是必填项",
    trigger: "blur",
  },
  originPrice: [
    {
      required: true,
      message: "课程原价是必填项",
      trigger: "blur",
    },
    {
      type: "number",
      message: "课程原价必须是数字",
      trigger: "blur",
    },
  ],
  salePrice: [
    {
      required: true,
      message: "课程售价是必填项",
      trigger: "blur",
    },
    {
      type: "number",
      message: "课程售价必须是数字",
      trigger: "blur",
    },
  ],
  lowPrice: [
    {
      required: true,
      message: "课程最低价是必填项",
      trigger: "blur",
    },
    {
      type: "number",
      message: "课程最低价必须是数字",
      trigger: "blur",
    },
  ],
});

const couseCoverRules = reactive({
  courseDiscription: {
    required: true,
    message: "项目名称是必填项",
    trigger: "blur",
  },
  fileList: {
    required: true,
    message: "项目名称是必填项",
    trigger: "blur",
  },
});
//打开编辑课程的方法
const openEditCourse = (message) => {
  drawer.value = true;
  //进行对象复制
  nextTick(() => {
    clone(props.courseMessage, courseMeesage.value);
    couseCover.value.courseDiscription = courseMeesage.value.courseDiscription;
    srcList.value = [url.value];
  });
};

//关闭的方法
const closeEidtCourse = () => {
  ElMessageBox.confirm("当前内容还未提交你确定关闭吗", {
    confirmButtonText: "确定关闭",
    cancelButtonText: "取消",
    type: "info",
    title: "提示",
  })
    .then(() => {
      handleClose();
    })
    .catch(() => {});
};
//关闭前的回调
const handleClose = (status) => {
  drawer.value = false;
  activeName.value = "first";
  ElMessage.success("关闭成功");
};

const reqAfter = (data) => {
  if (data.status == 400) {
    //请求成功
    ElMessage.success(data.msg);
    emit("reqCourseList");
    drawer.value = false;
    activeName.value = "first";
  } else {
    ElMessage.warning("修改失败");
  }
};

//提交数据
const submit = () => {};
const handelSubmit = () => {
  uploadRef.value.submit();
};
//上传封面
const uploadCover = async (file) => {
  cousrseFormRef.value
    .validate()
    .then(async (res) => {
      if (res) {
        const formdata = new FormData();
        if (file) {
          formdata.append("filed", file.file);
        }
        const OtherData = JSON.stringify(courseMeesage.value);
        formdata.append("OtherData", OtherData);
        const res = await reqEditCourse(formdata);
        reqAfter(res.data);
      } else {
        ElMessage.warning("缺少必填项");
      }
    })
    .catch(() => {
      ElMessage.warning("缺少必填项");
    });
};
const successUpload = () => {
  uploadRef.value.clearFiles();
};

//修改课程信息

watch(activeName, () => {
  cousrseFormRef.value.resetFields();
  clone(props.courseMessage, courseMeesage.value);
});
//导出
defineExpose({
  openEditCourse,
});
</script>
<style lang="scss" scoped>
.closeBtn {
  width: 40px;
  height: 40px;
  background: #f0f2f0;
  border-radius: 10px;
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: -18px;
  margin-right: 10px;
  &:hover {
    animation: anima_jelly 1s linear infinite;
  }
}
.title {
  font-size: 28px;
}
</style>