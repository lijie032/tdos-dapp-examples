<template>
  <div class="pageWrap f-wrap-table pw-pageWrap">
    <explorer :isHome="isHome" :type="type"></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS保险
      </div>
      <div class="page-main content-middle">

          <div class="btnBox pw_btnbox">
              <a class="pointer h-btn h-btn-1" @click="onChain"><span>保险公司</span></a>
              <a class="pointer h-btn h-btn-2 " @click="search"><span>个人用户</span></a>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
@import url(../../assets/less/Insurance.less);
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
            that.$router.push({path:'/Insurance/onChain'})
        },
      search(){
            let that = this;
            that.$router.push({path:'/Insurance/search'})
        }
    }
}
</script>
