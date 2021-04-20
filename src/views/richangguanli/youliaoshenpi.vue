<template>
  <el-row>
    <!-- 工具栏 -->
    <el-col :span="12">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="姓名：">
          <el-input v-model="selectName" placeholder="输入单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="24">
      <el-divider content-position="right">油料申请审批表</el-divider>
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
        <el-table-column label="油料申请审批表" style="text-align: center">
          <el-table-column prop="oilmId" label="编号"> </el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入单号搜索"
              />
              <el-input style="display: none" :value="scope.row" />
            </template>
            <el-table-column label="申请时间">
              <template slot-scope="scope">
                <span>{{ ChangeDateFormat(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看</el-button
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
            <el-form-item label="订单编号" :label-width="formLabelWidth">
              <el-input
                disabled
                v-model="form.OilmId"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="申请人姓名" :label-width="formLabelWidth">
              <el-input disabled v-model="form.StaffName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="申请人工号" :label-width="formLabelWidth">
              <el-input disabled v-model="form.StaffNon" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="日均销售量" :label-width="formLabelWidth">
              <el-input v-model="form.DayAvg" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="油料规格" :label-width="formLabelWidth">
              <el-input v-model="form.OilSpec" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="油罐容量" :label-width="formLabelWidth">
              <el-input v-model="form.Volume" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="剩余容量" :label-width="formLabelWidth">
              <el-input v-model="form.Surplus" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="需要量" :label-width="formLabelWidth">
              <el-input v-model="form.NeedAmount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="申请时间" :label-width="formLabelWidth">
              <el-input disabled v-model="form.CreateTime" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="审批意见" :label-width="formLabelWidth">
              <el-select v-model="Remack" placeholder="请选择">
                <el-option label="同意" value="同意"></el-option>
                <el-option label="不同意" value="不同意"></el-option>
              </el-select>
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
      formLabelWidth: "90px",
      dialog: false,
      loading: false,
      load: false,
      timer: null,
      ischakan: false,
      ischankanValue: "",
      form: {
        //编辑字段
        OilmId: "",
        OilmdId:"",
        ProceId:"",
        StaffName: "",
        StaffNon:"",
        DayAvg: "",
        NeedAmount: "",
        OilSpec: "",
        Surplus: "",
        Volume: "",
        CreateTime:"",
      },
      Remack:"",//审批意见
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
    handleClick(row) {
      this.geshihu(row);
      this.responseJob();
      this.dialog = true;
      this.ischakan = false;
      this.ischankanValue = "查看";
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
        this.responseUpdate();
    },
    // 发送审批请求
    responseUpdate() {
      var UpdaInfo = {
        StaffName :this.$store.state.logInfo.name, //this.form.StaffName, //这个应该是当前登陆的人的姓名
        ProceId : this.form.Id,
        JobId : this.$store.state.logInfo.jobId, //这个也是当前登陆的人的JobId   this.$store.state.logInfo.jobId
        Remack : this.Remack
      }
      request({
        url: url.UpdatelizhishenpiInfo,
        data: UpdaInfo,
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
    geshihu(row) {
          this.form.ProceId = row.id;
          this.form.OilmId = row.oilmId;
          this.form.OilmdId = row.oilmdId
          this.form.Surplus = row.surplus;
          this.form.Volume = row.volume;
          this.form.DayAvg = row.dayAvg;
          this.form.StaffNon = row.noN;
          this.form.StaffName = row.name;
           this.form.NeedAmount =row.needAmount;
           this.form.OilSpec = row.oilSpec;
          this.form.CreateTime = this.ChangeDateFormat(row.createTime);
    },
    respon() {
      request({
        url: url.GetOilMatOrdershenpi,
        params: { pageInfo: this.currentPage4, pageSize: this.pageSize ,jobId:this.$store.state.logInfo.jobId},
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