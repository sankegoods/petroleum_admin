<template>
  <div>
    {{this.$route.name}}
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名：">
            <el-input v-model="formInline.ApplyPersonId" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="编号：">
            <el-input v-model="formInline.noN" placeholder="编号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(1)">查询</el-button>
            <el-button type="primary" @click="addleEdit() ,drawer = true">增添</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-table
      :data="tableData"
      height="740"
      empty-text="暂无数据"
      border
      style="width: 100%;text-align: center;"
    >
      <el-table-column label="订单信息">
        <el-table-column prop="noN" label="编号"></el-table-column>
        <el-table-column prop="stfName" label="姓名"></el-table-column>
        <el-table-column :formatter="formatDate" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleEdit(scope.$index, scope.row) ,drawer = true"
            >编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row,tableData)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>

    <!--弹层-->
    <el-drawer :title="title" :size="size" :visible.sync="drawer" :direction="direction">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="申请人">
          <el-input v-model="form.ApplyPersonId" :disabled="isdisabled"></el-input>
        </el-form-item>
        <el-form-item label="油料规格">
          <el-input v-model="form.OilSpec"></el-input>
        </el-form-item>
        <el-form-item label="油罐容积">
          <el-input v-model="form.Volume"></el-input>
        </el-form-item>
        <el-form-item label="剩余油料">
          <el-input v-model="form.Surplus"></el-input>
        </el-form-item>
        <el-form-item label="日均销量">
          <el-input v-model="form.DayAvg"></el-input>
        </el-form-item>
        <el-form-item label="需要量">
          <el-input v-model="form.NeedAmount"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.Remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(2)">{{this.buttonName}}</el-button>
          <el-button @click="cancelForm">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
import { request } from "../../network/request.js";
import url from "../../api";
export default {
  data() {
    return {
      tableData: [],
      formInline: {
        ApplyPersonId: "",
        noN: "",
      },
      direction: "rtl",
      isdisabled: true,
      drawer: false,
      size: "30%",
      title: "编辑",
      buttonName: "",
      form: {
        // 弹框中表单数据
        ApplyPersonId: "",
        Remark: "",
        Id: "",
        OilSpec: "", //油料规格
        Volume: "", //油罐容积
        Surplus: "", //剩余油料
        DayAvg: "", //日均销售量
        NeedAmount: "", //需要量
        DetailID: "", //订单详情ID
      },
    };
  },
  activated() {
    this.logInfo();
  },
  deactivated() {
    console.log("不活跃");
  },
  methods: {
    //查看修改
    handleEdit(index, row) {
      this.title = "修改";
      this.size = "30%";
      this.buttonName = "立即修改";
      this.direction = "rtl";
      this.isdisabled = true;
      this.form.ApplyPersonId = row.applyPersonId;
      this.form.Remark = row.remark;
      this.form.OilSpec = row.oilSpec;
      this.form.Volume = row.volume;
      this.form.Surplus = row.surplus;
      this.form.DayAvg = row.dayAvg;
      this.form.NeedAmount = row.needAmount;
      this.form.DetailID = row.detailID;
      this.form.Id = row.id;
      console.log(this.form);
    },
    //添加
    addleEdit() {
      this.direction = "ttb";
      this.isdisabled = false;
      this.title = "添加";
      this.size = "60%";
      this.buttonName = "添加";
      this.form.ApplyPersonId = "";
      this.form.Remark = "";
      this.form.OilSpec = "";
      this.form.Volume = "";
      this.form.Surplus = "";
      this.form.DayAvg = "";
      this.form.NeedAmount = "";
      this.form.DetailID = "";
    },
    formatDate(row, column) {
      // 获取单元格数据
      let data = row["createTime"];
      if (this.tableData == null) {
        return "";
      }
      let dt = new Date(data);
      return (
        dt.getFullYear() +
        "-" +
        (dt.getMonth() + 1) +
        "-" +
        dt.getDate() +
        " " +
        dt.getHours() +
        ":" +
        dt.getMinutes() +
        ":" +
        dt.getSeconds()
      );
    },
    //删除
    handleDelete(index, row, info) {
      request({
        url: url.DeleteOilMaterialOrder,
        params: { Id: row.id, DetailID: row.detailID },
      })
        .then((res) => {
          if (res.data) {
            this.$message({
              message: "删除成功",
              type: "success",
            });
            info.splice(index, 1);
          } else {
            this.$message.error("删除异常 稍后再试");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // console.log(index);
      // console.log(row);
      // console.log(info);
    },
    //取消弹框
    cancelForm() {
      this.drawer = false;
    },
    onSubmit(types, then) {
      switch (types) {
        case 1:
          this.$message({
              message: "功能稍后开放",
              type: "success",
            });
          // console.log(this.formInline)
          break;
        case 2:
          if (this.buttonName == "添加") {
            request({
              url: url.CreateOilMaterialOrder,
              method: "Post",
              data: {
                ApplyPersonId: this.form.ApplyPersonId,
                Remark: this.form.Remark,
                OilSpec: this.form.OilSpec,
                Volume: Number(this.form.Volume),
                Surplus: Number(this.form.Surplus),
                DayAvg: Number(this.form.DayAvg),
                NeedAmount: Number(this.form.NeedAmount),
              },
            })
              .then((res) => {
                this.drawer = false;
                this.logInfo();
                // console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            request({
              url: url.UpdateOilMaterialOrder,
              method: "Post",
              data: this.form,
            })
              .then((res) => {
                if (res.data) {
                  this.drawer = false;
                  this.logInfo();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          break;
        default:
          break;
      }
    },
    logInfo() {
      request({
        url: url.GetOilMaterialOrder,
      })
        .then((res) => {
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
.el-table thead.is-group th {
  text-align: center;
}
.el-table--enable-row-transition .el-table__body td {
  text-align: center;
}
</style>