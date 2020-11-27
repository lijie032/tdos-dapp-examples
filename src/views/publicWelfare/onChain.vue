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
            <a ref="sendTx" @click="doConfirm($event)" class="chain-btn pointer"
              >存证上链</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveDonor } from "@/api/dapps";

export default {
  data() {
    return {
      donationName: "",
      donationContent: "",
      donationAddress: "",
      beneficiary: "",
      mechanism: "",
      explain: "",
      firstSend: 0,
    };
  },
  methods: {
    async doConfirm(e) {
      let that = this;
      // that.$refs.sendTx.href =
      //   "javascript:sendMessageToContentScriptByPostMessage('link')";

      let payload = {
        name: that.donationName,
        content: that.donationContent,
        beneficiaryAddress: that.donationAddress,
        beneficiary: that.beneficiary,
        donation: that.mechanism,
        state: that.explain,
      };
      let pk = that.getPK();
      if (pk == "") {
        return that.$toast("获取账户失败，请打开TDOS插件", 3000);
      }

      let tx = await saveDonor(payload, pk);
      let sendTx = JSON.stringify(tx);

      that.$refs.sendTx.href =
        "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
      if (that.firstSend == 0) {
        that.$refs.sendTx.click();
        that.firstSend = 1;
      }
      return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
    },
  },
};
</script>

<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
</style>>
