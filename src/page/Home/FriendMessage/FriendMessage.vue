<template>
  <div>
    <el-row class="friendmessage">
      <el-col :xs="24" :sm="21" :md="21" :lg="14" :xl="14">
        <el-card class="inputBox">
          <div class="introduct">
            <p>欢迎各位大大留言和互换友链哈</p>
            <p>请先将本小站添加到您的友链中哦，谢谢~</p>
            <p>博主看到留言后会第一时间处理，谢绝一切广告、传播负能量、无营养网站。</p>
            <p>请在下方以如下格式留言:</p>
            <p>名称: Vector-Blog</p>
            <p>主页: http://vectorjzc.top</p>
            <p>头像: http://vectorjzc.top/logo/town.jpg</p>
          </div>
          <!-- <img src="../../../images/taiozhexissao.gif" alt=""> -->
          <el-input
            class="nameInput"
            v-model="friendMsg.username"
            show-word-limit
            maxlength="10"
            placeholder="留下你的昵称哈~ 不写就给你叫游客哦"
          ></el-input>
          <el-input
            maxlength="200"
            resize="none"
            type="textarea"
            show-word-limit
            :rows="4"
            v-model="friendMsg.content"
            placeholder="嘿嘿，被我逮着了，还不给我留个言~"
          ></el-input>
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
          <el-button type="primary" @click="sendMsg" class="sendButton">发送留言</el-button>
        </el-card>
        <el-card class="new-list" shadow="always">
          <div class="ui label">
            <a>最新留言</a>
          </div>
          <div class="new-list-div">
            <div class="target" v-for="(item,index) in showMsg" :key="index">
              <p style="margin-top:20px; line-height:25px;word-wrap:break-word; word-break:break-all;" v-html="analyzeEmoji(item.content)"></p>
              <span style="font-weight: 700;" v-if="item.replay">博主回复:</span>
              <p
                class="review"
                v-if="item.replay"
                v-html="analyzeEmoji(item.replay)"
              >{{item.replay}}</p>

              <div style=" overflow: hidden;">
                <span style="float:left; margin-top:10px">来自: {{item.username?item.username:'游客'}}</span>
                <span style="float:right; margin-top:10px">时间: {{item.time | timeFormat}}</span>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 显示更多 -->
        <el-col class="viewmore">
          <a
            v-show="hasMore"
            ref="getdata"
            class="tcolors-bg"
            href="javascript:void(0);"
            @click="addMoreMsg"
          >点击加载更多</a>
          <a v-show="!hasMore" class="tcolors-bg" href="javascript:void(0);">暂无更多数据</a>
        </el-col>
      </el-col>
      <el-col :xs="24" :sm="21" :md="21" :lg="6" :xl="6" class="right1">
        <RightList :showAll="hidenNewestAndComment"></RightList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import RightList from "../../../components/RightList/RightList";
import { SendFriMsg, GetFriMsg, AddMsg } from "../../../ajax/ajax";
export default {
  data() {
    return {
      // 是否有更多
      hasMore: true,
      // 输入框留言数据
      friendMsg: {
        username: "",
        content: ""
      },
      // 后台拉取的留言数据
      showMsg: "",
      // 影藏最新文章和评论
      hidenNewestAndComment: true,
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
        { title: "给力", url: "geili.gif" },
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
      ],
      pBody: true //表情打开控制
    };
  },

  filters: {
    // 时间格式过滤
    timeFormat: function(value) {
      var timer1 = value.split("T")[0];
      var timer2 = value.split("T")[1].split(".")[0];
      return timer1 + " " + timer2;
    }
  },
  methods: {
    // 添加表情到输入框中
    choseEmoji(inner) {
      if (this.friendMsg.content.length >= 200) {
        return;
      }
      this.friendMsg.content += "[" + inner + "]";
    },
    analyzeEmoji(cont) {
      //编译表情替换成图片展示出来
      var pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
      var pattern2 = /\[[\u4e00-\u9fa5]+\]/;
      var content = cont.match(pattern1);
      // console.log(pattern2)
      // console.log(content)
      var str = cont;
      if (content) {
        for (let i = content.length - 1; i >= 0; i--) {
          for (let j = this.OwOlist.length - 1; j >= 0; j--) {
            if ("[" + this.OwOlist[j].title + "]" == content[i]) {
              var src = this.OwOlist[j].url;
              break;
            }
          }
          str = str.replace(
            pattern2,
            '<img style="vertical-align: middle" src="http://vectorjzc.top/emot/image/' +
              src +
              '" />'
          );
        }
      }
      return str;
    },
    // 让语句具有空格和换行的效果
    preText(pretext) {
      return pretext
        .replace(/\r\n/g, "<br/>")
        .replace(/\n/g, "<br/>")
        .replace(/\s/g, "&nbsp;");
    },
    // 发送
    async sendMsg() {
      if (this.friendMsg.content.trim().length > 0) {
        this.friendMsg.content = this.NewContent;
        const result = await SendFriMsg(this.friendMsg);
        this.friendMsg.username = "";
        this.friendMsg.content = "";
        this.pBody = true;
        this.$message({
          message: "发送成功(＾∀＾●)",
          type: "success"
        });
        // 更新留言信息
        this.getMsg10();
      } else {
        this.$message({
          message: "请输入内容哦",
          type: "warning"
        });
      }
    },
    // 获取默认10条留言
    async getMsg10() {
      const result = await GetFriMsg("false");
      //  console.log(result);

      this.showMsg = result.data;
    },
    // 显示更多的留言
    async addMoreMsg() {
      // 获取更多留言
      const result = await AddMsg();
      this.hasMore = result.moreData;

      result.data.forEach(item => {
        this.showMsg.push(item);
      });
      // this.showMsg.push(newData)
    }
  },
  computed: {
    // 让语句具有空格和换行的效果
    NewContent() {
      return this.preText(this.friendMsg.content);
    }
  },
  components: {
    RightList
  },
  async mounted() {
    // 获取10条留言
    this.getMsg10();
  }
};
</script>

