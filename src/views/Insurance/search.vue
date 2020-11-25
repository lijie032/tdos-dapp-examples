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
                      <input placeholder="请输入上链哈希查询"/> 
                      <a class="close pointer"></a>
                  </div>
                  <a class="searchbtn pointer" @click="linkResult">搜索</a>
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
        linkResult(){
            let that = this;
            that.$router.push({path:'/publicWelfare/result'})
        }
    }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
@import url(../../assets/less/Insurance.less);
</style>>
