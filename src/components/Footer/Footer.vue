<template>
    <div>
 <div class="footBack footBackQian">
        <div class="footer-img">
        </div>
        <div class="fcontainer">
            <p>
                你看不到我，躲起来(つд⊂)
            </p>
            <p>
                博客已偷偷运行<span >{{longTime}}</span><span class="timeJump">🚀🚀</span>
            </p>
            <p>
                奔跑于<a href="https://www.aliyun.com/?spm=a2c49.11131515.0.0.5Z9AkR" target="_blank">阿里云</a>服务器.   源码<a href="https://github.com/pipijzc" target="_blank">Github</a>
            </p>
            <p>
                © 2020 <a href="#">Vector-Blog</a>. 由 <a href="https://cn.vuejs.org/" target="_blank">Vue</a> 强力驱动. <a href="http://beian.miit.gov.cn/" target="_blank">粤ICP备20016927号-1</a> 
            </p>
            <p>
                <span>Made </span><span>by Vector.</span>
            </p>
        </div>
    </div>
    </div>
</template>

<script >
    

    export default ({
        data() {
            return {
                longTime:'',
            }
        },
        methods: {
            runTime:function(){//运行倒计时
                var that = this;
                var oldTime =new Date('2020/02/29 00:00:00');
                var timer = setInterval(function(){
                    var nowTime = new Date();
                    var longTime = nowTime - oldTime;
                    var days = parseInt(longTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
                      var hours = parseInt(longTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
                      var minutes = parseInt(longTime / 1000 / 60 % 60, 10);//计算剩余的分钟
                      var seconds = parseInt(longTime / 1000 % 60, 10);//计算剩余的秒数
                      that.longTime = days+"天" + hours+"小时" + minutes+"分"+seconds+"秒";
                },1000)
            }
        },
        created(){
            this.runTime()
        }
    })
</script>

<style scoped>
.footBack{
    color:#888;
    margin-top: -10px;
    font-size: 12px;
    line-height: 1.5;
    text-align: center;
    width:100%;
    min-height: 50px;
    margin-top:-25px;
    /*position: relative;*/
    position: absolute;
    /*min-height: 368px;*/
}
.footBack .fcontainer{
    width:100%;
    background: #232323;
    /*top:294px;*/
    /*left:0;*/
    /*position: absolute;*/
    padding:15px 10px 10px 10px;
    box-sizing: border-box;
    /*z-index: 1;*/
    width: 100%!important;
}
.footBack .footer-img{
    height:368px;
    z-index: 1;
    position: relative;
    width:100%;
    bottom:-74px;
    pointer-events:none;
}
.footBackHui{
    /*min-height: 50px;*/
    margin-top: -50px;
    z-index: -1;
}
.footBackHui .footer-img{
    position: relative;
    width:100%;
    bottom:0;
    width:100%;
    height:auto;
    bottom:-10px;
    /*z-index: 0;*/
}
.footBackHui .footer-img img{
    width:100%;
    height:auto;
    margin:0;

}

.footBack p{
    margin:5px 0;
    z-index: 3;
}
.footBack a{
    color:#795548;
    z-index: 3;
}
.footBack a:hover{
    color:#000;
}

/*时间跳动*/
.timeJump{
    animation:my-face 5s infinite ease-in-out;
    -webkit-animation:my-face 5s infinite ease-in-out;
    display:inline-block;
	margin:0 5px;
}
@-webkit-keyframes my-face {
	2% {
	-webkit-transform:translate(0,1.5px) rotate(1.5deg);
	-moz-transform:translate(0,1.5px) rotate(1.5deg);
	-ms-transform:translate(0,1.5px) rotate(1.5deg);
	-o-transform:translate(0,1.5px) rotate(1.5deg);
	transform:translate(0,1.5px) rotate(1.5deg)
}
4% {
	-webkit-transform:translate(0,-1.5px) rotate(-.5deg);
	-moz-transform:translate(0,-1.5px) rotate(-.5deg);
	-ms-transform:translate(0,-1.5px) rotate(-.5deg);
	-o-transform:translate(0,-1.5px) rotate(-.5deg);
	transform:translate(0,-1.5px) rotate(-.5deg)
}
6% {
	-webkit-transform:translate(0,1.5px) rotate(-1.5deg);
	-moz-transform:translate(0,1.5px) rotate(-1.5deg);
	-ms-transform:translate(0,1.5px) rotate(-1.5deg);
	-o-transform:translate(0,1.5px) rotate(-1.5deg);
	transform:translate(0,1.5px) rotate(-1.5deg)
}
8% {
	-webkit-transform:translate(0,-1.5px) rotate(-1.5deg);
	-moz-transform:translate(0,-1.5px) rotate(-1.5deg);
	-ms-transform:translate(0,-1.5px) rotate(-1.5deg);
	-o-transform:translate(0,-1.5px) rotate(-1.5deg);
	transform:translate(0,-1.5px) rotate(-1.5deg)
}
10% {
	-webkit-transform:translate(0,2.5px) rotate(1.5deg);
	-moz-transform:translate(0,2.5px) rotate(1.5deg);
	-ms-transform:translate(0,2.5px) rotate(1.5deg);
	-o-transform:translate(0,2.5px) rotate(1.5deg);
	transform:translate(0,2.5px) rotate(1.5deg)
}
12% {
	-webkit-transform:translate(0,-.5px) rotate(1.5deg);
	-moz-transform:translate(0,-.5px) rotate(1.5deg);
	-ms-transform:translate(0,-.5px) rotate(1.5deg);
	-o-transform:translate(0,-.5px) rotate(1.5deg);
	transform:translate(0,-.5px) rotate(1.5deg)
}
14% {
	-webkit-transform:translate(0,-1.5px) rotate(1.5deg);
	-moz-transform:translate(0,-1.5px) rotate(1.5deg);
	-ms-transform:translate(0,-1.5px) rotate(1.5deg);
	-o-transform:translate(0,-1.5px) rotate(1.5deg);
	transform:translate(0,-1.5px) rotate(1.5deg)
}
16% {
	-webkit-transform:translate(0,-.5px) rotate(-1.5deg);
	-moz-transform:translate(0,-.5px) rotate(-1.5deg);
	-ms-transform:translate(0,-.5px) rotate(-1.5deg);
	-o-transform:translate(0,-.5px) rotate(-1.5deg);
	transform:translate(0,-.5px) rotate(-1.5deg)
}
18% {
	-webkit-transform:translate(0,.5px) rotate(-1.5deg);
	-moz-transform:translate(0,.5px) rotate(-1.5deg);
	-ms-transform:translate(0,.5px) rotate(-1.5deg);
	-o-transform:translate(0,.5px) rotate(-1.5deg);
	transform:translate(0,.5px) rotate(-1.5deg)
}
20% {
	-webkit-transform:translate(0,-1.5px) rotate(2.5deg);
	-moz-transform:translate(0,-1.5px) rotate(2.5deg);
	-ms-transform:translate(0,-1.5px) rotate(2.5deg);
	-o-transform:translate(0,-1.5px) rotate(2.5deg);
	transform:translate(0,-1.5px) rotate(2.5deg)
}
22% {
	-webkit-transform:translate(0,.5px) rotate(-1.5deg);
	-moz-transform:translate(0,.5px) rotate(-1.5deg);
	-ms-transform:translate(0,.5px) rotate(-1.5deg);
	-o-transform:translate(0,.5px) rotate(-1.5deg);
	transform:translate(0,.5px) rotate(-1.5deg)
}
24% {
	-webkit-transform:translate(0,1.5px) rotate(1.5deg);
	-moz-transform:translate(0,1.5px) rotate(1.5deg);
	-ms-transform:translate(0,1.5px) rotate(1.5deg);
	-o-transform:translate(0,1.5px) rotate(1.5deg);
	transform:translate(0,1.5px) rotate(1.5deg)
}
26% {
	-webkit-transform:translate(0,.5px) rotate(.5deg);
	-moz-transform:translate(0,.5px) rotate(.5deg);
	-ms-transform:translate(0,.5px) rotate(.5deg);
	-o-transform:translate(0,.5px) rotate(.5deg);
	transform:translate(0,.5px) rotate(.5deg)
}
28% {
	-webkit-transform:translate(0,.5px) rotate(1.5deg);
	-moz-transform:translate(0,.5px) rotate(1.5deg);
	-ms-transform:translate(0,.5px) rotate(1.5deg);
	-o-transform:translate(0,.5px) rotate(1.5deg);
	transform:translate(0,.5px) rotate(1.5deg)
}
30% {
	-webkit-transform:translate(0,-.5px) rotate(2.5deg);
	-moz-transform:translate(0,-.5px) rotate(2.5deg);
	-ms-transform:translate(0,-.5px) rotate(2.5deg);
	-o-transform:translate(0,-.5px) rotate(2.5deg);
	transform:translate(0,-.5px) rotate(2.5deg)
}
32% {
	-webkit-transform:translate(0,1.5px) rotate(-.5deg);
	-moz-transform:translate(0,1.5px) rotate(-.5deg);
	-ms-transform:translate(0,1.5px) rotate(-.5deg);
	-o-transform:translate(0,1.5px) rotate(-.5deg);
	transform:translate(0,1.5px) rotate(-.5deg)
}
34% {
	-webkit-transform:translate(0,1.5px) rotate(-.5deg);
	-moz-transform:translate(0,1.5px) rotate(-.5deg);
	-ms-transform:translate(0,1.5px) rotate(-.5deg);
	-o-transform:translate(0,1.5px) rotate(-.5deg);
	transform:translate(0,1.5px) rotate(-.5deg)
}
36% {
	-webkit-transform:translate(0,-1.5px) rotate(2.5deg);
	-moz-transform:translate(0,-1.5px) rotate(2.5deg);
	-ms-transform:translate(0,-1.5px) rotate(2.5deg);
	-o-transform:translate(0,-1.5px) rotate(2.5deg);
	transform:translate(0,-1.5px) rotate(2.5deg)
}
38% {
	-webkit-transform:translate(0,1.5px) rotate(-1.5deg);
	-moz-transform:translate(0,1.5px) rotate(-1.5deg);
	-ms-transform:translate(0,1.5px) rotate(-1.5deg);
	-o-transform:translate(0,1.5px) rotate(-1.5deg);
	transform:translate(0,1.5px) rotate(-1.5deg)
}
40% {
	-webkit-transform:translate(0,-.5px) rotate(2.5deg);
	-moz-transform:translate(0,-.5px) rotate(2.5deg);
	-ms-transform:translate(0,-.5px) rotate(2.5deg);
	-o-transform:translate(0,-.5px) rotate(2.5deg);
	transform:translate(0,-.5px) rotate(2.5deg)
}
42% {
	-webkit-transform:translate(0,2.5px) rotate(-1.5deg);
	-moz-transform:translate(0,2.5px) rotate(-1.5deg);
	-ms-transform:translate(0,2.5px) rotate(-1.5deg);
	-o-transform:translate(0,2.5px) rotate(-1.5deg);
	transform:translate(0,2.5px) rotate(-1.5deg)
}
44% {
	-webkit-transform:translate(0,1.5px) rotate(.5deg);
	-moz-transform:translate(0,1.5px) rotate(.5deg);
	-ms-transform:translate(0,1.5px) rotate(.5deg);
	-o-transform:translate(0,1.5px) rotate(.5deg);
	transform:translate(0,1.5px) rotate(.5deg)
}
46% {
	-webkit-transform:translate(0,-1.5px) rotate(2.5deg);
	-moz-transform:translate(0,-1.5px) rotate(2.5deg);
	-ms-transform:translate(0,-1.5px) rotate(2.5deg);
	-o-transform:translate(0,-1.5px) rotate(2.5deg);
	transform:translate(0,-1.5px) rotate(2.5deg)
}
48% {
	-webkit-transform:translate(0,-.5px) rotate(.5deg);
	-moz-transform:translate(0,-.5px) rotate(.5deg);
	-ms-transform:translate(0,-.5px) rotate(.5deg);
	-o-transform:translate(0,-.5px) rotate(.5deg);
	transform:translate(0,-.5px) rotate(.5deg)
}
50% {
	-webkit-transform:translate(0,.5px) rotate(.5deg);
	-moz-transform:translate(0,.5px) rotate(.5deg);
	-ms-transform:translate(0,.5px) rotate(.5deg);
	-o-transform:translate(0,.5px) rotate(.5deg);
	transform:translate(0,.5px) rotate(.5deg)
}
52% {
	-webkit-transform:translate(0,2.5px) rotate(2.5deg);
	-moz-transform:translate(0,2.5px) rotate(2.5deg);
	-ms-transform:translate(0,2.5px) rotate(2.5deg);
	-o-transform:translate(0,2.5px) rotate(2.5deg);
	transform:translate(0,2.5px) rotate(2.5deg)
}
54% {
	-webkit-transform:translate(0,-1.5px) rotate(1.5deg);
	-moz-transform:translate(0,-1.5px) rotate(1.5deg);
	-ms-transform:translate(0,-1.5px) rotate(1.5deg);
	-o-transform:translate(0,-1.5px) rotate(1.5deg);
	transform:translate(0,-1.5px) rotate(1.5deg)
}
56% {
	-webkit-transform:translate(0,2.5px) rotate(2.5deg);
	-moz-transform:translate(0,2.5px) rotate(2.5deg);
	-ms-transform:translate(0,2.5px) rotate(2.5deg);
	-o-transform:translate(0,2.5px) rotate(2.5deg);
	transform:translate(0,2.5px) rotate(2.5deg)
}
58% {
	-webkit-transform:translate(0,.5px) rotate(2.5deg);
	-moz-transform:translate(0,.5px) rotate(2.5deg);
	-ms-transform:translate(0,.5px) rotate(2.5deg);
	-o-transform:translate(0,.5px) rotate(2.5deg);
	transform:translate(0,.5px) rotate(2.5deg)
}
60% {
	-webkit-transform:translate(0,2.5px) rotate(2.5deg);
	-moz-transform:translate(0,2.5px) rotate(2.5deg);
	-ms-transform:translate(0,2.5px) rotate(2.5deg);
	-o-transform:translate(0,2.5px) rotate(2.5deg);
	transform:translate(0,2.5px) rotate(2.5deg)
}
62% {
	-webkit-transform:translate(0,-.5px) rotate(2.5deg);
	-moz-transform:translate(0,-.5px) rotate(2.5deg);
	-ms-transform:translate(0,-.5px) rotate(2.5deg);
	-o-transform:translate(0,-.5px) rotate(2.5deg);
	transform:translate(0,-.5px) rotate(2.5deg)
}
64% {
	-webkit-transform:translate(0,-.5px) rotate(1.5deg);
	-moz-transform:translate(0,-.5px) rotate(1.5deg);
	-ms-transform:translate(0,-.5px) rotate(1.5deg);
	-o-transform:translate(0,-.5px) rotate(1.5deg);
	transform:translate(0,-.5px) rotate(1.5deg)
}
66% {
	-webkit-transform:translate(0,1.5px) rotate(-.5deg);
	-moz-transform:translate(0,1.5px) rotate(-.5deg);
	-ms-transform:translate(0,1.5px) rotate(-.5deg);
	-o-transform:translate(0,1.5px) rotate(-.5deg);
	transform:translate(0,1.5px) rotate(-.5deg)
}
68% {
	-webkit-transform:translate(0,-1.5px) rotate(-.5deg);
	-moz-transform:translate(0,-1.5px) rotate(-.5deg);
	-ms-transform:translate(0,-1.5px) rotate(-.5deg);
	-o-transform:translate(0,-1.5px) rotate(-.5deg);
	transform:translate(0,-1.5px) rotate(-.5deg)
}
70% {
	-webkit-transform:translate(0,1.5px) rotate(.5deg);
	-moz-transform:translate(0,1.5px) rotate(.5deg);
	-ms-transform:translate(0,1.5px) rotate(.5deg);
	-o-transform:translate(0,1.5px) rotate(.5deg);
	transform:translate(0,1.5px) rotate(.5deg)
}
72% {
	-webkit-transform:translate(0,2.5px) rotate(1.5deg);
	-moz-transform:translate(0,2.5px) rotate(1.5deg);
	-ms-transform:translate(0,2.5px) rotate(1.5deg);
	-o-transform:translate(0,2.5px) rotate(1.5deg);
	transform:translate(0,2.5px) rotate(1.5deg)
}
74% {
	-webkit-transform:translate(0,-.5px) rotate(.5deg);
	-moz-transform:translate(0,-.5px) rotate(.5deg);
	-ms-transform:translate(0,-.5px) rotate(.5deg);
	-o-transform:translate(0,-.5px) rotate(.5deg);
	transform:translate(0,-.5px) rotate(.5deg)
}
76% {
	-webkit-transform:translate(0,-.5px) rotate(2.5deg);
	-moz-transform:translate(0,-.5px) rotate(2.5deg);
	-ms-transform:translate(0,-.5px) rotate(2.5deg);
	-o-transform:translate(0,-.5px) rotate(2.5deg);
	transform:translate(0,-.5px) rotate(2.5deg)
}
78% {
	-webkit-transform:translate(0,-.5px) rotate(1.5deg);
	-moz-transform:translate(0,-.5px) rotate(1.5deg);
	-ms-transform:translate(0,-.5px) rotate(1.5deg);
	-o-transform:translate(0,-.5px) rotate(1.5deg);
	transform:translate(0,-.5px) rotate(1.5deg)
}
80% {
	-webkit-transform:translate(0,1.5px) rotate(1.5deg);
	-moz-transform:translate(0,1.5px) rotate(1.5deg);
	-ms-transform:translate(0,1.5px) rotate(1.5deg);
	-o-transform:translate(0,1.5px) rotate(1.5deg);
	transform:translate(0,1.5px) rotate(1.5deg)
}
82% {
	-webkit-transform:translate(0,-.5px) rotate(.5deg);
	-moz-transform:translate(0,-.5px) rotate(.5deg);
	-ms-transform:translate(0,-.5px) rotate(.5deg);
	-o-transform:translate(0,-.5px) rotate(.5deg);
	transform:translate(0,-.5px) rotate(.5deg)
}
84% {
	-webkit-transform:translate(0,1.5px) rotate(2.5deg);
	-moz-transform:translate(0,1.5px) rotate(2.5deg);
	-ms-transform:translate(0,1.5px) rotate(2.5deg);
	-o-transform:translate(0,1.5px) rotate(2.5deg);
	transform:translate(0,1.5px) rotate(2.5deg)
}
86% {
	-webkit-transform:translate(0,-1.5px) rotate(-1.5deg);
	-moz-transform:translate(0,-1.5px) rotate(-1.5deg);
	-ms-transform:translate(0,-1.5px) rotate(-1.5deg);
	-o-transform:translate(0,-1.5px) rotate(-1.5deg);
	transform:translate(0,-1.5px) rotate(-1.5deg)
}
88% {
	-webkit-transform:translate(0,-.5px) rotate(2.5deg);
	-moz-transform:translate(0,-.5px) rotate(2.5deg);
	-ms-transform:translate(0,-.5px) rotate(2.5deg);
	-o-transform:translate(0,-.5px) rotate(2.5deg);
	transform:translate(0,-.5px) rotate(2.5deg)
}
90% {
	-webkit-transform:translate(0,2.5px) rotate(-.5deg);
	-moz-transform:translate(0,2.5px) rotate(-.5deg);
	-ms-transform:translate(0,2.5px) rotate(-.5deg);
	-o-transform:translate(0,2.5px) rotate(-.5deg);
	transform:translate(0,2.5px) rotate(-.5deg)
}
92% {
	-webkit-transform:translate(0,.5px) rotate(-.5deg);
	-moz-transform:translate(0,.5px) rotate(-.5deg);
	-ms-transform:translate(0,.5px) rotate(-.5deg);
	-o-transform:translate(0,.5px) rotate(-.5deg);
	transform:translate(0,.5px) rotate(-.5deg)
}
94% {
	-webkit-transform:translate(0,2.5px) rotate(.5deg);
	-moz-transform:translate(0,2.5px) rotate(.5deg);
	-ms-transform:translate(0,2.5px) rotate(.5deg);
	-o-transform:translate(0,2.5px) rotate(.5deg);
	transform:translate(0,2.5px) rotate(.5deg)
}
96% {
	-webkit-transform:translate(0,-.5px) rotate(1.5deg);
	-moz-transform:translate(0,-.5px) rotate(1.5deg);
	-ms-transform:translate(0,-.5px) rotate(1.5deg);
	-o-transform:translate(0,-.5px) rotate(1.5deg);
	transform:translate(0,-.5px) rotate(1.5deg)
}
98% {
	-webkit-transform:translate(0,-1.5px) rotate(-.5deg);
	-moz-transform:translate(0,-1.5px) rotate(-.5deg);
	-ms-transform:translate(0,-1.5px) rotate(-.5deg);
	-o-transform:translate(0,-1.5px) rotate(-.5deg);
	transform:translate(0,-1.5px) rotate(-.5deg)
}
    0%,100% {
    	-webkit-transform:translate(0,0) rotate(0);
    	-moz-transform:translate(0,0) rotate(0);
    	-ms-transform:translate(0,0) rotate(0);
    	-o-transform:translate(0,0) rotate(0);
    	transform:translate(0,0) rotate(0)
    }
}
</style>