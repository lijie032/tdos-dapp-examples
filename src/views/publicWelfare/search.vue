<template>
  <div class="pageWrap  f-wrap-table search-wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
    <div class="page-main content-middle">
      <div class="logo-intro">
        <div class="logo"><img src="../../assets/img/logo_publicWelfare.png"/></div>
        TDOS公益
      </div>

      <div class="search-box ">
        <div class="din-box">
          <div class="in-box">
            <input placeholder="请输入上链哈希查询" ref="hash"/>
            <!--<a class="close pointer"></a>-->
          </div>
          <a class="searchbtn pointer" @click="linkResult">搜索</a>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {getDonor, getTransaction} from '@/api/dapps'
import explorer from '@/components/browser1.vue'
  export default {
    data () {
      return {
        type:0,
        isHome:true,
        isIndex:false,
        backPath:'/publicWelfare'
      }

    },
     components: {
      explorer
    }, methods: {
      async linkResult () {
        let that = this
        let hash = this.$refs.hash.value
        let pk = await that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let result = await getDonor(hash, pk)
        if (result == '') {
          this.$toast('暂无内容', 2000)
        } else {
          getTransaction(hash).then(t => {
            let that = this
            that.$router.push({path: '/publicWelfare/result', query: {transaction:JSON.stringify(t), result: JSON.stringify(result), tx_hash: hash}})
          })
        }
        // let that = this;
        // that.$router.push({path:'/publicWelfare/result'})
      }
    }
  }
</script>

<style scoped lang="less">
  @import url(../../assets/less/publicWelfare.less);
</style>>
