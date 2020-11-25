<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">   
      </div>
      <div class="right">
         <div class="formbox confirmBox">
              <div class="f-form-box">
                  <h3>请认真确认以下数据，确保能准确上链</h3>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">上链时间：2020-05-02 12:00</p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">区块高度：7859643</p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">区块哈希：1C366dzxqemp56ASwe59FG32sdxc59332</p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">事务哈希：1C366dzxqemp56ASwe59FG32sdxc59332</p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">融资金额：XXXXXXX</p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">合同编号：347777728937482374287423</p>
                  </div>
                  <div class="btnbox">
                      <a class="pointer chain-btn">审核通过</a>
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
