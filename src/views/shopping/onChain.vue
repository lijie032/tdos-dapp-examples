<template>
  <div class="pageWrap f-chain-wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex"></explorer>
    <div class="left">
    </div>
    <div class="right">
      <div class="formbox">
        <div class="f-form-box">
          <h3>请认真填写以下数据，确保能准确上链</h3>
          <div class="din-col din-col2">
            <div class="din border-box"><input type="text" maxlength="15" placeholder="商品产地" v-model="place" v-removeSymbol/></div>
            <div class="din border-box din-2"><input type="text" maxlength="15" placeholder="商品品牌" v-model="brand" v-removeSymbol/>
            </div>
          </div>
          <div class="din-col din-col2">
            <div class="din border-box"><input type="text" maxlength="15" placeholder="商品种类" v-model="kind" v-removeSymbol/></div>
            <div class="din border-box din-2"><input type="text" maxlength="15" placeholder="商品价格" v-limitNum v-model="price"/>
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
  import explorer from '@/components/browser1.vue'
  import {saveProduct, getTransaction} from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'
  import {utils} from '@/assets/js/pattern'
  export default {
    data () {
      return {
        place: '',
        brand: '',
        kind: '',
        price: '',
          type:0,
       isHome:true,
       isIndex:false
      }
    },
    components: {
      explorer
    },
    methods: {
      async submit(){
        let that = this;
            if( utils.isNullOrEmpty(that.place)){
                return that.$toast('请输入商品产地', 3000)
            }
            if( utils.isNullOrEmpty(that.brand)){
                return that.$toast('请输入商品品牌', 3000)
            }
            if( utils.isNullOrEmpty(that.kind)){
                return that.$toast('请输入商品种类', 3000)
            }
            if( utils.isNullOrEmpty(that.price)){
                return that.$toast('请输入商品价格', 3000)
            }
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
      },
      timer_tx () {
        let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash+","+'\n' + '请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(hash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
                that.$router.push({path:'/shopping/search'})
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

<style scoped lang="less">
  @import url(../../assets/less/finance.less);
  @import url(../../assets/less/shopping.less);
</style>>
