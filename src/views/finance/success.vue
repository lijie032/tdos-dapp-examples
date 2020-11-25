<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">   
      </div>
      <div class="right right-REsult">
         <div class="formbox confirmBox">
              <div class="f-form-box">
                  <h3>恭喜您信息登记成功！以下是您的上链哈希：</h3>
                  <div class="sucREsult">
                      <p class="p-regite">q2e3w2eq3w2e3qe295da6s5da6d5415e1q4w56e4q6w54e6565dasd <span class="icon-copy"></span></p>
                  </div>
                  <div class="btnbox">
                      <a class="pointer chain-btn">确认无误</a>
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
</style>>
