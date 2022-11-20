<template>
  <div class="addLive">
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
        <h3 class="title">新增直播</h3>
      </template>
      <div class="titleBox">
        <div class="ClassKind">{{ liveInfo.courseName }}</div>
        <div class="classNamee">
          <span>{{ liveInfo.className }}</span>
        </div>
        <el-button type="primary" @click="dialogTableVisible = true"
          >新增直播</el-button
        >
      </div>
      <ul v-loading="loading" class="liveListBox">
        <li v-for="item in liveInfo.liveList" :key="item._id">
          <p class="status">回放</p>
          <div class="liveMessage">
            <p class="title">{{ item.liveName }}</p>
            <div class="info">
              <p><span>讲师</span>{{ item.liveTeacher }}</p>
              <p><span>直播时间</span>{{ formatTime(item.liveTime) }}</p>
              <p><span>时长</span>{{ formatTimeNumber(item.liveDuration) }}</p>
            </div>
          </div>
          <el-button @click="deleteLiveFn(item)" type="danger"
            >删除直播</el-button
          >
        </li>
      </ul>
    </el-drawer>
    <el-dialog
      width="30%"
      top="300px"
      v-model="dialogTableVisible"
      title="新增直播"
      :close-on-click-modal="false"
    >
      <el-form
        :model="liveAddObj"
        :rules="liveAddFromRule"
        ref="liveAddFormRef"
      >
        <el-row :span="24" justify="space-around">
          <el-col :span="10">
            <el-form-item prop="liveName">
              <el-input
                placeholder="请输入直播标题"
                v-model="liveAddObj.liveName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="liveTime">
              <el-date-picker
                v-model="liveAddObj.liveTime"
                type="datetime"
                :default-time="new Date(2000, 1, 1, 20, 0, 0)"
                :disabled-date="disabledDate"
                placeholder="请选择直播时间"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24" justify="space-around">
          <el-col :span="10">
            <el-form-item prop="liveTeacher">
              <el-select
                v-if="liveInfo.liveList.length != 0"
                v-model="liveAddObj.liveTeacher"
                :placeholder="liveInfo.liveList[0].liveTeacher"
              >
                <el-option
                  :label="liveInfo.liveList[0].liveTeacher"
                  :value="liveInfo.liveList[0].liveTeacher"
                ></el-option>
              </el-select>
              <!-- 如果是没有直播列表就可以自己添加老师 -->
              <el-select
                v-else
                v-model="liveAddObj.liveTeacher"
                placeholder="请选择一个直播老师"
                allow-create
                filterable
              >
                <el-option
                  v-for="item in defaultTeacher"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="liveDuration">
              <el-input
                placeholder="请选择直播时长"
                v-model.number="liveAddObj.liveDuration"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="submitAddLive()">添加</el-button>
        <el-button
          @click="
            dialogTableVisible = false;
            DialogHandleClose();
          "
          >取消</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import {
  ref,
  defineExpose,
  defineProps,
  nextTick,
  defineEmits,
  reactive,
} from "vue";
import formatTime from "@/assets/js/formatTime";
import formatTimeNumber from "@/assets/js/formatTimeNumber";
import reqLivelist from "@/reqApi/reqClassLive/reqLiveList";
import reqAddList from "@/reqApi/reqClassLive/reqAddLive";
import reqDeleteList from "@/reqApi/reqClassLive/reqDeleteLive";
import { ElMessage, ElMessageBox } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { async } from "@kangc/v-md-editor";
const drawer = ref(false);
const props = defineProps(["liveList", "classID"]);
const emits = defineEmits(["reqClassListFn"]);
const liveInfo = ref({
  courseName: "",
  className: "",
  liveList: [],
});
const loading = ref(true);
const liveAddFormRef = ref({});
const liveAddObj = ref({
  //直播名称
  liveName: "",
  //讲师
  liveTeacher: "",
  //直播时间
  liveTime: "",
  //直播时长
  liveDuration: 120, //默认两个小时
});
//定义一个默认的老师列表
const defaultTeacher = ["朱雀", "cherry", "丸子", "路遥", "许鑫"];
const liveAddFromRule = reactive({
  liveName: {
    required: true,
    message: "直播名称是必填项",
    trigger: "blur",
  },
  liveTeacher: {
    required: true,
    message: "讲师是必填项",
    trigger: "blur",
  },
  liveTime: {
    required: true,
    message: "直播时间是必填项",
    trigger: "blur",
  },
  liveDuration: [
    {
      required: true,
      message: "直播时长是必填项",
      trigger: "blur",
    },
    {
      type: "number",
      message: "必须是数字",
      trigger: "blur",
    },
  ],
});
const reqAllLiveFn = async (id) => {
  loading.value = true;
  setTimeout(async () => {
    const res = await reqLivelist({ _id: id, id: props.classID });
    if (res.data.status == 400) {
      //代表是成功的,且有数据
      liveInfo.value.liveList = res.data.data.liveList;
      if (liveInfo.value.liveList.length != 0) {
        liveAddObj.value.liveTeacher = res.data.data.liveList[0].liveTeacher;
      }
    } else {
      liveInfo.value.liveList = [];
    }
    loading.value = false;
  }, 500);
};
//打开显示直播的方法
const openDrawer = () => {
  drawer.value = true;
  nextTick(async () => {
    reqAllLiveFn(props.liveList.liveid);
    liveInfo.value.courseName = props.liveList.courseName;
    liveInfo.value.className = props.liveList.className;
  });
};

