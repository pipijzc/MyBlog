<template>
 
  <div id="app"   style="display: none;" :style="{display: 'block'}">
    <Header></Header>
    <router-view></router-view>
    <Music></Music>
  </div>


</template>

<script>
import Header from "./components/Header/Header.vue";
import Music from './components/Music/music'
export default {
 
  data() {
    return {
      catWidth: 0,
    }
  },
  mounted() {
    // this.$store.dispatch("isLogin");
    
    
  },
  methods:{
  
  },
  components: {
    Header,
    Music
  },
  created() {
    // 获取屏幕宽度
    var ClientWidth = document.documentElement.clientWidth
    if (ClientWidth <= 500) {
      // 设置小猫尺寸
      this.catWidth = 150
    } else {
      this.catWidth = 300
    }
    // 初始化小猫
    window.L2Dwidget.init({
      pluginRootPath: "live2dw/",
      pluginJsPath: "lib/",
      pluginModelPath: "live2d-widget-model-hijiki/assets/",
      tagMode: false,
      debug: false,
      model: {
        jsonPath: "/live2dw/live2d-widget-model-hijiki/assets/hijiki.model.json"
      },
      display: { position: "right", width: this.catWidth, height: this.catWidth },
      mobile: { show: true },
      log: false
    });
  },
  watch: {
   
    },
};
</script>

<style>
.app {
  width: auto!important;
  height: 100%;
  overflow-x: hidden!important;
}
 
/* //公共标签 */
@media screen and (max-width: 500px) {
  .ui.label {
    padding: 4px 4.2px 7px 5px !important;
    left: -21px !important;
    top: 35px !important;
    font-size: 12px!important;
  }
  .ui.label::after {
    display: none!important;
    /* left: 0 !important; */
  }
  .s-round-date{
    height: 50px!important;
    width: 50px!important;
  }
 .s-round-date .day {
   font-size: 17px!important;
 }
}
.ui.label {
  border-color: #97dffd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #97dffd;
  margin: 5px 0 15px 2px;
  font-size: 14px;
  position: relative;
  left: -32px;
  top: 46px;
  border-radius: 0 4px 4px 0;
  padding: 7px 11.2px 7px 32px;
  display: inline-block;
  color: #fff;
  z-index: 4;
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
  /* font-weight: 500; */
}
.s-round-date {
  position: absolute;
  top: 0;
  left: 2px;
  height: 60px;
  width: 60px;
  padding-top: 10px;
  border-radius: 100px;
  color: #fff;
  background: #97dffd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.s-round-date span {
  text-align: center;
  display: block;
}
.s-round-date .day {
  font-size: 22px;
  font-weight: 700;
}
</style>
