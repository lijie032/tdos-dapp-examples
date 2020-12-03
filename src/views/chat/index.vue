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
                        <div class="c-intro">TDOS交流群({{num}})</div>
                        <div class="din">
                            <input maxlength='15' placeholder="请在此输入您的称呼" v-model="name"/>
                        </div>
                        <div class="btnbox">
                            <a class="btn-chat pointer" @click="submit">加入群聊</a>
                            <a ref="sendTx"></a>
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
import { hasUser, getUserId, registration } from '@/api/dapps'
export default {
    data(){
        return{
           isOnchain:false,
           type:1,
           num:'',
           name:''
        }
    },
    components:{
        explorer
    },
    methods:{
      async get(){
        let that = this;
        let num = await getUserId();
        that.num = num;
        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        let has = await hasUser(pk);
        if (has){
          that.$router.push({path: '/chat/group'})
        }
      },
      async submit(){
        let that = this;
        let nickname = that.name;
        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        let payload  = {
          nickname:nickname
        };
        let tx  = await registration(payload, pk);
        let sendTx = JSON.stringify(tx);
        that.$refs.sendTx.href =
          "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
        that.$refs.sendTx.click();
        return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
      }
    },
    mounted(){
      this.get()
    }
}
</script>
<style scoped lang="less">
   @import url(../../assets/less/chat.less);
</style>
