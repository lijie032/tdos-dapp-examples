<template>
  <div class="pageWrap f-chain-wrap">
    <explorer :isHome="isHome" :type="type" :isIndex="isIndex"></explorer>
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
	                   <div class="lab">歌手信息：</div>
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
                    <div class="lab">区块哈希：</div>
                    <div class="lab-info"><a id="block_hash"></a></div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">区块高度：</div>
	                   <div class="lab-info"><a id="block_height"></a></div>
                  </div>
                  <div class="d-info p-text">
                     <span class="icon"></span>
	                   <div class="lab">事务哈希：</div>
	                   <div class="lab-info"><a id="transaction_hash"></a></div>
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
import explorer from '@/components/browser1.vue'
export default{
  data(){
    return{
       type:0,
       isHome:true,
       isIndex:false
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
    let t = this.$route.query.transaction;
    let result = this.$route.query.result;
    let tx_hash = this.$route.query.tx_hash;
    document.getElementById("block_hash").innerHTML = t.blockHash;
    document.getElementById("transaction_hash").innerHTML = tx_hash;
    document.getElementById("block_height").innerHTML = t.blockHeight;
    document.getElementById("name").innerHTML = result.name;
    document.getElementById("time").innerHTML = result.long;
    document.getElementById("info").innerHTML = result.singer;
    document.getElementById("type").innerHTML = result.copyright;
    document.getElementById("other").innerHTML = result.info;

  }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/finance.less);
@import url(../../assets/less/music.less);
</style>>
