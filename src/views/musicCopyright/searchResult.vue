<template>
  <div class="pageWrap f-chain-wrap">
      <div class="left">   
      </div>
      <div class="right">
         <div class="formbox confirmBox">
              <div class="f-form-box">
                  <h3>音乐信息</h3>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">歌曲名称：</div>
	                   <div class="lab-info">xxxxx</div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">歌曲时长：</div>
	                   <div class="lab-info">xxxxx</div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">歌曲信息：</div>
	                   <div class="lab-info">张三</div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">其他信息：</div>
	                   <div class="lab-info">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</div>
                  </div>
                   <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">区块高度：</div>
	                   <div class="lab-info">7859643</div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">事务哈希：</div>
	                   <div class="lab-info">1C366dzxqemp56ASwe59FG32sdxc59332VFG</div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">上链时间：</div>
	                   <div class="lab-info">2020-05-06 19:06:15</div>
                  </div>
                  <div class="btnbox">
                      <a class="pointer chain-btn">审核通过</a>
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
