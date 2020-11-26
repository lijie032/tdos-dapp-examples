<template>
  <div class="pageWrap f-wrap-table welding-pageWrap">
    <explorer></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS焊接
      </div>
      <div class="page-main content-middle">
          
          <div class="index-nav">
              <a class="pointer a-nav a-nav1"><i></i><span>焊接公司</span></a>
              <a class="pointer a-nav a-nav2"><i></i><span>查询处</span></a>
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
