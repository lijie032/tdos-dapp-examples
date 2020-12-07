<template>
  <div class="pageWrap search_result_wrap">
      <div class="page-main ">
           <div class="result-content">
              <h3 class="r_title">查询信息</h3>
              <div class="result-info">
                  <div class="r-content">

                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">寄件人姓名：</div>
                           <div class="lab-info"><a id="send_name"></a></div>
                       </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">寄件人电话：</div>
                           <div class="lab-info"><a id="send_phone"></a></div>
                       </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">物品类型：</div>
                           <div class="lab-info"><a id="send_type"></a></div>
                       </div>
                       <div class="d-text">
                          <span class="s-icon"></span>
                          <div class="lab">收件人姓名：</div>
                          <div class="lab-info"><a id="collect_name"></a></div>
                       </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">收件人地址：</div>
                           <div class="lab-info"><a id="collect_address"></a></div>
                       </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">收件人电话：</div>
                           <div class="lab-info"><a id="collect_phone"></a></div>
                       </div>
                      <div class="d-text">
                        <span class="s-icon"></span>
                        <div class="lab">区块高度：</div>
                        <div class="lab-info"><a id="height"></a></div>
                      </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">区块哈希：</div>
                           <div class="lab-info"><a id="block_hash"></a></div>
                       </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">事务哈希：</div>
                           <div class="lab-info"><a id="transaction_hash"></a></div>
                       </div>

                       <div class="r-btn-box">
                           <a class="pointer btnsure" @click="back">返回</a>
                       </div>
                  </div>

              </div>
           </div>
      </div>
  </div>
</template>

<script>
  import explorer from '@/components/browser.vue'

  export default {
    data () {
      return {}
    },
    components: {
      explorer
    },
    methods: {
      back () {
        this.$router.push({path: '/logistics'})
      }
    }, mounted: function () {
      let t = this.$route.query.transaction;
      let result = this.$route.query.result;
      let tx_hash = this.$route.query.tx_hash;
      document.getElementById("send_name").innerHTML = result.sender;
      document.getElementById("send_phone").innerHTML = result.senderPhone;
      document.getElementById("send_type").innerHTML = result.goods;
      document.getElementById("collect_name").innerHTML = result.receiver;
      document.getElementById("collect_address").innerHTML = result.address;
      document.getElementById("collect_phone").innerHTML = result.receiverPhone;
      document.getElementById("block_hash").innerHTML = t.blockHash;
      document.getElementById("transaction_hash").innerHTML = tx_hash;
      document.getElementById("height").innerHTML = t.blockHeight;

    }
  }
</script>

<style scoped lang="less">

@import url(../../assets/less/logistics.less);
</style>>
