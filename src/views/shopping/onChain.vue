<template>
  <div class="pageWrap f-chain-wrap">
    <div class="left">
    </div>
    <div class="right">
      <div class="formbox">
        <div class="f-form-box">
          <h3>请认真填写以下数据，确保能准确上链</h3>
          <div class="din-col din-col2">
            <div class="din border-box"><input type="text" maxlength="15" placeholder="商品产地" v-model="place"/></div>
            <div class="din border-box din-2"><input type="text" maxlength="15" placeholder="商品品牌" v-model="brand"/>
            </div>
          </div>
          <div class="din-col din-col2">
            <div class="din border-box"><input type="text" maxlength="15" placeholder="商品种类" v-model="kind"/></div>
            <div class="din border-box din-2"><input type="text" maxlength="15" placeholder="商品价格" v-model="price"/>
            </div>
          </div>
          <!--
          <div class="din-col">
             <div class="din"><input type="text" placeholder="合同编号"/></div>
          </div>
          -->
          <div class="btnbox">
            <a class="pointer chain-btn" @click="submit">存证上链</a>
            <a ref="sendTx"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import explorer from '@/components/browser.vue'
  import {saveProduct} from '@/api/dapps'

  export default {
    data () {
      return {
        place: '',
        brand: '',
        kind: '',
        price: ''
      }
    },
    components: {
      explorer
    },
    methods: {
      async submit(){
        let that = this;
        let payload = {
          place:that.place, brand:that.brand, kind:that.kind, price:that.price
        };
        let pk = await that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }

        let Product = await saveProduct(payload, pk);
        let sendTx = JSON.stringify(Product);
        that.$refs.sendTx.href =
          'javascript:sendMessageToContentScriptByPostMessage(\'' + sendTx + '\')'
        that.$refs.sendTx.click()
        return that.$toast('事务已生成，请打开TDOS插件进行广播', 3000)
        // this.$router.push({path:'/bookCopyright'})
      }
    }
  }
</script>

<style scoped lang="less">
  @import url(../../assets/less/finance.less);
  @import url(../../assets/less/shopping.less);
</style>>
