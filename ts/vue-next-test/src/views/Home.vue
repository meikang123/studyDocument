<template>
    <div class="home">
        <div @click="methods.onChange">age: {{age}}</div>
        <div @click="methods.onChangeObj">name: {{state.name}}</div>
        <div>allAge: {{computed.age}}</div>
        <button @click="methods.goTo">跳转about {{s}}</button>
    </div>
</template>

<script>
    import * as v from 'vue'
    import * as r from 'vue-router'

    export default {
        setup() {
            console.log(v, r);
            const { ctx } = v.getCurrentInstance();

            let age = v.ref(26);

            let s = '123456'

            const initState = {
                age: 12,
                name: 'mk'
            }
            let state = v.reactive(initState);

            const computed = {
                age: v.computed(() => age.value + state.age),
                nameAge: v.computed(() => age.value + state.name)
            }

           const methods = {
                onChange() {
                    age.value += 1;
                },
               onChangeObj() {
                   state.age += 1;
               },
               goTo() { // 跳转
                    console.log(ctx);
                   ctx.$router.push('/about');
               }
           }

            return { s, age, state, methods, computed }
        }
    };
</script>
