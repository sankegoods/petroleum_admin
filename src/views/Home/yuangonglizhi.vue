<template>
  <el-row>
    <!-- 顶部工具栏  角色权限-->
    <el-col :span="18">
      <el-button type="primary" round @click="AddJueSheInfo"
        >员工离职申请表</el-button
      >
    </el-col>
    <!-- 工具栏 -->
    <el-col :span="6">
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
      <el-divider>离职申请信息表</el-divider>
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
        <el-table-column prop="id" label="编号" width="50"> </el-table-column>
        <el-table-column prop="noN" label="信息编号"></el-table-column>
        <el-table-column
          prop="staffName"
          label="员工姓名"
          width="50"
        ></el-table-column>
        <el-table-column prop="jobName" label="职位" width="120">
        </el-table-column>
        <el-table-column label="性别" width="50">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="leaveType" label="离职类型" width="120">
        </el-table-column>
        <el-table-column prop="reason" label="离职理由"> </el-table-column>
        <el-table-column
          prop="explanationHandover"
          label="工作交接说明"
        ></el-table-column>
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
              <span>{{ ChangeDateFormat(scope.row.applyDate) }}</span>
            </template>
          </el-table-column>

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
              <el-input disabled v-model="form.Id" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="form.StaffName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="UpdateNo" label="工号" :label-width="formLabelWidth">
              <el-input v-model="form.Non" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item v-if="issex" label="性别" :label-width="formLabelWidth">
              <el-select v-model="form.Sex" placeholder="选择性别">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
             <el-form-item label="职位" :label-width="formLabelWidth">
                <el-select v-model="form.JobId" placeholder="请选择职位">
                  <el-option v-for="(item,index) in JobInfo" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="离职类型" :label-width="formLabelWidth">
                <el-select v-model="form.LeaveType" placeholder="请选择职位">
                  <el-option label="正常提交离职表" value="1"></el-option>
                  <el-option label="自动离职" value="2"></el-option>
                  <el-option label="被辞退" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="交接人" :label-width="formLabelWidth">
              <el-autocomplete v-model="form.HandoverSatffId" :fetch-suggestions="querySearchAsync"
                placeholder="请输入内容"
                @select="handleSelect"
              ></el-autocomplete>
            </el-form-item>
            <el-form-item  v-if="issex" label="编号信息" :label-width="formLabelWidth">
              <el-input disabled v-model="form.NoN" autocomplete="off"></el-input></el-form-item>
            <el-form-item label="离职理由" :label-width="formLabelWidth">
              <el-input v-model="form.Reason" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="交接说明" :label-width="formLabelWidth">
              <el-input v-model="form.ExplanationHandover" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item  v-if="issex" label="创建时间" :label-width="formLabelWidth">
              <el-input disabled v-model="form.ApplyDate" autocomplete="off"></el-input>
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
      JobInfo:[],
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
      UpdateNo:true,
      form: {
        //编辑字段
        Id: "",
        StaffName: "",
        LeaveType: "",
        Reason: "",
        ExplanationHandover: "",
        HandoverSatffId:"",
        ApplyPersonId: "",
        JobId:"",
        Non:"",
      },
      indesx: 0, //判断是否是更新还是添加操作
      search: "",
      selectName: "", //查询字段
      restaurants: [], //搜索框
      state: '',
      timeout:  null,
      isversion:false,
      issex:false,
    };
  },
  created: function () {
    this.login();
  },
  methods: {
    login() {
      this.respon();
    },
    //添加按钮
    AddJueSheInfo() {
      this.geshihu(2);//数据格式化
      this.dialog = true;
      this.ischakan = false;
      this.ischankanValue = "增添";
      this.geshihu(2); //数据格式化
      this.indesx = 2;// 判断是更新操作还是添加操作
      this.responseStreffInfo();//获取在职人员信息 
      this.responseRoleInfo();//获取岗位信息
      this.isversion = true;
      this.issex = false;
      this.UpdateNo = true;
    },
    handleClick(row) {
      this.geshihu(1, row);
      this.responseRoleInfo();//获取岗位信息
      this.dialog = true;
      this.ischakan = false;
      this.createTime = row.createTime;
      this.ischankanValue = "编辑";
      this.indesx = 1;
      this.isversion = false;
      this.issex = true;
      this.UpdateNo = false;
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
          break;
        case 2:
          this.responseAdd();
          break;
      }
    },
    // 发送编辑请求
    responseUpdate() {
      request({
        url: url.UpdataLeaveOfficesInfoAll,
        data: this.form,
        method: "POST",
      })
        .then((res) => {
          this.login();
          this.cancelForm();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取在职人员名称
    responseStreffInfo(){
      request({
        url: url.GetStarffInfoByName,
      })
        .then((res) => {
          this.loadAll(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取岗位
    responseRoleInfo(){
      request({
        url: url.GetJobInfo,
      })
        .then((res) => {
          this.JobInfo = res.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 发送添加请求
    responseAdd() {
      this.form.Id = 0;
      this.form.JobId = parseInt(this.form.JobId);
      request({
        url: url.AddLeaveOfficesInfoAll,
        method: "POST",
        data: this.form,
      })
        .then((res) => {
          this.login();
          this.cancelForm();
          this.$message({
              message: res.data,
              type: "success",
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 初始化数据
    geshihu(index, row) {
      switch (index) {
        case 1:
          this.responseStreffInfo();
          this.form.Id = row.id;
          this.form.StaffName = row.staffName;
          this.form.Sex = row.sex;
          this.form.NoN = row.noN;
          this.form.LeaveType = row.leaveType;
          this.form.Reason = row.reason;
          this.form.ExplanationHandover = row.explanationHandover;
          this.form.ApplyDate = this.ChangeDateFormat(row.applyDate);
          this.form.ApplyPersonId = row.applyPersonId;
          this.form.HandoverSatffId = row.handoverSatffId;
          this.form.JobId = row.jonId;
          break;
        case 2:
          this.form.Id = "";
          this.form.StaffName = "";
          this.form.LeaveType = "";
          this.form.Reason = "";
          this.form.ExplanationHandover = "";
          this.form.HandoverSatffId = "";
          this.form.JobId  = "";
          this.form.NoN = "";
          break;
      }
    },
    respon() {
      request({
        url: url.GetLeaveOfficesInfoAll,
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
    querySearchAsync(queryString, cb) {
       console.log(queryString)
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;
        
        clearTimeout(this.timeout);
        this.timeout = results
        setTimeout(() => {
          cb(results);
        }, 1000 * Math.random());
      },
    loadAll(data) {
        var value = [];
        for(var i = 0;i < data.length;i++){
          value.push({
            "value":data[i]
          })
        }
        this.restaurants = value;
      },
    createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    handleSelect(item) {
      this.form.HandoverSatffId = item.value
      }
  },
   mounted() {

    }
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