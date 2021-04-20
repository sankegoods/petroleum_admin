<template>
  <el-row>
    <!-- 顶部工具栏  角色权限-->
    <el-col :span="24">
      <el-button type="primary" round @click="AddJueSheInfo"
        >增添角色</el-button
      >
      <el-divider content-position="right"></el-divider>
    </el-col>
    <!-- 中间内容部分 -->
    <el-col :span="24">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="code" label="代码"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row, 1)"
              type="text"
              size="small"
              >查看</el-button
            >
            <el-button
              @click="handleClick(scope.row, 2)"
              type="text"
              size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-col>
    <!-- 底部分页 -->
    <el-col>
      <div class="block">
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
      </div>
    </el-col>
    <!-- 编辑弹出框 -->
    <el-col>
      <el-drawer
        :title="ischankanValue"
        :before-close="isclose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="编号" :label-width="formLabelWidth">
              <el-input
                disabled
                v-model="form.Id"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.Name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="代码" :label-width="formLabelWidth">
              <el-input v-model="form.Code" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div
            :class="
              ischakan == true
                ? 'demo-drawer__footer action'
                : 'demo-drawer__footer'
            "
          >
            <el-button @click="cancelForm">取 消</el-button>
            <el-button
              type="primary"
              @click="submitStarffInfo()"
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
import { request } from "../../network/request.js";
import url from "../../api";
export default {
  data() {
    return {
      tableData: [],
      currentPage4: 1,
      pageSize: 5,
      total: 0,
      formLabelWidth: "80px",
      dialog: false,
      loading: false,
      load: false,
      timer: null,
      form: {
        Id: "",
        Name: "",
        Code: "",
      },
      ischakan: false,
      ischankanValue: "",
    };
  },
  created: function () {
    this.logIn();
  },
  methods: {
    logIn() {
      document.title = this.$route.name;
      this.respon();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.respon();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.respon();
    },
    handleClick(row, types) {
      switch (types) {
        case 1:
          this.dialog = true;
          this.ischakan = true;
          this.ischankanValue = "查看";
          this.form.Id = row.id;
          this.form.Name = row.name;
          this.form.Code = row.code;
          break;
        case 2:
          this.dialog = true;
          this.ischakan = false;
          this.ischankanValue = "编辑";
          this.form.Id = row.id;
          this.form.Name = row.name;
          this.form.Code = row.code;
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
    AddJueSheInfo() {
      this.form.Id = "";
      this.form.Name = "";
      this.form.Code = "";
      this.dialog = true;
      this.ischakan = false;
      this.ischankanValue = "增添";
    },
    submitStarffInfo() {
      if (this.ischankanValue == "增添") {
        this.form.Id = 0;
        request({
          url: url.addJueSheInfo,
          method: "POST",
          data: this.form,
        })
          .then((res) => {
            if (res.data) {
              this.dialog = false;
              this.respon();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (
        this.form.Name != "" &&
        this.form.Code != "" &&
        this.ischankanValue != "增添"
      ) {
        request({
          url: url.UpdataRoleInfo,
          data: this.form,
          method: "POST",
        })
          .then((res) => {
            if (res.data) {
              this.dialog = false;
              this.respon();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    respon() {
      request({
        url: url.GetJueseQuanxianAll,
        params: { pageInfo: this.currentPage4, pageSize: this.pageSize },
      })
        .then((res) => {
          this.tableData = res.data.temp[0];
          this.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.action {
  display: none;
}
</style>