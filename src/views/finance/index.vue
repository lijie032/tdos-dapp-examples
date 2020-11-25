<template>
  <div class="pageWrap f-pageWrap f-wrap-table">
      <explorer></explorer>
      <div class="logo-intro">
         <div class="logo"></div>
         TDOS金融
      </div>
      <div class="page-main content-middle">
          
          <div class="btnBox margint30">
              <a class="pointer h-btn" @click="linkOnChain">供应商</a>
              <a class="pointer h-btn h-btn-2" @click="linkConfirm">核心企业</a>
              <a class="pointer h-btn">银行</a>
          </div>
      </div>
  </div>
</template>

<script>
import explorer from '@/components/browser.vue'
export default{
  data(){
    return{

    }
  },
  components:{
    explorer
  },
  methods:{
     linkOnChain(){
      let that = this;
      that.$router.push({path:'/finance/onChain'})
    },
    linkConfirm(){
      let that = this;
      console.log('跳转')
      that.$router.push({path:'/finance/confirmInfo'})
    }
    
  }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
</style>>
