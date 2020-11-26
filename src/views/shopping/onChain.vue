<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">   
      </div>
      <div class="right">
         <div class="formbox">
              <div class="f-form-box">
                  <h3>请认真填写以下数据，确保能准确上链</h3>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text"  maxlength="15" placeholder="商品产地"/></div>
                     <div class="din border-box din-2"><input type="text" maxlength="15" placeholder="商品品牌"/></div>
                  </div>
                   <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"  placeholder="商品种类"/></div>
                     <div class="din border-box din-2"><input type="text" maxlength="15"  placeholder="商品价格"/></div>
                  </div>
                  <!--
                  <div class="din-col">
                     <div class="din"><input type="text" placeholder="合同编号"/></div>
                  </div>
                  -->
                  <div class="btnbox">
                      <a class="pointer chain-btn">存证上链</a>
                  </div>
              </div>
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
   
  }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
@import url(../../assets/less/shopping.less);
</style>>
