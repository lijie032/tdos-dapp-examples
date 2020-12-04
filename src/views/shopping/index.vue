<template>
  <div class="pageWrap f-wrap-table shopping-wrap">
    <explorer :isHome="isHome" :type="type"></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS购物
      </div>
      <div class="page-main content-middle">

          <div class="btnBox pw_btnbox">
              <a class="pointer h-btn h-btn-1" @click="onChain"><span>商家上链</span></a>
              <a class="pointer h-btn h-btn-2 " @click="search"><span>用户查询</span></a>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/assets.less);
@import url(../../assets/less/shopping.less);
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
        that.$router.push({path:'/shopping/onChain'})
      },
      search(){
        let that = this;
        that.$router.push({path:'/shopping/search'})
      }
    }
}
</script>
