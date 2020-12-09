<template>
  <div class="pageWrap f-chain-wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
    <div class=" left
    ">
  </div>
  <div class="right">
    <div class="formbox">
      <div class="f-form-box">
        <h3>请认真填写以下数据，确保能准确上链</h3>
        <div class="din-col din-col2">
          <div class="din border-box"><input type="text" maxlength="15" placeholder="用户姓名" ref="name" v-removeSymbol/>
          </div>
          <div class="din border-box din-2"><input type="text" maxlength="15" placeholder="航班信息" ref="info"
                                                   v-removeSymbol/></div>
        </div>
        <div class="din-col din-col2">
          <div class="din border-box">
            <div class="lab">起保时间</div>
            <el-date-picker
              v-model="time"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择起保时间">
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
          <div class="din border-box"><input type="text" maxlength="15" placeholder="保单号码" ref="numb" v-removeSymbol/>
          </div>
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
  import explorer from '@/components/browser1.vue'
  import {saveInsure, getTransaction} from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'
  import {utils} from '@/assets/js/pattern'

  export default {
    data () {
      return {
        options: [{value: true, label: '是'}, {value: false, label: '否'}],
        options1: [{value: true, label: '是'}, {value: false, label: '否'}],
        isClaims: '',//是否索赔
        isDelay: '',//是否延误
        time: '',
        type: 0,
        isHome: true,
        isIndex: false,
        backPath:'/Insurance'
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

        if (utils.isNullOrEmpty(name)) {
          return that.$toast('请输入用户姓名', 3000)
        }
        if (utils.isNullOrEmpty(info)) {
          return that.$toast('请输入航班信息', 3000)
        }
        if (utils.isNullOrEmpty(time)) {
          return that.$toast('请输入起保时间', 3000)
        }
        if (bool == null) {
          return that.$toast('请选择是否延误', 3000)
        }
        if (utils.isNullOrEmpty(numb)) {
          return that.$toast('请输入保单号码', 3000)
        }
        if (bool2 == null) {
          return that.$toast('请选择是否理赔', 3000)
        }
        let payload = {
          name: name, info: info, time: time, delay: bool, num: numb, claim: bool2
        }

        let pk = that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let Insure = await saveInsure(payload, pk)
        let sendTx = JSON.stringify(Insure)
        that.$refs.sendTx.href =
          'javascript:sendMessageToContentScriptByPostMessage(\'' + sendTx + '\')'
        that.$refs.sendTx.click()
        return that.$toast('事务已生成，请打开TDOS插件进行广播', 3000)
      },
      timer_tx () {
        let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash + ',' + '\n' + '请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(hash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
                that.$router.push({path: '/Insurance/search'})
              }

            })

          }, 1000)
        }
      }
    },
    mounted () {
      let that = this
      this.timer = setInterval(this.timer_tx, 1000)
    },
    beforeDestroy () {
      clearInterval(this.timer)
      if (this.timer1) {
        clearInterval(this.timer1)
      }
    }
  }
</script>


<style scoped lang="less">

  @import url(../../assets/less/finance.less);
  @import url(../../assets/less/Insurance.less);
</style>>
