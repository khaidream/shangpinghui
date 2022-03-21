<template>
  <div style="background:#ccc;height:50px;">
    <h3>女儿小红有存款:{{money}}</h3>
    <button @click="giveMoney(100)">给baba钱:100</button>
  </div>
</template>

<script>
import myMixin from './myMixin/myMixin.js'
export default {
    name:'Son',
    mixins:[myMixin],
    data() {
        return {
            money:15000
        }
    },
}
</script>