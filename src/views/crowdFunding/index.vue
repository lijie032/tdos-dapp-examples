<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer :type="type"></explorer>
     
      <div class="page-main content-middle">
          <div class="page-content">
          	 <div class="pageTitle">欢迎来到TDOS众筹</div>
          	 <div class="p-container">
          	 	  <div class="searchIn">
          	 	  	 <input placeholder="可复制事务哈希至此查询" />
          	 	  	 <a class="pointer cf-btn a-search">查询</a>
          	 	  </div>
          	 	  <div class="project-info" v-for="(item,index) in projectList" :key="index">
					 <div class="hot-icon cf-btn">
						 <span class="">热门项目</span>
					 </div>
          	 	  	 <div class="pi-col">
          	 	  	 	  <div class="main-col">
          	 	  	 	  	<p class="p-line1 p-name">{{item.title}}</p>
          	 	  	 	  	<div class="intro">{{item.intro | ellipsis}}</div>
          	 	  	 	  	<div class="time">{{item.time}}</div>
          	 	  	 	  </div>
          	 	  	 </div>
          	 	  	 <div class="pi-col">
          	 	  	 	  <div class="main-col">
          	 	  	 	  	 <div class="amount-col">
          	 	  	 	  	 	  <p class="pt">目标金额</p>
          	 	  	 	  	 	  <p class="p-amount">300,000</p>
          	 	  	 	  	 </div>
          	 	  	 	  	  <div class="amount-col">
          	 	  	 	  	 	  <p class="pt">已筹金额</p>
          	 	  	 	  	 	  <p class="p-amount">250,000</p>
          	 	  	 	  	 </div>
          	 	  	 	  	 <div class="amount-col">
          	 	  	 	  	 	  <p class="pt">参与人数</p>
          	 	  	 	  	 	  <p class="p-amount">1,200</p>
          	 	  	 	  	 </div>
          	 	  	 	  </div>
          	 	  	 </div>
          	 	  	 <div class="pi-col">
          	 	  	 	  <a class="cf-btn pointer btn-rasie" @click="startRaise">
          	 	  	 	  	<span>开始募集</span>
          	 	  	 	  </a>
          	 	  	 </div>
          	 	  	 
          	 	  	 <div class="d-line d-line1"></div>
          	 	  	 <div class="d-line d-line2"></div>
          	 	  </div>
          	 </div>
          </div>
         
      </div>
      
      <!--开始募集-->
      <div class="trans" v-if="isRasie">
	    <div class="dis-table">
        <div class="popup-div">
        	 <div class="popup-main">
        	 	  <div class="popup-header">
        	 	  	开始募集
        	 	  	<a class="pointer close" @click="isRasie=false;addScroll()"></a>
        	 	  </div>
        	 	  <div class="popup-content">
        	 	  	  <p class="p-title">目标金额:30,000</p>
        	 	  	  <div class="d-in">
        	 	  	  	<input placeholder="请输入募捐金额" />
        	 	  	  </div>
        	 	  </div>
        	 	  <div class="btnbox">
        	 	  	<a class="cf-btn pointer bot-btn" @click="clickRasie">确认募捐</a>
        	 	  </div>
        	 </div>
        </div>
	    </div>
      </div>
      
      <!--募集成功展示-->
      <div class="trans" v-if="rasieSuc">
		<div class="dis-table">
			<div class="popup-div">
				<div class="popup-main">
					<div class="popup-header">
						募集成功
						<a class="pointer close" @click="rasieSuc=false;addScroll()"></a>
					</div>
					<div class="popup-content chain-content">
						<p class="chain-title">恭喜您！募捐成功！以下是您的事务哈希：</p>
						<div class="hash-value">
							<span>da2d6qwe6q41qw51e4re49tre9g4er16et6re4tda2d6qwe6q41qw51e4re49tre9g4er16et6re4te4ere4er</span>
							<a class="copy pointer"></a>
						</div>
						<p class="p-mess">（您可复制上方哈希值并点击右上角按钮至“TDS浏览器”查询，或在 此页面内点击查询。）</p>
					</div>
					<div class="btnbox">
						<a class="cf-btn pointer bot-btn" @click="rasieSuc=false;addScroll()">我知道了</a>
					</div>
				</div>
			</div>
		</div>
      </div>
      
      <!--搜索结果展示-->
      
      <div class="trans" v-if="rasieResult">
		<div class="dis-table">
			<div class="popup-div dis-table">
				<div class="popup-main result-popup-main">
					<div class="popup-header">
						查询信息
						<a class="pointer close" @click="rasieResult=false;addScroll()"></a>
					</div>
					<div class="popup-content result-content">
						<div class="result-col">
							<span class="lab">您的募捐信息已上链</span>
							<p>区块高度：7956423</p>
							<p>区块哈希：fsd2fw5er45ewr45ewtgd51fgdf5gdfgd1q5wrt d3qw2eq6w5eqw</p>
							<p>事务哈希：fsd2fw5er45ewr45ewtgd51fgdf5gdfgd1q5wrt d3qw2eq6w5eqw</p>
						</div>
						<div class="result-col">
							<span class="lab">募捐信息</span>
							<p>募捐地址：fsd2fw5er45ewr45ewtgd51fgdf5gdfgd1q5wrt d3qw2eq6w5eqw</p>
							<p>目标金额：300,000</p>
							<p>募捐金额：6,000</p>
							<p>项目介绍：《宇宙矿工计划》是一款区块链题材的建造类 游戏，玩家是宇宙旷野的矿工，在这里动用任何资源、构 建任何事务都需要通过上链操作，形成一个完整的区块链 社会...</p>
						</div>
					</div>
					<div class="btnbox">
						<a class="cf-btn pointer bot-btn" @click="rasieSuc=false;addScroll()">我知道了</a>
					</div>
				</div>
			</div>
		</div>
      </div>
      
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/crowdFunding.less);
</style>>

<script>
import explorer from '@/components/browser1.vue'
import TpScroll from '@/assets/js/tp-scroll.js'
export default {
    data(){
        return{
			type:1,//头部右上角浏览器
            projectList:[{title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'},
            {title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'}],
            isRasie:false, //点击募集展示
            rasieSuc:false,//募集成功展示
            rasieResult:true,
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
        //点击募集
        startRaise(){
        	let that = this;
			that.isRasie = true;
			TpScroll.RemoveScroll();
        },
        
        //募集确认
        clickRasie(){
        	let that = this;
        	that.isRasie = false;
			that.rasieSuc=true
			TpScroll.RemoveScroll();
		},

		addScroll(){
           TpScroll.AddScroll()
		}
		
    }
}
</script>
