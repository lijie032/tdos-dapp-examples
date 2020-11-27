<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">
      </div>
      <div class="right">
         <div class="formbox">
              <div class="f-form-box">
                  <h3>请认真填写以下数据，确保能准确上链</h3>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"  placeholder="歌曲名称" ref="name"/></div>
                     <div class="din border-box din-2"><input type="text" maxlength="15"  placeholder="歌曲时长" ref="time"/></div>
                  </div>
                   <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"   placeholder="歌手信息" ref="info"/></div>
                     <div class="din border-box din-2 din-select">
                       <el-select  class="n-select" popper-class="n-select music-select" v-model="isDelay" placeholder="音乐版权" ref="type">
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
                     <div class="din"><input type="text" placeholder="其他信息" ref="other"/></div>
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
import { saveMusic } from '@/api/dapps'

export default{
  data(){
    return{
      options:[{value:1,label:'歌曲版权'},{value:2,label:'改编权'},{value:3,label:'著作权'}],

      isClaims:'',//是否索赔
      isDelay:''//是否延误
    }
  },
  components:{
    explorer
  },
  methods:{
    async submit(){

      let name = this.$refs.name.value;
      let time = this.$refs.time.value;
      let info = this.$refs.info.value;
      let type = this.$refs.type.value;
      let other = this.$refs.other.value;

      //todo 合约参数需要增加
      let payload = {
        name:name, long:time, singer:info, copyright:type, info:other
      };
      //todo 获取公钥
      let publickey = "02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4";
      let Music = await saveMusic(payload, publickey);
      console.log(Music);
      //todo 传给客户端
      this.$router.push({path:'/musicCopyright'})
    }
  }
}
</script>



<style scoped lang="less">

@import url(../../assets/less/finance.less);
@import url(../../assets/less/music.less);
</style>>
