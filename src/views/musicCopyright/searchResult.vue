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
	                   <div class="lab-info"><a id="name"></a></div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">歌曲时长：</div>
	                   <div class="lab-info"><a id="time"></a></div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">歌曲信息：</div>
	                   <div class="lab-info"><a id="info"></a></div>
                  </div>
                  <div class="d-info p-text">
                    <span class="icon"></span>
                    <div class="lab">音乐版权：</div>
                    <div class="lab-info"><a id="type"></a></div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">其他信息：</div>
	                   <div class="lab-info"><a id="other"></a></div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">区块高度：</div>
	                   <div class="lab-info"><a id="height"></a></div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">事务哈希：</div>
	                   <div class="lab-info"><a id="hash"></a></div>
                  </div>
                  <div class="btnbox">
                      <a class="pointer chain-btn" @click="back">返回</a>
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
      back(){
        this.$router.push({path: '/musicCopyright'})
      }
  },
  mounted: function () {
    // let transaction = this.$route.query.transaction;
    // let result = this.$route.query.result;
    document.getElementById("name").innerHTML = "123123";
    document.getElementById("time").innerHTML = "123123";
    document.getElementById("info").innerHTML = "123123";
    document.getElementById("type").innerHTML = "123123";
    document.getElementById("other").innerHTML = "123123";
    document.getElementById("height").innerHTML = "123123";
    document.getElementById("hash").innerHTML = "123123";

  }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
@import url(../../assets/less/music.less);
</style>>
