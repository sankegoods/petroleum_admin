<template>
  <div>
    <router-link to="/HomeIndex">返回首页</router-link>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {};
</script>