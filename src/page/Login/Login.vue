<template>
  <div>
    <el-row :gutter="10" type="flex" justify="center" class="loginBox">
      <el-col :span="5" :pull="0">
        <el-card class="loginCard">
          <div style="margin-bottom:10px">用户登录</div>
        <el-form
          :model="LoginForm"
          status-icon
          :rules="Loginrules"
          ref="LoginFormRef"
          label-width="70px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="LoginForm.username" ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="LoginForm.password" ></el-input>
          </el-form-item>
            <el-button type="primary" @click="submitlogin">登录</el-button>
        </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reqLogin} from "../../ajax/ajax";
export default {
  data() {
    return {
      LoginForm: {
        username: "",
        password: ""
      },
      Loginrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            require: true,
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字哈，别乱来哈",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            require: true,
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个((‵□′)) ",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
          // console.log(result);
          
          if (result.code == 200) {
            //  登录成功
            this.$message({
              message: "成功啦o(∩_∩)o ",
              type: "success"
            });
            const token = result.token
            this.$store.dispatch('getTokens',token)
            // this.$store.dispatch('isLogin')
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
          // 清空表单
          this.resetLoginForm();
        }
      });
    },
    // 清空表单
    resetLoginForm() {
      this.$refs.LoginFormRef.resetFields();
    },
  },

};
</script>

<style scoped>
.loginBox {
  margin-top: 300px;
  
}
.loginCard{
  text-align: center;
  border-radius: 10px;
}
</style>