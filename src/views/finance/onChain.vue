<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">
      </div>
      <div class="right">
         <div class="formbox">
              <div class="f-form-box">
                  <h3>请认真填写以下数据，确保能准确上链</h3>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text"  placeholder="企业名称" ref="title"/></div>
                     <div class="din border-box din-2"><input type="text"  placeholder="法人姓名" ref="name"/></div>
                  </div>
                   <div class="din-col din-col2">
                     <div class="din border-box"><input type="text"  placeholder="法人证件" ref="cid"/></div>
                     <div class="din border-box din-2"><input type="text"  placeholder="融资金额" ref="sum"/></div>
                  </div>
                  <div class="din-col">
                     <div class="din"><input type="text" placeholder="合同编号" ref="contract"/></div>
                  </div>
                  <div class="btnbox">
                      <a class="pointer chain-btn" @click="save">存证上链</a>
                  </div>
              </div>
         </div>
      </div>
  </div>
</template>

<script>
import explorer from '@/components/browser.vue'
import { saveFinance } from '@/api/dapps'
export default{
  data(){
    return{

    }
  },
  components:{
    explorer
  },
  methods:{
    async save(){
      //await dapps.saveFinance();
      let title = this.$refs.title.value;
      let name = this.$refs.name.value;
      let cid = this.$refs.cid.value;
      let sum = this.$refs.sum.value;
      let contract = this.$refs.contract.value;

      let payload = {
        title:title,name:name,cid:cid,sum:sum,contract:contract
      };


      //todo 获取公钥
      let publickey = "02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4";
      let finance = await saveFinance(payload, publickey);
      console.log(finance);
      //todo 传给客户端
    }
  }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
</style>>
