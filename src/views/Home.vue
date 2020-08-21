<template>
  <el-container style="height: calc(100vh);">
    <!-- 头部 -->
    <el-header>
      <homeTop />
      <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>-->
    </el-header>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside width="auto" style="background-color:#333333">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          :unique-opened="true"
          background-color="#333300"
          text-color="#CCCCCC"
          router
        >
          <el-submenu :index="index +''" v-for="(item , index) in menus" :key="index">
            <template slot="title">
              <i :class="IConsInfo[index]"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <el-menu-item
              v-for="(item1) in item.children"
              :key="item1.url"
              :index="item1.url"
              :router="item1.url"
            >{{item1.name}}</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 右侧视图 -->
        <el-main>
          <div class="view_sty">
            <homeRightView />
          </div>
        </el-main>
        <el-footer>底部</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import homeTop from "./layout/homeTop.vue";
import homeRightView from "./layout/homeRightView.vue";
import { request } from "../network/request.js";
import url from "../api";
export default {
  name: "Home",
  data() {
    return {
      isCollapse: false,
      menus: [], //菜单数据
      IConsInfo: [
        //图标
        "el-icon-s-home",
        "el-icon-s-check",
        "el-icon-setting",
        "el-icon-eleme",
      ],
      path: "/HomeIndex",
    };
  },
  components: {
    homeTop,
    homeRightView,
  },
  created() {
    this.menuInfo();
    console.log("第一次加载");
  },
  methods: {
    menuInfo() {
      request({
        url: url.menuActions,
      })
        .then((res) => {
          this.menus = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeCreate() {
    console.log("初始化");
  },
  activated() {
    console.log("活跃");
  },
  deactivated() {
    console.log("不活跃");
  },
  destroyed() {
    console.log("销毁");
  },
  // beforeRouteleave(to, form, next) {
  //   this.path = this.$router.path;
  // },
};
</script>
<style>
.el-menu {
  width: 200px;
  
}
.el-menu--collapse {
  width: 60px !important;
}
.el-main {
  padding: 10px 0px 10px 10px !important;
  margin: 10px 0px 10px 10px !important;
  border: 1px solid #CCCCCC;
  background-color: #CCCCCC;
  border-radius: 10px;
}
.view_sty {
  background-color: #F2F2F2;
  height: 765px;
  overflow:auto;
  border-radius: 10px;
  padding: 20px;
}
</style>
