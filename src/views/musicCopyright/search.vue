<template>
  <div class="pageWrap dis-table  pw-pageWrap search_wrap">
     <div class="logo-intro">
         <div class="logo"></div>
         TDOS音乐查询
      </div>
      <div class="page-main  content-middle">
         <div class="search_box">
               <div class="search-d-in"><input placeholder="请输入事务哈希" ref="hash"/></div>
               <a class="searchbtn pointer" @click="search"></a>
         </div>

      </div>

  </div>
</template>

<script>
  import { getMusic, getTransaction} from '@/api/dapps'
export default{
    data(){
        return{

        }
    },methods:{
       async search(){
         let hash = this.$refs.hash.value;
         //todo 获取公钥
         let publickey = '02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4'
         let result = await getMusic(hash, publickey)
         if (result == '') {
           this.$router.push({path: '/musicCopyright/searchResult', query: {result: "test"}})
           this.$toast('暂无内容', 2000)
         } else {
           let transaction = await getTransaction(hash);
           let that = this
           that.$router.push({path: '/musicCopyright/searchResult', query: {transaction: transaction,result:result}})
         }
       }
    }
}
</script>

<style scoped lang="less">

@import url(../../assets/less/medicalTreatment.less);
@import url(../../assets/less/music.less);
</style>>
