<template>
  <div class="pageWrap f-wrap-table music-pageWrap">
    <explorer :isHome="isHome" :type="type"></explorer>
      <div class="logo-intro">
         <div class="logo"><img src="../../assets/img/logo_musicCopyright.png"/></div>
         TDOS音乐
      </div>
      <div class="page-main content-middle">

          <div class="index-nav">
              <a class="pointer a-nav a-nav1" @click="onChain"><i></i><span>登记音乐</span></a>
              <a class="pointer a-nav a-nav2" @click="search"><i></i><span>查询音乐</span></a>
              <div class="line"></div>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">

@import url(../../assets/less/logistics.less);
@import url(../../assets/less/music.less);
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
        that.$router.push({path:'/musicCopyright/onChain'})
      },
      search(){
        let that = this;
        that.$router.push({path:'/musicCopyright/search'})
      }
    }
}
</script>
