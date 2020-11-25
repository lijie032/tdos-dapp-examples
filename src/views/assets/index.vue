<template>
  <div class="pageWrap f-wrap-table pw-pageWrap">
    <explorer></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS资产
      </div>
      <div class="page-main content-middle">
          
          <div class="btnBox pw_btnbox">
              <a class="pointer h-btn h-btn-1"><span>登记平台</span></a>
              <a class="pointer h-btn h-btn-2 "><span>继承人</span></a>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/assets.less);
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
