<template>
  <div>
    <!-- 电脑端导航栏 -->
    <div class="computer-nav">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/home/all">全部</el-menu-item>
        <el-submenu index="1">
          <template slot="title">分类</template>
          <el-menu-item index="/home/bug" @click="ToggleToBug">Bug的解决思路</el-menu-item>
          <el-menu-item index="/home/note" @click="ToggleToNote">杂项</el-menu-item>
          <el-menu-item index="/home/js" @click="ToggleToJs">Js笔记</el-menu-item>
          <el-menu-item index="/home/example" @click="ToggleToexample">案例</el-menu-item>
          <el-menu-item index="/home/daily" @click="ToggleTodaily">生活随笔</el-menu-item>
        </el-submenu>
        <el-menu-item index="/home/think">一勺想法</el-menu-item>
        <!-- <el-menu-item index="/edit" v-if="userinfo.data">{{userinfo.data}}/编辑</el-menu-item>
        <el-menu-item index="/login" v-else>登录</el-menu-item> -->
        <el-menu-item index="/home/friendmessage">留言 | 友链</el-menu-item>
        <!-- <el-menu-item index="/home/music">音乐盒</el-menu-item> -->
        <el-menu-item index="/home/about">关于</el-menu-item>
        <div class="input">
          <input type="text" v-model="word" placeholder="请输入关键字" />
          <el-button
            round
            size="mini"
            class="searchbutton"
            type="primary"
            icon="el-icon-search"
            @click="keySearch"
          >搜索</el-button>
        </div>
      </el-menu>
    </div>

    <!-- 移动端导航栏 -->
    <div class="mobile-nav">
      <div class="mobile-inputBox">
        <i @click="showMobileMenu" class="icon el-icon-menu"></i>
        <input type="text" v-model="word" placeholder="输入关键字" class="mobile-input" />
        <i @click="keySearch" class="icon-search el-icon-search"></i>
      </div>
      <el-menu
        default-active="$route.path"
        router
        class="el-menu-mobile mobileMenuHidden"
        :class="{mobileMenuDisplay: mobileMenu}"
        background-color="#545c64"
      >
        <el-menu-item class="menu-item-mobile" index="/home/all">
          <i class="el-icon-document"></i>
          <span slot="title">全部</span>
        </el-menu-item>
        <el-submenu index="1" class="menu-sub-mobile">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>分类</span>
          </template>
          <el-menu-item-group>
            <el-menu-item class="menu-item-mobile" index="/home/bug" @click="ToggleToBug">Bug的解决思路</el-menu-item>
            <el-menu-item class="menu-item-mobile" index="/home/note" @click="ToggleToNote">杂项</el-menu-item>
            <el-menu-item class="menu-item-mobile" index="/home/js" @click="ToggleToJs">Js笔记</el-menu-item>
            <el-menu-item class="menu-item-mobile" index="/home/example" @click="ToggleToexample">案例</el-menu-item>
            <el-menu-item index="/home/daily" @click="ToggleTodaily">生活随笔</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-menu-item class="menu-item-mobile" index="/home/think">
          <i class="el-icon-menu"></i>
          <span slot="title">一些想法</span>
        </el-menu-item>

          <el-menu-item class="menu-item-mobile" index="/home/friendmessage">
          <i class="el-icon-menu"></i>
          <span slot="title">留言|友链</span>
        </el-menu-item>

        <!-- <el-menu-item class="menu-item-mobile" index="/edit" v-if="userinfo.data">
          <i class="el-icon-document"></i>
          <span slot="title">{{userinfo.data}}/编辑</span>
        </el-menu-item> -->
        <!-- <el-menu-item class="menu-item-mobile" index="/login" v-else>
          <i class="el-icon-document"></i>
          <span slot="title">登录</span>
        </el-menu-item>-->
        <el-menu-item class="menu-item-mobile" index="/home/about">
          <i class="el-icon-setting"></i>
          <span slot="title">关于</span>
        </el-menu-item>
      </el-menu>
    </div>



  </div>
</template>

<script>
import { mapState } from "vuex";
import { Search } from "../../ajax/ajax";

