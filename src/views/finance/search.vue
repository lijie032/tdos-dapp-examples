<template>
  <div class="pageWrap  search-wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
    <div class="page-main ">
      <div class="logo-intro">
        <div class="logo"><img src="../../assets/img/logo_finance.png"/></div>
        TDOS金融
      </div>

      <div class="search-box ">
        <div class="search-bg">
          <h3>核心企业查询</h3>
        </div>
        <div class="dis-table search-box-in">
          <div class="din-box">
            <div class="in-box">
              <input placeholder="请输入事务哈希" ref="hash"/>
            </div>
            <a class="searchbtn pointer" @click="search">搜索</a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {getFinance, getTransaction} from '@/api/dapps'
import explorer from '@/components/browser1.vue'
  export default {
    data () {
      return {
         type:0,
        isHome:true,
        isIndex:false,
        backPath:'/finance'
      }
    },
    components:{
    explorer
  }, methods: {
      async search () {
        let that = this;
        let hash = this.$refs.hash.value;
        let pk = await that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let result = await getFinance(hash, pk)
        if (result == '') {
          this.$toast('暂无内容', 2000)
        } else {
            let transaction = await getTransaction(hash);
            getTransaction(hash).then(t => {
              let that = this
              that.$router.push({path: '/finance/confirminfo', query: {transaction:JSON.stringify(t), result: JSON.stringify(result), tx_hash: hash}})
            })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import url(../../assets/less/finance.less);
</style>>
