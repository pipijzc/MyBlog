<template>
  <div>
    <!-- 点星星 -->
    <el-card class="box-card star">
      <section :class="fixDo?'rs2 fixed':'rs2'" @click="lovemeFun">
        <vue-particles
          color="#97dffd"
          :particleOpacity="0.9"
          :particlesNumber="150"
          shapeType="circle"
          :particleSize="8"
          linesColor="#97dffd"
          :linesWidth="1"
          :lineLinked="false"
          :lineOpacity="0.3"
          :linesDistance="10"
          :moveSpeed="9"
          :hoverEffect="true"
          hoverMode="grab"
          :clickEffect="true"
          clickMode="push"
        ></vue-particles>
        <p>这个阔以点~😊😊😊</p>
        <div class>
          <i :class="loveme?'heart active':'heart'"></i>
          <span>{{likeNum}}</span>
        </div>
      </section>
    </el-card>


    <!-- 回到顶部组件 -->
    <Scroll :imageSrc="require('../../images/scroll.png')"></Scroll>
    <!-- 最新文章 -->
    <el-card class="new-list article" shadow="always" :class="{hiden: showAll}">
      <div class="ui label">
        <a>Newest</a>
      </div>
      <div class="new-list-div" v-for="(item,index) in newData" :key="index">
        <div class="set_4_button2 raised hoverable">
          <div class="anim"></div>
          <a class="target" :href="'#/detail?id='+ item._id" target="_blank">{{item.title}}</a>
          <div class="circle"></div>
        </div>
      </div>
    </el-card>

    <!-- 最新评论 -->
    <el-card class="new-list" :class="{hiden: showAll}" shadow="always">
      <div class="ui label">
        <a>留言</a>
      </div>
      <p
        class="py"
        ref="pyButton"
        @mouseenter="pyHover"
        @mouseleave="pyOut"
        @click="$router.push('/home/friendmessage')"
      >我没有怂恿你给我留言，没有(つд⊂)</p>
      <div
        class="new-list-div"
        @click="$router.push('/home/friendmessage')"
        v-for="(item,index) in friMsg"
        :key="index"
      >
        <div class="set_4_button2 raised hoverable">
          <span>{{item.username?item.username+'说:':'游客说:'}}</span>
          <a class="target" v-html="analyzeEmoji(item.content)">{{item.content}}</a>
        </div>
      </div>
    </el-card>

    <!-- 友链 -->
    <el-card class="new-list" shadow="always">
      <div class="ui label">
        <a>友链</a>
      </div>
      <div class="new-list-div">
        <!-- <div class="set_4_button2 raised hoverable">
          <a class="target">{{item.title}}</a>
        </div>-->
        <div class="friendLink" >
          <a class="linkBox" v-for="(item,index) in friLink" :key="index" :href="item.url" target="_blank">
            <img class="friendLinkLogo" :src="item.logo" alt />
            <p style="font-size:14px">{{item.username}}</p>
          </a>       
        </div>
      </div>
        <div class="viewdetail">
                <a class="tcolors-bg" v-show="!showAll" @click="$router.push('/home/friendmessage')">显示全部友链</a>
            </div>
    </el-card>
  </div>
</template>

<script>
import { AddStar, GetStar, Getnew, GetFriMsg5,GetLink6,GetLink } from "../../ajax/ajax";

import Scroll from "../Scroll/Scroll";

