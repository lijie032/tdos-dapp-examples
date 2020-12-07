<template>
  <div class="pageWrap dis-table  search_wrap">

      <div class="logo-intro">
         <div class="logo"></div>
         TDOS物流查询页面
      </div>
      <div class="page-main content-middle">
         <div class="search_box">
               <div class="search-d-in"><input placeholder="请输入事务哈希" ref="hash"/></div>
               <a class="searchbtn pointer" @click="search"></a>
         </div>

      </div>
  </div>
</template>

<script>
  import { getLogistics, getTransaction} from '@/api/dapps'
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
      async search(){
        let that = this;
        let hash = this.$refs.hash.value;
        let pk = await that.getPK();
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let result = await getLogistics(hash, pk)
        if (result == '') {
          this.$toast('暂无内容', 2000)
        } else {
          getTransaction(hash).then(t => {
            let that = this
            that.$router.push({path: '/logistics/searchResult', query: {transaction: t, result: result, tx_hash: hash}})
          })
        }
      }
    }
  }
</script>

<style scoped lang="less">

@import url(../../assets/less/logistics.less);
</style>>
