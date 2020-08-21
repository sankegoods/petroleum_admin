<template>
  <el-row>
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <div class="el-col-24">
        <el-col :span="8" :offset="8">
          <el-col :span="15">
            <el-form-item label="账号" prop="Name">
              <el-input type="text" v-model="ruleForm.Name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="15">
            <el-form-item label="密码" prop="Passwords">
              <el-input type="password" v-model="ruleForm.Passwords" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="15">
            <el-form-item label="年龄" prop="age">
              <el-input v-model.number="ruleForm.age"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="15">
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-col>
        </el-col>
      </div>
    </el-form>
  </el-row>
</template>
<script>
import { request } from "../network/request.js";
import url from "../api";
export default {
  data() {
    // var checkAge = (rule, value, callback) => {
    //   if (!value) {
    //     return callback(new Error("年龄不能为空"));
    //   }
    //   setTimeout(() => {
    //     if (!Number.isInteger(value)) {
    //       callback(new Error("请输入数字值"));
    //     } else {
    //       if (value < 18) {
    //         callback(new Error("必须年满18岁"));
    //       } else {
    //         callback();
    //       }
    //     }
    //   }, 1000);
    // };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          callback();
        }
      }
    };
    return {
      ruleForm: {
        Name: "",
        Passwords: "",
        // age: "",
      },
      rules: {
        Name: [{ validator: validatePass, trigger: "blur" }],
        Passwords: [{ validator: validatePass2, trigger: "blur" }],
        // age: [{ validator: checkAge, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      console.log(url.login);
      console.log(this.ruleForm);
      //   console.log(this.$refs[formName]);
      var info = {};
      request({
        url: url.login,
        params: {
          Name: this.ruleForm.Name,
          Passwords: this.ruleForm.Passwords,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      //   this.$refs[formName].validate((valid) => {
      //       console.log(valid);
      //     if (valid) {
      //     sessionStorage.setItem('user','123')
      //     this.$router.replace('/HomeIndex')
      //     } else {
      //       console.log("error submit!!");
      //       return false;
      //     }
      //   });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
.demo-ruleForm {
  margin-top: 200px;
}
</style>