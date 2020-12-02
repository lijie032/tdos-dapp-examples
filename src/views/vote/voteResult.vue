<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer :type="type"></explorer>
     
      <div class="page-main content-middle">
          <div class="page-content vote-result">
          	 <div class="pageTitle">{{title}}</div>
          	 <div class="p-container">
				<div class="vote-number">
				    <div class="numberbox">总计票数 
						<span class="number-1">{{amountA + amountB}}<em class="line"></em></span>
						
						<!--
						<span><em class="line"></em></span>
						<span>7<em class="line"></em></span>
						<span>6<em class="line"></em></span>
						<span>0<em class="line"></em></span>
						<span>3<em class="line"></em></span>-->
						票
					</div>
				</div>
          	 	<div class="v-Proposition">
                   <div class="result-pic result-pic-suc">
					   <div class="dis-table">
						   <div class="content-middle">票数：{{amountA}} {{(amountA * 100.0 / (amountA + amountB)).toFixed(2)}}%</div>
					   </div>
				   </div>
				   <div class="result-text">
					   <el-scrollbar style="height:100%">
						   <p>{{infoA}}</p>
					   </el-scrollbar>
				   </div>
				</div>
				
				<div class="v-Proposition">
                     <div class="result-pic result-pic-fail">
						<div class="dis-table">
							<div class="content-middle">票数：{{amountB}} {{(amountB * 100.0 / (amountA + amountB)).toFixed(2)}}%</div>
						</div>
					 </div>
					 <div class="result-text">
					   <el-scrollbar style="height:100%">
						   <p>{{infoB}}</p>
					   </el-scrollbar>
				   </div>
				</div>
          	 </div>
			 <!--<p class="v-intro">关于该项目的一些解释性说明关于该项目的一些解释性说明关于该项目的一些解释性说明关于该项目的一些解释性说明关于该项目的一些解释性说明关于该项目的一些解释性说明关于 该项目的一些解释性说明关于该项目的一些解释性说明</p>-->
          </div>
         
      </div>
      

      
      <!--投票展示-->
      <div class="trans" v-if="chainSuc">
		<div class="dis-table">
			<div class="popup-div">
				<div class="popup-main">
					<div class="popup-header cf-btn">
						恭喜您投票成功
						<a class="pointer close" @click="chainSuc=false;addScroll()"></a>
					</div>
					<div class="popup-content chain-content">
						<p class="chain-title">恭喜您投票成功！您的选择是“同意此观点”！以下是您的事务哈希：</p>
						<div class="hash-value">
							<span>3da2s6dqw5e6qw56f2as6fd6g5sg65eqw65f5ds6f52d6qwe6q41qw51e4re49tre9g4er16et6re4te4ere4er</span>
							<a class="copy pointer"></a>
						</div>
						<p class="p-mess">（您可复制上方哈希值并点击右上角按钮至“TDS浏览器”查询。）</p>
					</div>
					<div class="btnbox">
						<a class="cf-btn pointer bot-btn" @click="chainSuc=false;addScroll()">确认</a>
					</div>
				</div>
			</div>
		</div>
      </div>
      
     
      
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/vote.less);
</style>>

<script>
import explorer from '@/components/browser1.vue'
import TpScroll from '@/assets/js/tp-scroll.js'
import { getVote } from "@/api/dapps";
export default {
    data(){
        return{
			type:1,//头部右上角浏览器
            projectList:[{title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'},
            {title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'}],
       
            chainSuc:false,//募集成功展示
			title: '',
    		voteA: '',
    		voteB: '',
    		infoA: '',
    		infoB: '',
			amountA: 0,
			amountB: 0,
       
        }
    },
    components:{
     explorer
    },
    filters: {
	    ellipsis (value) {
	      if (!value) return ''
	      if (value.length > 126) {
	        return value.slice(0,126) + '...'
	      }
	      return value
	    }
	  },
    methods:{

		addScroll(){
           TpScroll.AddScroll()
		},
		async getVoteInfo(){
			let that = this;
			let voteInfo = await getVote();
			that.title = voteInfo.title;
			that.voteA = voteInfo.voteA;
			that.voteB = voteInfo.voteB;
			that.infoA = voteInfo.infoA;
			that.infoB = voteInfo.infoB;
			that.amountA = voteInfo.amountA;
			that.amountB = voteInfo.amountB;
		},
		
	},
	mounted(){
		//刚进来展示投票结果
		let that = this;
		that.chainSuc = false;
		TpScroll.RemoveScroll();
		that.getVoteInfo();
	}
}
</script>
