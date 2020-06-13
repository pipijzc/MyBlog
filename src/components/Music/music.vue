<template>
  <div>
    <div class="musicBox">
      <div class="container" ref="container">
        <audio ref="test" v-for="(item,index) in songlist" :key="index">
          <source :src="item.url" />
          <p>您的浏览器,不支持 播放声音.</p>
        </audio>
        <div class="songCircle">
          <img :src="songlist[musicIndex].logo" alt />
        </div>
        <div class="timeBar" @click="changeTime">
          <div class="bar" ref="bars"></div>
        </div>
        <div class="time">
          <span>0{{min}} : </span>
          <span>{{ sec >= 10 ? sec :'0'+sec}}</span>
        </div>
        <div class="control">
          <i class="el-icon-caret-left" @click="preSong"></i>
          <!-- <span class="last" @click="preSong">上一首</span> -->
          <i class="el-icon-video-play" v-if="!isPlay" @click="playMusic"></i>
          <i class="el-icon-loading" v-else-if="!$refs.test[musicIndex].duration "></i>

          <!-- <span class="play" v-if="!isPlay" @click="playMusic">播放</span> -->
          <!-- <span class="play" v-else @click="stop">暂停</span> -->
          <i class="el-icon-video-pause" v-else @click="stop"></i>
          <i class="el-icon-caret-right" @click="nextSong"></i>
          <!-- <span class="next" @click="nextSong">下一首</span> -->
        </div>
        <div class="volume" ref="volume" @click="changeVolume">
          <div class="volumeBar" ref="volumeBar"></div>
        </div>
        <span class="songName">《{{songlist[musicIndex].name}}》</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 是否正在播放
      isPlay: false,
      // 当前歌曲索引
      musicIndex: 0,
      // 歌曲总时间
      totalTime: "",
      // 加载中
      loading: false,
      // 默认音量
      changeVolumes: 0.5,
      // 点击音量按钮调整后的全局音量
      volume: "",
      min: 0,
      sec: 0,
      songlist: [
        {
          name:'Welcome Horizons',
           url: "http://vectorjzc.top/music/Welcome Horizons.mp3",
          logo: "http://vectorjzc.top/logo/town.jpg"
        },
        {
          name: "巴赫_小步舞曲",
          url: "http://vectorjzc.top/music/巴赫_小步舞曲.mp3",
          logo: "http://vectorjzc.top/logo/town.jpg"
        },
         {
          name: "Can You Feel The Love Tonight",
          url: "http://vectorjzc.top/music/Can You Feel The Love Tonight.mp3",
          logo: "http://vectorjzc.top/logo/town.jpg"
        },
      
        {
          name: "Heal The World",
          url: "http://vectorjzc.top/music/Heal The World.mp3",
          logo: "http://vectorjzc.top/logo/town.jpg"
        },
        {
          name: "我们向往着哪里",
          url: "http://vectorjzc.top/music/我们向往着哪里.mp3",
          logo: "http://vectorjzc.top/logo/town.jpg"
        }
      ]
    };
  },
  methods: {
    // 播放
    playMusic() {
      // 如果没有在播放
      if (!this.isPlay) {
        // 显示时间和进度条
        this.showSingTime();
        // 播放歌曲
        this.$refs.test[this.musicIndex].play();
        // 声音渐入
        this.volumeInandOut("big");
        // 判断是否播放取反
        this.isPlay = !this.isPlay;
      }
    },
    // 暂停
    stop() {
      // 如果正在播放
      if (this.isPlay) {
        // 声音渐出暂停
        this.volumeInandOut("small");
        // 清空定时器
        clearInterval(this.showTime);
        // 判断是否播放取反
        this.isPlay = !this.isPlay;
      }
    },
    // 下一首
    nextSong() {
      // 重载歌曲
      this.reloadAllMusic();
      // 清空可能存在的时间和进度的定时器
      clearInterval(this.showTime);
      // 声音渐入效果
      this.volumeInandOut("big");
      // 判断如果小于歌单里面歌曲的数量，音乐播放下一首
      if (this.musicIndex < this.songlist.length - 1) {
        this.musicIndex++;
      } else {
        //  否则播放第一首
        this.musicIndex = 0;
      }
      // 播放歌曲
      this.$refs.test[this.musicIndex].play();
      // 显示时间和进度条
      this.showSingTime();
      //  判断是否播放赋值为true
      this.isPlay = true;
    },
    // 上一首
    preSong() {
      // 重载音乐
      this.reloadAllMusic();
      // 清空可能存在的时间和进度的定时器
      clearInterval(this.showTime);
      // 声音渐入效果
      this.volumeInandOut("big");
      // 如果歌单数组里面上一首还有歌，歌曲索引号减一
      if (this.musicIndex > 0) {
        this.musicIndex--;
      } else {
        //  否则重置为歌单最后一首歌的索引
        this.musicIndex = this.songlist.length - 1;
      }
      // 播放
      this.$refs.test[this.musicIndex].play();
      // 显示时间和进度条
      this.showSingTime();
      //  判断是否播放赋值为true
      this.isPlay = true;
    },
    // 声音渐入渐出
    volumeInandOut(sele) {
      var volume = this.$refs.test[this.musicIndex].volume * 100;
      var that = this;
      // 使用定时器实现歌曲声音渐入效果
      if (sele === "big") {
        var starTimer = setInterval(function() {
          if (volume < that.changeVolumes * 100) {
            // volume+=2;
            volume++
            that.$refs.test[that.musicIndex].volume = volume / 100;
          } else {
            that.$refs.test[that.musicIndex].volume = that.changeVolumes;
            clearInterval(starTimer);
          }
        }, 7);
      }
      // 使用定时器实现歌曲声音渐出效果
      else {
        var stopTimer = setInterval(function() {
          if (volume > 0) {
            // volume-=2;
            volume--
            that.$refs.test[that.musicIndex].volume = volume / 100;
          } else {
            that.$refs.test[that.musicIndex].pause();
            that.$refs.test[that.musicIndex].volume = 0;
            clearInterval(stopTimer);
          }
        }, 7);
      }
    },
    // 重载音乐
    reloadAllMusic() {
      for (let i = 0; i < this.$refs.test.length; i++) {
        this.$refs.test[i].load();
      }
    },
    // 时间显示和进度条
    showSingTime() {
      var that = this;
      let currentTime;
      let nowWidth;
      //  先清空上一次可能存在的定时器
      clearInterval(this.showTime);
      //  确保可以获取到歌曲总时长
      this.$refs.test[this.musicIndex].oncanplay = function() {
              // 获取当前歌曲总时长
        that.totalTime = that.$refs.test[that.musicIndex].duration;
      };

      that.showTime = setInterval(function() {
        currentTime = that.$refs.test[that.musicIndex].currentTime;
        // 分
        that.min = parseInt(currentTime / 60);
        // 秒
        that.sec = parseInt(currentTime % 60);
        // 进度盒子瞬时宽度（其中100为父盒子宽度）
        nowWidth = (currentTime / that.totalTime) * 100;
        // 把宽度赋值给盒子
        that.$refs.bars.style.width = nowWidth + "px";
        // 歌曲播放结束时
        if (parseInt(that.totalTime) === parseInt(currentTime)) {
          // 清空定时器
          clearInterval(that.showTime);
          //  播放下一首
          that.nextSong();
        }
      }, 1000);
    },
    // 进度切换
    changeTime(event) {
      // 获取相对当前绑定了此事件的盒子鼠标在里面的坐标
      let mouseX = event.offsetX;
      // 其中100为进度盒子宽度
      let nowTime = (mouseX * this.totalTime) / 100;
      this.$refs.test[this.musicIndex].currentTime = nowTime;
    },
    // 音量切换
    changeVolume(event) {
      // 获取相对当前绑定了此事件的盒子鼠标在里面的坐标
      let mouseY = event.offsetY;
      //  50为音量盒子长度。由于在网页中规定了y轴负半轴的数为从0到正无穷的正向递增，与实际的坐标系相反，
      // 导致鼠标获取到的值为上小下大，不符合一般使用习惯，所以把获取到的鼠标坐标减去音量盒子的总长并取绝对值，
      // 实现上大下小，保证音量的调节对应为上大下小
      let newY = Math.abs(mouseY - 50);
      this.$refs.volumeBar.style.height = 50 - newY + "px";
      this.volume = parseFloat(newY / 50);
      // 防止出现0-1区间外的音量值
      if (this.volume >= 1) {
        this.volume = 1;
      }
      if (this.volume <= 0) {
        this.volume = 0;
      }
      this.$refs.test[this.musicIndex].volume = this.volume;
    }
  },
  watch: {
    // 如果点击的音量调节框，把获取的值赋值给全局音量
    volume() {
      this.changeVolumes = this.volume;
    }
  },
  mounted() {
    var that = this;
    // 初始化获取第一首歌曲时长
    this.$refs.test[this.musicIndex].oncanplay = function() {
      that.totalTime = that.$refs.test[that.musicIndex].duration;
    };
  }
};
</script>

