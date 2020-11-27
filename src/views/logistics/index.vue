<template>
  <div class="pageWrap f-wrap-table logistics-pageWrap">
    <explorer></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS物流
      </div>
      <div class="page-main content-middle">

          <div class="index-nav">
              <a class="pointer a-nav a-nav1" @click="send"><i></i><span>寄件人</span></a>
              <a class="pointer a-nav a-nav2" @click="collect"><i></i><span>收件人</span></a>
              <div class="line"></div>
          </div>
      </div>
  </div>
</template>



<style scoped lang="less">

@import url(../../assets/less/logistics.less);
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
      send(){
        let that = this;
        that.$router.push({path:'/logistics/onChain'})
      },
      collect(){
        let that = this;
        that.$router.push({path:'/logistics/search'})
      }
    }
}
</script>
