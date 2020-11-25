<template>
  <div class="pageWrap  f-wrap-table">
     
      <div class="page-main onchain-page-main">
          
         <div class="chain-form">
             <h3 class="formTitle">请认真填写以下数据，确保能准确上链</h3>
             <div class="formbox">
                 <div class="din-col">
                     <div class="din">
                        <span class="lab">捐赠姓名</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入捐赠者姓名"/>
                     </div>
                     <div class="din">
                         <span class="lab">捐赠内容</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入捐赠内容"/>
                     </div>
                 </div>

              
                 <div class="din-col">
                     <div class="din">
                        <span class="lab">捐赠地址</span>
                         <input class="border-box" type="text" placeholder="请输入捐赠地址"/>
                     </div>
                     <div class="din">
                         <span class="lab">受益人</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入受益人"/>
                     </div>
                 </div>

                    <div class="din-col">
                     <div class="din">
                        <span class="lab">捐赠机构</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入捐赠机构"/>
                     </div>
                     <div class="din">
                         <span class="lab">捐赠说明</span>
                         <input class="border-box" type="text"  placeholder="请输入捐赠内容"/>
                     </div>
                 </div>

                 <div class="btnbox">
                     <a class="chain-btn pointer">存证上链</a>
                 </div>
             </div>
         </div>
      </div>
  </div>
</template>

<script>
</script>

<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
</style>>
