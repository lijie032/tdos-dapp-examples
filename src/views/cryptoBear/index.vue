<template>
  <div class="pageWrap bg-wrap">
    <explorer></explorer>
    <div class="page-main">
      <div class="p-container">
        <h3 class="page-title">欢迎来到TDOS加密熊</h3>
        <div class="box-welcome">
          <div class="cb-icon"></div>
          <p class="pmess">当前您暂没拥有加密熊<br>请点击下方购买按钮</p>
          <div class="btnbox">
            <a class="pointer cb-btn btn-buy" @click="isOnchain">购买</a>
            <a ref="sendTx"></a>
          </div>
        </div>
      </div>
    </div>

    <!--点击购买弹出框-->
    <!--        <div class="trans" v-if="isOnchain">-->
    <!--            <div class="cb-comfirmbox">-->
    <!--                <a class="btn-close pointer" @click="isOnchain=false"></a>-->
    <!--                <p class="p-title">恭喜您！购买成功！以下是您的加密熊事务哈希：</p>-->
    <!--                <p class="p-hash">d2a1sd56wq4eqw4e6fa1fsd5gd4sgds49sd14f6df4s9df</p>-->
    <!--                <div class="btnbox">-->
    <!--                    <a class="pointer cb-btn btn-sure" @click="test">确认</a>-->
    <!--                </div>-->
    <!--            </div>-->
    <!--        </div>-->
  </div>
</template>
<script>
  import explorer from '@/components/browser1.vue'
  import {buyBear, hasBear} from '@/api/dapps'

  export default {
    data () {
      return {}
    },
    components: {
      explorer
    },
    methods: {
      async get () {
        let that = this
        let pk = that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let has = await hasBear(pk)
        if (has) {
          that.$router.push({path: '/cryptoBear/bearInfo'})
        }
      },
      async isOnchain () {
        let that = this
        let pk = that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let payload = {
          username: 'bear', birth: '2020', aggressivity: 300, bloodvolume: 5000, stature: 160, tonnage: 1, defense: 1300
        }
        let Bear = await buyBear(payload, pk)
        let sendTx = JSON.stringify(Bear)
        that.$refs.sendTx.href =
          'javascript:sendMessageToContentScriptByPostMessage(\'' + sendTx + '\')'
        that.$refs.sendTx.click()
        return that.$toast('事务已生成，请打开TDOS插件进行广播', 3000)
      },
      get(){
        let that = this;
        let t = that.getRes();
        if (t != ""){
          // this.$router.push({path:'/assets'})
          return that.$toast("事务广播成功，事务哈希为："+t, 3000);
        }
      }
    },
    mounted () {
      this.timer = setInterval(this.get, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
    }
  }
</script>
<style scoped lang="less">
  @import url(../../assets/less/cryptoBear.less);
</style>
