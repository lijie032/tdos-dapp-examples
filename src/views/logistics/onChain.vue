<template>
  <div class="pageWrap onChain-wrap">

      <div class="page-main">

         <div class="chain-form">
             <h3 class="formTitle">请认真填写以下数据，确保能准确上链</h3>
             <div class="formbox">

                 <div class="din-userInfo">
                    <div class="din">
                        <span class="lab">收件人信息</span>
                        <div class="r-userInfo">
                            <span class="s-lab">收件人姓名</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人姓名" ref="collect_name"/></div>
                        </div>
                        <div class="r-userInfo">
                            <span class="s-lab">收件人地址</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人地址" ref="collect_address"/></div>
                        </div>
                       <div class="r-userInfo">
                            <span class="s-lab">收件人电话</span>
                            <div class="r-in"><input class="border-box" placeholder="请输入收件人电话" ref="collect_phone"/></div>
                        </div>
                     </div>
                 </div>

                 <div class="din-col">
                     <div class="din">
                        <span class="lab">物品类型</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入寄件物品类型" ref="send_type"/>
                     </div>
                     <div class="din">
                         <span class="lab">真实姓名</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入真实姓名" ref="send_name"/>
                     </div>
                 </div>


                 <div class="din-col">
                     <div class="din">
                        <span class="lab">身份证号码</span>
                         <input class="border-box" type="text" placeholder="请输入身份证号码" ref="send_numb"/>
                     </div>
                     <div class="din">
                         <span class="lab">电话号码</span>
                         <input class="border-box" type="text" maxlength="12" placeholder="请输入电话号码" ref="send_phone"/>
                     </div>
                 </div>


                 <div class="btnbox">
                     <a class="chain-btn pointer" @click="submit">寄件上链</a>
                 </div>
             </div>
         </div>
      </div>
  </div>
</template>

<script>
  import { saveLogistics } from '@/api/dapps'
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
        //await dapps.saveFinance();
        // sender, address, senderPhone, goods, receiver, cid, receiverPhone


        let collect_name = this.$refs.collect_name.value;
        let collect_address = this.$refs.collect_address.value;
        let collect_phone = this.$refs.collect_phone.value;
        let sned_type = this.$refs.send_type.value;
        let send_name = this.$refs.send_name.value;
        let send_numb = this.$refs.send_numb.value;
        let send_phone = this.$refs.send_phone.value;

        //todo 合约参数需要增加
        // let payload = {
        //   title:"title",name:"name",cid:"cid",sum:"sum",contract:"contract"
        // };


        //todo 获取公钥
        // let publickey = "02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4";
        // let finance = await saveLogistics(payload, publickey);
        //todo 传给客户端
        this.$router.push({path:'/logistics'})
      }
    }
  }
</script>


<style scoped lang="less">
@import url(../../assets/less/publicWelfare.less);
@import url(../../assets/less/logistics.less);
</style>>
