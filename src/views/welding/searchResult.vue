<template>
  <div class="pageWrap search_result_wrap bgf6f6f6">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex"></explorer>
      <div class="page-main ">
           <div class="result-content">
              <h3 class="r_title">上链信息</h3>
              <div class="result-info">
                  <div class="r-content">

                       <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">WPQR号：</div>
                           <div class="lab-info"><a id="wqpr"></a></div>
                       </div>

                        <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">焊接人员名称：</div>
                           <div class="lab-info"><a id="person"></a></div>
                       </div>
                        <div class="d-text">
                           <span class="s-icon"></span>
                           <div class="lab">设备名称：</div>
                           <div class="lab-info"><a id="name"></a></div>
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
  import explorer from '@/components/browser1.vue'

  export default {
    data () {
      return {
        type:0,
         isHome:true,
        isIndex:false
      }
    },
    components: {
      explorer
    },
    methods: {
      back () {
        this.$router.push({path: '/welding'})
      }
    },
    mounted: function () {
      let t = this.$route.query.transaction
      let result = this.$route.query.result
      let tx_hash = this.$route.query.tx_hash
      document.getElementById('block_hash').innerHTML = t.blockHash
      document.getElementById('transaction_hash').innerHTML = tx_hash
      document.getElementById('height').innerHTML = t.blockHeight
      document.getElementById('wqpr').innerHTML = result.wpqr
      document.getElementById('person').innerHTML = result.welder
      document.getElementById('name').innerHTML = result.device
    }
  }
</script>

<style scoped lang="less">

@import url(../../assets/less/medicalTreatment.less);
@import url(../../assets/less/welding.less);
</style>>
