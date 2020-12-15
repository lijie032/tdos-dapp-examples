<template>
  <div class="pageWrap search_result_wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
    <div class="page-main ">
      <div class="result-content">
        <h3 class="r_title">查询信息</h3>
        <div class="result-info">
          <div class="r-content">
            <div class="d-text">
              <span class="s-icon"></span>
              <div class="lab">商品产地：</div>
              <div class="lab-info"><a id="place"></a></div>
            </div>

            <div class="d-text">
              <span class="s-icon"></span>
              <div class="lab">商品品牌：</div>
              <div class="lab-info"><a id="brand"></a></div>
            </div>
            <div class="d-text">
              <span class="s-icon"></span>
              <div class="lab">商品种类：</div>
              <div class="lab-info"><a id="kind"></a></div>
            </div>
            <div class="d-text">
              <span class="s-icon"></span>
              <div class="lab">商品价格：</div>
              <div class="lab-info"><a id="price"></a></div>
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
        type: 0,
        isHome: true,
        isIndex: false,
        backPath: '/shopping'
      }
    },
    components: {
      explorer
    },
    methods: {
      back () {
        this.$router.push({path: '/shopping'})
      }
    },
    mounted: function () {
      let t = eval('(' + this.$route.query.transaction + ')')
      let result = eval('(' + this.$route.query.result + ')');
      let tx_hash = this.$route.query.tx_hash
      document.getElementById('block_hash').innerHTML = t.blockHash
      document.getElementById('transaction_hash').innerHTML = tx_hash
      document.getElementById('height').innerHTML = t.blockHeight
      document.getElementById('place').innerHTML = result.place
      document.getElementById('brand').innerHTML = result.brand
      document.getElementById('kind').innerHTML = result.kind
      document.getElementById('price').innerHTML = result.price
    }
  }
</script>

<style scoped lang="less">

  @import url(../../assets/less/logistics.less);
  @import url(../../assets/less/shopping.less);
</style>>
