<template>
    <div>
        <h2>自定义带Hover提示的按钮</h2>
        <!-- 当用户在使用我们封装的按钮时，需要向HintButton组件传递相应的参数 -->
        <HintButton type="success" icon="el-icon-delete" size="mini" @click="tanchu"  title ="提示按钮"/>
    </div>
</template>
<script>
import HintButton from './HintButton'
export default {
    name:'AttrListenersTest',
    components:{
        HintButton
    },
    methods:{
        tanchu(){
            alert('sdsd')
        }
    }
}
</script>