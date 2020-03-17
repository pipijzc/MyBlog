<template>
    <div>
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/home/all">全部</el-menu-item>
        <el-submenu index="1">
          <template slot="title">分类</template>
          <el-menu-item index="/home/bug" @click="ToggleToBug">Bug的解决思路</el-menu-item>
          <el-menu-item index="/home/note" @click="ToggleToNote">杂项</el-menu-item>
          <el-menu-item index="/home/js" @click="ToggleToJs">Js笔记</el-menu-item>
        <el-menu-item index="/home/example"  @click="ToggleToexample">案例</el-menu-item>

        </el-submenu>
        <el-menu-item index="/home/think">一些想法</el-menu-item>
        <el-menu-item index="/edit/999"   @click="openEdit">{{userinfo.data? userinfo.data+'/编辑': '登录/编辑' }}</el-menu-item>
        <el-menu-item index="/home/about">关于</el-menu-item>
        <div class="input">
          <input type="text" v-model="word" placeholder="请输入关键字">
          <el-button round size="mini" class="searchbutton" type="primary" icon="el-icon-search" @click="keySearch">搜索</el-button>
        </div>
      </el-menu>

       <!-- 登录框 -->
    <el-dialog title="登录" :visible.sync="loginVisible" width="50%" @close="closeLoginForm">
      <!-- 登录表单框  -->
      <el-form :model="LoginForm" :rules="Loginrules" ref="LoginFormRef" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="LoginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="LoginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitlogin">确 定</el-button>
      </span>
    </el-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { reqLogin} from "../../ajax/ajax";
import { Search } from '../../ajax/ajax'
export default {
  data() {
    return {
      loginVisible: false,
     
      isInput:false,
      high:'',
      LoginForm: {
        username: "",
        password: ""
      },
     
      Loginrules: {
        username: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            require: true,
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字哈，别乱来哈",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入", trigger: "blur" },
          {
            require: true,
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个((‵□′)) ",
            trigger: "blur"
          }
        ]
      },
      word:''
    }
  },
   computed: {
    ...mapState([ "userinfo","strs"])
    
  },
  watch:{
    strs(){
      this.$nextTick(()=>{
        // 当strs的数据发生变化时，且数据已经渲染到页面时，获取文档的长度
        this.high = document.documentElement.scrollHeight
      
        // console.log(this.high);
      })
      // 判断：当数组长度为0，且处于输入状态时，显示警告
      if (this.strs.length ==0 && this.isInput === true) {
          this.$message({
           message: '暂时找不到这篇文章哦,两秒后返回~',
           type: 'warning',
            customClass:'mzindex'
         })
         var that = this;
         //  把定时器挂载到vue实例对象中
         this.timer = setTimeout(function(){
            // 定时器函数的指向是window全局对象，而不是vue实例，所以需要用that指代
          that.timer = null;
          // 强制刷新当前路由
          that.$router.go(0)
         },2000)   
      } 
    },
    word(){
      if(this.word == '') {
          // 重置输入状态
        this.isInput = false;
        // 返回首页
        this.$router.go(0)
         document.documentElement.scrollTop = 0
      }
    
    }
  },
  methods: {
   async keySearch(){
     if (this.word) {
      //  把输入状态置为true
       this.isInput = true
       this.$store.dispatch('getIsInput',true)
      //  查询数据
      this.$store.dispatch('getSearch',this.word)
      // 把页面往下移动
      document.documentElement.scrollTop = 1400
       }
     },
  
     // 编辑对话框显示内容的判断
    openEdit() {
      
      // 判断皮皮登录了没
      if (this.userinfo.data) {
        // 皮皮登录
        this.$router.push('/edit');
      } else {
        // 皮皮没登录
        // 打开对话框让皮皮去登录
        this.loginVisible = true;
      }
    },
     // 提交用户信息
    async submitlogin() {
      // 预验证
      this.$refs.LoginFormRef.validate(async valid => {
        if (valid) {
          // 发送请求
          const result = await reqLogin(
            this.LoginForm.username,
            this.LoginForm.password
          );
          if (result.code == 200) {
            //  登录成功
            this.$message({
              message: "成功啦o(∩_∩)o ",
              type: "success"
            });
            this.$store.dispatch('isLogin')
            //  路由跳转
            this.$router.push("/edit");
          } 
          else {
            //  登录失败
            this.$message({
              message: "密码错误没得进",
              type: "warning"
            });
          }
          // 关闭对话框
          this.loginVisible = false;
          // 清空表单
          this.resetLoginForm();
        }
      });
    },
    // 清空表单
    resetLoginForm() {
      this.$refs.LoginFormRef.resetFields();
    },
    // 关闭对话框
    closeLoginForm() {
      this.resetLoginForm();
         // 当皮皮因为element-ui的index导航强制进入到编辑页面时，又点了取消，就要判断他有没有登录
          setTimeout(()=>{
        if (!this.userinfo.data) {
        // 没登录就后退 为什么是后退而不是具体路径，这是因为无法确定皮皮在哪个组件点击了登录按钮
        this.$router.go(-1);
      }
     },700)
    },
    // 获取杂项的列表数据
    ToggleToNote(){
      this.$store.dispatch('readData','note')
    },
    // 获取bug的列表数据
     ToggleToBug(){
      this.$store.dispatch('readData','bug')
    },
    // 获取Js数据
    ToggleToJs(){
      this.$store.dispatch('readData','js')
    },
    // 获取案例数据
    ToggleToexample(){
      this.$store.dispatch('readData','example')
    }
  },
};
</script>

<style scoped>
.mzindex{
  z-index: 9999999!important;
}
.el-menu {
  position: fixed;
  z-index: 9;
  width: 100%;
  height: 60px!important;
  line-height: 60px;
  top: 0;
  opacity: 0.8;
  padding-left: 10%;
}
.input{
  float: right;
  margin-right: 22%;
  border: 0;
  outline: 0;
}
.input>input {
  outline: 0;
  border: 1px solid #999;
  height: 20px;
  padding-left: 10px;
  border-radius: 20px;
}
.searchbutton{
  margin-left: 10px;
  background-color: #97e09c;
  border: 0;
}
.searchbutton:hover{
  background-color: #48456d;
}
</style>