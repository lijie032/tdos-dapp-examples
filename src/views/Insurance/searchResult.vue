<template>
  <div class="pageWrap search_result_wrap">
      <div class="page-main ">
           <div class="result-content">
              <h3 class="r_title">查询信息</h3>
              <div class="result-info">
                  <div class="r-content">

                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">用户姓名：</div>
                           <div class="lab-info"><a id="name"></a></div>
                       </div>

                      <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">航班信息：</div>
                           <div class="lab-info"><a id="info"></a></div>
                       </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">起保时间：</div>
                           <div class="lab-info"><a id="time"></a></div>
                       </div>
                       <div class="d-text">
                          <span class="s-icon"></span>
                          <div class="lab">是否延误：</div>
                          <div class="lab-info"><a id="bool"></a></div>
                       </div>
                       <div class="d-text">
                          <span class="s-icon"></span>
                          <div class="lab">是否理赔：</div>
                          <div class="lab-info"><a id="bool2"></a></div>
                       </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">保单号码：</div>
                           <div class="lab-info"><a id="numb"></a></div>
                       </div>
                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">区块高度：</div>
                           <div class="lab-info"><a id="block_height"></a></div>
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
        this.$router.push({path: '/Insurance'})
      }
    }, mounted: function () {
      let t = this.$route.query.transaction;
      let result = this.$route.query.result;
      let tx_hash = this.$route.query.tx_hash;
      document.getElementById("block_hash").innerHTML = t.blockHash;
      document.getElementById("transaction_hash").innerHTML = tx_hash;
      document.getElementById("block_height").innerHTML = t.blockHeight;
      document.getElementById("name").innerHTML = result.name;
      document.getElementById("info").innerHTML = result.info;
      document.getElementById("time").innerHTML = result.time;
      if (result.delay){
        document.getElementById("bool").innerHTML = "是";
      }else {
        document.getElementById("bool").innerHTML = "否";
      }
      if (result.claim){
        document.getElementById("bool2").innerHTML = "是";
      }else {
        document.getElementById("bool2").innerHTML = "否";
      }
      document.getElementById("numb").innerHTML = result.num;
    }
  }
</script>

<style scoped lang="less">

@import url(../../assets/less/logistics.less);
@import url(../../assets/less/Insurance.less);
</style>>
