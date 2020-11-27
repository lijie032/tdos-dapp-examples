<template>
    <div class="pageWrap bg-wrap dis-table">
        <explorer :type="type"></explorer>
        <div class="page-main content-middle">
            <div class="chat-container">
               <div class="chat-header">
                  <!--背景暂时白色-->
                  <div class="logo" style="background:#fff"></div> <span>欢迎来到TDOS聊天</span>
               </div>
               <div class="from_content">
                   <div class="chat_login">
                       <div class="t_logo"><img src="../../assets/img/tdos_chat.png"/></div>
                        <div class="c-intro">TDOS交流群（25）</div>
                        <div class="din">
                            <input maxlength='15' placeholder="请在此输入您的称呼"/>
                        </div>
                        <div class="btnbox">
                            <a class="btn-chat pointer">加入群聊</a>
                        </div>
                   </div>
                  
               </div>
               <div class="chat-header">
                   <span></span>
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
           isOnchain:false,
           type:1
        }
    },
    components:{
        explorer
    },
    mounted(){
      
    }
}
</script>
<style scoped lang="less">
   @import url(../../assets/less/chat.less);
</style>