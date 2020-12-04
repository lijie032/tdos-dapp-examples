<template>
  <div class="pageWrap f-wrap-table pw-pageWrap">
    <explorer :type="type" :isHome="isHome"></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS公益
      </div>
      <div class="page-main content-middle">

          <div class="btnBox pw_btnbox">
              <a class="pointer h-btn h-btn-1" @click="linChain"><span>红十字会</span></a>
              <a class="pointer h-btn h-btn-2 " @click="linSearch"><span>受益人</span></a>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
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
        linChain(){
            let that = this;
            that.$router.push({path:'/publicWelfare/onChain'})
        },
        linSearch(){
            let that = this;
            that.$router.push({path:'/publicWelfare/search'})
        }
    }
}
</script>
