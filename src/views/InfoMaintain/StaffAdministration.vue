<template>
  <el-row>
    <el-col :span="24">
      <!-- 顶部工具栏 -->
      <el-row>
        <el-col :span="24">
          <el-button type="text" @click="dialogFormVisible = true"
            >员工信息录入</el-button
          >
        </el-col>
      </el-row>
    </el-col>
    <!-- 中间内容部分 -->
    <el-col :span="24">
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        v-loading="loading"
        element-loading-text="拼命加载中....."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0,0.8)"
        >>
        <el-table-column prop="createTime" label="日期"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="addressd" label="地址"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="statusd" label="状态"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-popover placement="right" width="1300" trigger="click">
              <el-table :data="getIndexDate">
                <el-table-column prop="createTime" label="入职时间">
                </el-table-column>
                <el-table-column prop="name" label="姓名"> </el-table-column>
                <el-table-column prop="passwords" label="密码">
                </el-table-column>
                <el-table-column prop="addressd" label="地址">
                </el-table-column>
                <el-table-column prop="nativePlace" label="故乡">
                </el-table-column>
                <el-table-column prop="email" label="邮箱"> </el-table-column>
                <el-table-column prop="tel" label="电话"> </el-table-column>
                <el-table-column prop="statusd" label="状态"> </el-table-column>
              </el-table>
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
        title="编辑"
        :before-close="isclose"
        :visible.sync="dialog"
        direction="rtl"
        custom-class="demo-drawer"
        ref="drawer"
      >
        <div class="demo-drawer__content">
          <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.Name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.Email" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="故乡" :label-width="formLabelWidth">
              <el-input
                v-model="form.NativePlace"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <el-form-item label="现居地址" :label-width="formLabelWidth">
              <el-input v-model="form.Addressd" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="手机号" :label-width="formLabelWidth">
              <el-input v-model="form.Tel" autocomplete="off"></el-input>
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
    <el-col>
      <el-dialog
        title="录入入职人员信息"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        destroy-on-close
      >
        <el-form :model="form" :rules="rules" class="demo-ruleForm" ref="form">
          <el-form-item label="姓名" :label-width="formWidth" prop="Name">
            <el-input v-model="form.Name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formWidth" prop="Sex">
            <el-radio-group v-model="form.Sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="家庭住址" :label-width="formWidth">
            <el-input v-model="form.Addressd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="现居地址" :label-width="formWidth">
            <el-input v-model="form.NativePlace" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="出生日期" :label-width="formWidth">
            <div class="block">
              <el-date-picker
                v-model="form.BirthDay"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="岗位选择" prop="JobId" :label-width="formWidth">
            <el-select v-model="form.JobId" placeholder="请选择岗位">
              <el-option
                :label="values.name"
                :value="values.id"
                v-for="(values, index) in JobInfo"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色选择" prop="RoleId" :label-width="formWidth">
            <el-select v-model="form.RoleId" placeholder="请选择角色">
              <el-option
                :label="values.name"
                :value="values.id"
                v-for="(values, index) in RoleInfo"
                :key="index"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formWidth">
            <el-input v-model="form.Email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="电话" :label-width="formWidth">
            <el-input v-model="form.Tel" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitStarffInfo">确 定</el-button>
        </div>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import { request, requestall } from "../../network/request.js";
import url from "../../api";
export default {
  data() {
    return {
      formWidth: "120px",
      dialogFormVisible: false,
      formLabelWidth: "80px",
      timer: null,
      dialog: false,
      load: false,
      loading: true,
      currentPage4: 1,
      pageSize: 5,
      total: 0,
      tableData: [],
      getIndexDate: [],
      JobInfo: [],
      RoleInfo: [],
      form: {
        Name: "",
        NativePlace: "",
        Id: 0,
        Addressd: "",
        Email: "",
        Tel: "",
        Sex: "",
        BirthDay: "",
        JobId: "",
        RoleId: "",
      },
      rules: {
        Name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        Sex: [{ required: true, message: "请选择性别", trigger: "change" }],
      },
    };
  },
  created: function () {
    this.logIn();
    this.GetJobRoleInfo();
  },
  methods: {
    logIn() {
      this.respon();
    },
    handleClick(row, index) {
      switch (index) {
        case 1:
          this.getIndexDate.length = 0;
          this.getIndexDate.push(row);
          break;
        case 2:
          this.dialog = true;
          this.form.Name = row.name;
          this.form.NativePlace = row.nativePlace;
          this.form.Id = row.id;
          this.form.Addressd = row.addressd;
          this.form.Email = row.email;
          this.form.Tel = row.tel;
          break;
      }
    },
    isclose() {
      this.dialog = false;
    },
    tableRowClassName({ row, rowIndex }) {
      // console.log(row);
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.respon();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.respon();
    },
    cancelForm() {
      this.load = false;
      this.dialog = false;
      clearTimeout(this.timer);
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
    GetJobRoleInfo() {
      request({
        url: url.GetJobRoleInfo,
      })
        .then((res) => {
          this.JobInfo = res.data.job;
          this.RoleInfo = res.data.role;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitStarffInfo() {
      request({
        url: url.addStarffInfo,
        method: "POST",
        data :this.form
      }).then((res) => {
        console.log(res.data);
      });

      // this.dialogFormVisible = false;
    },
    respon() {
      request({
        url: url.GetStarffInfo,
        params: { pageInfo: this.currentPage4, pageSize: this.pageSize },
      })
        .then((res) => {
          this.tableData = res.data.temp[0];
          this.total = res.data.total;
          for (var i = 0; i < this.tableData.length; i++) {
            this.tableData[i].createTime = this.ChangeDateFormat(
              this.tableData[i].createTime
            );
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>