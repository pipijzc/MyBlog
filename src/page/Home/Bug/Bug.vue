<template>
  <div class="margin">
    <el-row class="row" :gutter="20" v-for="(item,index) in newstrs" :key="index">
      <el-col :span="14" :offset="5">
        <el-card class="box-card" shadow="always">
          <div class="ui label">
            <a>{{item.category}}</a>
          </div>
          <span class="s-round-date">
            <span class="month" v-html=" item.date.split('-')[1] +'月'"></span>
            <span class="day" v-html="item.date.split('-')[2]"></span>
          </span>

          <div class="ql-snow ql-container">
            <div class="ql-editor">
              <div v-text="item.title" class="titleBox" style="text-align: center"></div>
              <div style="text-align: center" class="authorinfo">
                <i class="el-icon-user-solid"></i>
                <span>作者:{{item.author? item.author : '不告诉你'}}</span>
                <i class="el-icon-time"></i>
                <span>时间:{{item.date? item.date:'猴年马月'}}</span>
              </div>
              <div v-html="item.introduct" class="maincontent"></div>
            </div>
             <div class="viewdetail">
                <a class="tcolors-bg" :href="'#/detail?id='+ item._id" target="_blank">
                    阅读全文>>
                </a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <Scroll :imageSrc="require('../../../images/scroll.png')"></Scroll>
  </div>
</template>

<script >
import { readData } from "../../../ajax/ajax";
import { mapState } from "vuex";
import Scroll from "../../../components/Scroll/Scroll";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["strs"]),
     newstrs(){
      const {strs} = this
      strs.forEach(item=>{
          if (item.category == 'note') {
            item.category = '杂项'
          } else if (item.category =='js') {
            item.category = 'Js笔记'
          } else if (item.category == 'example') {
            item.category= '案例'
          } else if (item.category == 'bug') {
            item.category = 'Bug思路'
          } 
      })
      return strs
    }
               
  },
  components: {
    Scroll
  },
  mounted(){
      //  this.$router.replace();
  }
};
</script>

<style scoped>
.el-container {
  margin: 0 auto;
  margin-top: 400px;

  /* width: 70%; */
}
.margin {
  margin-top: 470px;
}
.row {
  /* position: relative; */
  margin-top: 100px;
}
.titleBox {
  font-size: 20px;
  font-weight: 700;
}
.authorinfo {
  margin-top: 20px;
  font-size: 16px;
  margin-bottom: 20px;
}
.authorinfo > span {
  margin-right: 15px;
}
.box-card {
  position: relative!important;

  border-radius: 20px;
  margin-top: 0px;
  margin-left: -23px;
}
.ql-container.ql-snow {
  border: 0;
}
a {
  color: #fff;
  text-decoration: none;
}
 .viewmore{
    text-align: center;
    width:100%;
}
 .viewmore a{
     background:  #97dffd;
    padding:6px 0; 
    border-radius: 10px;
  text-decoration: none;
    text-align: center;
    font-size: 14px;
    color:#fff;
    height:30px;
    line-height: 30px;
    display: block;
    margin-top: 10px;
}
 .viewdetail{
    margin:10px 0 ;
    line-height: 24px;
    text-align: center;
}
.viewdetail a{
    color:#fff;
    font-size: 12px;
    padding:5px 10px;
    border-radius: 10px;
    /* margin-top: 10px; */
    margin-top: 10px;

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