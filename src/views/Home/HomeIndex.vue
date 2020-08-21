<template>
  <el-row :gutter="10" style="background-color: #CCCCCC;">
    <el-col :span="12" :offset="12" >
      <div class="grid-content bg-purple">{{this.$route.name}}</div>
    </el-col>
    <el-col :span="13">
      {{this.$route.name}}
    </el-col>
    <el-col :span="3">
      {{this.$route.name}}
    </el-col>
    <el-col :span="3">
      {{this.$route.name}}
    </el-col>
  </el-row>
</template>
<script>
export default {};
</script>