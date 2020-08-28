<template>
  <div class="nav-bar">
    <hamburger :is-active="isOpenSideBar" class="hamburger-container" @toggleClick="toggleSideBar" />
    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <slot>
        <template v-if="!isMobile">
          <screenfull class="right-menu-item hover-effect" />
        </template>
        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <!-- <img src="@/assets/img/avatar.jpg" class="user-avatar"> -->
            <span class="user-name">基础框架</span>
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item disabled style="color:#606266">{{ userInfo.real_name }}</el-dropdown-item> -->
            <slot name="dropdown-items">
              <router-link to="/">
                <el-dropdown-item>首页</el-dropdown-item>
              </router-link>
            </slot>
            <el-dropdown-item divided @click.native="logout">
              <span style="display:block;">退 出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Hamburger from './Hamburger';
import Breadcrumb from './Breadcrumb';
import Screenfull from './Screenfull'

export default {
  components: {Hamburger, Breadcrumb, Screenfull},

  computed: {
    ...mapState({
      isMobile: state => state.isMobile,
      isOpenSideBar: state => state.isOpenSideBar
    })
  },

  data() {
    return {}
  },

  methods: {
    toggleSideBar() {
      const bool = !this.isOpenSideBar;
      this.$store.commit('CHANGE_OPEN_SIDEBAR_STATUS', bool);
    },
    logout() {

    }
  }
};
</script>

<style lang="scss" scoped>
  .nav-bar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 14px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;
        .avatar-wrapper {
          position: relative;
          .user-name{
            font-size: 14px;
          }
          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }
          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -15px;
            top: 20px;
            font-size: 12px;
          }
        }
      }
    }

  }
</style>
