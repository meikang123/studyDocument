<template>
  <section class="app-main">
    <router-view :key="key" />
  </section>
</template>

<script>
export default {
  name: "AppMain",

  computed: {
    key() {
      return this.$route.path;
    }
  }
}
</script>

<style lang="scss" scoped>
  .app-main {
    min-height: calc(100vh);
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }

  .hasTagsView {
    .fixed-header + .app-main {
      padding-top: 84px;
    }
  }
</style>
