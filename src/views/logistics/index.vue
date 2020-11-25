<template>
  <div class="pageWrap f-wrap-table logistics-pageWrap">
    <explorer></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS物流
      </div>
      <div class="page-main content-middle">
          
          <div class="index-nav"></div>
      </div>
  </div>
</template>



<style scoped lang="less">

@import url(../../assets/less/logistics.less);
</style>>

<script>
import explorer from '@/components/browser.vue'
export default {
    data(){
        return{
            
        }
    },
    components:{
     explorer
    },
    methods:{
       
    }
}
</script>
