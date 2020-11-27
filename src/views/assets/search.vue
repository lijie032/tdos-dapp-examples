<template>
  <div class="pageWrap  search-wrap n-search-wrap ">

      <div class="page-main ">
           <div class="logo-intro">
              <div class="logo"></div>
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
                        <a class="searchbtn pointer"  @click="search">搜索</a>
                    </div>
               </div>
           </div>

      </div>

  </div>
</template>

<script>
  import { getFund, getTransaction} from '@/api/dapps'
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
        let result = await getFund(hash, publickey)
        if (result == '') {
          this.$router.push({path: '/assets/searchResult', query: {result: "test"}})
          this.$toast('暂无内容', 2000)
        } else {
          let transaction = await getTransaction(hash);
          let that = this
          that.$router.push({path: '/assets/searchResult', query: {transaction: transaction,result:result}})
        }
      }
    }
  }
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
@import url(../../assets/less/assets.less);
</style>>
