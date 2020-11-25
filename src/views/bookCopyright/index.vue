<template>
  <div class="pageWrap f-wrap-table bookCopyright-pagewrap">
    <explorer></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS版权
      </div>
      <div class="page-main content-middle">
          
          <div class="index-nav">
              <a class="pointer a-nav a-nav1"><i></i><span>出版社</span></a>
              <a class="pointer a-nav a-nav2"><i></i><span>查询处</span></a>
              <div class="line"></div>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">

@import url(../../assets/less/logistics.less);
@import url(../../assets/less/bookCopyright.less);

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
