<template>
  <div>
      <h1>Baba有存款:{{money}}</h1>
      <button @click="jieqianm(100)">找小明借钱100</button>
      <button @click="jieqianh(150)">找小红借钱150</button>
      <button @click="jieqian(200)">找所有孩子借钱200</button>
      <br>
      <!-- ref 获取节点 -->
      <Son ref="xm" />
      <br>
      <Daughter ref="xh" />
  </div>
</template>

<script>
import Daughter from './Daughter'
import Son from './Son'
export default {
  name:'ChildrenParentTest',
  data() {
    return {
      money:1000
    }
  },
  methods: {
    jieqianm(money){
      this.money += money;
      //  ref 可以获取真实DOM节点，当然也可以获取子组件的标签 (操作子组件的数据方法)
      this.$refs.xm.money-=money
    },
    jieqianh(money){
      this.money += money;
      this.$refs.xh.money -=money
    },
    jieqian(money){
      this.money +=2*money;
      // 组件实例自身拥有一个属性$children,可以获取到当前组件当中全部的子组件 [数组]
      // 遍历子组件 
      this.$children.forEach(item=>{
        item.money-=money
      })
    }
  },
  components:{
    Son,
    Daughter
  }
}
</script>

<style>

</style>