<template>
    <div class="swiper-container" ref="floor1Swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
                <img :src="carousel.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script>
import Swiper from 'swiper'
export default { 
    name:'Carousel',
    props:['list'],
    watch:{
            list:{
                // 立即监听：不管数据有没有变化，上来立即监听一次
                // 为什么watch监听不到list的变化：因为这个数据从没有发生过变化（数据是父亲给的，父亲给的时候是一个对象，对象里面已经有数据了）
                immediate:true,
                handler(){
                    // 只能监听到数据已经有了，但是v-for动态渲染的结构我们还是没有办法确定的，因此还是需要用到nextTick
                    this.$nextTick(()=>{
                        var mySwiper = new Swiper(this.$refs.floor1Swiper,{
                            loop:true,
                            pagination:{
                                el:'.swiper-pagination',
                                clickable:true
                            },
                            navigation:{
                                nextEl:".swiper-button-next",
                                prevEl:".swiper-button-prev"
                            }
                        })
                    })
                }
            }
        }
}
</script>

<style>

</style>