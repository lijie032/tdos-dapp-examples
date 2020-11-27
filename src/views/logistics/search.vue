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
        let hash = this.$refs.hash.value;
        //todo 获取公钥
        let publickey = '02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4'
        let result = await getLogistics(hash, publickey)
        if (result == '') {
          this.$router.push({path: '/logistics/searchResult', query: {result: "test"}})
          this.$toast('暂无内容', 2000)
        } else {
          let transaction = await getTransaction(hash);
          let that = this
          that.$router.push({path: '/logistics/searchResult', query: {transaction: transaction,result:result}})
        }
      }
    }
  }
</script>

<style scoped lang="less">

@import url(../../assets/less/logistics.less);
</style>>
