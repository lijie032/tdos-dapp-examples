<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">


      <div class="page-main content-middle">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">登记信息</h3>
                  <div class="d-in">
                      <div class="lab">登记姓名</div>
                     <input class="border-box" placeholder="请输入登记姓名" ref="name"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">赠予内容</div>
                     <input class="border-box" placeholder="请输入登赠予内容" ref="info"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">赠与对象</div>
                     <input class="border-box" placeholder="请输入赠予对象" ref="to"/>
                  </div>
                   <div class="d-in">
                      <div class="lab">赠予条件</div>
                      <div class="d-in-right">
                          当前区块高度>
                          <input class="border-box in-height" ref="height"/>
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
  import { saveFund } from '@/api/dapps'
  import explorer from '@/components/browser.vue'

  export default{
    data(){
      return{
      }
    },
    components:{
      explorer
    },
    methods:{
      async submit(){
        let that = this;
        let name = this.$refs.name.value;
        let info = this.$refs.info.value;
        let to = this.$refs.to.value;
        let height = this.$refs.height.value;
        let payload = {
          name:name, content:info, granter:to, condition:height
        };
        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        let Fund = await saveFund(payload, pk);
        let sendTx = JSON.stringify(Fund);
        that.$refs.sendTx.href =
          "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
        that.$refs.sendTx.click();
        return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);

      },
      get(){
        let that = this;
        let t = that.getRes();
        if (t != ""){
          this.$router.push({path:'/assets'})
          return that.$toast("事务广播成功，事务哈希为："+t, 3000);
        }
      }
    },
    mounted() {
      this.timer = setInterval(this.get, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timer);
    }
  }
</script>
