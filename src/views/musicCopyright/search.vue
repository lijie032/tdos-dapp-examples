<template>
  <div class="pageWrap dis-table  pw-pageWrap search_wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex"></explorer>
     <div class="logo-intro">
         <div class="logo"><img src="../../assets/img/logo_musicCopyright.png"/></div>
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
  import explorer from '@/components/browser1.vue'
export default{
    data(){
        return{
        type:1,
        isHome:true,
        isIndex:false
        }
    },
    components: {
      explorer
    },
    methods:{
       async search(){
         let that = this
         let hash = this.$refs.hash.value
         let pk = await that.getPK()
         if (pk == '') {
           return that.$toast('获取账户失败，请打开TDOS插件', 3000)
         }
         let result = await getMusic(hash, pk)
         if (result == '') {
           this.$router.push({path: '/musicCopyright/searchResult', query: {result: "test"}})
           this.$toast('暂无内容', 2000)
         } else {
           getTransaction(hash).then(t => {
             let that = this
             that.$router.push({path: '/musicCopyright/searchResult', query: {transaction: t, result: result, tx_hash: hash}})
           })
         }
       }
    }
}
</script>

<style scoped lang="less">

@import url(../../assets/less/medicalTreatment.less);
@import url(../../assets/less/music.less);
</style>>
