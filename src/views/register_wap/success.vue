<template>
    <div class="wap-wrap">
        <div class="wrapheader">
            <!--
             <span class="close"></span>
             -->
             <span class="close back" @click="back"></span>
            <div class="pageTitle line-ellipsis">登记成功</div>
            <span class="list-icon"></span>
        </div>
      
        <div class="frombox succ_box">
           
            <div class="icon">

            </div>
            <p class="mess"> 恭喜您！登记成功</p>
            <p class="mess">以下为您此次登记的事务哈希：</p>
            <div class="hashBox">
                {{hash}}  
                <span class="copy" v-clipboard:copy="hash" v-clipboard:success="onCopy" v-clipboard:error="onError"></span> 
            </div>
            <p class="notice">（您可复制此哈希至浏览器查询，或在首页查询。）</p>
            <div class="box-flex flex-middle flex-center btnbox">
                 <span class="pointer btn-register">确认</span>
            </div>
        </div>
    </div>
</template>

<script >
export default{


   data(){
       return{
        gender:1,
        hash:'',
       }
   },
   methods:{
       back(){
        let that = this;
        if (window.history.length <= 1) {
                this.$router.push({ path: "/register_wap" });
                return false;
            } else {
                this.$router.go(-1);
            }
       },
        onCopy: function (e) {
        let that = this
        return that.$toast('复制成功', 2000)
      },
      onError: function (e) {
        let that = this
        return that.$toast('复制失败，请稍后重试', 2000)
      },
   },
   mounted(){
       let that = this;
       that.hash = that.$route.query.hash;
   }
}
</script>

<style lang="less" scoped>
   @import url(../../assets/less/wap.less);
</style>