<template>
  <input type="text" @input="handleChange" />
</template>

<script>
export default {
  props: {
    value: [String, Number],
  },
  data() {
    return {}
  },
  methods: {
    handleChange(event) {
      console.log(55);
      this.$emit('input', event.target.value);
    }
  }
};
</script>
