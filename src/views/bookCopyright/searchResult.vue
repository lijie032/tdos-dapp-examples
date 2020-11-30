<template>
  <div class="pageWrap search_result_wrap bgf6f6f6">
    <div class="page-main ">
      <div class="result-content">
        <h3 class="r_title">版权信息</h3>
        <div class="result-info">
          <div class="r-content">

            <div class="d-text">
              <span class="s-icon"></span>
              <div class="lab">登记姓名：</div>
              <div class="lab-info"><a id="name"></a></div>
            </div>
            <div class="d-text">
              <span class="s-icon"></span>
              <div class="lab">著作标题：</div>
              <div class="lab-info"><a id="title"></a></div>
            </div>
            <div class="d-text">
              <span class="s-icon"></span>
              <div class="lab">身份证号：</div>
              <div class="lab-info"><a id="code"></a></div>
            </div>
            <div class="d-text">
              <span class="s-icon"></span>
              <div class="lab">创意说明：</div>
              <div class="lab-info"><a id="info"></a></div>
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
        this.$router.push({path: '/bookCopyright'})
      }
    },
    mounted: function () {
      let t = this.$route.query.transaction
      let result = this.$route.query.result
      let tx_hash = this.$route.query.tx_hash
      document.getElementById('block_hash').innerHTML = t.blockHash
      document.getElementById('transaction_hash').innerHTML = tx_hash
      document.getElementById('height').innerHTML = t.blockHeight
      document.getElementById('name').innerHTML = result.name
      document.getElementById('title').innerHTML = result.title
      document.getElementById('code').innerHTML = result.cid
      document.getElementById('info').innerHTML = result.info
    }
  }
</script>

<style scoped lang="less">

  @import url(../../assets/less/medicalTreatment.less);
</style>>
