<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap n-search-result-wrap">


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
        this.$router.push({path: '/assets'})
      }
    }, mounted: function () {
      // let transaction = this.$route.query.transaction;
      // let result = this.$route.query.result;
      document.getElementById("name").innerHTML = "123123";
      document.getElementById("info").innerHTML = "123123";
      document.getElementById("to").innerHTML = "123123";
      document.getElementById("height").innerHTML = "123123";
    }
  }
</script>
