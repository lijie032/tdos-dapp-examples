<template>
  <div class="pageWrap f-wrap-table shopping-wrap">
    <explorer></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS购物
      </div>
      <div class="page-main content-middle">
          
          <div class="btnBox pw_btnbox">
              <a class="pointer h-btn h-btn-1"><span>商家上链</span></a>
              <a class="pointer h-btn h-btn-2 "><span>用户查询</span></a>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/assets.less);
@import url(../../assets/less/shopping.less);
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
