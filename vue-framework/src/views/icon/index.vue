<template>
  <div class="icon-container">
    <div class="item" v-for="(item, index) in iconList" :key="index">
      <svg-icon :icon-class="item" />
      <div class="name">{{ item }}</div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      iconList: []
    }
  },

  created() {
    const req = require.context('@/icons/svg', false, /\.svg$/);
    const re = /\.\/(.*)\.svg/;
    this.iconList = req.keys().map(i => i.match(re)[1]);
  }

};
</script>

<style lang="scss" scoped>
  .icon-container {
    display: flex; font-size: 40px; color: #597ef7; flex-wrap: wrap;
    .item {
      margin: 30px; width: 110px; text-align: center;
      .name {
        font-size: 14px; padding-top: 15px; color: #030303;
      }
    }
  }
</style>
