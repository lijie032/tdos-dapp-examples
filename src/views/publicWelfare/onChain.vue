<template>
  <div class="pageWrap f-wrap-table">
    <div class="page-main content-middle">
      <div class="chain-form">
        <h3 class="formTitle">请认真填写以下数据，确保能准确上链</h3>
        <div class="formbox">
          <div class="din-col">
            <div class="din">
              <span class="lab">捐赠姓名</span>
              <input
                class="border-box"
                type="text"
                maxlength="12"
                placeholder="请输入捐赠者姓名"
                v-model="donationName"
              />
            </div>
            <div class="din">
              <span class="lab">捐赠内容</span>
              <input
                class="border-box"
                type="text"
                maxlength="12"
                placeholder="请输入捐赠内容"
                v-model="donationContent"
              />
            </div>
          </div>

          <div class="din-col">
            <div class="din">
              <span class="lab">捐赠地址</span>
              <input
                class="border-box"
                type="text"
                placeholder="请输入捐赠地址"
                v-model="donationAddress"
              />
            </div>
            <div class="din">
              <span class="lab">受益人</span>
              <input
                class="border-box"
                type="text"
                maxlength="12"
                placeholder="请输入受益人"
                v-model="beneficiary"
              />
            </div>
          </div>

          <div class="din-col">
            <div class="din">
              <span class="lab">捐赠机构</span>
              <input
                class="border-box"
                type="text"
                maxlength="12"
                placeholder="请输入捐赠机构"
                v-model="mechanism"
              />
            </div>
            <div class="din">
              <span class="lab">捐赠说明</span>
              <input
                class="border-box"
                type="text"
                placeholder="请输入捐赠说明"
                v-model="explain"
              />
            </div>
          </div>

          <div class="btnbox">
            <a @click="doConfirm($event)" class="chain-btn pointer">存证上链</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {saveDonor} from '@/api/dapps'

export default {
  data() {
    return {
      donationName: "",
      donationContent: "",
      donationAddress: "",
      beneficiary: "",
      mechanism: "",
      explain: "",
    };
  },
  methods: {
      async doConfirm(e) {
      let that = this;

      // alert(that.getPK());

      let payload = [that.donationName,that.donationContent,that.donationAddress,that.beneficiary,that.mechanism,that.explain]
      let pk = that.getPK();
      if(pk == "")
      {
        that.$toast('获取账户失败，请打开TDOS插件',2000)
      }else
      {
        var text = "212121212";
        e.currentTarget.href='javascript:sendMessageToContentScriptByPostMessage(\''+text+'\')';

        // const tx = await saveDonor(payload,pk)
        // alert(JSON.stringify(tx));
      }


    },
  },
};
</script>

<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
</style>>
