<template>
  <section style="padding: 20px">
    <el-divider content-position="left">事件修饰符</el-divider>
    <div class="box" @click="clickHandle(1)">
      <pre>
        parent -> click -> alert(1)
      </pre>

      <el-button type="primary" @click="clickHandle(2)">default</el-button>
      <el-button type="primary" @click.stop="clickHandle(2)">.stop</el-button>
      <a href="/" target="_blank" @click.stop.prevent="clickHandle(3)">链接</a>

    </div>

    <div class="box" @click.capture="clickHandle(1)">
      <pre>
        parent -> click.capture -> alert(1)
      </pre>
      <el-button type="primary" @click="clickHandle(2)">default</el-button>
    </div>

    <div class="box" @click.self="clickHandle(1)">
      <pre>
        parent -> click.self -> alert(1)
      </pre>
      <el-button type="primary" @click="clickHandle(2)">default</el-button>
    </div>

    <div class="box" @click="clickHandle(1)">
      <child @wheel.native.stop="clickHandle(2)" />
    </div>
  </section>
</template>

<script>
import Child from './components/child';

export default {
  components: { Child },

  data() {
    return {}
  },

  methods: {
    clickHandle(data) {
      alert(data);
    }
  }
};
</script>

<style lang="scss" scoped>
  .box {
    width: 400px; height: 200px; border: 1px solid #000000; border-radius: 8px; margin-bottom: 20px;
  }
</style>
