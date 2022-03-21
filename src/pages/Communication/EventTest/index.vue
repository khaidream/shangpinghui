<template>
  <div>
      <h1>EventTest深入</h1>
      <button @click="handler">原生DOM绑定原生事件</button>
      <Event1 @click.native="handler2" /> 
      <Event2 @xxx="handler3" />
  </div>
</template>

<script>
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'
export default {
  name:'EventTest',
  components:{Event1,Event2},
  methods:{
    handler(){
      console.log('触发了handler1');
    },

    handler2(){
      console.log('触发了handler2');
    },
    handler3(params){
      console.log('触发了handler3',params);
    }
  }
}
</script>

<style>

</style>