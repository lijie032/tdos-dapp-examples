<template>
  <div class="pageWrap dis-table  pw-pageWrap search_wrap">
     <div class="logo-intro">
         <div class="logo"></div>
         TDOS著作版权
      </div>
      <div class="page-main  content-middle">
         <div class="search_box">
               <div class="search-d-in"><input placeholder="请输入事务哈希"/></div>
               <a class="searchbtn pointer"></a>
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

@import url(../../assets/less/medicalTreatment.less);
@import url(../../assets/less/bookCopyRight.less);
</style>>
