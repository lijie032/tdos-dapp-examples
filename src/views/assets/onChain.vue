<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>

    <div class="page-main content-middle">
      <div class="a_form_box">
        <div class="marginlr60">
          <h3 class="from_title">登记信息</h3>
          <div class="d-in">
            <div class="lab">登记姓名</div>
            <input class="border-box" placeholder="请输入登记姓名" ref="name" v-removeSymbol/>
          </div>
          <div class="d-in">
            <div class="lab">赠予内容</div>
            <input class="border-box" placeholder="请输入赠予内容" ref="info" v-removeSymbol/>
          </div>
          <div class="d-in">
            <div class="lab">赠予对象</div>
            <input class="border-box" placeholder="请输入赠予对象" ref="to" v-removeSymbol/>
          </div>
          <div class="d-in">
            <div class="lab">赠予条件</div>
            <div class="d-in-right">
              当前区块高度>
              <input class="border-box in-height" ref="height" v-limitNum/>
            </div>

          </div>
          <div class="btnbox">
            <a class="btn pointer" @click="submit">存证上链</a>
            <a ref="sendTx"></a>
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
  import {saveFund} from '@/api/dapps'
  import explorer from '@/components/browser1.vue'
  import {getTransaction} from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'
  import {utils} from '@/assets/js/pattern'

  export default {
    data () {
      return {
        type: 1,
        isHome: true,
        isIndex: false,
        backPath: '/assets'
      }
    },
    components: {
      explorer
    },
    methods: {
      async submit () {
        let that = this
        let name = this.$refs.name.value
        let info = this.$refs.info.value
        let to = this.$refs.to.value
        let height = this.$refs.height.value
        let payload = {
          name: name, content: info, granter: to, condition: height
        }
        if (utils.isNullOrEmpty(name)) {
          return that.$toast('请输入登记姓名', 3000)
        }
        if (utils.isNullOrEmpty(info)) {
          return that.$toast('请输入登赠予内容', 3000)
        }
        if (utils.isNullOrEmpty(to)) {
          return that.$toast('请输入赠予对象', 3000)
        }
        if (utils.isNullOrEmpty(height)) {
          return that.$toast('请输入高度', 3000)
        }
        let pk = that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let Fund = await saveFund(payload, pk)
        let sendTx = JSON.stringify(Fund)
        that.$refs.sendTx.href =
          'javascript:sendMessageToContentScriptByPostMessage(\'' + sendTx + '\')'
        that.$refs.sendTx.click()
        return that.$toast('事务已生成，请打开TDOS插件进行广播', 3000)

      },
      timer_tx () {
        let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash + ',' + '\n' + '请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(hash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
                that.$router.push({path: '/assets/search'})
              }

            })

          }, 1000)
        }
      }
    },
    mounted () {
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
