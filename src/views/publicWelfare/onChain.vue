<template>
  <div class="pageWrap f-wrap-table">
    <div class="page-main content-middle">
      <div class="chain-form">
        <h3 class="formTitle">请认真填写以下数据，确保能准确上链</h3>
        <div class="formbox">
          <div class="din-col">
            <div class="din">
              <span class="lab">捐赠姓名</span>
              <input
                class="border-box"
                type="text"
                maxlength="12"
                placeholder="请输入捐赠者姓名"
                v-model="donationName"
              />
            </div>
            <div class="din">
              <span class="lab">捐赠内容</span>
              <input
                class="border-box"
                type="text"
                maxlength="12"
                placeholder="请输入捐赠内容"
                v-model="donationContent"
              />
            </div>
          </div>

          <div class="din-col">
            <div class="din">
              <span class="lab">捐赠地址</span>
              <input
                class="border-box"
                type="text"
                placeholder="请输入捐赠地址"
                maxlength="50"
                v-model="donationAddress"
              />
            </div>
            <div class="din">
              <span class="lab">受益人</span>
              <input
                class="border-box"
                type="text"
                maxlength="12"
                placeholder="请输入受益人"
                v-model="beneficiary"
              />
            </div>
          </div>

          <div class="din-col">
            <div class="din">
              <span class="lab">捐赠机构</span>
              <input
                class="border-box"
                type="text"
                maxlength="12"
                placeholder="请输入捐赠机构"
                v-model="mechanism"
              />
            </div>
            <div class="din">
              <span class="lab">捐赠说明</span>
              <input
                class="border-box"
                type="text"
                placeholder="请输入捐赠说明"
                v-model="explain"
                maxlength="30"
              />
            </div>
          </div>

          <div class="btnbox">
            <a @click="doConfirm($event)" class="chain-btn pointer">存证上链</a>
            <a ref="sendTx"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {saveDonor, getTransaction} from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'

  import {utils} from '@/assets/js/pattern'
  export default {
    data () {
      return {
        donationName: '',
        donationContent: '',
        donationAddress: '',
        beneficiary: '',
        mechanism: '',
        explain: '',
      }
    },
    methods: {
      async doConfirm (e) {
       let that = this

        let payload = {
          name: that.donationName,
          content: that.donationContent,
          beneficiaryAddress: that.donationAddress,
          beneficiary: that.beneficiary,
          donation: that.mechanism,
          state: that.explain,
        }
        let pk = that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }

        
        if( utils.isNullOrEmpty(that.donationName)){
           return that.$toast('请输入捐赠者姓名', 3000)
        }
        if( utils.isNullOrEmpty(that.donationContent)){
           return that.$toast('请输入捐赠内容', 3000)
        }
        if( utils.isNullOrEmpty(that.donationAddress)){
           return that.$toast('请输入捐赠地址', 3000)
        }
        if( utils.isNullOrEmpty(that.beneficiary)){
           return that.$toast('请输入受益人', 3000)
        }
        if( utils.isNullOrEmpty(that.mechanism)){
           return that.$toast('请输入捐赠机构', 3000)
        }
        if( utils.isNullOrEmpty(that.explain)){
           return that.$toast('请输入捐赠说明', 3000)
        }
        


        let tx = await saveDonor(payload, pk)
        let sendTx = JSON.stringify(tx)
        that.$refs.sendTx.href =
          'javascript:sendMessageToContentScriptByPostMessage(\'' + sendTx + '\')'
        that.$refs.sendTx.click()
        return that.$toast('事务已生成，请打开TDOS插件进行广播', 3000)
        
      },
      timer_tx () {
         let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash+'\n' + ',请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(hash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
                that.$router.push({path:'/publicWelfare/search'})
              }

            })

          }, 1000)
        }
      },
     
      
    },
    mounted () {
      this.timer = setInterval(this.timer_tx, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
      if (this.timer1) {
        clearInterval(this.timer1)
      }
    }
  }
</script>

<style scoped lang="less">
  @import url(../../assets/less/publicWelfare.less);
</style>>
