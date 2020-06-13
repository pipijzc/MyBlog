<template>
  <div>
      <keep-alive>
        <!-- <Music></Music> -->

      </keep-alive>
        <div  v-for="(item,index) in newstrs" :key="index" >
    <el-card class="box-card" shadow="hover" >  
      <div class="ui label">
        <a style="cursor: pointer;" @click="jump(item.category)">{{item.category}}</a>
      </div>
       <span class="s-round-date">
                <span class="month" v-html=" item.date.split('-')[1] +'月'"></span>
                <span class="day" v-html="item.date.split('-')[2]"></span>
            </span>
      <div class="ql-snow ql-container" style="cursor: default">
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
          <div class="viewdetail" v-if="item.showDetail!=='no'">
                <a class="tcolors-bg" :href="'#/detail?id='+ item._id" target="_blank">
                    阅读全文>>
                </a>
            </div>
      </div>
    </el-card>
    </div>
  
   
    
    <!-- 显示更多 -->
    <el-col class="viewmore">
            <a  v-show="hasMore" ref="getdata" class="tcolors-bg" href="javascript:void(0);" @click="addMoreFun">点击加载更多</a>
            <a v-show="!hasMore" class="tcolors-bg" href="javascript:void(0);">暂无更多数据</a>
        </el-col>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Addmore } from '../../ajax/ajax'

export default {
  data() {
    return {
      hasMore:true,
  
    };
  },
  components:{
    
  },
  methods: {
    // 点击显示更多
    addMoreFun() {
      this.$store.dispatch('addmore')
    },
    jump(category){
      switch(category) {
        case '杂项': 
        this.$store.dispatch('readData','note');
        this.$router.push('/home/note');
        break;

        case 'Js笔记': 
        this.$store.dispatch('readData','js')
        this.$router.push('/home/js');
        break;

        case '案例': 
        this.$store.dispatch('readData','example')
        this.$router.push('/home/example');
        break;

        case '生活随笔': 
        this.$store.dispatch('readData','daily')
        this.$router.push('/home/bug');
        break;
      }
      
    }
  },
  mounted() {
    // 获取文章数据
    this.$store.dispatch('readData','getfive')
    // console.log(this.strs);
  },
  computed: {
    ...mapState(['strs']),

    newstrs(){
      const {strs} = this
      // console.log(strs);
      
      strs.data.forEach(item=>{
          if (item.category == 'note') {
            item.category = '杂项'
          } else if (item.category =='js') {
            item.category = 'Js笔记'
          } else if (item.category == 'example') {
            item.category= '案例'
          } else if (item.category == 'bug') {
            item.category = 'Bug思路'
          } else if (item.category == 'daily') {
            item.category = '生活随笔'
          } 
      })
      return strs.data
    }
  },
  watch:{
    // 监听state数据中strs的变化
   'strs.moreData':{
    handler(newValue,oldValue){
      this.hasMore = this.strs.moreData
		}
      
     
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 1200px) {
  .box-card {
    margin-top: 69px!important;
  }
}
@media screen and (max-width: 500px) {
 .box-card {
   border-radius: 10px!important;
 }
}
@media screen and (max-width: 690px) {
  .box-card {
    margin-top: 30px!important;
  }
  .titleBox{
    margin-top: 17px;
    font-size: 16px!important;
  }
  .viewmore a {
    margin-top: 20px!important;
  }
   .authorinfo {
  font-size: 14px!important;
  margin-top: 12px!important;
  margin-bottom: 14px!important;
}
}



.box-card {

  position: relative;
  border-radius: 20px;
  margin-top: 170px;
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
    height:42px;
    line-height: 29px;
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