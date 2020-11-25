<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">   
      </div>
      <div class="right">
         <div class="formbox">
              <div class="f-form-box">
                  <h3>请认真填写以下数据，确保能准确上链</h3>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"  placeholder="用户姓名"/></div>
                     <div class="din border-box din-2"><input type="text" maxlength="15"  placeholder="航班信息"/></div>
                  </div>
                   <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"   placeholder="起保时间"/></div>
                     <div class="din border-box din-2">
                       <input type="text" maxlength="15"   placeholder="起保时间"/>
                     </div>
                  </div>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"   placeholder="保单号码"/></div>
                     <div class="din border-box din-2"><input type="text" maxlength="15"   placeholder="是否理赔"/></div>
                  </div>
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
      options:['是','否'],
      isClaims:''
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
@import url(../../assets/less/Insurance.less);
</style>>
