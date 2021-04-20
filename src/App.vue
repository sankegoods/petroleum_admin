<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <!-- <transition name="fade" mode="out-in"> -->
    <!-- <router-view></router-view> -->
    <!-- </transition> -->
  </div>
</template>
<script>
export default {
  created: function () {
  },
};
</script>


<style>
* {
  margin: 0px;
  padding: 0px;
}
</style>
