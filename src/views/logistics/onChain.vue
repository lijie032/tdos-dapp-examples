<template>
  <div class="pageWrap onChain-wrap">

      <div class="page-main">

         <div class="chain-form">
             <h3 class="formTitle">请认真填写以下数据，确保能准确上链</h3>
             <div class="formbox">

                 <div class="din-userInfo">
                    <div class="din">
                        <span class="lab">收件人信息</span>
                        <div class="r-userInfo">
                            <span class="s-lab">收件人姓名</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人姓名" ref="collect_name"/></div>
                        </div>
                        <div class="r-userInfo">
                            <span class="s-lab">收件人地址</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人地址" ref="collect_address"/></div>
                        </div>
                       <div class="r-userInfo">
                            <span class="s-lab">收件人电话</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人电话" ref="collect_phone"/></div>
                        </div>
                     </div>
                 </div>

                 <div class="din-col">
                     <div class="din">
                        <span class="lab">物品类型</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入寄件物品类型" ref="send_type"/>
                     </div>
                     <div class="din">
                         <span class="lab">真实姓名</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入真实姓名" ref="send_name"/>
                     </div>
                 </div>


                 <div class="din-col">
                     <div class="din">
                        <span class="lab">身份证号码</span>
                         <input class="border-box" type="text" placeholder="请输入身份证号码" ref="send_numb"/>
                     </div>
                     <div class="din">
                         <span class="lab">电话号码</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入电话号码" ref="send_phone"/>
                     </div>
                 </div>


                 <div class="btnbox">
                     <a class="chain-btn pointer" @click="submit">寄件上链</a>
                     <a ref="sendTx"></a>
                 </div>
             </div>
         </div>
      </div>
  </div>
</template>

<script>
  import { saveLogistics } from '@/api/dapps'
  import explorer from '@/components/browser.vue'
  import {showLoading, hideLoading} from '@/assets/js/loading'
  import { getTransaction } from "@/api/dapps"
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
        let collect_name = this.$refs.collect_name.value;
        let collect_address = this.$refs.collect_address.value;
        let collect_phone = this.$refs.collect_phone.value;
        let send_type = this.$refs.send_type.value;
        let send_name = this.$refs.send_name.value;
        let send_numb = this.$refs.send_numb.value;
        let send_phone = this.$refs.send_phone.value;
        let payload = {
          sender:send_name,address:collect_address,senderPhone:send_phone,goods:send_type,receiver:collect_name,cid:send_numb,receiverPhone:collect_phone
        };

        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        let Logistics = await saveLogistics(payload, pk);
        let sendTx = JSON.stringify(Logistics);
        that.$refs.sendTx.href =
          "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
        that.$refs.sendTx.click();
        return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
        // this.$router.push({path:'/logistics'})
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
                that.$router.push({path:'/logistics/search'})
              }

            })

          }, 1000)
        }
      }
    },
    mounted(){
      let that = this;
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
@import url(../../assets/less/logistics.less);
</style>>
