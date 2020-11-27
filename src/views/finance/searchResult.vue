<template>
  <div class="pageWrap f-chain-wrap dis-table search-result-wrap bgf6f6f6">
     <div class="content-middle">
      <div class="dis-table result-info">
         <div class="formbox confirmBox">
              <div class="f-form-box">
                  <h3>供应商信息</h3>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">公司类型：供应商</p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">公司名称：<a id="name"></a></p>
                  </div>
                   <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">融资金额：<a id="amount"></a></p>
                  </div>
                   <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">合同编号：<a id="contract"></a></p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">区块高度：<a id="height"></a></p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">事务哈希：<a id="hash"></a></p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">是否认证：<a id="attestation"></a></p>
                  </div>
                   <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">(从哪里获取？？？)认证哈希：1C366dzxqemp56ASwe59FG32sdxc59332VFG</p>
                  </div>
                  <div class="btnbox">
                      <a class="pointer chain-btn" @click="back">返回</a>
                  </div>
              </div>
         </div>
      </div>
    </div>


  </div>
</template>

<script>
import explorer from '@/components/browser.vue'
import {getFinance, getTransaction} from '@/api/dapps'

export default{
  data(){
    return{

    }
  },
  components:{
    explorer
  },
  methods:{
    back(){
      let that = this
      that.$router.push({path: '/finance'})
    }
  },mounted: function() {
    //todo 调用异步
    //let transaction =  await getTransaction(hash);
    //todo 获取公钥
    // let publickey = '02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4'
    // let result = await getFinance(hash, publickey)
    document.getElementById("name").innerHTML = result.name;
    document.getElementById("amount").innerHTML = result.amount;
    document.getElementById("contract").innerHTML = result.contract;
    document.getElementById("height").innerHTML = "123123";
    document.getElementById("hash").innerHTML = "123123";
    document.getElementById("attestation").innerHTML = "123123";

  }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
</style>>
