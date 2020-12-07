<template>
  <div class="pageWrap f-chain-wrap dis-table search-result-wrap bgf6f6f6">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex"></explorer>
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
                      <p class="p-text">公司名称：<a id="title"></a></p>
                  </div>
                  <div class="d-info">
                    <span class="icon"></span>
                    <p class="p-text">法人名称：<a id="name"></a></p>
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
                      <p class="p-text">是否认证：<a id="attestation"></a></p>
                  </div>
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
                    <p class="p-text">事务哈希：<a id="tx_hash"></a></p>
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
import explorer from '@/components/browser1.vue'
import {getFinance, getTransaction} from '@/api/dapps'

export default{
  data(){
    return{
       type:0,
        isHome:true,
        isIndex:false
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

    let t = this.$route.query.transaction;
    let result = this.$route.query.result;
    let tx_hash = this.$route.query.tx_hash;
    document.getElementById("height").innerHTML = t.blockHeight;
    document.getElementById("block_hash").innerHTML = t.blockHash;
    document.getElementById("title").innerHTML = result.title;
    document.getElementById("name").innerHTML = result.name;
    document.getElementById("amount").innerHTML = result.sum;
    document.getElementById("contract").innerHTML = result.contract;
    document.getElementById("tx_hash").innerHTML = tx_hash;
    let confirm = result.confirm;
    if (confirm) {
      document.getElementById("attestation").innerHTML = "是";
    }else {
      document.getElementById("attestation").innerHTML = "否";
    }


  }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
</style>>
