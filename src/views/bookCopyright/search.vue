<template>
  <div class="pageWrap dis-table  pw-pageWrap search_wrap">
     <div class="logo-intro">
         <div class="logo"></div>
         TDOS著作版权
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
  import { getBook, getTransaction} from '@/api/dapps'
  export default{
    data(){
        return{

        }
    },methods:{
       async search(){
         let that = this;
         let hash = this.$refs.hash.value;
         let pk = await that.getPK();
         if (pk == '') {
           return that.$toast('获取账户失败，请打开TDOS插件', 3000)
         }
         let result = await getBook(hash, pk)
         console.log(1111111)
         console.log(result);
         if (result == '') {
           this.$toast('暂无内容', 2000)
         } else {
           getTransaction(hash).then(t => {
             that.$router.push({path: '/bookCopyright/searchResult', query: {transaction: t, result: result, tx_hash: hash}})
           })
         }
       }
    }
}
</script>

<style scoped lang="less">

@import url(../../assets/less/medicalTreatment.less);
@import url(../../assets/less/bookCopyRight.less);
</style>>
