<style lang="scss">

</style>

<template>
    <div>
        <h1>Dashboard</h1>
        <el-button @click="open">打开弹框</el-button>
        <el-dialog v-drag :visible.sync="isVisible" :close-on-click-modal="false" width="400px">
            <span slot="title">拖拽指令</span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isVisible: false
            }
        },
        directives: {
            drag: {
                bind(el) {
                    const node = el.firstChild;
                    node.onmousedown = function(event) {

                        console.log(1111, node, event);

                        document.onmousemove = function(event) {
                            console.log(2222, event);
                        }

                        document.onmouseup = function() {
                            document.onmousemove = document.onmouseup = null;
                        }

                    }
                },
                unbind() {

                }
            }
        },
        methods: {
            open() {
                this.isVisible = true;
            }
        }
    };
</script>
