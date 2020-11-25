<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">   
      </div>
      <div class="right">
         <div class="formbox">
              <div class="f-form-box">
                  <h3>请认真填写以下数据，确保能准确上链</h3>
                  <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"  placeholder="用户姓名"/></div>
                     <div class="din border-box din-2"><input type="text" maxlength="15"  placeholder="航班信息"/></div>
                  </div>
                   <div class="din-col din-col2">
                     <div class="din border-box"><input type="text" maxlength="15"   placeholder="起保时间"/></div>
                     <div class="din border-box din-2 din-select">
                       <el-select  class="n-select" popper-class="n-select" v-model="isDelay" placeholder="是否延误">
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
                     <div class="din border-box"><input type="text" maxlength="15"   placeholder="保单号码"/></div>
                     <div class="din border-box din-2 din-select">
                     	 <el-select class="n-select" popper-class="n-select" v-model="isClaims" placeholder="是否理赔">
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
      options:[{value:1,label:'是'},{value:2,label:'否'}],
      options1:[{value:1,label:'是'},{value:2,label:'否'}],
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
@import url(../../assets/less/Insurance.less);
</style>>
