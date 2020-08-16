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
      <el-aside width="auto">
        <el-menu
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          v-for="(item , index) in menus"
          :key="index"
          router
        >
          <el-submenu :index="strValue(index + 1)">
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
          <homeRightView />
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
        "el-icon-s-home",
        "el-icon-s-check",
        "el-icon-setting",
        "el-icon-eleme",
      ],
    };
  },
  components: {
    homeTop,
    homeRightView,
  },
  created() {
    this.menuInfo();
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
    strValue(str) {
      return str + "";
    },
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
.el-menu {
  width: 200px;
}
.el-menu--collapse {
  width: 60px !important;
}
</style>
