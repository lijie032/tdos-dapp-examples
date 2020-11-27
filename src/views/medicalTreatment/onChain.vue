<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">


      <div class="page-main content-middle  mt-page-main">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">登记信息</h3>
                  <div class="d-in">
                      <div class="lab">病人姓名</div>
                     <input class="border-box" type="text" maxlength="15" placeholder="请输入病人姓名" ref="name"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">就诊时间</div>
                     <input class="border-box" type="text" maxlength="15" placeholder="请输入就诊时间" ref="time"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">就诊医院</div>
                     <input class="border-box" type="text" maxlength="20" placeholder="请输入就诊医院" ref="medical"/>
                  </div>
                   <div class="d-in">
                      <div class="lab">就诊信息</div>
                     <input class="border-box" type="text" maxlength="50" placeholder="请输入就诊信息" ref="info"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">就诊医生</div>
                     <input class="border-box" type="text" maxlength="15" placeholder="请输入就诊医生" ref="doctor"/>
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
@import url(../../assets/less/medicalTreatment.less);
</style>>

<script>

  import { saveMedical } from '@/api/dapps'
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
        let time = this.$refs.time.value;
        let medical = this.$refs.medical.value;
        let info = this.$refs.info.value;
        let doctor = this.$refs.doctor.value;

        //todo 合约参数需要增加
        let payload = {
          name:name, time:time, hospital:medical, info:info, doctor:doctor
        };

        //todo 获取公钥
        let publickey = "02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4";
        let Medical = await saveMedical(payload, publickey);
        console.log(Medical);
        //todo 传给客户端
        this.$router.push({path:'/medicalTreatment'})
      }
    }
  }
</script>