//打开新增直播
const dialogTableVisible = ref(false);

//弹窗关闭前的回调
const DialogHandleClose = () => {
  //请除form的规则
  liveAddFormRef.value.resetFields();
  //重置liveAddObj
  liveAddObj.value = {
    //直播名称
    liveName: "",
    //讲师
    liveTeacher: "",
    //直播时间
    liveTime: "",
    //直播时长
    liveDuration: 120, //默认两个小时
  };
};
//关闭前的回调
const handleClose = (status) => {
  drawer.value = false;
  ElMessage.success("关闭成功");
};

//判断该时间是不是向用户禁用的
const disabledDate = (data) => {
  //获取当前的时间
  const nowTime = new Date().getTime();
  //获取当前的一个月后的
  const afterMouthTime = nowTime + 30 * 24 * 60 * 60 * 1000;
  //直播时间的选取一定要大于当前时间
  return nowTime > data || data > afterMouthTime;
};

//向后端发起添加的请求
const submitAddLive = () => {
  //进行表单效验的判断
  liveAddFormRef.value
    .validate()
    .then(async (res) => {
      //发起请求
      const result = await reqAddLiveFn();
      console.log(result);
      if (result.data.status == 400) {
        ElMessage.success(result.data.msg);
        drawer.value = false;
        dialogTableVisible.value = false;
        DialogHandleClose();
         emits("reqClassListFn");
      } else {
        ElMessage.error(result.data.msg);
      }
    })
    .catch(() => {
      ElMessage.warning("缺少必填项");
    });
};

//请求删除直播
const deleteLiveFn = (item) => {
  ElMessageBox.confirm("你当前确定需要删除该直播吗", {
    title: "警告",
    type: "error",
    confirmButtonText: "确定",
    cancelButtonText: "取消",
  })
    .then(async () => {
      //确定执行的回调(发起请求)
      const { data } = await reqDeleteList({
        liveName: item.liveName,
        id: props.classID,
        _id: props.liveList.liveid,
      });
      if (data.status == 400) {
        ElMessage.success(data.msg);
        drawer.value = false;
        emits("reqClassListFn");
      } else {
        ElMessage.warning(data.msg);
      }
    })
    .catch(() => {
      //取消的回调
    });
};
const reqAddLiveFn = async () => {
  //先把数据处理下
  //班期id
  let classID = props.classID;
  //直播id
  let liveListID = props.liveList.liveid;

  //发起请求
  const res = await reqAddList({
    liveName: liveAddObj.value.liveName,
    liveTime: liveAddObj.value.liveTime,
    liveDuration: liveAddObj.value.liveDuration,
    teacher: liveAddObj.value.liveTeacher,
    _id: liveListID,
    id: classID,
    courseName: liveInfo.value.courseName,
    className: liveInfo.value.className,
  });
  console.log(res);
  return res;
};
//导出
defineExpose({
  openDrawer,
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
  font-size: 24px;
}
.titleBox {
  line-height: 30px;
  margin-bottom: 20px;
  height: 150px;
  border-bottom: 1px solid #f0f2f0;
  .ClassKind {
    font-size: 24px;
    font-weight: 700px;
  }
  .classNamee {
    color: #ccc;
    font-size: 12px;
    margin: 10px 0px;
    span {
      margin-right: 10px;
    }
  }
}
.liveListBox {
  width: 100%;
  li {
    width: 93%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid #f0f2f0;
    .status {
      color: #ccc;
      margin-top: 5px;
    }
    .liveMessage {
      text-align: left;
      line-height: 30px;
      width: 640px;
      .title {
        color: black;
        font-size: 16px;
        font-weight: 500;
      }
      .info {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #ccc;
        font-size: 12px;
        p {
          flex: 1;
          span {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>