<template>
    <div>
      <el-card class="box-card"  shadow="hover">
      <div class="ui label">
        <a>{{newResult.category}}</a>
      </div>
       <span class="s-round-date" v-if="newResult.date">
                <span class="month" v-html="newResult.date.split('-')[1] +'月'"></span>
                <span class="day" v-html="newResult.date.split('-')[2]"></span>
            </span>
      <div class="ql-snow ql-container" style="cursor: default">
        <div class="ql-editor">
          <div v-text="newResult.title" class="titleBox" style="text-align: center"></div>
          <div style="text-align: center" class="authorinfo">
            <i class="el-icon-user-solid"></i>
            <span>作者:{{newResult.author? newResult.author : '不告诉你'}}</span>
            <i class="el-icon-time"></i>
            <span>时间:{{newResult.date? newResult.date:'猴年马月'}}</span>
          </div>
           <code class="hljs maincontent" v-html="newResult.str"></code>
          <!-- <div v-html="newResult.str" class="maincontent"></div> -->
        </div>
      </div>
    </el-card>

    <Scroll :imageSrc="require('../../images/scroll.png')"></Scroll>

    </div>
</template>

<script>

import { getById } from '../../ajax/ajax'
import Scroll from '../../components/Scroll/Scroll'
    export default({
        data() {
            return {
              id:'',
              result:{}
            }
        },
       async mounted(){
            this.id = this.$route.query.id
            const data = await getById(this.id)
            this.result = data[0]
        },
        computed:{
            newResult(){
              const {result} = this;
              // console.log(result);    
                switch(result.category) {
                  case 'note':
                    result.category = '杂项'
                    break;
                    case 'js':
                      result.category = 'Js笔记'
                      break;
                      case 'example':
                        result.category = '案例'
                        break;
                        case 'bug':
                          result.category = 'Bug思路'
                          break;
                }
                return result;
            }
        },
        components:{
          Scroll
        }
    })
</script>

<style scoped>
.box-card {
  position: relative;
  width: 70%;
  margin: 0 auto;
  border-radius: 20px;
  margin-top: 150px;
}
.titleBox {
  font-size: 20px;
  font-weight: 700;
}
.authorinfo {
  margin-top: 20px;
  font-size: 16px;
  margin-bottom: 20px;
}
.authorinfo > span {
  margin-right: 15px;
}
.ql-container.ql-snow {
  border: 0;
}

</style>