<template>
  <div id="app">
           <Header></Header>
    <router-view></router-view>
    <!-- <Footer></Footer> -->
  </div>
</template>

<script>
import Header from "./components/Header/Header.vue";
// import Footer from './components/Footer/Footer'
export default {
  mounted() {
    this.$store.dispatch("isLogin");
   
  },
  components: {
    Header,
    
  },
  created() {
      // 初始化小猫
      window.L2Dwidget.init({
        pluginRootPath: 'live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-hijiki/assets/',
        tagMode: false,
        debug: false,
        model: { jsonPath: '/live2dw/live2d-widget-model-hijiki/assets/hijiki.model.json' },
        display: { position: 'right', width: 300, height: 300 },
        mobile: { show: true },
        log: false
      })
   
  },
 

}
</script>

<style>
.app {
  width: 100%;
  height: 100%;
}


/* //公共标签 */
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
}
.s-round-date {
  position: absolute;
  top: 0;
  left: 2px;
  height: 50px;
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
