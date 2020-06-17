<template>
  <div id="app">
    <draggable class="list-group" tag="div" handle=".btn" v-bind="dragOptions" v-model="list" @start="drag = true" @end="drag = false">
        <transition-group type="transition" :name="!drag ? 'flip-list' : null">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="title">123--{{item}}</div>
            <div class="btn">按钮</div>
          </div>    
        </transition-group>
      </draggable>
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  name: 'App',
  data() {
    return {
      list: [1, 2, 3, 4, 5],
      drag: false
    }
  },
  components: {
    Draggable
  },
   computed: {
    dragOptions() {
      return {
        animation: 200,
        disabled: false,
        ghostClass: "ghost"
      };
    }
  },
  mounted() {
    this.getValue().then(value => {
      console.log('----------------v', value)
    });
    
  },
  methods: {
    getValue() {
      return new Promise((resolve) => {
        setInterval(() => resolve(10), 5000);
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.item {
  border: 1px solid #000; width: 500px; margin: 0 auto; margin-bottom: 40px;
}
.item .btn {
  width: 200px; height: 40px; background: red;
}


.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
