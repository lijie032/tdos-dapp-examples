<template>
  <div class="pageWrap f-chain-wrap">
    <div class="left">
    </div>
    <div class="right">
      <div class="formbox">
        <div class="f-form-box">
          <h3>请认真填写以下数据，确保能准确上链</h3>
          <div class="din-col din-col2">
            <div class="din border-box"><input type="text" maxlength="15" placeholder="用户姓名" ref="name"/></div>
            <div class="din border-box din-2"><input type="text" maxlength="15" placeholder="航班信息" ref="info"/></div>
          </div>
          <div class="din-col din-col2">
            <div class="din border-box">
              <div class="lab">启保时间</div>
              <el-date-picker
                v-model="time"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期时间">
              </el-date-picker>
            </div>
            <div class="din border-box din-2 din-select">
              <el-select class="n-select" popper-class="n-select" v-model="isDelay" placeholder="是否延误" ref="bool">
                <el-option
                  v-for="(item,index) in options1"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="din-col din-col2">
            <div class="din border-box"><input type="text" maxlength="15" placeholder="保单号码" ref="numb"/></div>
            <div class="din border-box din-2 din-select">
              <el-select class="n-select" popper-class="n-select" v-model="isClaims" placeholder="是否理赔" ref="bool2">
                <el-option
                  v-for="(item,index) in options"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="btnbox">
            <a class="pointer chain-btn" @click="submit">存证上链</a>
            <a ref="sendTx"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import explorer from '@/components/browser.vue'
  import {saveInsure} from '@/api/dapps'

  export default {
    data () {
      return {
        options: [{value: true, label: '是'}, {value: false, label: '否'}],
        options1: [{value: true, label: '是'}, {value: false, label: '否'}],
        isClaims: '',//是否索赔
        isDelay: '',//是否延误
        time:''
      }
    },
    components: {
      explorer
    },
    methods: {
      async submit () {
        let that = this
        let name = this.$refs.name.value
        let info = this.$refs.info.value
        let time = that.time
        let bool = this.$refs.bool.value
        let numb = this.$refs.numb.value
        let bool2 = this.$refs.bool2.value

        let payload = {
          name: name, info: info, time: time, delay: bool, num: numb, claim: bool2
        }

        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        let Insure = await saveInsure(payload, pk)
        let sendTx = JSON.stringify(Insure);
        that.$refs.sendTx.href =
          "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
        that.$refs.sendTx.click();
        return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
      }
    }
  }
</script>


<style scoped lang="less">

  @import url(../../assets/less/finance.less);
  @import url(../../assets/less/Insurance.less);
</style>>
