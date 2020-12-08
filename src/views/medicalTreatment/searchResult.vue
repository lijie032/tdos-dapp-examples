<template>
  <div class="pageWrap search_result_wrap bgf6f6f6">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
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
  import explorer from '@/components/browser1.vue'

  export default {
    data () {
      return {
         type:0,
        isHome:true,
        isIndex:false,
        backPath:'/medicalTreatment'
      }
    },
    components: {
      explorer
    },
    methods: {
      back () {
        this.$router.push({path: '/medicalTreatment'})
      },
       isObject(bar)
        {
            if((typeof bar==='object')&&(bar!==null))
                return true;
            else
                return false;
        }
    }, mounted: function () {
     
      let t = this.$route.query.transaction;
      let result = this.$route.query.result;
      let tx_hash = this.$route.query.tx_hash;

      //console.log(t);
      document.getElementById("block_hash").innerHTML = t.blockHash;
      document.getElementById("transaction_hash").innerHTML = tx_hash;
      document.getElementById("block_height").innerHTML = t.blockHeight;
      document.getElementById("name").innerHTML = result.name;
      document.getElementById("time").innerHTML = result.time;
      document.getElementById("medical").innerHTML = result.hospital;
      document.getElementById("doctor").innerHTML = result.doctor;
      document.getElementById("info").innerHTML = result.info;
    }
  }
</script>

<style scoped lang="less">

@import url(../../assets/less/medicalTreatment.less);
</style>>
