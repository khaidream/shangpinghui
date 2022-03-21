export default{
    // 对外暴露的对象 可以放置组件重复的js业务逻辑
    methods: {
        // 儿子小明给爸爸钱的回调函数
        giveMoney(money){
            this.money-=money;
            // 可以通过$parent属性获取到某一个组件父组件,可以操作父组件的数据方法
            this.$parent.money+=money
            // console.log(this.$parent);
        }
    },
}