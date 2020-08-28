<template>
  <el-scrollbar ref="scrollContainer" :vertical="false" class="scroll-container" @wheel.native.prevent="handleScroll">
    <slot />
  </el-scrollbar>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {
    handleScroll() {

    }
  }
};
</script>
