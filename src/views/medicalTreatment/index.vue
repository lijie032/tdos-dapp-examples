<template>
  <div class="pageWrap f-wrap-table pw-pageWrap">
    <explorer :isHome="isHome" :type="type"></explorer>
      <div class="logo-intro">
         <div class="logo"><img src="../../assets/img/logo_medicalTreatment.png"/></div>
         TDOS医疗
      </div>
      <div class="page-main content-middle">

          <div class="btnBox pw_btnbox">
              <a class="pointer h-btn h-btn-1" @click="onChain"><span>医院上链</span></a>
              <a class="pointer h-btn h-btn-2 " @click="search"><span>病人查询</span></a>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/assets.less);
@import url(../../assets/less/medicalTreatment.less);
</style>>

<script>
import explorer from '@/components/browser1.vue'
export default {
    data(){
        return{
           isHome:true,
           type:1,
        }
    },
    components:{
     explorer
    },
    methods:{
      onChain(){
        let that = this;
        that.$router.push({path:'/medicalTreatment/onChain'})
      },
      search(){
        let that = this;
        that.$router.push({path:'/medicalTreatment/search'})
      }
    }
}
</script>
