<template>
  <div class="pageWrap f-pageWrap f-wrap-table">
      <explorer :type="type" :isHome="isHome"></explorer>
      <div class="logo-intro">
         <div class="logo"><img src="../../assets/img/logo_finance.png"/></div>
         TDOS金融
      </div>
      <div class="page-main content-middle">

          <div class="btnBox margint30">
              <a class="pointer h-btn" @click="linkOnChain">供应商</a>
              <a class="pointer h-btn h-btn-2" @click="linkConfirm">核心企业</a>
              <a class="pointer h-btn" @click="linkOnBank">银行</a>
          </div>
      </div>
  </div>
</template>

<script>
import explorer from '@/components/browser1.vue'

export default{
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
     linkOnChain(){
      let that = this;
      that.$router.push({path:'/finance/onChain'})
    },
    linkConfirm(){
      let that = this;
      that.$router.push({path:'/finance/search'})
    },
    linkOnBank(){
      let that = this;
      that.$router.push({path:'/finance/search_bank'})
    }

  }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
</style>>
