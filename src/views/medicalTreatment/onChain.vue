<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">

   
      <div class="page-main content-middle  mt-page-main">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">登记信息</h3>
                  <div class="d-in">
                      <div class="lab">病人姓名</div>
                     <input class="border-box" type="text" maxlength="15" placeholder="请输入病人姓名"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">就诊时间</div>
                     <input class="border-box" type="text" maxlength="15" placeholder="请输入就诊时间"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">就诊医院</div>
                     <input class="border-box" type="text" maxlength="20" placeholder="请输入就诊医院"/>
                  </div>
                   <div class="d-in">
                      <div class="lab">就诊信息</div>
                     <input class="border-box" type="text" maxlength="50" placeholder="请输入就诊信息"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">就诊医生</div>
                     <input class="border-box" type="text" maxlength="15" placeholder="请输入就诊医生"/>
                  </div>
                  <div class="btnbox">
                       <a class="btn pointer">存证上链</a>
                  </div>
              </div>
          </div>
         
      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/assets.less);
@import url(../../assets/less/medicalTreatment.less);
</style>>

<script>

export default {
    data(){
        return{
            
        }
    },
    components:{
     
    },
    methods:{
       
    }
}
</script>
