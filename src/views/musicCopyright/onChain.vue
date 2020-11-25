<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">   
      </div>
      <div class="right">
         <div class="formbox">
              <div class="f-form-box">
                  <h3>请认真填写以下数据，确保能准确上链</h3>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"  placeholder="歌曲名称"/></div>
                     <div class="din border-box din-2"><input type="text" maxlength="15"  placeholder="歌曲时长"/></div>
                  </div>
                   <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"   placeholder="歌手信息"/></div>
                     <div class="din border-box din-2 din-select">
                       <el-select  class="n-select" popper-class="n-select music-select" v-model="isDelay" placeholder="音乐版权">
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
                     <div class="din"><input type="text" placeholder="其他信息"/></div>
                  </div>
                  <div class="btnbox">
                      <a class="pointer chain-btn">存证上链</a>
                  </div>
              </div>
         </div>
      </div>
  </div>
</template>

<script>
import explorer from '@/components/browser.vue'

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
   
  }
}
</script>



<style scoped lang="less">

@import url(../../assets/less/finance.less);
@import url(../../assets/less/music.less);
</style>>
