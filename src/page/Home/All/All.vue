<template>
  <div>
    <el-row :gutter="0" class="firstrow">
      <el-col :xs="24"  :sm="24"  :md="10" :lg="13"  :xl="13" class="left-top">
        <el-card class="box-card" shadow="hover">
          <el-image style="width: 100%; height: 440px" :src="require('../../../images/dengta.jpg')"></el-image>
          <div v-html="list" class="firstMake"></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="10" :lg="6"  :xl="6" class="right">
        <el-card class="box-card linkBox" style="padding-top:50px" shadow="hover">
          <div class="linkWord">link</div>
          <el-image style="width: 100%;  height: 400px" :src="require('../../../images/night_看图王.jpg')"></el-image>
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

    <el-row >
      <el-col  :xs="24"  :sm="24"  :md="24" :lg="13"  :xl="13"  class="left">
        <LeftList></LeftList>
      </el-col>
      <el-col  :xs="24" :sm="24" :md="24" :lg="6"  :xl="6"    class="right">
        <RightList :showAll="hidenNewestAndComment"></RightList>
      </el-col>
    </el-row>

   
      <el-row>
        <el-col :xs="2">
           <el-dialog title :visible.sync="dialogVisible" class="dialog" width="50%">
      <img :src="picImage" class="dialogPic" width="100px" alt />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
        </el-col>
      </el-row>
       
   
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
      // 文章数据
      str: "",
      dialogVisible: false,
      picImage: "",
      // 是否影藏文章和评论
      hidenNewestAndComment:false,
      list:'<p>&nbsp;&nbsp;&nbsp;这是我写的第一个网站，个人比较倾向于简约清新有趣的风格，整体的配色也以浅色系为主。这个网站主要用来记录自己的一些学习经历和学习总结的笔记还有自己的一些想法。前端所用技术栈是Vue框架，Vuex，VueRouter，axios，和ElementUi组件库，同时引入了富文本编辑器Quill对文章格式进行美化，后端用的技术栈是Node.js，Express和mongoDB。前路漫漫，与各位访客共勉!也欢迎各位大佬给我留言提意见或者互换友链哦~</p>'
    };
  },
  methods: {},
  async mounted() {
    // 获取列表
    // this.$store.dispatch("getList");
  },
  computed: {

  },
  components: {
    LeftList,
    RightList,

  },
  methods: {
    jumpWeb() {
      window.open("https://github.com/pipijzc");
    },
    openLink(sel) {
      if (sel == "wechat") {
        this.picImage = require("../../../images/weixin.jpg");
      } else if (sel == "qq") {
        this.picImage = require("../../../images/qq.jpg");
      }
      this.dialogVisible = true;
    }
  }
};
</script>

<style scoped>
.firstrow {
  margin-top: 489px;
}
.left-top {
  position: relative;
  margin-left: 180px;
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
  margin-top: -8px;
  padding: 20px !important;
}
.linkBox{
  position: relative;
}
.linkWord{
  position: absolute;
  left: 50%;
  top: 17px;
  font-size: 35px;
  font-weight: 700;
  color: #97dffd;
  /* color: #0eb0c9; */
  letter-spacing: 5px;
  transform: translateX(-50%);

}
.box-card {
  border-radius: 20px;
}

@media screen and (max-width: 500px) {
  .el-col {
  /* margin-top: -17px; */
  padding: 10px !important;
}
 .right {
    margin-left: 0;
    margin-top: 9px;
    margin-bottom: 0px;
  }
  .left-top {
    margin-bottom: 10px;
  }
  .firstrow {
    margin-top: 362px!important;
  }
  .el-image{
    height: 250px!important
  }
  .box-card {
    border-radius: 10px!important;
  }
}
/* @media screen and (max-width: 700px) {
}

@media screen and (min-width: 701px) {
} */
@media screen and (min-width: 501px) {

}

@media screen and (max-width: 800px) {
  .left {
  margin-left: 0;
}
 .left-top {
    margin-left: 0;
  }
  .right {
    margin-left: 0;
    /* margin-top: 20px; */
  }
 
}
@media screen and (min-width: 801px) {
  .left {
  margin-left: 0;
}
 .left-top{
    margin-left: 0;
  }
  .right {
    margin-left: 0px;
    /* margin-top: 20px; */
  }
}




@media screen and (min-width: 991px) {
  .left {
  margin-left: 0;
}
.left-top {
  margin-left: 89px;
}
.right {
  margin-left: 0px;
  
}
}
@media screen and (min-width: 1200px) {
  .left {
  margin-left: 89px;
}
.right {
  margin-left: 20px;
}
 
}
@media screen and (min-width: 1200px) {
 .left-top {
  margin-left: 9%;
}
.left {
  margin-left: 9%;
}
.right {
  margin-left: 20px;
}
}


</style>