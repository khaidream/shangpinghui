<template>
  <div style="background: #ccc; height:50px;">
      <h2>input包装组件</h2>
      <input type="text" :value="value" name="" id="" @input="$emit('input',$event.target.value)">
  </div>
</template>

<script>
export default {
    name:'CustomInput',
    props:['value']
}
</script>

<style>

</style>