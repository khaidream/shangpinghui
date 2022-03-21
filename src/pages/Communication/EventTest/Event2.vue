<template>
  <div>
      <h1>Event2组件</h1>
      <button @click="$emit('xxx','我爱你')">一个按钮</button>  
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
    div{
        background-color: gray;
    }
</style>