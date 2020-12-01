<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">


    <div class="page-main content-middle">
      <div class="a_form_box">
        <div class="marginlr60">
          <h3 class="from_title">上链信息</h3>
          <div class="d-in">
            <div class="lab">WPQR号:</div>
            <input class="border-box" placeholder="" v-model="wpqr"/>
          </div>
          <div class="d-in">
            <div class="lab">焊接人员名称:</div>
            <input class="border-box" placeholder="" v-model="person"/>
          </div>
          <div class="d-in">
            <div class="lab">设备名称:</div>
            <input class="border-box" placeholder="" v-model="equipment"/>
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
  @import url(../../assets/less/welding.less);
</style>>

<script>
  import {saveWeld} from '@/api/dapps'

  export default {
    data () {
      return {
        wpqr:"",
        person:"",
        equipment:""
      }
    },
    components: {},
    methods: {
      async submit(){
        let that = this
        let payload = {
          wpqr: that.wpqr,
          welder: that.person,
          device: that.equipment
        }
        let pk = that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }

        let tx = await saveWeld(payload, pk)
        let sendTx = JSON.stringify(tx)
        that.$refs.sendTx.href =
          'javascript:sendMessageToContentScriptByPostMessage(\'' + sendTx + '\')'
        that.$refs.sendTx.click()
        return that.$toast('事务已生成，请打开TDOS插件进行广播', 3000)
      },
    }
  }
</script>
