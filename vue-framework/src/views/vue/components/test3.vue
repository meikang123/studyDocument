<template>
  <div>
    <el-button type="primary" @click="change">change</el-button>
  </div>
</template>

<script>
export default {
  name: "test3",

  props: ['age'],

  methods: {
    change() {
      const age = (this.age || 0) + 1;
      this.$emit('update:age', age);
    }
  }
}
</script>

<style scoped>

</style>
