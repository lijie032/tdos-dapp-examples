<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap n-search-result-wrap">

      <explorer :isHome="isHome" :type="type" :isIndex="isIndex"></explorer>
      <div class="page-main content-middle">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">登记信息</h3>
                  <div class="d-in">
                      <div class="lab">登记姓名</div>
                     <span><a id="name"></a></span>
                  </div>
                  <div class="d-in">
                      <div class="lab">赠予内容</div>
                     <span><a id="info"></a></span>
                  </div>
                  <div class="d-in">
                      <div class="lab">赠与对象</div>
                     <span><a id="to"></a></span>
                  </div>
                   <div class="d-in">
                      <div class="lab">赠予条件</div>
                      <div class="d-in-right">
                          当前区块高度>
                         <span><a id="height"></a></span>
                       </div>

                  </div>
                  <div class="d-in">
                    <div class="lab">区块高度</div>
                    <span><a id="block_height"></a></span>
                  </div>
                  <div class="d-in">
                    <div class="lab">区块哈希</div>
                    <span><a id="block_hash"></a></span>
                  </div>
                  <div class="d-in">
                    <div class="lab">事务哈希</div>
                    <span><a id="transaction_hash"></a></span>
                  </div>
                  <div class="btnbox">
                       <a class="btn pointer" @click="back">信息无误</a>
                  </div>
              </div>
          </div>

      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/assets.less);
</style>>

<script>
  import explorer from '@/components/browser1.vue'

  export default {
    data () {
      return {
        type:1,
       isHome:true,
       isIndex:false
      }
    },
    components: {
      explorer
    },
    methods: {
      back () {
        this.$router.push({path: '/assets'})
      }
    }, mounted: function () {
      let t = this.$route.query.transaction;
      let result = this.$route.query.result;
      let tx_hash = this.$route.query.tx_hash;
      document.getElementById("block_hash").innerHTML = t.blockHash;
      document.getElementById("transaction_hash").innerHTML = tx_hash;
      document.getElementById("block_height").innerHTML = t.blockHeight;
      document.getElementById("height").innerHTML = result.condition;
      document.getElementById("name").innerHTML = result.name;
      document.getElementById("info").innerHTML = result.content;
      document.getElementById("to").innerHTML = result.granter;
    }
  }
</script>
