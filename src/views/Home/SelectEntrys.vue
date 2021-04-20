<template>
  <el-row>
    <el-col :span="24">
      <!-- 顶部搜索 添加功能按钮 -->

      <!-- 模态框 -->

      <el-dialog title="添加站点" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="站点名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="站点代码" :label-width="formLabelWidth">
            <el-input v-model="form.Code" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="quxiao">取 消</el-button>
          <el-button type="primary" @click="queren">确 定</el-button>
        </div>
      </el-dialog>
      <el-row>
        <el-col :span="12">
          <!-- <el-button type="primary" @click="getCheckedNodes"
            >添加按钮</el-button
          > -->
        </el-col>
      </el-row>
      <!-- 中间内容 部分 -->
      <el-row>
        <el-col :span="24">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            ref="tree"
            render-after-expand
            highlight-current
            :props="defaultProps"
            accordion
            :render-content="renderContent"
          >
          </el-tree>
        </el-col>
        <el-col :span="24">
          <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
          <el-button @click="getCheckedKeys">通过 key 获取</el-button> -->
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
import { request } from "../../network/request.js";
import url from "../../api";
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      form: {
        name: "",
        Code: "",
        parentId: "",
        id: 0,
        leve: "",
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
    };
  },
  created: function () {
    this.login();
    console.log("创建");
  },
  methods: {
    login() {
      request({
        url: url.GetOrganInfo,
      })
        .then((res) => {
          this.data = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    renderContent(h, { node, data, store }) {
      if (data.children == undefined) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
            <span class="test">
              <el-button
                size="mini"
                type="text"
                on-click={() => this.remove(node, data)}
              >
                删除
              </el-button>
            </span>
          </span>
        );
      }
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span class="test">
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
    append(data) {
      this.$confirm("确定添加" + data.label + "下的所属站点吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        .then(() => {
          this.form.parentId = data.parentId;
          this.form.id = data.id;
          this.form.leve = data.leve;
          this.dialogFormVisible = true;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消添加",
          });
        });
    },
    remove(node, data) {
      this.form.id = data.id;
      this.form.parentId = data.parentId;
      if (data.children == undefined) {
        this.$confirm("确定删除" + data.label + "所属的站点吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            request({
              url: url.DeleteOrganInfoById,
              method: "Delete",
              data: this.form,
            }).then((res) => {
              if (res.data) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
              this.dialogFormVisible = false;
            });
            console.log(data);
            console.log(node);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
            });
          });
      } else {
        this.$confirm(
          "确定删除" +
            data.label +
            "所属的站点吗？(如果删除次站点 它下面所属的站点都会被删掉 谨慎处理)",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
          }
        )
          .then(() => {
            request({
              url: url.DeleteOrganInfoById,
              method: "Delete",
              data: this.form,
            }).then((res) => {
              if (res.data) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
              this.dialogFormVisible = false;
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消删除",
            });
          });
      }
    },
    quxiao() {
      this.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "取消添加",
      });
    },
    queren() {
      // console.log(this.form)
      // return;
      if (this.form.name == "" || this.form.Code == "") {
        this.$message({
          type: "error",
          message: "名字或者代码不能为空！",
        });
        return;
      }
      request({
        url: url.addOrganStructureInfo,
        method: "POST",
        data: this.form,
      }).then((res) => {
        if (res.data) {
          this.$message({
            type: "success",
            message: "添加成功!",
          });
        } else {
          this.$message({
            type: "error",
            message: "添加失败!",
          });
        }
        this.dialogFormVisible = false;
      });
    },
  },
};
</script>
<style>
.custom-tree-node {
  width: 80%;
}
.test {
  float: right;
}
</style>