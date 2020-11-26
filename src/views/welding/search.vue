<template>
  <div class="pageWrap  search-wrap n-search-wrap ">
     
      <div class="page-main ">
           <div class="logo-intro">
              <div class="logo"></div>
              TDOS焊接链
           </div>
           
           <div class="search-box ">
               <div class="search-bg">
                   <h3>焊接链查询</h3>
               </div>
               <div class="dis-table search-box-in">
                    <div class="din-box">
                        <div class="in-box">
                            <input placeholder="请输入事务哈希值"/> 
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
export default{
    data(){
        return{

        }
    },methods:{
       search(){
           this.$toast('请输入搜索内容',2000)
       }
    }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
@import url(../../assets/less/welding.less);
</style>>
