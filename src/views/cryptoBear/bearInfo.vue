<template>
    <div class="pageWrap bg-wrap">
        <explorer></explorer>
        <div class="page-main">
            <div class="p-container">
                <h3 class="page-title">欢迎来到TDOS加密熊</h3>
                <div class="bear-content">
                   
                </div>
            </div>
        </div>

        <!--点击购买弹出框-->
        <div class="trans" v-if="isOnchain">
            <div class="cb-comfirmbox">
                <a class="btn-close pointer" @click="isOnchain=false"></a>
                <p class="p-title">恭喜您！购买成功！以下是您的加密熊事务哈希：</p>
                <p class="p-hash">d2a1sd56wq4eqw4e6fa1fsd5gd4sgds49sd14f6df4s9df</p>
                <div class="btnbox">
                    <a class="pointer cb-btn btn-sure">确认</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import explorer from '@/components/browser1.vue'
export default {
    data(){
        return{
           isOnchain:false
        }
    },
    components:{
        explorer
    },
    methods:{
     
    },
    mounted(){
      
    }
}
</script>
<style scoped lang="less">
   @import url(../../assets/less/cryptoBear.less);
</style>