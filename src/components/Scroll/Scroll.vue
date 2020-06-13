<template>
  <!-- 右侧上滑小图片 -->
  <div :class="gotoTop?'toTop hidden':'toTop goTop hidden'" @click="toTopfun">
    <img :src="imageSrc" alt />
  </div>
</template>

<script>
export default {
  props: ["imageSrc"],
  data() {
    return {
      gotoTop: false,
      going: false //是否正在执行上滑动作
    };
  },
  methods: {
    // 返回顶部
    toTopfun: function(e) {
      var that = this;
      this.gotoTop = false;
      this.going = true;

      var timer = setInterval(function() {
        //获取滚动条距离顶部高度
        var osTop =
          document.documentElement.scrollTop || document.body.scrollTop;
   

        var ispeed = Math.floor(-osTop / 4);
        document.documentElement.scrollTop = document.body.scrollTop =
          osTop + ispeed;
        //到达顶部，清除定时器
        if (osTop < 30) {
          that.going = false;
          clearInterval(timer);
          timer = null;
        }
      }, 30);
    },
   
  },
  created() {
    var that = this;
    window.onscroll = function() {
      var t = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(t);
      if (!that.going) {
        if (t > 600) {
          that.gotoTop = true;
        } else {
          that.gotoTop = false;
        }
      }
    };
  }
};
</script>

<style scoped>
/*返回到顶部*/
@media screen and (max-width: 800px) {
  .toTop {
    display: none;
  }
}
.toTop {
  position: fixed;
  right: 40px;
  top: -286px;
  z-index: 99;
  width: 70px;
  height: 900px;
  transition: all 0.5s 0.3s ease-in-out;
  cursor: pointer;
}
.goTop {
  top: -950px;
}
.toTop img {
  width: 100%;
  height: auto;
}
</style>