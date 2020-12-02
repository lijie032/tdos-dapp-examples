<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer ></explorer>
     
      <div class="page-main content-middle">
          <div class="page-content">
          	 
              <div class="flash-form">
              	 <div class="f-header">
					   <div class="f-header-search " :class="{'isSearch':isSearch}">
							<input type="text" placeholder="请输入事务哈希" v-if="isSearch"/>
							<div class="line" v-if="isSearch"></div>
							<a class="btn-search pointer" @click="search">查询</a>
						</div>
	              	 	<div class="logo"></div>
	              	 	欢迎来到TDOS闪电贷
	              	 	
						
              	 </div>
				 <div class="form-content">
					  <div class="f-amount">当前可借贷金额：<span>460,000</span></div>
					  <div class="f-in">
						  <div class="f-in-box f-in-box-1">
							    <p class="p-text" @click="inputFocus"  v-if="!isInput"><span></span>请输入您想要借贷的金额</p>
							  <input placeholder="" v-if="isInput" ref="input"/>
						  </div>
						  <div class="f-in-box">
							  <p class="p-text"><span></span>当前利息为：5%</p>
						  </div>
					  </div>
				 </div>
				 <div class="btnbox">
					 <a class="pointer btn-apply" @click="applyLoan">申请</a>
				 </div>
              </div>
          </div>
         
      </div>
      
 
      
      <!--募集成功展示-->
      <div class="trans" v-if="applaySuc">
		<div class="dis-table">
			<div class="popup-div">
				<div class="popup-main">
					<div class="popup-header">
						借贷成功
						<a class="pointer close" @click="applaySuc=false;addScroll()"></a>
					</div>
					<div class="popup-content chain-content">
						<p class="chain-title">恭喜您！借贷成功！以下是您的事务哈希：</p>
						<div class="hash-value">
							<span>da2d6qwe6q41qw51e4re49tre9g4er16et6re4tda2d6qwe6q41qw51e4re49tre9g4er16et6re4te4ere4er</span>
							<a class="copy pointer"></a>
						</div>
						<p class="p-mess">（您可复制上方哈希值并点击右上角按钮至“TDS浏览器”或至此页面内进行查询。）</p>
					</div>
					<div class="btnbox">
						<a class="cf-btn pointer bot-btn" @click="applaySuc=false;addScroll()">我知道了</a>
					</div>
				</div>
			</div>
		</div>
      </div>
      
      <!--搜索结果展示-->
      
      <div class="trans" v-if="searchsult">
		<div class="dis-table">
			<div class="popup-div dis-table">
				<div class="popup-main result-popup-main">
					<div class="popup-header">
						查询信息
						<a class="pointer close" @click="searchsult=false;addScroll()"></a>
					</div>
					<div class="popup-content result-content">
						<div class="result-col">
							<span class="lab">该笔借贷已存证上链</span>
							<p>区块高度：7956423</p>
							<p>区块哈希：fsd2fw5er45ewr45ewtgd51fgdf5gdfgd1q5wrt d3qw2eq6w5eqw</p>
							<p>事务哈希：fsd2fw5er45ewr45ewtgd51fgdf5gdfgd1q5wrt d3qw2eq6w5eqw</p>
						</div>
						<div class="result-col">
							<span class="lab">借贷信息</span>
							<p>借贷金额：90,000</p>
							<p>借贷时间：2020-09-15 17:45:25</p>
							<p>盈利金额：5,000</p>
							<p>利息金额：2,000</p>
						</div>
					</div>
					<div class="btnbox">
						<a class="cf-btn pointer bot-btn" @click="searchsult=false;addScroll()">我知道了</a>
					</div>
				</div>
			</div>
		</div>
      </div>
      
  </div>
</template>
<script>
import explorer from '@/components/browser1.vue'
import TpScroll from '@/assets/js/tp-scroll.js'
import { Loading } from 'element-ui';
export default {
    data(){
        return{
		
            projectList:[{title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'},
            {title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'}],
      
            applaySuc:false,//募集成功展示
			searchsult:false,
			isInput:false, //是否点击输入金额

			isSearch:false,//是否搜索
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
	directives: {
		focus: {
		// 指令的定义
			inserted: function (el) {
			el.focus()
			}
		}
	},
    methods:{
		//点击输入input获得焦点
		inputFocus(){
			let that = this;
			that.isInput=true;
			that.$nextTick(function(){	
			  this.$refs.input.focus()
			})
			
		},

		//点击搜索
		search(){
		   let that = this;

		   if(that.isSearch==false){
			 that.isSearch=true;
			 
		   }else{
			   that.searchsult = true
			   TpScroll.RemoveScroll();
		   }
		},

		//申请借贷
       applyLoan(){
		 let that = this;
		 that.applaySuc = true;
		 TpScroll.RemoveScroll();
		 
	   },
		
	

		addScroll(){
           TpScroll.AddScroll()
		},
		
    }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/crowdFunding.less);
@import url(../../assets/less/flashLoan.less);

</style>
