<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer ></explorer>

      <div class="page-main content-middle">
          <div class="page-content">

              <div class="flash-form">
              	 <div class="f-header">
					   <div class="f-header-search " :class="{'isSearch':isSearch}">
							<input type="text" placeholder="请输入事务哈希" v-if="isSearch" v-model="hash"/>
							<div class="line" v-if="isSearch"></div>
							<a class="btn-search pointer" @click="search">查询</a>
						</div>
	              	 	<div class="logo"></div>
	              	 	欢迎来到TDOS闪电贷


              	 </div>
				 <div class="form-content">
					  <div class="f-amount">当前可借贷金额：<span>{{allMoney}}</span></div>
					  <div class="f-in">
						  <div class="f-in-box f-in-box-1">
							    <p class="p-text" @click="inputFocus"  v-if="!isInput" ><span></span>请输入您想要借贷的金额</p>
							  <input placeholder="" v-if="isInput" ref="input" type="text" v-limitNum v-model="money"/>
						  </div>
						  <div class="f-in-box">
							  <p class="p-text"><span></span>当前利息为：5%</p>
						  </div>
					  </div>
				 </div>
				 <div class="btnbox">
					 <a class="pointer btn-apply" @click="applyLoan">申请</a>
					 <a ref="sendTx"></a>
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
							<p>区块高度：{{blockHeight}}</p>
							<p>区块哈希：{{blockHash}}</p>
							<p>事务哈希：{{hash}}</p>
						</div>
						<div class="result-col">
							<span class="lab">借贷信息</span>
							<p>借贷金额：{{amount}}</p>
							<p>借贷时间：{{time}}</p>
							<p>盈利金额：{{profit}}</p>
							<p>利息金额：{{rate * amount / 100}}</p>
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
import { getTotalMoney, lend, getTransaction, getLendInfo } from "@/api/dapps";
import {isInteger} from "@/api/index.js";
import {showLoading, hideLoading} from '@/assets/js/loading'

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

			isSearch:true,//是否搜索
			allMoney:0,
			money:0,
			hash: '',
			blockHeight:0,
			blockHash:'',
			amount:0,
			time:0,
			profit:0,
			interest:0,
			rate:0,
			height:0,
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
		async search(){
		   let that = this;
			getTransaction(that.hash).then(t => {
                        that.blockHeight = t.blockHeight;
                        that.blockHash = t.blockHash;
						that.isSearch=true;
                    });
			let u = await getLendInfo(that.hash);
			if (u == ""){
          		return that.$toast('暂无信息', 3000)
        	}
			that.amount = u.amount;
			that.time = u.time;
			that.profit = u.profit;
			that.interest = u.interest;
			that.rate = u.rate;
			that.height = u.height;
		   if(that.isSearch==false){


		   }else{
			   that.searchsult = true
			   TpScroll.RemoveScroll();
		   }
		},

		//申请借贷
       async applyLoan(){
		 	let that = this;
		 	if (that.money > that.allMoney){
				that.$toast("最多可贷"+that.allMoney, 3000);
				return;
			}

			if (that.money == 0){
				that.$toast("贷款金额不能为0", 3000);
				return;
			}
			// that.applaySuc = true;
		 	TpScroll.RemoveScroll();
			let pk = that.getPK();
            if (pk == "") {
                return that.$toast("获取账户失败，请打开TDOS插件", 3000);
			}
            let payload = {
                amount: that.money,
                time: this.dateFormat(new Date().toString()),
                rate: 5,
				profit: Math.ceil(that.money * 10 / 100),
			};

            let tx = await lend(payload,pk);
            let sendTx = JSON.stringify(tx);
            that.$refs.sendTx.href =
                "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
            that.$refs.sendTx.click();
            return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
	   },


		addScroll(){
           TpScroll.AddScroll()
		   let that = this;
		   that.hash='';
		},

		async getTotalMoney(){
		   let that = this;
           let money  = await getTotalMoney();
		   if (money != 0){
				that.allMoney = money;
		   }
		},
		dateFormat(time) {
			var date=new Date(time);
			var year=date.getFullYear();
			/* 在日期格式中，月份是从0开始的，因此要加0
				* 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
				* */
			var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
			var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
			var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
			var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
			var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
			// 拼接
			return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
		},
		timer_tx () {
        let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash+'\n' + ',请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(hash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
				that.getTotalMoney();
              }
            })

          }, 1000)
        }
      }

    },
	 mounted(){
		this.getTotalMoney();
		this.timer = setInterval(this.timer_tx, 1000)
	 },
	 beforeDestroy() {
      clearInterval(this.timer)
      if (this.timer1) {
        clearInterval(this.timer1)
      }
    }
}
</script>

<style scoped lang="less">
@import url(../../assets/less/crowdFunding.less);
@import url(../../assets/less/flashLoan.less);

</style>