export default {
  data() {
    return {
      loveme: false,
      fixDo: false,
      likeNum: 0, //do you like me 点击量
      initLikeNum: 0, //初始化喜欢数量
      newData: [],
      // 评论信息
      friMsg: "",
      // 友链信息
      friLink:"",
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
  props: ["showAll"],
  methods: {
    //do you love me  点击
    async lovemeFun() {
      const that = this;
      if (!this.loveme) {
        this.likeNum += 1;
        // 加星星
        const result = await AddStar("dagenihao");
      }
      this.loveme = true;
      var timer = setTimeout(function() {
        that.loveme = false;
        clearTimeout(timer);
      }, 3000);
    },
    analyzeEmoji: function(cont) {
      //编译表情替换成图片展示出来
      var pattern1 = /\[[\u4e00-\u9fa5]+\]/g;
      var pattern2 = /\[[\u4e00-\u9fa5]+\]/;
      // console.log(pattern1);
      var content = cont.match(pattern1);

      var str = cont;
      if (content) {
        for (var i = 0; i < content.length; i++) {
          for (var j = 0; j < this.OwOlist.length; j++) {
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
    pyHover() {
      this.$refs.pyButton.innerHTML = "点击进入(つд⊂)";
    },
    pyOut() {
      this.$refs.pyButton.innerHTML = "我没有怂恿你给我留言，没有(つд⊂)";
    },
    // 获取友链
    async GetFriMsg(){
      const result = await GetFriMsg5();
      this.friMsg = result.data
    },
    showMoreLink(){

    }
  },
  async mounted() {
    // 获取星星
    const result = await GetStar();
    // 获取最新文章数据
    const results = await Getnew();
    // 获取最新评论
    this.GetFriMsg()
    // 获取最新友链
    if(this.showAll){
      const result = 
        this.friLink = await GetLink()
      } else {
        this.friLink = await GetLink6()
      }
    this.newData = results;
    this.likeNum = result.num;
  },
  components: {
    Scroll
  },
  watch: {
   
  }
};
</script>

<style scoped>
@import "../../public/set_4.css";
.particles-js-canvas-el {
  position: fixed;
  /* top: 0!important; */
  z-index: 9999;
  /* width: 400px!important; */
  /* height: 400px!important; */
}
.star {
  cursor: pointer;
}

/*************do you like me*******************/
.rs2 {
  /*padding:10px 0 4px 0;*/
  min-height: 100px;
  position: relative;
}
.rs2.fixed {
  position: fixed;
  top: 40px;
  width: 22%;
}
.rs2 p {
  color: #df2050;
  cursor: pointer;
  font-size: 20px;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
}
.rs2 div {
  color: #df2050;
  cursor: pointer;
  text-align: center;
  font-size: 40px;
  position: absolute;
  width: 100%;
  height: 100%;
  line-height: 100px;
  right: 0;
  top: 30px;
}
.rs2 div i.heart {
  display: inline-block;
  text-align: center;
  width: 100px;
  height: 100px;
  margin-left: -20px;
  margin-top: -5px;
  background: url(../../images/heart.png) no-repeat;
  background-position: 0 0;
  cursor: pointer;
  -webkit-transition: background-position 1s steps(28);
  transition: background-position 1s steps(28);
  -webkit-transition-duration: 0s;
  transition-duration: 0s;
  vertical-align: middle;
}
.rs2 div i.heart:hover {
  transform: scale(1.15);
  -webkit-transform: scale(1.15);
}
.rs2 div i.heart.active {
  -webkit-transition-duration: 1s;
  transition-duration: 1s;
  background-position: -2800px 0;
}
.rs2 div span {
  margin-left: -30px;
}
/* ----------------------------------------------------- */

.box-card {
  border-radius: 20px;
  margin-top: -10px;
}
@media screen and (max-width: 500px) {
  .article {
    display: none;
  }
  .py{
    margin-top: 25px!important;
  }
}
.new-list {
  /* position: relative; */
  margin-top: 25px;
  border-radius: 23px;
  /* padding: 0 20px; */
  /* text-align: center; */
}
.target {
  position: relative;
  display: block;
  color: #666666;
  border-bottom: 1px dashed #ccc;
  padding-left: 28px;
  /*文字显示不开也强制一行显示*/
  white-space: nowrap;
  /*溢出隐藏*/
  overflow: hidden;
  /*文字溢出的时候用省略号来显示*/
  text-overflow: ellipsis;
}
.circle {
  position: absolute;
  /* content: ""; */
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.19);
  top: 33%;
  left: 2px;
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
.hiden {
  display: none;
}
.py {
  /* position: absolute; */
  /* top: 0; */
  text-align: center;
  background-color: #ace6b0;
  border-radius: 20px;
  cursor: pointer;
  color: #fff;
  transition: all ease-in 0.2s;
}
.py:hover {
  background-color: #6d6a8a;
}
.friendLink {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  /* background-color: pink; */
}
.friendLink > .linkBox {
  position: relative;
  width: 32%;
  text-align: center;
  border-bottom: 1px dashed #ccc;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.linkBox{
  display: block;
  cursor: pointer;
  transition: all ease-in .3s;
  color: #000;
  overflow: hidden;
}
.linkBox:hover{
 /* box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.19) */
  border-bottom: 1px dashed #000;
  transform: translateY(-5px);
}
.friendLinkLogo {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  /* height: 50%; */
}
/* --------------------------- */
 .viewdetail{
    margin:10px 0 ;
    line-height: 24px;
    text-align: center;
}
.viewdetail>a{
    color:#fff;
    font-size: 14px;
    padding:5px 10px;
    border-radius: 10px;
    /* margin-top: 10px; */
    margin-top: 10px;
    cursor: pointer;

}
.tcolors-bg{
    background:#97E09C;
    transition: all .3s ease-in;
}
.tcolord-bg{
    background: #48456D;
}
.tcolors-bg:hover{
    background: #48456D;
}
</style>