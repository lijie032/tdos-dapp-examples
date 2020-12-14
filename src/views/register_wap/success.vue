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
                dajsdqweqw65656dasf5a1sf53d4sg86df4gdf54gdf  
                <span class="copy"></span> 
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
        gender:1
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
       }
   }
}
</script>

<style lang="less" scoped>
   @import url(../../assets/less/wap.less);
</style>