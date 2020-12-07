<template>
  <div class="pageWrap f-wrap-table welding-pageWrap">
    <explorer :isHome="isHome" :type="type"></explorer>
      <div class="logo-intro">
         <div class="logo"><img src="../../assets/img/logo_welding.png"/></div>
         TDOS焊接
      </div>
      <div class="page-main content-middle">

          <div class="index-nav">
              <a class="pointer a-nav a-nav1" @click="onChain"><i></i><span>焊接公司</span></a>
              <a class="pointer a-nav a-nav2" @click="search"><i></i><span>查询处</span></a>
              <div class="line"></div>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">

@import url(../../assets/less/logistics.less);
@import url(../../assets/less/welding.less);
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
        that.$router.push({path:'/welding/onChain'})
      },
      search(){
        let that = this;
        that.$router.push({path:'/welding/search'})
      }
    }
}
</script>
