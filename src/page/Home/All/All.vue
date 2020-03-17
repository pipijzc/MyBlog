<template>
  <div>
    <el-row :gutter="0" class="firstrow">
      <el-col :span="13" class="left">
        <el-card class="box-card" shadow="hover">
          <el-image style="width: 100%; height: 440px" :src="require('../../../images/dengta.jpg')"></el-image>
          <div v-html="list" class="firstMake"></div>
        </el-card>
      </el-col>
      <el-col :span="6" class="right">
        <el-card class="box-card" style="padding-top:50px" shadow="hover">
          <el-image style="width: 100%;  height: 400px" :src="require('../../../images/town.jpg')"></el-image>
          <!-- 联系方式 -->
          <div class="link">
            <el-tooltip effect="dark" content="GitHub" placement="top">
              <el-button @click="jumpWeb" class="btnTop" alt="gitHub" icon="el-icon-cloudy" circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="微信" placement="top">
              <el-button
                @click="openLink('wechat')"
                class="btnTop"
                type="success"
                icon="el-icon-chat-dot-round"
                circle
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="QQ" placement="top">
              <el-button
                @click="openLink('qq')"
                class="btnTop"
                icon="el-icon-chat-dot-square"
                circle
              ></el-button>
            </el-tooltip>
          </div>

          <div class="link">
            <el-tooltip effect="dark" content="981446149@qq.com" placement="top">
              <el-button class="btnBotton" type="info" icon="el-icon-message" circle></el-button>
            </el-tooltip>

            <el-tooltip effect="dark" content="13676147686" placement="top">
              <el-button class="btnBotton" type="info" icon="el-icon-phone" circle></el-button>
            </el-tooltip>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="0">
      <el-col :span="13" class="left">
        <LeftList></LeftList>
      </el-col>
      <el-col :span="6" class="right">
        <RightList></RightList>
      </el-col>
    </el-row>

    <el-dialog title="" :visible.sync="dialogVisible" width="30%">
      <img :src="picImage" width="200px" alt="">
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
    <!-- <template></template> -->
  </div>
</template>

<script >
import { mapState } from "vuex";
import LeftList from "../../../components/LeftList/LeftList";
import RightList from "../../../components/RightList/RightList";
export default {
  data() {
    return {
      str: "",
      dialogVisible:false,
      picImage: ''
    };
  },
  methods: {},
  async mounted() {  
    // 获取列表
    this.$store.dispatch("getList");
  },
  computed: {
    ...mapState(["list"])
  },
  components: {
    LeftList,
    RightList
  },
  methods: {
    jumpWeb() {
      window.open("https://github.com/pipijzc");
    },
    openLink(sel){
      if (sel =='wechat') {
        this.picImage = require('../../../images/weixin.jpg')
      } else if (sel=='qq') {
        this.picImage = require('../../../images/qq.jpg')
      }
      this.dialogVisible = true
    }
  },
};
</script>

<style scoped>
.firstrow {
  margin-top: 489px;
}
.left {
  margin-left: 180px;
}
.right {
  margin-left: 20px;
}
.firstMake {
  background: linear-gradient(to right, skyblue, blue);
  -webkit-background-clip: text;
  color: transparent;
}
.link {
  text-align: center;
  margin-top: 10px;
}
.btnTop {
  margin: 0 10px;
}
.btnBotton {
  margin: 0 13px;
}
.el-col {
  margin-top: -17px;
  padding: 20px !important;
}

.box-card {
  border-radius: 20px;
}
 

</style>