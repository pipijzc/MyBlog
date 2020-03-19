<template>
  <div>
    <!-- 大图 -->
    <el-container>
      <el-header height="300px">
        
        <div class="block1" ref="topBox">
          <!-- <el-image src="../../images/timg.jpg"></el-image> -->
          <img src="../../images/beautiful.jpg" alt="灯塔" class="toppic" />
          <div class="animated flipInX">
            <div class="boxbox">
              <img
                ref="townpics"
                :src="townpic"
                alt="灯塔"
                @mouseenter="hoverimg"
                @mouseleave="  townpic = require('../../images/timg (2)_看图王.jpg')"
                class="townpic"
              />
              <span>愿如灯塔般，即便无所依靠，风吹雨打，仍旧屹立不倒，照亮一方!</span>
            </div>
          </div>
          <!-- 打字机 -->
          <div class="scene">
            <div>
              <span id="luke"></span>
            </div>
          </div>
        </div>
      </el-header>
    </el-container>
    <!-- 内容占位 -->
    <router-view></router-view>

    <Footer></Footer>
  </div>
</template>

<script >
import { mapState } from "vuex";
import { Typeit } from "../../utils/plug";
import Footer from '../../components/Footer/Footer'

export default {
  data() {
    return {
      townpic: require("../../images/timg (2)_看图王.jpg")
    };
  },
  components:{
    Footer
  },
  computed: {
    ...mapState(["userinfo","strs"])
  },
  methods: {
    hoverimg() {
      this.townpic = require("../../images/lighttown.jpg");
    }
  },
  mounted() {
    var timer = setTimeout(function() {
      Typeit("#luke"); //打字机效果
      clearTimeout(timer);
    }, 1200);
  },
  // 监听路由参数的变化
   watch:{
    '$route':function(to,from){
      // console.log(this.$route); 
      document.documentElement.scrollTop = 0
    },
    strs(){
        this.$nextTick(()=>{
            var topbox = this.$refs.topBox.offsetHeight;
        // console.log(topbox);
      })
    
    }
  }
};
</script>

<style scoped>
/* 导入动画样式 */
@import "../../animate/animate.css";
@import '../../public/sigmar.css';
.block1 {
  position: relative;
}

.town {
  width: 100px;
  height: 100px;
}
.townpic {
  position: absolute;
  top: 15px;
  width: 100px;
  height: 100px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  cursor: pointer;
  /* margin-bottom: 400px; */
}

.boxbox {
  position: absolute;
  left: 50%;
  bottom: -70px;
  width: 80%;
  height: 200px;
  line-height: 330px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  opacity: 0.7;
  transform: translate(-50%);
  font-size: 20px;
  /* margin-bottom: 400,px; */
}
span {
  background: linear-gradient(to right, skyblue, blue);
   -webkit-background-clip:text; 
   -webkit-text-fill-color: transparent;
}

.el-aside {
  background-color: skyblue;
  height: 600px;
}

.toppic {
  width: 100%;
  height: 620px;
}
.el-header {
  padding: 0;
}
.scene {
	width: 100%;
	height:300px;
	text-align: center;
	font-size: 100px;
	font-weight: 200;
	color: #fff;
	position: absolute;
	left: 0;
	top: 160px;
  font-family: 'Sigmar One', Arial;
	text-shadow: 0 2px 2px #435877;

}
.saying:after {
	content: "|";
	font-family: Arial, sans-serif;
	font-size: 1em;
	display: inline-block;
	vertical-align: baseline;
	opacity: 1;
	text-shadow: 1px 1px 0 #f5f3f3, -1px -1px 0 #00a7e0;
	animation: caret 500ms infinite;
}

.scene>span {
	transform: matrix(1, 0, 0, 1, 0, 0);
	-webkit-transform: matrix(1, 0, 0, 1, 0, 0);
	text-shadow: 1px 1px 0 #ff3f1a, -1px -1px 0 #00a7e0;
}
</style>