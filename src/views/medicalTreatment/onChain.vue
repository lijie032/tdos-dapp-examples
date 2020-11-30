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
<!--                     <input class="border-box" type="text" maxlength="15" placeholder="请输入就诊时间" ref="time"/>-->
                    <el-date-picker
                      v-model="time"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期时间">
                    </el-date-picker>
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
                       <a ref="sendTx"></a>
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
        time:""
      }
    },
    components:{
      explorer
    },
    methods:{
      async submit(){
        let that = this;
        let name = this.$refs.name.value;
        let time = that.time;
        let medical = this.$refs.medical.value;
        let info = this.$refs.info.value;
        let doctor = this.$refs.doctor.value;
        let payload = {
          name:name, time:time, hospital:medical, info:info, doctor:doctor
        };

        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        let Medical = await saveMedical(payload, pk);
        let sendTx = JSON.stringify(Medical);
        that.$refs.sendTx.href =
          "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
        that.$refs.sendTx.click();
        return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
      }
    }
  }
</script>
