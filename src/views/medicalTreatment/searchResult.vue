<template>
  <div class="pageWrap search_result_wrap bgf6f6f6">
      <div class="page-main ">
           <div class="result-content">
              <h3 class="r_title">病人信息</h3>
              <div class="result-info">
                  <div class="r-content">

                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">病人姓名：</div>
                           <div class="lab-info"><a id="name"></a></div>
                       </div>
                        <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">就诊时间：</div>
                           <div class="lab-info"><a id="time"></a></div>
                       </div>
                        <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">就诊医院：</div>
                           <div class="lab-info"><a id="medical"></a></div>
                       </div>
                        <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">就诊医生：</div>
                           <div class="lab-info"><a id="doctor"></a></div>
                       </div>
                        <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">就诊描述：</div>
                           <div class="lab-info"><a id="info"></a></div>
                       </div>
                        <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">区块高度：</div>
                           <div class="lab-info"><a id="height"></a></div>
                       </div>
                        <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">事务哈希：</div>
                           <div class="lab-info"><a id="hash"></a></div>
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
        this.$router.push({path: '/medicalTreatment'})
      }
    }, mounted: function () {
      // let transaction = this.$route.query.transaction;
      // let result = this.$route.query.result;
      document.getElementById("name").innerHTML = "123123";
      document.getElementById("time").innerHTML = "123123";
      document.getElementById("medical").innerHTML = "123123";
      document.getElementById("doctor").innerHTML = "123123";
      document.getElementById("info").innerHTML = "123123";
      document.getElementById("height").innerHTML = "123123";
      document.getElementById("hash").innerHTML = "123123";
    }
  }
</script>

<style scoped lang="less">

@import url(../../assets/less/medicalTreatment.less);
</style>>