export default {
  data() {
    return {
      isInput: false,
      mobileMenu: false,
      high: "",
      LoginForm: {
        username: "",
        password: ""
      },
      word: ""
    };
  },
  computed: {
    ...mapState(["userinfo", "strs"])
  },
  components: {

  },
  watch: {
    strs() {
      this.$nextTick(() => {
        // 当strs的数据发生变化时，且数据已经渲染到页面时，获取文档的长度
        this.high = document.documentElement.scrollHeight;
      });
      // 判断：当数组长度为0，且处于输入状态时，显示警告
      if (this.strs.length == 0 && this.isInput === true) {
        this.$message({
          message: "暂时找不到这篇文章哦,两秒后返回~",
          type: "warning",
          customClass: "mzindex"
        });
        var that = this;
        //  把定时器挂载到vue实例对象中
        this.timer = setTimeout(function() {
          // 定时器函数的指向是window全局对象，而不是vue实例，所以需要用that指代
          that.timer = null;
          // 强制刷新当前路由
          that.$router.go(0);
        }, 2000);
      }
    },
    word() {
      if (this.word == "") {
        // 重置输入状态
        this.isInput = false;
        // 返回首页
        this.$router.go(0);
        var scrolls =
          document.documentElement.scrollTop || document.body.scrollTop;
        scrolls = 0;
      }
    },
    $route: function(to, from) {
      //  当点击移动端的菜单，路由刷新时关闭菜单
      this.mobileMenu = false;
    }
  },
  mounted() {},
  methods: {
    animate(target, callback) {
      var that = this;
      this.$nextTick(() => {
        var timer = setInterval(function() {
          // 判断屏幕尺寸
          //  电脑屏幕
          if (document.documentElement.clientWidth >= 987) {
            var step = (target - document.documentElement.scrollTop) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (document.documentElement.scrollTop == target) {
              clearInterval(timer);
              callback && callback();
            } else {
              document.documentElement.scrollTop += step;
            }
          }
          //  手机屏幕
           else {
            var step = (target - document.body.scrollTop) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (document.body.scrollTop == target) {
              clearInterval(timer);
              callback && callback();
            } else {
              document.body.scrollTop += step;
            }
          }
        }, 15);
      });
    },
    async keySearch() {
      if (this.word) {
        //  把输入状态置为true
        this.isInput = true;
        this.$store.dispatch("getIsInput", true);
        //  查询数据
        this.$store.dispatch("getSearch", this.word);
        // 把页面往下移动
        if (document.documentElement.clientWidth <= 987) {
          this.animate(1700);
        } else {
          this.animate(1400);
        }
      }
    },
    // 获取杂项的列表数据
    ToggleToNote() {
      this.$store.dispatch("readData", "note");
    },
    // 获取bug的列表数据
    ToggleToBug() {
      this.$store.dispatch("readData", "bug");
    },
    // 获取Js数据
    ToggleToJs() {
      this.$store.dispatch("readData", "js");
    },
    // 获取案例数据
    ToggleToexample() {
      this.$store.dispatch("readData", "example");
    },
    ToggleTodaily(){
      this.$store.dispatch("readData", "daily");
    },
    // 控制移动端菜单是否显示
    showMobileMenu() {
      this.mobileMenu = !this.mobileMenu;
    }
  }
};
</script>

<style scoped>
@media screen and (max-width: 950px) {
  .computer-nav {
    display: none;
  }
  .mobile-nav {
    display: block;
  }
}
@media screen and (min-width: 951px) {
  .computer-nav {
    display: block;
  }
  .mobile-nav {
    display: none;
  }
}

.mzindex {
  z-index: 9999999 !important;
}
.el-menu {
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 60px !important;
  line-height: 60px;
  top: 0;
  opacity: 0.8;
  padding-left: 10%;
}
.input {
  float: right;
  margin-right: 13%;
  border: 0;
  outline: 0;
}
.input > input {
  outline: 0;
  border: 1px solid #999;
  height: 20px;
  padding-left: 10px;
  border-radius: 20px;
}
.searchbutton {
  margin-left: 10px;
  background-color: #97e09c;
  border: 0;
}
.searchbutton:hover {
  background-color: #48456d;
}
.mobileMenuHidden {
  display: none;
}
.mobileMenuDisplay {
  display: block;
}

/* 移动端 */
/* .mobile-nav {
  display: none;
} */

.el-menu-mobile {
  padding-left: 0;
  margin-top: 50px;
}
.mobile-inputBox {
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background: #fff;
  opacity: 0.7;
  z-index: 99;
  padding-right: 4%;
}
.mobile-input {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 73%;
  height: 21px;
  padding-left: 3%;
  margin-left: 9%;
  outline: 0;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.19);
}
.icon {
  position: absolute;
  top: 50%;
  left: 1%;
  font-size: 19px !important;
  color: #97dffd;
  transform: translateY(-50%);
}
.icon-search {
  position: absolute;
  top: 50%;
  right: 8%;
  transform: translateY(-50%);
  color: #ccc;
}
.menu-item-mobile {
  height: 40px !important;
  line-height: 40px !important;
}
/* .el-submenu__title{
   height: 40px!important;
  line-height: 40px!important;
} */
/* .menu-item-group-mobile{
   height: 40px;
  line-height: 40px;
} */
</style>