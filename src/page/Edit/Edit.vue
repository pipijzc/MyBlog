<template>
  <div>
    <el-breadcrumb separator="/" class="nav">
  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/edit' }">文章操作</el-breadcrumb-item>
  <el-breadcrumb-item :to="{ path: '/edit/replay' }">留言和友链</el-breadcrumb-item>
  <el-breadcrumb-item >待定</el-breadcrumb-item>
</el-breadcrumb>
    <el-row :gutter="20">
      <el-col :span="10">
        <!-- 富文本编辑器 -->
        <!-- 标题 -->
        <el-input
          class="inputTitle"
          type="text"
          placeholder="写标题啦"
          v-model="contents.title"
          maxlength="30"
          show-word-limit
        ></el-input>
        <!-- 作者 -->
        <el-input
          class="inputAuthor"
          type="text"
          placeholder="作者"
          v-model="contents.author"
          maxlength="5"
          show-word-limit
        ></el-input>
        <!-- 时间 -->
        <el-input class="inputTime" type="text" placeholder="时间" v-model="contents.date"></el-input>
        <!-- 简介 -->
        <!-- <el-input class="inputintroduct" type="text" placeholder="简介" v-model="contents.author"></el-input> -->
        <quill-editor
          v-model="contents.introduct"
          ref="myQuillEditor"
          :options="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @change="onEditorChange($event)"
        ></quill-editor>

        <div class="edit_container ql-editor">
          <quill-editor
            v-model="contents.content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onEditorChange($event)"
          ></quill-editor>
         
        </div>
         <!-- 保存按钮 -->
          <el-button type="primary" style="margin-top:30px; cursor: pointer" @click="saveHtml">保存</el-button>
          <!-- 选择器 -->
          <el-select v-model="value" placeholder="请选择分类">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
           <el-select v-model="values" placeholder="是否显示阅读原文">
            <el-option
              v-for="item in isShowMoreOptions"
              :key="item.values"
              :label="item.label"
              :value="item.values"
            ></el-option>
          </el-select>
          <!-- 清空按钮 -->
          <el-button
            type="danger"
            style="float:right; margin-top:30px;   cursor: pointer"
            @click="deleteVisible = true"
          >清空</el-button>
        <el-card shadow="hover" class="box-card" v-for="(article,index) in articles" :key="index">
          <!-- 编辑和删除 -->
          <div slot="header" class="clearfix">
            <span style=" font-weight: 700">标题: {{article.title}}</span>
          </div>
          <div>
            <el-button
              style=" margin-left: 10px;  padding: 3px"
              type="danger"
              @click="openDeleDialog(article._id)"
              icon="el-icon-delete"
            >删除</el-button>
            <el-button
              style="float: right; margin-left: 10px;  padding: 3px"
              type="success"
              @click="editArticle(article._id)"
              icon="el-icon-edit"
            >编辑</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <!-- 展示区域 -->
        <el-card
          class="editShowBox"
          v-if="contents.title || contents.content || contents.introduct"
        >
          <div class="ql-snow ql-container">
            <div class="ql-editor">
              <div v-html="contents.title" class="titelbox"></div>
              <div class="authorInfo">
                <span>作者:{{contents.author}}</span>
                <span>时间:{{contents.date}}</span>
              </div>
              <div v-html="contents.introduct"></div>
              <code class="hljs" v-html="contents.content"></code>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 删除提示对话框 -->
    <el-dialog title="删除提示" :visible.sync="deleteVisible" width="50%">
      <span>确认要{{deleteId? '删除吗?': '清空吗？'}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteVisible = false">取 消</el-button>
        <el-button type="primary" @click="cleanHtml(deleteId)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { Quill } from "vue-quill-editor";
import { quillEditor } from "vue-quill-editor";
// import hljs from 'highlight.js'


import { container, ImageExtend, QuillWatch } from "quill-image-extend-module";
Quill.register("modules/ImageExtend", ImageExtend);
import { mapState } from "vuex";

import {
  uploadContent,
  adminReadData,
  deleData,
  editData,
  modifyData
} from "../../ajax/ajax";

export default {
  data() {
    return {
      // 双向绑定文章数据对象
      contents: {
        content: ``,
        title: "",
        author: "",
        date: "",
        introduct: ""
      },
      // 选择器
      options: [
        {
          value: "bug",
          label: "笔记/bug"
        },
        {
          value: "note",
          label: "笔记/杂项"
        },
        {
          value: "js",
          label: "笔记/js笔记"
        },
        {
          value: "daily",
          label: "生活随笔"
        },
        {
          value: "example",
          label: "小案例"
        },
        {
          value: "think",
          label: "一些想法"
        }
      ],
      isShowMoreOptions:[{
        values:'',
        label:'是'
      },{
        values:'no',
        label:'否'
      }],
      // 选中的值
      value: "",
      values:'',
      // 获取的文章数据数组
      articles: [],
      // 判断处于删除还是添加操作
      isEdit: false,
      // 编辑的数据id
      editId: "",
      // 删除的数据id
      deleteId: "",
      // 删除对话框的显示和隐藏
      deleteVisible: false,
      // 富文本框参数设置
      editorOption: {
        modules: {
          ImageExtend: {
            loading: true,
            name: "jpg",
            action: "http://vectorjzc.top/uploadpic",
            response: res => {
              return res.content;
            }
          },
          toolbar: {
            container: container,
            handlers: {
              image: function() {
                QuillWatch.emit(this.quill.id);
              },
      
            }
          },
          syntax: {
          highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    ...mapState(["userinfo"])
  },
  // components: {
  //   // 注册编辑器组件
  //   quillEditor
  // },
  mounted() {
    this.findArticle();
  },
  methods: {
    onEditorReady(editor) {
      // 准备编辑器
    },
    onEditorBlur() {}, // 失去焦点事件
    onEditorFocus() {}, // 获得焦点事件
    onEditorChange() {}, // 内容改变事件

    // 变更文章信息
    saveHtml: async function(event) {
      // 先判断是编辑状态还是添加状态
      if (this.isEdit) {
        const result = await modifyData(this.contents, this.editId, this.value,this.values);
        if (result.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          // 更新右侧数据
          this.findArticle();
          // 重置输入框
          this.contents.content = "";
          this.contents.title = "";
          this.contents.author = "";
          this.contents.date = "";
          this.contents.introduct = "";
          this.value = "";
          this.values = ''
        } else {
          this.$message({
            message: "修改失败",
            type: "warning"
          });
        }
        // 重置判断是否为编辑的状态
        this.isEdit = false;
      } else {
        const result = await uploadContent(this.contents, this.value,this.values);
        if (result.code == 200) {
          this.$message({
            message: "添加成功",
            type: "success"
          });
          this.contents.content = "";
          this.contents.title = "";
          this.$router.go(0);
        } else {
          this.$message({
            message: "添加失败",
            type: "warning"
          });
        }
      }
    },
    // 查询文章
    async findArticle() {
      // 读取文章数据
      const result = await adminReadData();

      if (result) {
        this.articles = result;
      } else {
        this.$message({
          message: "获取失败((‵□′)) ",
          type: "danger"
        });
      }
    },
    // 点击删除按钮打开对话框
    openDeleDialog(id) {
      this.deleteId = id;
      this.deleteVisible = true;
    },
    // 编辑
    async editArticle(id) {
      // 发送请求
      const result = await editData(id);
      // 成功啦
      // 获取主要数据
      this.contents.title = result.title;
      this.contents.content = result.str;
      this.contents.author = result.author;
      this.contents.date = result.date;
      this.contents.introduct = result.introduct;
      // 获取分类
      this.value = result.category;
      this.values = result.showDetail
      // 变更为编辑状态，为提交做准备
      this.isEdit = true;
      // 把这篇文章的id值赋一个变量，当编辑完成提交时发给服务器端，从而在数据库中查到这篇文章
      this.editId = id;
    },
    // 弹出清空对话框
    async cleanHtml(id) {
      // 判断是清空对话框还是删除
      if (id) {
        const result = await deleData(id);
        if (result.code == 200) {
          this.$message({
            message: "删除成功",
            type: "success"
          });
          this.findArticle();
          // 清空点击需要删除的那条数据的id
          this.deleteId = "";
        }
      } else {
        this.contents.content = "";
        this.contents.title = "";
        this.contents.author = "";
        this.contents.date = "";
        this.contents.introduct = "";
      }
      this.deleteVisible = false;
    }
  }
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}

.edit_container {
  width: 100%;
  height: 50% !important;
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 0 !important;
}

.inputTitle {
  width: 65% !important;
}
.inputAuthor {
  width: 18% !important;
}
.inputTime {
  width: 17% !important;
}
.editShowBox {
  width: 100%;
}
.authorInfo {
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 16px;
}
.authorInfo > span {
  margin-left: 10px;
}
.el-col {
  margin-left: 60px;
  margin-top: 34px;
}
.titelbox {
  font-size: 20px;
  text-align: center;
  font-weight: 700;
}

img {
  display: block;
  width: 95%;
  height: 500px;
  border-radius: 20px;
  margin: 0 auto;
  box-shadow: 2px -1px 8px rgba(0, 0, 0, 0.2);
}
.el-select {
  margin-left: 28% !important;
}
.nav{
      margin-top: 92px;
    margin-left: 63px;
}
.ql-editor{
height: 500px!important;
}
.ql-container{
height: 500px!important; 
}
</style>