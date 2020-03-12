<template>
  <div>
    <!-- 点星星 -->
    <el-card class="box-card">
      <section :class="fixDo?'rs2 fixed':'rs2'" @click="lovemeFun">
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
    <el-card class="new-list" shadow="always">
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
  </div>
</template>

<script>
import { AddStar, GetStar, Getnew } from "../../ajax/ajax";
import Scroll from "../Scroll/Scroll";
export default {
  data() {
    return {
      loveme: false,
      fixDo: false,
      likeNum: 0, //do you like me 点击量
      initLikeNum: 0, //初始化喜欢数量
      newData: []
    };
  },
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
    }
  },
  async mounted() {
    // 获取星星
    const result = await GetStar();
    // 获取最新文章数据
    const results = await Getnew();
    this.newData = results;
    this.likeNum = result.num;
  },
  components: {
    Scroll
  },
  watch: {}
};
</script>

<style scoped>
@import "../../public/set_4.css";
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
.box-card {
  border-radius: 20px;
  margin-top: -10px;
}
.new-list {
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
.circle{
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
/* .circle::after {
    position: absolute;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: 1px solid #000;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
} */
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
</style>