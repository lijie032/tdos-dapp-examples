<template>
  <div class="pageWrap  f-wrap-table search-wrap">

      <div class="page-main content-middle">
           <div class="logo-intro">
              <div class="logo"></div>
              TDOS保险
           </div>

           <div class="search-box ">
               <div class="din-box">
                  <div class="in-box">
                      <input placeholder="请输入上链哈希查询" ref="hash"/>
                      <a class="close pointer"></a>
                  </div>
                  <a class="searchbtn pointer" @click="linkResult">搜索</a>
               </div>
           </div>

      </div>

  </div>
</template>

<script>
  import { getInsure, getTransaction} from '@/api/dapps'
export default{
    data(){
        return{

        }
    },methods:{
        async linkResult(){
          let hash = this.$refs.hash.value;
          //todo 获取公钥
          let publickey = '02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4'
          let result = await getInsure(hash, publickey)
          if (result == '') {
            this.$router.push({path: '/Insurance/searchResult', query: {result: "test"}})
            this.$toast('暂无内容', 2000)
          } else {
            let transaction = await getTransaction(hash);
            let that = this
            that.$router.push({path: '/Insurance/searchResult', query: {transaction: transaction,result:result}})
          }
        }
    }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
@import url(../../assets/less/Insurance.less);
</style>>
