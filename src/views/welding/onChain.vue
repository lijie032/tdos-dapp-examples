<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">


      <div class="page-main content-middle">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">上链信息</h3>
                  <div class="d-in">
                      <div class="lab">WPQR号:</div>
                     <input class="border-box" placeholder="" ref="wpqqr"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">焊接人员名称:</div>
                     <input class="border-box" placeholder="" ref="person"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">设备名称:</div>
                     <input class="border-box" placeholder="" ref="equipment"/>
                  </div>

                  <div class="btnbox">
                       <a class="btn pointer" @click="">存证上链</a>
                  </div>
              </div>
          </div>

      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/assets.less);
@import url(../../assets/less/welding.less);
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