<style scoped>
.container {
  position: fixed;
  bottom: 0;
  z-index: 999999;
  width: 148px;
  left: 10px;
  height: 215px;
  opacity: 0.9;
  margin-top: 68px;
  background-color: #fff;
  border-radius: 35px;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  text-align: center;
}
.songCircle {
  position: absolute;
  top: 21px;
  left: 40px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  text-align: center;
  overflow: hidden;
  background-color: skyblue;
  /* transition: box-shadow .3 ease-in-out; */
  animation: shadow 2s ease-in-out infinite;
}
@keyframes shadow {
  0% {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }
}

.songCircle > img {
  width: 100%;
  height: 100%;
}
.control {
  position: absolute;
  bottom: 60px;
  left: 34px;
  font-size: 27px;
  cursor: pointer;
  color: #999;
}
.play {
  margin: 0 10px;
}
.timeBar {
  position: absolute;
  right: 24px;
  bottom: 9px;
  width: 100px;
  height: 10px;
  background-color: #999;
  cursor: pointer;
  border-radius: 16px;
  overflow: hidden;
}
.bar {
  position: absolute;
  width: 0%;
  height: 100%;
  /* background-color: #6d6a8a; */
  background-color: #97dffd;
}
.time {
  position: absolute;
  left: 50px;
  bottom: 97px;
  color: #999;
  cursor: default;
}
.volume {
  position: absolute;
  right: 5px;
  top: 47px;
  width: 8px;
  height: 50px;
  background-color: #97e09c;
  cursor: pointer;
  z-index: 999999;
}
.volume::before {
  position: absolute;
  left: -15px;
  top: -6px;
  content: "+";
  color: #999;
}
.volume::after {
  position: absolute;
  left: -13px;
  bottom: -6px;
  content: "-";
  color: #999;
}
.volumeBar {
  /* position: absolute; */
  bottom: 0;
  width: 100%;
  height: 50%;
  background-color: #ccc;
}
.songName {
  display: inline-block;
  font-size: 12px;
  margin-top: 157px;
  color: #999;
}
@media screen and (max-width: 500px) {
  .container {
    border-radius: 21px;
        width: 229px;
    left: 12px;
    height: 107px;
    opacity: .9;
  }
  .volume {
        right: 19px;
    top: 20px;
  }
  .songCircle {
    top: 15px;
    left: 19px;
    width: 50px;
    height: 50px;
  }
  .songName{
    font-size: 12px;
    margin-top: 74px;
  }
  .time {
    left: 90px;
    bottom: 34px;
  }
  .control{
    bottom: 54px;
    left: 75px;
  }
  .timeBar{
        right: 62px;
    bottom: 3px;
  }
}
</style>