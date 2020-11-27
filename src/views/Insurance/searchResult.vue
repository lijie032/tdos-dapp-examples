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
        this.$router.push({path: '/Insurance'})
      }
    }, mounted: function () {
      // let transaction = this.$route.query.transaction;
      // let result = this.$route.query.result;
      document.getElementById("name").innerHTML = "123123";
      document.getElementById("info").innerHTML = "123123";
      document.getElementById("time").innerHTML = "123123";
      document.getElementById("bool").innerHTML = "123123";
      document.getElementById("bool2").innerHTML = "123123";
      document.getElementById("numb").innerHTML = "123123";
      document.getElementById("height").innerHTML = "123123";
      document.getElementById("block_hash").innerHTML = "123123";
      document.getElementById("transaction_hash").innerHTML = "123123";
    }
  }
</script>

<style scoped lang="less">

@import url(../../assets/less/logistics.less);
@import url(../../assets/less/Insurance.less);
</style>>
