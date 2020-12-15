<template>
  <div class="pageWrap  search-wrap n-search-wrap ">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
    <div class="page-main ">
      <div class="logo-intro">
        <div class="logo"><img src="../../assets/img/logo_assets.png"/></div>
        TDOS资产
      </div>

      <div class="search-box ">
        <div class="search-bg">
          <h3>继承人查询网站</h3>
        </div>
        <div class="dis-table search-box-in">
          <div class="din-box">
            <div class="in-box">
              <input placeholder="请输入事务哈希值" ref="hash"/>
              <!--<a class="close pointer"></a>-->
            </div>
            <a class="searchbtn pointer" @click="search">搜索</a>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {getFund, getTransaction} from '@/api/dapps'
  import explorer from '@/components/browser1.vue'

  export default {
    data () {
      return {
        type: 0,
        isHome: true,
        isIndex: false,
        backPath: '/assets'
      }
    },
    components: {
      explorer
    },
    methods: {
      async search () {
        let that = this
        let hash = this.$refs.hash.value
        let pk = await that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let result = await getFund(hash, pk)
        if (result == '') {
          this.$toast('暂无内容', 2000)
        } else {
          getTransaction(hash).then(t => {
            that.$router.push({path: '/assets/searchResult', query: {transaction:JSON.stringify(t), result: JSON.stringify(result), tx_hash: hash}})
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import url(../../assets/less/finance.less);
  @import url(../../assets/less/assets.less);
</style>>
