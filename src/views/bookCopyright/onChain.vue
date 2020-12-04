<template>
  <div class="pageWrap f-wrap-table  a_onChain_wrap">


    <div class="page-main content-middle">
      <div class="a_form_box">
        <div class="marginlr60">
          <h3 class="from_title">登记信息</h3>
          <div class="d-in">
            <div class="lab">登记姓名</div>
            <input class="border-box" placeholder="请输入登记姓名" ref="name"/>
          </div>
          <div class="d-in">
            <div class="lab">著作标题</div>
            <input class="border-box" placeholder="请输入著作标题" ref="title"/>
          </div>
          <div class="d-in">
            <div class="lab">身份证号</div>
            <input class="border-box" placeholder="请输入身份证号" ref="code"/>
          </div>
          <div class="d-in">
            <div class="lab">创意说明</div>
            <input class="border-box" placeholder="请输入创意说明" ref="info"/>
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
  @import url(../../assets/less/bookCopyright.less);
</style>>

<script>
  import {saveBook} from '@/api/dapps'
  import {getTransaction} from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'
  export default {
    data () {
      return {
        firstSend: 0
      }
    },
    components: {},
    methods: {
      async submit () {
        let that = this
        let name = this.$refs.name.value
        let title = this.$refs.title.value
        let code = this.$refs.code.value
        let info = this.$refs.info.value
        let payload = {
          name: name, title: title, cid: code, info: info
        }
        let pk = await that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }

        let Book = await saveBook(payload, pk)
        let sendTx = JSON.stringify(Book)

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
                that.$router.push({path:'/bookCopyright/search'})
              }

            })

          }, 1000)
        }
      }
    },
    mounted() {
      this.timer = setInterval(this.timer_tx, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer);
      if (this.timer1) {
        clearInterval(this.timer1)
      }
    }
  }
</script>
