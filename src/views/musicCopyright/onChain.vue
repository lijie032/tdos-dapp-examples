<template>
  <div class="pageWrap f-chain-wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex"></explorer>
      <div class="left">
      </div>
      <div class="right">
         <div class="formbox">
              <div class="f-form-box">
                  <h3>请认真填写以下数据，确保能准确上链</h3>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"  placeholder="歌曲名称" ref="name" v-removeSymbol/></div>
                     <div class="din border-box din-2"><input type="text" maxlength="15"  placeholder="歌曲时长(分钟)" ref="time" v-limitNum/></div>
                  </div>
                   <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"   placeholder="歌手信息" ref="info" v-removeSymbol/></div>
                     <div class="din border-box din-2 din-select">
                       <el-select  class="n-select" popper-class="n-select music-select" v-model="isDelay" placeholder="音乐版权类型" ref="type">
										    <el-option
										      v-for="(item,index) in options"
										      :key="index"
										      :label="item.label"
										      :value="item.value">
										    </el-option>
										  </el-select>
                     </div>
                  </div>
                   <div class="din-col">
                     <div class="din"><input type="text" placeholder="其他信息" ref="other" v-removeSymbol/></div>
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
import { saveMusic,getTransaction } from '@/api/dapps'
import {showLoading, hideLoading} from '@/assets/js/loading'
import {utils} from '@/assets/js/pattern'


export default{
  data(){
    return{
      options:[{value:"歌曲版权",label:'歌曲版权'},{value:"改编权",label:'改编权'},{value:"著作权",label:'著作权'}],

      isClaims:'',//是否索赔
      isDelay:'',//是否延误
      type:0,
        isHome:true,
        isIndex:false
    }
  },
  components:{
    explorer
  },
  methods:{
    async submit(){
      let that = this;
      let name = this.$refs.name.value;
      let time = this.$refs.time.value;
      let info = this.$refs.info.value;
      let type = this.$refs.type.value;
      let other = this.$refs.other.value;
      let payload = {
        name:name, long:time, singer:info, copyright:type, info:other
      };
      if( utils.isNullOrEmpty(name)){
        return that.$toast('请输入歌曲名称', 3000)
      }
      if( utils.isNullOrEmpty(time)){
        return that.$toast('请输入歌曲时长', 3000)
      }
      if( utils.isNullOrEmpty(info)){
        return that.$toast('请输入歌手信息', 3000)
      }
      if( utils.isNullOrEmpty(type)){
        return that.$toast('请选择音乐版权类型', 3000)
      }
      let pk = that.getPK();
      if (pk == "") {
        return that.$toast("获取账户失败，请打开TDOS插件", 3000);
      }
      let Music = await saveMusic(payload, pk);
      let sendTx = JSON.stringify(Music);
      that.$refs.sendTx.href =
        "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
      that.$refs.sendTx.click();
      return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
      // this.$router.push({path:'/musicCopyright'})
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
                 that.$router.push({path:'/musicCopyright/search'})
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



<style scoped lang="less">

@import url(../../assets/less/finance.less);
@import url(../../assets/less/music.less);
</style>>
