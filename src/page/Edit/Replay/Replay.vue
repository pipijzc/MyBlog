<template>
  <div class="FriBox">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/" class="nav">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/edit' }">文章操作</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/edit/replay' }">留言和友链</el-breadcrumb-item>
      <el-breadcrumb-item>待定</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 评论回复 -->
    <el-row>
      <el-col :span="8">
        <el-card v-for="(item,index) in FriMsg" :key="index">
          <p>发布者: {{item.username?item.username:'游客'}}</p>
          <p>内 容: {{item.content}}</p>
          <p>博主回复: {{item.replay?item.replay:'未回复'}}</p>
          <el-button style="float:left" size="small" type="success" @click="openDialog(item._id)">回复</el-button>
          <el-button style="float:right" size="small" type="danger" @click="openDele(item._id)">删除</el-button>
        </el-card>
      </el-col>

      <!-- 上传头像和友链信息 -->
      <el-col :span="5" :offset="1">
        <!-- 头像上传 -->
        <el-upload
          class="avatar-uploader"
          action="http://vectorjzc.top/uploadlogo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <!-- 信息输入 -->
        <el-card>
          <el-input v-model="FriLink.logo" placeholder="输入网站头像url或者上传"></el-input>
          <el-input v-model="FriLink.username" placeholder="输入网站名称"></el-input>
          <el-input v-model="FriLink.url" placeholder="输入网站地址"></el-input>
          <el-button type="primary" @click="submitLink">上传</el-button>
        </el-card>
      </el-col>

      <!-- 友链列表 -->
      <el-col :offset="1" :span="8">
        <el-card v-for="(item,index) in allLink" :key="index">
          <p class="linkLogo">头像: {{item.logo}}</p>
          <p>名称: {{item.username}}</p>
          <p>url : {{item.url}}</p>
          <el-button
            style="float:left"
            size="small"
            type="success"
            @click="openLinkDialog(item._id)"
          >修改</el-button>
          <el-button style="float:right" size="small" type="danger" @click="openLinkDele(item._id)">删除</el-button>
        </el-card>
      </el-col>
    </el-row>
    <!-- 回复评论的弹框 -->
    <el-dialog title="回复消息" :visible.sync="dialogFormVisible">
      <el-input v-model="replay.content" placeholder></el-input>
      <div :class="pBody?'OwO':'OwO OwO-open'">
        <div class="OwO-logo" @click="pBody=!pBody">
          <span class="emojButton">{{pBody==false?'再点一下':'表情😄'}}</span>
        </div>
        <div class="OwO-body">
          <ul class="OwO-items OwO-items-show">
            <li
              class="OwO-item"
              v-for="(oitem,index) in OwOlist"
              :key="'oitem'+index"
              @click="choseEmoji(oitem.title)"
            >
              <img :src="'http://vectorjzc.top/emot/image/' +oitem.url" alt />
            </li>
          </ul>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="ConfirmDialog(uid)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改友链对话框 -->
    <el-dialog title="修改友链" :visible.sync="dialogLink">
      <div style="overflow:hidden">
        <div>头像 :</div>
        <el-input class="editLinkBox" v-model="updateLink.logo" placeholde="头像url"></el-input>
      </div>

      <div style="overflow:hidden">
        <div>网站名 :</div>
        <el-input class="editLinkBox" v-model="updateLink.username" placeholde="网站名"></el-input>
      </div>

      <div style="overflow:hidden">
        <div>网站url :</div>
        <el-input class="editLinkBox" v-model="updateLink.url" placeholde="网站url"></el-input>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLink = false">取 消</el-button>
        <el-button type="primary" @click="ConfirmEditLink(linkId)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 是否删除评论的弹框 -->
    <el-dialog title="确定要删除吗？" :visible.sync="isDelete">
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDelete = false">取 消</el-button>
        <el-button type="primary" @click="ConfirmDele(uid)">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 是否删除友链的对话框 -->
    <el-dialog title="确定要删除吗？" :visible.sync="isDeleteLink">
      <div slot="footer" class="dialog-footer">
        <el-button @click="isDeleteLink = false">取 消</el-button>
        <el-button type="primary" @click="ConfirmDeleLink(uid)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetFriMsg,
  ReplayFriMsg,
  DeleteFriMsg,
  SubmitFriLink,
  GetLink,
  editLink,
  deleLink,
  updateLink
} from "../../../ajax/ajax";
export default {
  data() {
    return {
      // 获取评论信息
      FriMsg: "",
      // 回复留言对话框
      dialogFormVisible: false,
      // 编辑友链对话框:
      dialogLink:false,
      // 是否删除留言对话框
      isDelete: false,
      isDeleteLink:false,
      //   用户id
      uid: "",
      // 要修改的友链的id
      linkId:'',
      //   编辑回复内容
      replay: {
        id: "",
        content: ""
      },
      imageUrl: "",
      // 编辑友链信息
      FriLink: {
        id:"",
        username: "",
        url: "",
        logo: ""
      },
      // 获取的友链
      allLink: "",
      // 要修改的友链
      updateLink: "",
      pBody: true, //表情打开控制
      OwOlist: [
        //表情包和表情路径
        { title: "微笑", url: "weixiao.gif" },
        { title: "嘻嘻", url: "xixi.gif" },
        { title: "哈哈", url: "haha.gif" },
        { title: "可爱", url: "keai.gif" },
        { title: "可怜", url: "kelian.gif" },
        { title: "挖鼻", url: "wabi.gif" },
        { title: "吃惊", url: "chijing.gif" },
        { title: "害羞", url: "haixiu.gif" },
        { title: "挤眼", url: "jiyan.gif" },
        { title: "闭嘴", url: "bizui.gif" },
        { title: "鄙视", url: "bishi.gif" },
        { title: "爱你", url: "aini.gif" },
        { title: "泪", url: "lei.gif" },
        { title: "偷笑", url: "touxiao.gif" },
        { title: "亲亲", url: "qinqin.gif" },
        { title: "生病", url: "shengbing.gif" },
        { title: "太开心", url: "taikaixin.gif" },
        { title: "白眼", url: "baiyan.gif" },
        { title: "右哼哼", url: "youhengheng.gif" },
        { title: "左哼哼", url: "zuohengheng.gif" },
        { title: "嘘", url: "xu.gif" },
        { title: "衰", url: "shuai.gif" },
        { title: "吐", url: "tu.gif" },
        { title: "哈欠", url: "haqian.gif" },
        { title: "抱抱", url: "baobao.gif" },
        { title: "怒", url: "nu.gif" },
        { title: "疑问", url: "yiwen.gif" },
        { title: "馋嘴", url: "chanzui.gif" },
        { title: "拜拜", url: "baibai.gif" },
        { title: "思考", url: "sikao.gif" },
        { title: "汗", url: "han.gif" },
        { title: "困", url: "kun.gif" },
        { title: "睡", url: "shui.gif" },
        { title: "钱", url: "qian.gif" },
        { title: "失望", url: "shiwang.gif" },
        { title: "酷", url: "ku.gif" },
        { title: "色", url: "se.gif" },
        { title: "哼", url: "heng.gif" },
        { title: "鼓掌", url: "guzhang.gif" },
        { title: "晕", url: "yun.gif" },
        { title: "悲伤", url: "beishang.gif" },
        { title: "抓狂", url: "zhuakuang.gif" },
        { title: "黑线", url: "heixian.gif" },
        { title: "阴险", url: "yinxian.gif" },
        { title: "怒骂", url: "numa.gif" },
        { title: "互粉", url: "hufen.gif" },
        { title: "书呆子", url: "shudaizi.gif" },
        { title: "愤怒", url: "fennu.gif" },
        { title: "感冒", url: "ganmao.gif" },
        { title: "心", url: "xin.gif" },
        { title: "伤心", url: "shangxin.gif" },
        { title: "猪", url: "zhu.gif" },
        { title: "熊猫", url: "xiongmao.gif" },
        { title: "兔子", url: "tuzi.gif" },
        { title: "喔克", url: "ok.gif" },
        { title: "耶", url: "ye.gif" },
        { title: "棒棒", url: "good.gif" },
        { title: "不", url: "no.gif" },
        { title: "赞", url: "zan.gif" },
        { title: "来", url: "lai.gif" },
        { title: "弱", url: "ruo.gif" },
        { title: "草泥马", url: "caonima.gif" },
        { title: "神马", url: "shenma.gif" },
        { title: "浮云", url: "fuyun.gif" },
        { title: "给力", url: "geili.gif" },
        { title: "蜡烛", url: "lazhu.gif" },
        { title: "蛋糕", url: "dangao.gif" },
        { title: "发红包", url: "fahongbao.gif" },
        { title: "笑哭跳", url: "xiaokutiao.gif" },
        { title: "开心跳", url: "kaixintiao.gif" },
        { title: "咬舌跳", url: "yaoshetiao.gif" },
        { title: "鬼脸跳", url: "guiliantiao.gif" },
        { title: "无脸跳", url: "wuliantiao.gif" },
        { title: "惊讶跳", url: "jingyatiao.gif" },
        { title: "墨镜跳", url: "mojingtiao.gif" },
        { title: "口罩跳", url: "kouzhaotiao.gif" },
        { title: "龇牙跳", url: "ziyatiao.gif" }
      ]
    };
  },
  methods: {
    //   确定回复
    async ConfirmDialog(id) {
      //   把点击的这条数据的id传进来
      this.replay.id = id;
      // 发送请求
      const result = await ReplayFriMsg(this.replay);
      this.$message({
        message: "回复留言成功",
        type: "success"
      });
      // 关闭对话框
      this.dialogFormVisible = false;
      // 更新留言列表
         this.getMsgAll();

     
    },
    //   打开回复对话框
    openDialog(id) {
      this.uid = id;
      this.dialogFormVisible = true;
    },
    //   打开留言删除对话框
    openDele(id) {
      this.uid = id;
      this.isDelete = true;
    },
    // 打开友链删除对话框
    openLinkDele(id){
      this.uid = id;
      this.isDeleteLink = true

    },
    //   确认删除留言
    async ConfirmDele(id,sel) {
       
      const success = await DeleteFriMsg(id);
        this.$message({
        message: "删除留言成功",
        type: "success"
      });
      // 更新留言
      this.getMsgAll()
      // 关闭弹框
      this.isDelete = false;
      // 重置id
      this.uid = ''
      
    },
    // 确认删除友链
   async ConfirmDeleLink(id){
      const success = await deleLink(id)
        this.$message({
        message: "删除友链成功",
        type: "success"
      });
      // 更新友链
      this.getLinkAll();
      this.isDeleteLink = false;
      this.uid = ""
    },
    // 打开编辑友链对话框
    async openLinkDialog(id) {
      // console.log(id);
      // 打开编辑输入框
      this.dialogLink = true;
      this.linkId = id;
      // 获取点击的友链信息
      this.updateLink = await editLink(id);
    },
    // 确定编辑友链
   async ConfirmEditLink(id){
      this.updateLink._id = id;
      const result = await updateLink(this.updateLink);
      this.$message({
        message: '编辑成功',
        type: 'success'
      })
      // 关闭对话框
      this.dialogLink = false;
      // 更新友链列表
      this.getLinkAll();
    },
    choseEmoji(inner) {
      this.replay.content += "[" + inner + "]";
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(res.logoUrl);
      this.FriLink.logo = res.logoUrl;
      // console.log(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传友链
    async submitLink() {
      if (!this.FriLink.username) {
        this.$message({
          message: '还没写网站名称',
          type: 'warning'
        })
        return;
      }
      if(!this.FriLink.url) {
        this.$message({
          message: '还没写网站链接',
          type: 'warning'
        })
        return;
      }
      if(!this.FriLink.logo) {
        this.$message({
          message: '还没有网站头像',
          type: 'warning'
        })
        return;
      }
      
      const result = await SubmitFriLink(this.FriLink);
      this.FriLink.username = "";
      this.FriLink.url = "";
      this.FriLink.logo = "";
      this.imageUrl = "";
      this.$message({
        message: "上传成功",
        type: "success"
      });
      // 更新友链
      this.getLinkAll()
    },
    // 获取所有评论
    async getMsgAll() {
      const result = await GetFriMsg("true");
      this.FriMsg = result.data;
    },

    // 获取所有友链
  async getLinkAll(){
    this.allLink = await GetLink()
  }
  }
  ,
  async mounted() {
    // 获取所有的评论
    this.getMsgAll();
    // 获取所有友链
    this.getLinkAll();
  }
};
</script>

<style scoped>
.FriBox {
  margin-top: 34px;
  margin-left: 60px;
}
.nav {
  margin: 92px 0 30px 3px;
}
.OwO {
  position: relative;
  z-index: 1;
}
.OwO .OwO-logo {
  position: relative;
  border-radius: 4px;
  color: #fff;
  display: inline-block;
  background: #a9e4ae;
  border: 1px solid #ddd;
  font-size: 14px;
  padding: 0px 12px;
  cursor: pointer;
  height: 30px;
  box-sizing: border-box;
  z-index: 2;
  line-height: 30px;
  margin-top: 10px;
  transition: all ease-in 0.2s;
}
.OwO .OwO-logo:hover {
  background-color: #525e81;
}
.OwO .OwO-body {
  position: absolute;
  background: #fff;
  border: 1px solid #ddd;
  z-index: 1;
  top: 49px;
  border-radius: 0 4px 4px 4px;
  display: none;
}
.OwO-open .OwO-body {
  display: block;
}
.OwO-open .OwO-logo {
  border-radius: 4px 4px 0 0;
  border-bottom: none;
}
.OwO-open .OwO-logo:hover {
  animation: none;
  -webkit-animation: none;
}
.OwO .OwO-items {
  max-height: 197px;
  overflow: scroll;
  font-size: 0;
  padding: 10px;
  z-index: 1;
  /* margin-top: 10px; */
}
.OwO .OwO-items .OwO-item {
  background: #f7f7f7;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
  margin: 0 10px 12px 0;
  transition: 0.3s;
  line-height: 19px;
  font-size: 20px;
  cursor: pointer;
}
.OwO .OwO-items .OwO-item:hover {
  background: #eee;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  animation: a 5s infinite ease-in-out;
  -webkit-animation: a 5s infinite ease-in-out;
}
.OwO .OwO-body .OwO-bar {
  width: 100%;
  height: 30px;
  border-top: 1px solid #ddd;
  background: #fff;
  border-radius: 0 0 4px 4px;
  color: #444;
}
.OwO .OwO-body .OwO-bar .OwO-packages li {
  display: inline-block;
  line-height: 30px;
  font-size: 14px;
  padding: 0 10px;
  cursor: pointer;
  margin-right: 3px;
  text-align: center;
}
.OwO .OwO-body .OwO-bar .OwO-packages li:first-of-type {
  border-radius: 0 0 0 3px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.linkLogo {
  /*文字显示不开也强制一行显示*/
  white-space: nowrap;
  /*溢出隐藏*/
  overflow: hidden;
  /*文字溢出的时候用省略号来显示*/
  text-overflow: ellipsis;
}
.editLinkBox{
  margin-bottom: 10px;
}
</style>