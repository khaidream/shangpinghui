<template>
    <div class="type-nav">
        <div class="container">
            <div @mouseleave="leaveShow" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 三级联动 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                            <!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
                        <div class="all-sort-list2" @click="gosearch">
                            <div class="item " v-for="(c1,index) in category" :key="c1.categoryId" :class="{cur:currentIndex==index}">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryname="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                    <!-- <router-link to="/search" >{{c1.categoryName}}</router-link> -->
                                </h3>
                                <div class="item-list clearfix" :style="{display:currentIndex==index?'block':'none'}">
                                    <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryname="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                                <!-- <router-link to="/search" >{{c2.categoryName}}</router-link> -->
                                            </dt>
                                            <dd>
                                                <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryname="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                    <!-- <router-link to="/search">{{c3.categoryName}}</router-link> -->
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
// 按需引入：按需加载 引入节流函数
import throttle from 'lodash/throttle.js'
export default {
    name:'TypeNav',
    data() {
        return {
            // 存储用户鼠标移上哪个一级分类
            currentIndex: -1,
            show:true
        }
    },
    methods:{
        // 鼠标进入修改响应式数据currentIndex属性
        // 非正常情况（用户操作过快）：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3触发了
        // 就是由于用户行为过快，导致浏览器反应过来，如果当前回调函数中有一些大量业务，有可能出现卡顿现象。
/*         changeIndex(index){
            this.currentIndex = index
        }, */
        // throttle回调函数别用箭头函数，可能出现上下文this指向问题
        changeIndex:throttle(function(index){
            this.currentIndex = index
        },50),
        // 一级分类鼠标移除的事件回调
        leaveShow(){
            // 鼠标移除currentIndex =-1
            this.currentIndex = -1
            if(this.$route.path !='/home'){
                this.show = false
            }
        },
        gosearch(e){
            // 最好的解决方案：编程式导航 + 事件委派
            // 利用事件委派存在一些问题：1：点击的一定是a标签 2：如何获取参数【1、2、3级分类的产品的名字、id】
            let element = e.target
            if(element.dataset.categoryname){
                let location = {name:'search'};
                let query = {categoryName:element.dataset.categoryname}
                // 一级分类、二级分类、三级分类的a标签
                if(element.dataset.category1id){
                    query.category1Id = element.dataset.category1id
                }else if(element.dataset.category2id){
                    query.category2Id = element.dataset.category2id
                }else{
                    query.category3Id = element.dataset.category3id
                }
                // 整理完参数
                // 判断：如果路由跳转的时候，带有params参数，捎带着传过去
                if(this.$route.params){
                    location.params = this.$route.params
                    location.query = query
                }
                this.$router.push(location)
            }
        },
        enterShow(){
            if(this.$route.path !='/home'){
                this.show = true
            }
        }
    },
    // 组件挂在完毕：可以向服务器发送请求
    mounted() {
        // 当组件挂载完毕，让show属性变为false
        if(this.$route.path!='/home'){
            this.show = false;
        }
    },
    computed:{
        ...mapState('home',{category:"categoryList"})
    },
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 473px;
            position: absolute;
            background: #fafafa;
            z-index: 999;
            // overflow: hidden;
            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }   
                .cur{
                    background-color: skyblue;
                }
            }
        }
        // 过渡动画的样式
        // 过渡动画开始状态 （进入）
        .sort-enter,.sort-leave-to{
            // opacity: 0;
            height: 0;
        }
        // 过渡动画结束状态 （进入）
        .sort-enter-to,.sort-leave{
            // opacity: 1;
            height: 473px;
        }
        // 定义动画的时间、速率
        .sort-enter-active{
            transition:  all .5s linear;
            overflow: hidden;
        }
    }
}
</style>