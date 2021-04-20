<template>
  <el-row>
    <!-- 顶部工具栏 -->
    <el-col :span="24"> </el-col>
    <!-- 中间内容部分 -->
    <el-col :span="24">
      <!-- 内容 容器 -->
      <el-row>
        <el-col :span="24">
          <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
            stripe
            border
            element-loading-text="拼命加载中....."
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0,0.8)"
          >
            <el-table-column fixed prop="name" label="岗位名称">
            </el-table-column>
            <el-table-column prop="code" label="岗位代码"> </el-table-column>
            <el-table-column prop="isDel" label="岗位状态"> </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-popover
                  @after-leave="hhh"
                  placement="left"
                  width="1300"
                  trigger="click"
                >
                  <el-table :data="getIndexDate">
                    <el-table-column prop="createTime" label="入职时间">
                    </el-table-column>
                    <el-table-column prop="name" label="姓名">
                    </el-table-column>
                    <el-table-column prop="passwords" label="密码">
                    </el-table-column>
                    <el-table-column prop="addressd" label="地址">
                    </el-table-column>
                    <el-table-column prop="nativePlace" label="故乡">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱">
                    </el-table-column>
                    <el-table-column prop="tel" label="电话"> </el-table-column>
                    <el-table-column prop="statusd" label="状态">
                    </el-table-column>
                  </el-table>
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[5, 10, 20, 25, 30]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    background
                  >
                  </el-pagination>
                  <el-button
                    @click="handleClick(scope.row, 1)"
                    type="text"
                    size="small"
                    slot="reference"
                    >查看-</el-button
                  >
                </el-popover>
                <el-button
                  type="text"
                  size="small"
                  @click="handleClick(scope.row, 2)"
                  >-编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-col>
    <!-- 编辑弹出框 -->
    <el-col>
      <el-drawer
        title="编辑"
        :before-close="isclose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="名称" :label-width="formLabelWidth">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="岗位代码" :label-width="formLabelWidth">
              <el-input v-model="form.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div class="demo-drawer__footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="$refs.drawer.closeDrawer()"
              :loading="load"
              >{{ loading ? "提交中 ..." : "确 定" }}</el-button
            >
          </div>
        </div>
      </el-drawer>
    </el-col>
  </el-row>
</template>
<script>
import { request, requestall } from "../../network/request.js";
import url from "../../api";
export default {
  data() {
    return {
      tableData: [], //表格数据
      getIndexDate: [], //编辑时获取当前行数据
      loading: false,
      total: 0,
      currentPage4: 1,
      pageSize: 5,
      JobId: 0,
      dialog: false,
      load: false,
      formLabelWidth: "80px",
      form: {
        name: "",
        code: "",
      },
    };
  },
  created: function () {
    this.login();
  },
  methods: {
    login() {
      request({
        url: url.GetJobInfo,
      }).then((res) => {
        this.tableData = res.data;
        for (var i = 0; i < this.tableData.length; i++) {
          this.tableData[i].isDel == 0
            ? (this.tableData[i].isDel = "正常")
            : (this.tableData[i].isDel = "");
        }
      });
    },
    hhh() {
      this.currentPage4 = 1;
      this.pageSize = 5;
    },
    handleClick(row, index) {
      switch (index) {
        case 1:
          this.JobId = row.id;
          this.respon();
          break;
        case 2:
          this.$message({
              message: "功能稍后开放",
              type: "success",
            });
            return;
          this.dialog = true;
          break;
      }
    },
    isclose() {
      this.dialog = false;
    },
    cancelForm() {
      this.load = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.respon();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.respon();
    },
    respon() {
      request({
        url: url.GetStarffInfoById,
        params: {
          JobId: this.JobId,
          pageInfo: this.currentPage4,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.getIndexDate = res.data.temp[0];
        this.total = res.data.total;
        for (var i = 0; i < res.data.temp[0].length; i++) {
          this.getIndexDate[i].createTime = this.ChangeDateFormat(
            this.getIndexDate[i].createTime
          );
        }
      });
    },
    ChangeDateFormat(cellval) {
      if (cellval != null) {
        var d = new Date(cellval);
        var times =
          d.getFullYear() +
          "-" +
          (d.getMonth() + 1) +
          "-" +
          d.getDate() +
          " " +
          d.getHours() +
          ":" +
          d.getMinutes() +
          ":" +
          d.getSeconds();
        return times;
      } else {
        return cellval;
      }
    },
  },
};
</script>