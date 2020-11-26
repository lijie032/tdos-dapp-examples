<template>
  <div class="pageWrap  search-wrap">

      <div class="page-main ">
           <div class="logo-intro">
              <div class="logo"></div>
              TDOS金融
           </div>

           <div class="search-box ">
               <div class="search-bg">
                   <h3>核心企业查询</h3>
               </div>
               <div class="dis-table search-box-in">
                    <div class="din-box">
                        <div class="in-box">
                            <input placeholder="请输入事务哈希" ref="hash"/>
                            <a class="close pointer"></a>
                        </div>
                        <a class="searchbtn pointer"  @click="search">搜索</a>
                    </div>
               </div>
           </div>

      </div>

  </div>
</template>

<script>
import { confirmFinance } from '@/api/dapps'

export default{
    data(){
        return{

        }
    },methods:{
       async search(){
         //this.$toast('请输入搜索内容',2000)
         let hash = this.$refs.hash.value;
         //todo 获取公钥
         let publickey = "02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4";
         let result = await confirmFinance(hash,publickey);
         console.log(result);
         if(result == null){
            this.$toast('暂无内容',2000)
         }else{
            let that = this;
            that.$router.push({path:'/finance/confirm'})
         }

       }
    }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
</style>>
