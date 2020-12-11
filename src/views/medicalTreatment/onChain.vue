<template>
  <div class="pageWrap f-wrap-table pw-pageWrap a_onChain_wrap">

      <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
      <div class="page-main content-middle  mt-page-main">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">登记信息</h3>
                  <div class="d-in">
                      <div class="lab">病人姓名</div>
                     <input class="border-box" type="text" maxlength="15" placeholder="请输入病人姓名" ref="name" v-removeSymbol  v-remembered />
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
                     <input class="border-box" type="text" maxlength="20" placeholder="请输入就诊医院" ref="medical" v-removeSymbol  v-remembered />
                  </div>
                   <div class="d-in">
                      <div class="lab">就诊信息</div>
                     <input class="border-box" type="text" maxlength="50" placeholder="请输入就诊信息" ref="info" v-removeSymbol  v-remembered />
                  </div>
                  <div class="d-in">
                      <div class="lab">就诊医生</div>
                     <input class="border-box" type="text" maxlength="15" placeholder="请输入就诊医生" ref="doctor" v-removeSymbol  v-remembered />
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
  import explorer from '@/components/browser1.vue'
  import { getTransaction } from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'
  import {utils} from '@/assets/js/pattern'
  export default{
    data(){
      return{
        time:"",
        type:1,
        isHome:true,
        isIndex:false,
        backPath:'/medicalTreatment'
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
        if( utils.isNullOrEmpty(name)){
          return that.$toast('请输入病人姓名', 3000)
        }
        if( utils.isNullOrEmpty(time)){
          return that.$toast('请输入就诊时间', 3000)
        }
        if( utils.isNullOrEmpty(medical)){
          return that.$toast('请输入就诊医院', 3000)
        }
        if( utils.isNullOrEmpty(info)){
          return that.$toast('请输入就诊信息', 3000)
        }
        if( utils.isNullOrEmpty(doctor)){
          return that.$toast('请输入就诊医生', 3000)
        }
        let payload = {
          name:name, time:time, hospital:medical, info:info, doctor:doctor
        };

        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        let Medical = await saveMedical(payload, pk);
         //console.log(JSON.stringify(Medical))
        let sendTx =JSON.stringify(Medical)
     

        that.$refs.sendTx.href =
          "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
        that.$refs.sendTx.click();
        
        return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
       
      },
      timer_tx () {
        let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash+","+'\n' + '请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(hash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
                 that.$router.push({path:'/medicalTreatment/search'})
              }

            })

          }, 1000)
        }
      }
    },
    mounted(){
      let that = this;
      this.timer = setInterval(this.timer_tx, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
      if (this.timer1) {
        clearInterval(this.timer1)
      }
    }
  }
</script>
