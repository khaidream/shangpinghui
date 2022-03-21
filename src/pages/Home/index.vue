<template>
  <div>
    <!-- 三级联动全局组件；三级联动已经注册为全局组件，因此不需要再引入 -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <!-- Floor这个组件：自己在组件内部是没有发请求的，数据是父组件给的 -->
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from './ListContainer'
import Recommend from './Recommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
export default {
    name:'Home',
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    computed:{
      floorList(){
            return this.$store.state.home.floorList
        },
    },
    mounted() {
      //派发action，获取floor组件的数据
      this.$store.dispatch('home/getFloorList')
      // 获取用户信息在首页展示
      this.$store.dispatch('user/getUserInfo')
    },
}
</script>

<style>

</style>