<template>
 <!-- 下面这种写法，不能用:符号替换    v-on不能用@符号替换 -->
  <el-button v-bind="$attrs" v-on="$listeners" ></el-button>
</template>

<script>
export default {
    mounted() {
        // $attrs 属于组件的一个属性，可以获取到父组件传递过来的props数据 
        // 对于子组件而言 父组件给的数据可以利用props接收，但是需要注意，通过props接收了的属性，在$attrs中是获取不到的  
        console.log(this.$attrs);
        // $listeners 它也是组件实例自身的一个属性，它可以获取到父组件给子组件传递的自定义事件
        console.log(this.$listeners);
    },
}
</script>

<style>

</style>