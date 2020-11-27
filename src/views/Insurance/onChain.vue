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
            <div class="din border-box"><input type="text" maxlength="15" placeholder="起保时间" ref="time"/></div>
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
        options: [{value: 1, label: '是'}, {value: 2, label: '否'}],
        options1: [{value: 1, label: '是'}, {value: 2, label: '否'}],
        isClaims: '',//是否索赔
        isDelay: ''//是否延误
      }
    },
    components: {
      explorer
    },
    methods: {
      async submit () {
        //await dapps.saveFinance();
        let name = this.$refs.name.value
        let info = this.$refs.info.value
        let time = this.$refs.time.value
        let bool = this.$refs.bool.value
        let numb = this.$refs.numb.value
        let bool2 = this.$refs.bool2.value

        let payload = {
          name: name, info: info, time: time, delay: bool, num: numb, claim: bool2
        }

        //todo 获取公钥
        let publickey = '02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4'
        let Insure = await saveInsure(payload, publickey)
        console.log(Insure)
        //todo 传给客户端
        this.$router.push({path: '/Insurance'})
      }
    }
  }
</script>


<style scoped lang="less">

  @import url(../../assets/less/finance.less);
  @import url(../../assets/less/Insurance.less);
</style>>
