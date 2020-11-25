<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">

   
      <div class="page-main content-middle">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">登记信息</h3>
                  <div class="d-in">
                      <div class="lab">登记姓名</div>
                     <input class="border-box" placeholder="请输入登记姓名"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">赠予内容</div>
                     <input class="border-box" placeholder="请输入登赠予内容"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">赠与对象</div>
                     <input class="border-box" placeholder="请输入赠予对象"/>
                  </div>
                   <div class="d-in">
                      <div class="lab">赠予条件</div>
                      <div class="d-in-right">
                          当前区块高度>
                          <input class="border-box in-height"/>
                       </div>
                     
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
