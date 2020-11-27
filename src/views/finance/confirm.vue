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
                    <p class="p-text">区块高度：<a id="height"></a></p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">区块哈希：<a id="block_hash"></a></p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">事务哈希：<a id="transaction_hash"></a></p>
                  </div>
                  <div class="d-info">
                    <span class="icon"></span>
                    <p class="p-text">企业名称：<a id="title"></a></p>
                  </div>
                  <div class="d-info">
                    <span class="icon"></span>
                    <p class="p-text">法人名称：<a id="name"></a></p>
                  </div>
                  <div class="d-info">
                    <span class="icon"></span>
                    <p class="p-text">法人证件：<a id="cid"></a></p>
                  </div>
                  <div class="d-info">
                      <span class="icon"></span>
                      <p class="p-text">融资金额：<a id="amount"></a></p>
                  </div>
                  <div class="d-info">
                    <span class="icon"></span>
                    <p class="p-text">合同编号：<a id="contract"></a></p>
                  </div>

                  <div class="btnbox">
                      <a class="pointer chain-btn" @click="examine">审核通过</a>
                  </div>
              </div>
         </div>
      </div>
  </div>
</template>

<script>
import explorer from '@/components/browser.vue'
import {confirmFinance, getTransaction} from '@/api/dapps'

export default{
  data(){
    return{

    }
  },
  components:{
    explorer
  },
  methods:{
    async examine(){
      //todo 获取公钥
      let publickey = "02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4";
      // let hash = this.$route.query.hash;
      let result = await confirmFinance("1a2b",publickey);
      //todo 传给插件
      this.$router.push({path:'/finance'})
    }
  },
   mounted: function() {
    //todo 调用异步
    // let hash = this.$route.query.hash;
    //  getTransaction(hash);
     document.getElementById("height").innerHTML = "123123";
     document.getElementById("block_hash").innerHTML = "123123";
     document.getElementById("transaction_hash").innerHTML = "123123";
     document.getElementById("title").innerHTML = "123123";
     document.getElementById("name").innerHTML = "123123";
     document.getElementById("cid").innerHTML = "123123";
     document.getElementById("amount").innerHTML = "123123";
     document.getElementById("contract").innerHTML = "123123";
   }


}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
</style>>
