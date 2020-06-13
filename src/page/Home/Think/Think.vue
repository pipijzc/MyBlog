<template>
  <div>
    <waterfall
      
      :gutterWidth="gutterWidth"
      :col="col"
      :data="strs.data"
      class="top"
    >
      <template>
        <el-card
          class="box-card computer computerMargin"
          shadow="hover"
          v-for="(item,index) in strs.data"
          :key="index"
        >
          <div class="ui-mobile label-mobile">
            <a>{{item.date? item.date:'猴年马月'}}</a>
          </div>
          <div class="ql-snow ql-container" style="cursor: default">
            <div class="ql-editor">
              <div v-html="item.str" class="maincontent"></div>
            </div>
          </div>
        </el-card>
      </template>
    </waterfall>

    <el-row>
      <el-col class="mobile" :xs="24" :sm="{span:20,offset:2}" :md="20" :lg="20">
        <el-card class="box-card" shadow="hover" v-for="(item,index) in strs.data" :key="index">
          <div class="ui-mobile label-mobile">
            <a>{{item.date? item.date:'猴年马月'}}</a>
          </div>
          <div class="ql-snow ql-container" style="cursor: default">
            <div class="ql-editor">
              <div v-html="item.str" class="maincontent"></div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script >
import { mapState } from "vuex";

export default {
  data() {
    return {
      itemWidth: 500,
      gutterWidth: 10,
      col: 3
    };
  },
  computed: {
    ...mapState(["strs"])
  },
  mounted() {
    this.$store.state.strs.data = "";
    this.$store.dispatch("readData", "think");
  }
};
</script>

<style scoped>
@media screen and (max-width: 500px) {
  .ui-mobile.label-mobile {
    font-size: 11px !important;
    padding: 7px 11.2px 7px 20px !important;
  }
}

@media screen and (max-width: 1500px) {
  .computer {
    display: none !important;
  }
  .mobile {
    display: block !important;
    /* margin-top: 400px!important; */
  }
}
@media screen and (min-width: 1501px) {
  .computer {
    display: block !important;
  }
  .mobile {
    display: none !important;
    /* margin-top: 400px!important; */
  }
}
.top {
  width: 90%;
  margin-top: 400px;
  padding-left: 10%;
}
.box-card {
  border-radius: 20px;
  margin-top: 20px;
}
.titleBox {
  font-size: 20px;
  font-weight: 700;
}
.computerMargin{
  margin-right: 20px;
}
.ql-container.ql-snow {
  border: 0;
}
.ui-mobile.label-mobile {
  border-color: #97dffd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  background-color: #97dffd;
  margin: 5px 0 15px 2px;
  font-size: 14px;
  position: relative;
  left: -32px;
  top: 10px;
  border-radius: 0 4px 4px 0;
  padding: 7px 11.2px 7px 32px;
  display: inline-block;
  color: #fff;
}
.ui-mobile.label-mobile::after {
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
</style>