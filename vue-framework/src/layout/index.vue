<template>
  <div :class="className" class="app-wrapper">
    <div v-if="isMobile && isOpenSideBar" class="drawer-bg" @click="handleClickOutside" />
    <side-bar class="sidebar-container" />
    <div :class="{hasTagsView: needTagsView}" class="app-container">
      <div :class="{'fixed-header':fixedHeader}">
        <nav-bar></nav-bar>
        <tags-view v-if="needTagsView"/>
      </div>
      <app-main/>
    </div>
  </div>
</template>

<script>
import './layout.scss';
import {mapState} from 'vuex';
import {AppMain, SideBar, NavBar, TagsView} from './components'

export default {
  name: "Layout",

  components: {AppMain, SideBar, NavBar, TagsView},

  computed: {
    ...mapState({
      isMobile: state => state.isMobile,
      isOpenSideBar: state => state.isOpenSideBar,
      withoutAnimation: state => state.withoutAnimation
    }),
    className() {
      return {
        mobile: this.isMobile,
        hideSidebar: !this.isOpenSideBar,
        openSidebar: this.isOpenSideBar,
        withoutAnimation: this.withoutAnimation
      }
    }
  },

  data() {
    return {
      needTagsView: true,
      fixedHeader: true
    }
  },

  created() {
    const attrsNeedTagsView = this.$attrs['need-tags-view'];

    if (typeof attrsNeedTagsView !== 'undefined') {
      this.needTagsView = attrsNeedTagsView;
    }
  },

  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      this.$store.dispatch('changeMobile', isMobile);
      this.$store.dispatch('closeSideBar', { withoutAnimation: true });
    }
  },

  methods: {
    $_isMobile() { // 判断是否是移动端
      const {body} = document;
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < 992; // 宽度小于992认定为移动端
    },

    $_ResizeHandle() { // 窗口大小变化处理
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        this.$store.dispatch('changeMobile', isMobile);
        if(isMobile) this.$store.dispatch('closeSideBar', { withoutAnimation: true });
      }
    },

    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false });
    }
  },

  watch: {
    $route() {
      if(this.isMobile && this.isOpenSideBar) this.$store.dispatch('closeSideBar', { withoutAnimation: false });
    }
  },

  beforeMount() {
    window.addEventListener('resize', this.$_ResizeHandle, false);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.$_ResizeHandle, false);
  }

}
</script>

<style lang="scss" scoped>
  @import "~@/style/mixin";

  .app-wrapper {
    @include clear_fix;
    position: relative;
    width: 100%;
    height: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

</style>
