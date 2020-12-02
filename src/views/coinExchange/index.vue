<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer ></explorer>
     
      <div class="page-main content-middle">
          <div class="page-content">
             <div class="p-title"><div class="logo"></div>欢迎来到TDOS资产互换</div>
			 <div class="coin-box" :class="{'coin-box-change':isExchange}">
				 <div class="coin-col">
					 <div class="f-col">
					    <div class="coin_name">
							<div class="fr">{{coin1.nick}}</div>
							<span class="s1">{{coin1.name}}</span>
						</div>
						<div class="din-box">
							<div class="din"><input type="text" :placeholder="coin1.nick" v-limitNum/></div>
						</div>
					 </div>
					 <p class="mess">{{coin1.proportion}}</p>
				 </div>
				 <a class="icon_exchange pointer" @click="coinExchange"></a>
				 <div class="coin-col">
					 <div class="f-col">
					    <div class="coin_name">
							<div class="fr">{{coin2.nick}}</div>
							<span class="s2">{{coin2.name}}</span>
						</div>
						<div class="din-box">
							<div class="din">
								<p>{{coin2.nick}}</p>
							</div>
						</div>
					 </div>
					 <p class="mess">{{coin2.proportion}}</p>
				 </div>
			 </div>

             <div class="btnbox">
				 <a class="pointer btn-exchange" @click="confirmExchange">确认转换</a>
			 </div>

          </div>


         
      </div>
     
      <!--转换成功展示-->
      <div class="trans" v-if="exchangeSuc">
		<div class="dis-table">
			<div class="popup-div">
				<div class="popup-main">
					<div class="popup-header">
						代币转换成功
						<a class="pointer close" @click="exchangeSuc=false;addScroll()"></a>
					</div>
					<div class="popup-content chain-content">
						<p class="chain-title">恭喜您！转换成功！该笔交易已存证上链！以下是您的上链哈希：</p>
						<div class="hash-value">
							<span>da2d6qwe6q41qw51e4re49tre9g4er16et6re4tda2d6qwe6q41qw51e4re49tre9g4er16et6re4te4ere4er</span>
							<a class="copy pointer"></a>
						</div>
						<p class="p-mess">（您可复制上方哈希值并点击右上角按钮至“TDS浏览器”查询。）</p>
					</div>
					<div class="btnbox">
						<a class="cf-btn pointer bot-btn" @click="exchangeSuc=false;addScroll()">我知道了</a>
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
export default {
    data(){
        return{
			type:1,//头部右上角浏览器
            
            exchangeSuc:false,//转换成功展示
			
			coin1:{
				name:'以太坊',nick:'ETH',proportion:'1ETH=0.00052BTC'
			},
			coin2:{
				name:'比特币',nick:'BTC',proportion:'1BTC=75005ETH'
			},

			isExchange:false,//货币顺序是否转换
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

		//点击货币中间转换按钮
		coinExchange(){
		   let that = this;
		   that.isExchange = !that.isExchange;
		   let obj1 = JSON.parse(JSON.stringify(that.coin2));
		   let obj2 = JSON.parse(JSON.stringify(that.coin1));

		   that.coin1 = obj1
		   that.coin2 = obj2
		},




		//点击确认转换
		confirmExchange(){
		  let that = this;
		  that.exchangeSuc = true;
		  TpScroll.RemoveScroll();
		},

		addScroll(){
           TpScroll.AddScroll()
		}
		
    }
}
</script>
<style scoped lang="less">
@import url(../../assets/less/crowdFunding.less);
@import url(../../assets/less/coinExchange.less);

</style>>
