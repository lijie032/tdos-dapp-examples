<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer :type="type"></explorer>
     
      <div class="page-main content-middle">
          <div class="page-content">
          	 <div class="pageTitle">关于区块链的投票命题关于区块链的投票命题</div>
          	 <div class="p-container">
          	 	<div class="v-Proposition">
                     <div class="v-name">我同意此观点</div>
					 <div class="v-detail-intro">
                        <el-scrollbar style="height:100%">
							<p>文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文本内容文本内容文本内
								容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文。
							   容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文。
							   容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文。
							   容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文。
							</p>
                        </el-scrollbar>
					 </div>
					 <div class="btnbox">
						 <button class="btn pointer" @click="agree()">确认选择并投票</button>
					 </div>
				</div>
				<div class="vs"></div>
				<div class="v-Proposition">
                     <div class="v-name">我不同意</div>
					 <div class="v-detail-intro">
                        <el-scrollbar style="height:100%">
							<p>文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文本内容文本内容文本内
								容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文。
							   容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文。
							   容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文。
							   容文本内容 文本内容文本内容文本内容文本内容文本内容文本内容文本内容 文本内容文本内容文本内容文。
							</p>
                        </el-scrollbar>
					 </div>
					 <div class="btnbox">
						 <button class="btn pointer" @click="agree()">确认选择并投票</button>
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
export default {
    data(){
        return{
			type:1,//头部右上角浏览器
            projectList:[{title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'},
            {title:'由TDOS平台发布',intro:'众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍众筹介绍众筹介绍众 众筹介绍众筹介绍众筹介绍...',time:'2020-09-12 16:45:12',
            targetAmount:'300,000',raisedAmount:'250,000',partNumber:'1,200'}],
       
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
		agree(){
			let that = this;
			that.$router.push({path:'/vote/result'})
		}
		
    }
}
</script>
