<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">


      <div class="page-main content-middle">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">登记信息</h3>
                  <div class="d-in">
                      <div class="lab">登记姓名</div>
                     <input class="border-box" placeholder="请输入登记姓名" ref="name"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">赠予内容</div>
                     <input class="border-box" placeholder="请输入登赠予内容" ref="info"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">赠与对象</div>
                     <input class="border-box" placeholder="请输入赠予对象" ref="to"/>
                  </div>
                   <div class="d-in">
                      <div class="lab">赠予条件</div>
                      <div class="d-in-right">
                          当前区块高度>
                          <input class="border-box in-height" ref="height"/>
                       </div>

                  </div>
                  <div class="btnbox">
                       <a class="btn pointer" @click="submit">存证上链</a>
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
  import { saveFund } from '@/api/dapps'
  import explorer from '@/components/browser.vue'

  export default{
    data(){
      return{

      }
    },
    components:{
      explorer
    },
    methods:{
      async submit(){

        let name = this.$refs.name.value;
        let info = this.$refs.info.value;
        let to = this.$refs.to.value;
        let height = this.$refs.height.value;

        //todo 合约参数需要增加
        let payload = {
          name:name, content:info, granter:to, condition:height
        };

        //todo 获取公钥
        let publickey = "02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4";
        let Fund = await saveFund(payload, publickey);
        console.log(Fund);
        //todo 传给客户端
        this.$router.push({path:'/assets'})
      }
    }
  }
</script>