<style scoped>
.inputBox {
  position: relative;
  height: 688px;
}
.friendmessage {
  margin-top: 500px;
  margin-left: 10%;
}
.nameInput {
  margin: 10px 0;
}
.introduct {
  /* height: 16px; */
  line-height: 25px;
}
.sendButton {
  position: absolute;
  width: 200px;
  height: 50px;
  background-color: #97dffd;
  border: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.sendButton:hover {
  margin-bottom: 5px;
}
.right1 {
  margin-left: 5%;
}
@media screen and (max-width: 1199px) {
  .right1 {
    margin-left: 0 !important;
    margin-top: 30px !important;
  }
  .friendmessage {
    margin-left: 11% !important;
  }
  .viewmore a {
    margin-top: 22px !important;
  }
}
@media screen and (max-width: 500px) {
  .friendmessage {
    margin-left: 0 !important;
    padding: 0 10px !important;
    font-size: 14px !important;
  }
}

.new-list {
  margin-top: 34px;
  border-radius: 23px;
}
.target {
  position: relative;
  display: block;
  color: #666666;
  border-bottom: 1px dashed #ccc;
  /* padding-left: 28px; */
  overflow: hidden;
  margin: 10px 0;
  /*文字显示不开也强制一行显示*/
  /* white-space: nowrap; */
  /*溢出隐藏*/
  /* overflow: hidden; */
  /*文字溢出的时候用省略号来显示*/
  /* text-overflow: ellipsis; */
}

a {
  text-decoration: none !important;
}

.ui.label {
  border-color: #97dffd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #97dffd;
  /* margin: 5px 0 15px 2px; */
  font-size: 14px;
  position: relative;
  left: -32px;
  top: 0px;
  border-radius: 0 4px 4px 0;
  padding: 7px 11.2px 7px 32px;
  display: inline-block;
  color: #fff;
}
.ui.label::after {
  position: absolute;
  content: "";
  top: 100%;
  left: 6px;
  border-top: 0 solid transparent;
  border-right-width: 1em;
  border-right-color: #48456d;
  border-right-style: solid;
  border-bottom: 1em solid transparent;
  border-left: 0 solid transparent;
  width: 0;
  height: 0;
}
.ui.label a {
  color: #fff;
  line-height: 100%;
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

img {
  vertical-align: middle;
}
.review {
  /* border-top: 1px dashed #ccc; */
  /* border-bottom: 1px dashed #999; */
  display: inline-block;
  margin-bottom: 0;
  font-weight: 700;
  /* padding-top: 10px; */
}

/* add more */
/* ---------------------------------------------------- */
a {
  color: #fff;
  text-decoration: none;
}
.viewmore {
  text-align: center;
  width: 100%;
}
.viewmore a {
  background: #97dffd;
  padding: 8px 0;
  border-radius: 10px;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  color: #fff;
  height: 42px;
  line-height: 29px;
  display: block;
  margin-top: 10px;
}
.viewdetail {
  margin: 10px 0;
  line-height: 24px;
  text-align: center;
}
.viewdetail a {
  color: #fff;
  font-size: 12px;
  padding: 5px 10px;
  border-radius: 10px;
  /* margin-top: 10px; */
  margin-top: 10px;
}
.tcolors-bg {
  background: #97e09c;
  transition: all 0.3s ease-in;
}
.tcolord-bg {
  background: #48456d;
}
.tcolors-bg:hover {
  background: #48456d;
}
</style>