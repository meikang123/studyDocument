<template>
  <div>
    <test v-model="formData.id" />
    <test-m :age.sync="formData.age" />
  </div>
</template>

<script>
import Test from './test2';
import TestM from './test3';

export default {
  props: ['formData'],

  components: { Test, TestM },

  data() {
    return {
      id: 123
    }
  }
};
</script>
