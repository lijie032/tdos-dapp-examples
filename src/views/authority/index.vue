<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer :type="type"></explorer>
     
      <div class="page-main content-middle">
          <div class="page-content">
          	 <div class="pageTitle">欢迎来到TDOS权限查询</div>
          	 <div class="p-container">
          	 	  <div class="searchIn">
          	 	  	 <input placeholder="您可将连接复制至此来查询权限" />
          	 	  	 <a class="pointer cf-btn a-search" @click="search()"><span>查询</span></a>
          	 	  </div>

          	 </div>
          </div>
         
      </div>
      
      <!--开始募集-->
      <div class="trans" v-if="isSearch">
	    <div class="dis-table">
        <div class="popup-div">
        	 <div class="popup-main">
        	 	  <div class="popup-header">
        	 	  	TDOS权限
        	 	  	<a class="pointer close" @click="isSearch=false;addScroll()"></a>
        	 	  </div>
        	 	  <div class="popup-content">
        	 	  	  <!---有权限和无权限需要显示一种-->
        	 	  	  <!--
                  <div class="no-authority">该地址暂未激活！请先完成激活！</div>
                 -->
                 <div class="p-text">
                 	 <p class="p-tt">查询地址:</p>
                 	 <p class="p-hash">d15weq4w5e4qw5e5d1asdf5qw65w4eq6we12das6dq6wd15weq4w5e4qw5e5d1asdf5qw65w4eq6we12das6dq6w</p>
                 </div>
                 <div class="authority-data">
                 	  <div class="d-time">起始时间：<span>2020-06-07 15:15:45</span></div>
                 	  <div class="d-time">结束时间：<span>2020-06-07 15:15:45</span></div>
                 </div>
        	 	  </div>
        	 	  <div class="btnbox">
        	 	  	<a class="cf-btn pointer bot-btn" @click="clickConfirm">我知道了</a>
        	 	  </div>
        	 </div>
        </div>
	    </div>
      </div>
      
     
      
      
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/crowdFunding.less);
@import url(../../assets/less/authority.less);

</style>>

<script>
import explorer from '@/components/browser1.vue'
import TpScroll from '@/assets/js/tp-scroll.js'
export default {
    data(){
        return{
			     type:1,//头部右上角浏览器
           
            isSearch:false, //点击募集展示
        }
    },
    components:{
     explorer
    },
    filters: {
	    ellipsis (value) {
	      if (!value) return ''
	      if (value.length > 74) {
	        return value.slice(0,74) + '...'
	      }
	      return value
	    }
	  },
    methods:{
    clickConfirm(){
    	let that = this;
		   that.isSearch = false;
		   TpScroll.AddScroll()
    },
		//查询
		search(){
           let that = this;
		   that.isSearch = true;
		   TpScroll.RemoveScroll();
		},
        
      

		addScroll(){
           TpScroll.AddScroll()
		}
		
    }
}
</script>
