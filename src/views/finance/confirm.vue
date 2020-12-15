<template>
  <div class="pageWrap f-chain-wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
    <div class="left">
    </div>
    <div class="right">
      <div class="formbox confirmBox">
        <div class="f-form-box">
          <h3>请认真确认以下数据，确保能准确上链</h3>
          <div class="d-info">
            <span class="icon"></span>
            <p class="p-text">区块高度：<a id="height"></a></p>
          </div>
          <div class="d-info">
            <span class="icon"></span>
            <p class="p-text">区块哈希：<a id="block_hash"></a></p>
          </div>
          <div class="d-info">
            <span class="icon"></span>
            <p class="p-text">事务哈希：<a id="transaction_hash"></a></p>
          </div>
          <div class="d-info">
            <span class="icon"></span>
            <p class="p-text">企业名称：<a id="title"></a></p>
          </div>
          <div class="d-info">
            <span class="icon"></span>
            <p class="p-text">法人名称：<a id="name"></a></p>
          </div>
          <div class="d-info">
            <span class="icon"></span>
            <p class="p-text">法人证件：<a id="cid"></a></p>
          </div>
          <div class="d-info">
            <span class="icon"></span>
            <p class="p-text">融资金额：<a id="amount"></a></p>
          </div>
          <div class="d-info">
            <span class="icon"></span>
            <p class="p-text">合同编号：<a id="contract"></a></p>
          </div>

          <div class="btnbox" v-if="isOnchain">
            <a class="pointer chain-btn" @click="examine">审核通过</a>
            <a ref="sendTx"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import explorer from '@/components/browser1.vue'
  import {confirmFinance, getTransaction} from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'

  export default {
    data () {
      return {
        isOnchain:true,
         type:0,
        isHome:true,
        isIndex:false,
        backPath:'/finance'
      }
    },
    components: {
      explorer
    },
    methods: {
      async examine () {
        let that = this
        let tx_hash = this.$route.query.tx_hash
        let pk = that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let result = await confirmFinance(tx_hash, pk)
        let sendTx = JSON.stringify(result)
        that.$refs.sendTx.href =
          'javascript:sendMessageToContentScriptByPostMessage(\'' + sendTx + '\')'
        that.$refs.sendTx.click()
        return that.$toast('事务已生成，请打开TDOS插件进行广播', 3000)
      },
      timer_tx(){
        let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash+","+'\n' + '请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(hash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
                that.$router.push({path:'/finance'})
              }

            })

          }, 1000)
        }
      }
    },
    mounted: function () {
      let that = this;
      let t = eval('(' + this.$route.query.transaction + ')')
      let result = eval('(' + this.$route.query.result + ')');
      let tx_hash = this.$route.query.tx_hash
      document.getElementById('height').innerHTML = t.blockHeight
      document.getElementById('block_hash').innerHTML = t.blockHash
      document.getElementById('transaction_hash').innerHTML = tx_hash
      document.getElementById('title').innerHTML = result.title
      document.getElementById('name').innerHTML = result.name
      document.getElementById('cid').innerHTML = result.cid
      document.getElementById('amount').innerHTML = result.sum
      document.getElementById('contract').innerHTML = result.contract
      if (result.confirm) {
        that.isOnchain = false;
      }
      this.timer = setInterval(this.timer_tx, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
      if (this.timer1) {
        clearInterval(this.timer1)
      }
    }

    }
</script>

<style scoped lang="less">
  @import url(../../assets/less/finance.less);
</style>>
