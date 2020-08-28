<template>
  <el-row style="padding: 20px">
    <el-button type="primary" v-base-waves="opts" @click="fun">主要按钮</el-button>
  </el-row>
</template>

<script>
import { throttle, debounce } from '@/utils/utils';

export default {
  name: "waves",

  data() {
    return {
      debounceFun: null,
      throttleFun: null,
      opts: {}
    }
  },

  created() {
    this.debounceFun = debounce(5000, () => {
      console.log('-------------debounceFun');
    }, true)

    this.throttleFun = throttle(5000, () => {
      console.log('----------throttleFun');
    }, false)
  },

  methods: {
    fun() {
      this.debounceFun();
      // this.throttleFun();
    }
  }

}
</script>

<style scoped>

</style>
