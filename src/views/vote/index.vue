<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer :type="type"></explorer>
     
      <div class="page-main content-middle">
          <div class="page-content">
          	 <div class="pageTitle">{{title}}</div>
          	 <div class="p-container">
          	 	<div class="v-Proposition">
                     <div class="v-name">{{voteA}}</div>
					 <div class="v-detail-intro">
                        <el-scrollbar style="height:100%">
							<p>{{infoA}}
							</p>
                        </el-scrollbar>
					 </div>
					 <div class="btnbox">
						 <button class="btn pointer" @click="agree(0)">确认选择并投票</button>
						 <a ref="sendTx"></a>
					 </div>
				</div>
				<div class="vs"></div>
				<div class="v-Proposition">
                     <div class="v-name">{{voteB}}</div>
					 <div class="v-detail-intro">
                        <el-scrollbar style="height:100%">
							<p>{{infoB}}</p>
                        </el-scrollbar>
					 </div>
					 <div class="btnbox">
						 <button class="btn pointer" @click="agree(1)">确认选择并投票</button>
						 <a ref="sendTx"></a>
					 </div>
				</div>
          	 </div>
			 <p class="v-intro">关于该项目的一些解释性说明关于该项目的一些解释性说明关于该项目的一些解释性说明关于该项目的一些解释性说明关于该项目的一些解释性说明关于该项目的一些解释性说明关于 该项目的一些解释性说明关于该项目的一些解释性说明</p>
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
import { getVote, vote} from "@/api/dapps";
export default {
    data(){
        return{
			type:1,//头部右上角浏览器
            // projectList:[{title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            // targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'},
            // {title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            // targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'}],
			// projectList:[],
       		title: '',
    		voteA: '',
    		voteB: '',
    		infoA: '',
    		infoB: '',
            chainSuc:false,//募集成功展示
       
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
        //募集确认
        clickRasie(){
        	let that = this;
        	that.isRasie = false;
			that.rasieSuc=true
			TpScroll.RemoveScroll();
		},

		addScroll(){
           TpScroll.AddScroll()
		},

		//点击按钮跳转到界面
		async agree(i){
			let that = this;
			// that.$router.push({path:'/vote/result'})
            let pk = that.getPK();
            if (pk == "") {
                return that.$toast("获取账户失败，请打开TDOS插件", 3000);
            }
			let payload = {
                offset: i,
            };
            let tx = await vote(payload, pk);
            let sendTx = JSON.stringify(tx);
            that.$refs.sendTx.href =
                "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
            that.$refs.sendTx.click();
            return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
		},

		async getVoteInfo(){
			let that = this;
			let voteInfo = await getVote();
			that.title = voteInfo.title;
			that.voteA = voteInfo.voteA;
			that.voteB = voteInfo.voteB;
			that.infoA = voteInfo.infoA;
			that.infoB = voteInfo.infoB;
			console.log(voteInfo)
		}
		
    },
    mounted(){
	  	this.getVoteInfo();	
    },
}
</script>
