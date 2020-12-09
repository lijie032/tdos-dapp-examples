<template>
  <div class="pageWrap f-chain-wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
      <div class="left">
      </div>
      <div class="right">
         <div class="formbox">
              <div class="f-form-box">
                  <h3>请认真填写以下数据，确保能准确上链</h3>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text"  placeholder="企业名称" ref="title" v-removeSymbol/></div>
                     <div class="din border-box din-2"><input type="text"  placeholder="法人姓名" ref="name" v-removeSymbol/></div>
                  </div>
                   <div class="din-col din-col2">
                     <div class="din border-box"><input type="text"  placeholder="法人证件" ref="cid" v-removeSymbol/></div>
                     <div class="din border-box din-2"><input type="text"  placeholder="融资金额" ref="sum" v-limitNum/></div>
                  </div>
                  <div class="din-col">
                     <div class="din"><input type="text" placeholder="合同编号" ref="contract" v-removeSymbol/></div>
                  </div>
                  <div class="btnbox">
                      <a class="pointer chain-btn" @click="save">存证上链</a>
                      <a ref="sendTx"></a>
                  </div>
              </div>
         </div>
      </div>
  </div>
</template>

<script>
import explorer from '@/components/browser1.vue'
import { saveFinance,getTransaction } from '@/api/dapps'
import {showLoading, hideLoading} from '@/assets/js/loading'
import {utils} from '@/assets/js/pattern'
export default{
  data(){
    return{
      firstSend: 0,
      type:0,
      isHome:true,
      isIndex:false,
      backPath:'/finance'
    }
  },
  components:{
    explorer
  },
  methods:{
    async save(){
      let that = this;
      let title = this.$refs.title.value;
      let name = this.$refs.name.value;
      let cid = this.$refs.cid.value;
      let sum = this.$refs.sum.value;
      let contract = this.$refs.contract.value;

      if( utils.isNullOrEmpty(title)){
        return that.$toast('请输入企业名称', 3000)
      }
      if( utils.isNullOrEmpty(name)){
        return that.$toast('请输入法人姓名', 3000)
      }
      if( !utils.checkIDCard(cid)){
        return that.$toast('请输入正确法人证件', 3000)
      }
      if(sum == 0){
        return that.$toast('请输入融资金额', 3000)
      }
      if( utils.isNullOrEmpty(contract)){
        return that.$toast('请输入合同编号', 3000)
      }

      let payload = {
        title:title,name:name,cid:cid,sum:sum,contract:contract
      };
      let pk = await that.getPK();
      if (pk == "") {
        return that.$toast("获取账户失败，请打开TDOS插件", 3000);
      }
      let finance = await saveFinance(payload, pk);
      let sendTx = JSON.stringify(finance);
      that.$refs.sendTx.href =
        "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
      that.$refs.sendTx.click();
      return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
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
  mounted () {
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

<style scoped lang="less">
@import url(../../assets/less/finance.less);
</style>>
