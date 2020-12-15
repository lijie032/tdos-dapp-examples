<template>
  <div class="pageWrap  f-wrap-table search-wrap">
      <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
      <div class="page-main content-middle">
           <div class="logo-intro">
              <div class="logo"><img src="../../assets/img/logo_insurance.png"/></div>
              TDOS保险
           </div>

           <div class="search-box ">
               <div class="din-box">
                  <div class="in-box">
                      <input placeholder="请输入上链哈希查询" ref="hash" v-model="hash"/>
                      <a class="close pointer" @click="close"></a>
                  </div>
                  <a class="searchbtn pointer" @click="linkResult">搜索</a>
               </div>
           </div>

      </div>

  </div>
</template>

<script>
  import { getInsure, getTransaction} from '@/api/dapps'
   import explorer from '@/components/browser1.vue'
export default{
    data(){
        return{
          hash:'',
          type:0,
          isHome:true,
          isIndex:false,
          backPath:'/Insurance'
        }
    },
    components: {
      explorer
    },
    methods:{
        async linkResult(){
          let that = this
          let hash = that.hash
          let pk = await that.getPK()
          if (pk == '') {
            return that.$toast('获取账户失败，请打开TDOS插件', 3000)
          }
          let result = await getInsure(hash, pk)
          if (result == '') {
            this.$toast('暂无内容', 2000)
          } else {
            getTransaction(hash).then(t => {
              that.$router.push({path: '/Insurance/searchResult', query: {transaction:JSON.stringify(t), result: JSON.stringify(result), tx_hash: hash}})
            })
          }
        },
        close(){
          let that = this
          that.hash = ''
        }
    }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
@import url(../../assets/less/Insurance.less);
</style>>
