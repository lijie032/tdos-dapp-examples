<template>
  <div class="pageWrap onChain-wrap">
     
      <div class="page-main">
          
         <div class="chain-form">
             <h3 class="formTitle">请认真填写以下数据，确保能准确上链</h3>
             <div class="formbox">
                
                 <div class="din-userInfo">
                    <div class="din">
                        <span class="lab">寄件人信息</span>
                        <div class="r-userInfo">
                            <span class="s-lab">收件人姓名</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人姓名"/></div>
                        </div>
                        <div class="r-userInfo">
                            <span class="s-lab">收件人地址</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人地址"/></div>
                        </div>
                       <div class="r-userInfo">
                            <span class="s-lab">收件人电话</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人电话"/></div>
                        </div>
                     </div>
                 </div>

                 <div class="din-col">
                     <div class="din">
                        <span class="lab">物品类型</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入寄件物品类型"/>
                     </div>
                     <div class="din">
                         <span class="lab">真实姓名</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入真实姓名"/>
                     </div>
                 </div>

              
                 <div class="din-col">
                     <div class="din">
                        <span class="lab">身份证号码</span>
                         <input class="border-box" type="text" placeholder="请输入身份证号码"/>
                     </div>
                     <div class="din">
                         <span class="lab">电话号码</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入电话号码"/>
                     </div>
                 </div>


                 <div class="btnbox">
                     <a class="chain-btn pointer">寄件上链</a>
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
@import url(../../assets/less/logistics.less);
</style>>
