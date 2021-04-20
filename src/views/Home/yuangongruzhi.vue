<template>
  <el-row>
    <!-- 顶部工具栏  角色权限-->
    <el-col :span="16">
      <el-button type="primary" round @click="AddJueSheInfo"
        >员工入职申请表</el-button
      >
    </el-col>
    <!-- 工具栏 -->
    <el-col :span="8">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="selectName" placeholder="输入员工姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-divider content-position="right">入职申请信息表</el-divider>
    </el-col>
    <!-- 中间内容部分 -->
    <el-col :span="24">
      <el-table
        :data="
          tableData.filter(
            (birthDay) =>
              !search ||
              birthDay.staffName.toLowerCase().includes(search.toLowerCase())
          )
        "
        border
      >
        <el-table-column label="入职申请信息表" style="text-align: center">
          <el-table-column prop="id" label="编号" width="50"> </el-table-column>
          <el-table-column prop="staffName" label="员工姓名"></el-table-column>
          <el-table-column label="性别" width="50">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                scope.row.sex == 1 ? "男" : "女"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="birthDay" label="出生日期"></el-table-column>

          <el-table-column prop="major" label="专业"></el-table-column>
          <el-table-column prop="tel" label="电话"> </el-table-column>
          <el-table-column prop="email" label="邮箱"></el-table-column>
          <el-table-column prop="idNumber" label="身份证号"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入员工姓名搜索"
              />
              <el-input style="display: none" :value="scope.row" />
            </template>
            <el-table-column label="申请时间" width="180">
              <template slot-scope="scope">
                <span>{{ ChangeDateFormat(scope.row.createTime) }}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="probationarySalary"
              label="试用期薪水"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table-column>
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
            <el-form-item v-if="ischakan" label="编号" :label-width="formLabelWidth">
              <el-input
                disabled
                v-model="form.Id"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.StaffName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth">
              <el-select v-model="form.Sex" placeholder="选择性别">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="出生日期" :label-width="formLabelWidth">
              <el-input v-model="form.BirthDay" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="专业" :label-width="formLabelWidth">
              <el-input v-model="form.Major" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="职位" :label-width="formLabelWidth">
              <el-select v-model="form.JobId" placeholder="请选择职位">
                <el-option v-for="(item,index) in JobData" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电话" :label-width="formLabelWidth">
              <el-input v-model="form.Tel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" :label-width="formLabelWidth">
              <el-input v-model="form.Email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-input v-model="form.IDNumber" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="ischakan" label="申请时间" :label-width="formLabelWidth">
              <el-input disabled v-model="this.createTime" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="试用期薪水" :label-width="formLabelWidth">
              <el-input
                v-model="form.ProbationarySalary"
                autocomplete="off"
              ></el-input>
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
      JobData:[],
      currentPage4: 1,
      pageSize: 5,
      total: 0,
      formLabelWidth: "80px",
      dialog: false,
      loading: false,
      load: false,
      timer: null,
      ischakan: false,
      ischankanValue: "",
      form: {
        //编辑字段
        Id: "",
        StaffName: "",
        Sex: "",
        BirthDay: "",
        Major: "",
        Tel: "",
        Email: "",
        IDNumber: "",
        ProbationarySalary: "",
        JobId:"",
      },
      createTime: "",
      indesx: 0, //判断是否是更新还是添加操作
      search: "",
      selectName: "", //查询字段
    };
  },
  created: function () {
    this.login();
  },
  methods: {
    login() {
      this.respon();
    },
    AddJueSheInfo() {
      this.geshihu(2);
      this.dialog = true;
      this.ischakan = false;
      this.ischankanValue = "增添";
      this.responseJob();
      this.indesx = 2;
    },
    handleClick(row) {
      this.geshihu(1, row);
      this.dialog = true;
      this.ischakan = true;
      this.createTime = row.createTime;
      this.ischankanValue = "编辑";
      this.responseJob();
      this.indesx = 1;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    isclose() {
      this.dialog = false;
    },
    cancelForm() {
      this.load = false;
      this.dialog = false;
      clearTimeout(this.timer);
    },
    // 编辑框的提交按钮事件
    submitStarffInfo() {
      if (this.indesx == "0") {
        console.log("异常");
        return;
      }
      switch (this.indesx) {
        case 1:
          this.responseUpdate();
          this.cancelForm();
          break;
        case 2:
          this.responseAdd();
          this.cancelForm();
          break;
      }
    },
    // 发送编辑请求
    responseUpdate() {
      this.form.Sex = parseInt(this.form.Sex);
      this.form.JobId = parseInt(this.form.JobId);
      request({
        url: url.UpdateEntrysInfoAll,
        data: this.form,
        method: "POST",
      })
        .then((res) => {
          this.login();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 发送添加请求
    responseAdd() {
      this.form.Sex = parseInt(this.form.Sex);
      this.form.JobId = parseInt(this.form.JobId);
      request({
        url: url.AddEntrysInfoAll,
        method: "POST",
        data: this.form,
      })
        .then((res) => {
          this.login();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //查询job数据
    responseJob(){
      request({
        url: url.GetJobInfo,
      })
        .then((res) => {
          this.JobData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 初始化数据
    geshihu(index, row) {
      switch (index) {
        case 1:
          this.form.Id = row.id;
          this.form.StaffName = row.staffName;
          this.form.Sex = row.sex+"";
          this.form.BirthDay = row.birthDay;
          this.form.Major = row.major;
          this.form.Tel = row.tel;
          this.form.Email = row.email;
          this.form.IDNumber = row.idNumber;
          this.createTime = row.createTime;
          this.form.JobId = row.jobId;
          this.form.ProbationarySalary = row.probationarySalary;
          break;
        case 2:
          this.form.Id = 0;
          this.form.StaffName = "";
          this.form.Sex = "";
          this.form.BirthDay = "";
          this.form.Major = "";
          this.form.Tel = "";
          this.form.Email = "";
          this.form.IDNumber = "";
          this.form.JobId ="";
          this.createTime = "";
          this.form.ProbationarySalary = "";
          break;
      }
    },
    respon() {
      request({
        url: url.GetEntrysInfoAll,
        params: { pageInfo: this.currentPage4, pageSize: this.pageSize },
      })
        .then((res) => {
          this.tableData = res.data.temp;
          this.total = res.data.total;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 时间格式化
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
    handleSizeChange(val) {
      this.pageSize = val;
      this.respon();
    },
    handleCurrentChange(val) {
      this.currentPage4 = val;
      this.respon();
    },
    // 查询数据根据姓名
    onSubmit() {
      if (this.selectName == "") {
        return;
      }
      this.$message({
        message: "功能稍后开放",
        type: "success",
      });
      console.log(this.selectName);
    },
  },
};
</script>
<style>
/* 
    table 表头和内容文字居中
 */
.el-table th > .cell {
  /* display: inline-block; */
  box-sizing: border-box;
  position: relative;
  vertical-align: middle;
  padding-left: 10px;
  padding-right: 10px;
  width: 100%;
  text-align: center;
}
.el-table td {
  text-align: center;
}
</style>