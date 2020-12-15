<template>
  <div class="pageWrap  f-wrap-table result-wrap">
      <explorer :isHome="isHome" :type="type" :isIndex="isIndex" :backPath="backPath"></explorer>
      <div class="page-main ">

          <div class="pw-content1520 result-main">
              <h3 class="r-title">红十字会机构</h3>
              <p class="p-text">区块高度：<a id="height"></a></p>
              <p class="p-text">区块哈希：<a id="hash"></a></p>
              <p class="p-text">事务哈希：<a id="tx_hash"></a></p >
            <div class="form-info">
                  <h3>捐赠信息：</h3>
                  <div class="info-col p-text">
                      <span class="r-lab">捐赠姓名：</span>
                      <span class="r-info"><a id="from"></a></span>
                  </div>
                  <div class="info-col p-text">
                      <span class="r-lab">捐赠内容：</span>
                      <span class="r-info"><a id="goods"></a></span>
                  </div>
                  <div class="info-col p-text">
                      <span class="r-lab">捐赠说明：</span>
                      <span class="r-info"><a id="info"></a></span>
                  </div>
                  <div class="info-col p-text">
                      <span class="r-lab">捐赠地址：</span>
                      <span class="r-info"><a id="address"></a></span>
                  </div>
                  <div class="info-col p-text">
                      <span class="r-lab">捐赠机构：</span>
                      <span class="r-info"><a id="name"></a></span>
                  </div>
                  <div class="info-col p-text">
                      <span class="r-lab">受益人：</span>
                      <span class="r-info"><a id="beneficiary"></a></span>
                  </div>
                  <div class="btnbox">
                      <a class="pointer a-btn" @click="back">返回</a>
                  </div>
              </div>
          </div>

      </div>

  </div>
</template>

<script>
  import explorer from '@/components/browser1.vue'
  export default{
    data(){
      return{
         type:0,
        isHome:true,
        isIndex:false,
        backPath:'/publicWelfare'
      }
    },
    components:{
      explorer
    },
    methods:{
      back(){
        this.$router.push({path: '/publicWelfare'})
      }
    },
    mounted: function () {
      let transaction = eval('(' + this.$route.query.transaction + ')');
      let result = eval('(' + this.$route.query.result + ')');;
      let tx_hash = this.$route.query.tx_hash;
      document.getElementById("from").innerHTML = result.name;
      document.getElementById("goods").innerHTML = result.content;
      document.getElementById("info").innerHTML = result.state;
      document.getElementById("address").innerHTML = result.beneficiaryAddress;
      document.getElementById("name").innerHTML = result.donation;
      document.getElementById("beneficiary").innerHTML = result.beneficiary;
      document.getElementById("height").innerHTML = transaction.blockHeight;
      document.getElementById("hash").innerHTML = transaction.blockHash;
      document.getElementById("tx_hash").innerHTML = tx_hash;
    }
  }
</script>

<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
</style>>
