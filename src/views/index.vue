<template>
    <div class="pageWrap">
       <div class="h-header">
           <div class="h-container">
               <div class="h-logo">
                   <img src="../assets/img/tdos_chat.png"/>
                   <div class="h-logo-intro">
                       <p class="pt">可信数据操作系统</p>
                       <p class="pt-intro">Trusted Data Operation System</p>
                   </div>
               </div>

               <div class="home-title">
                   <div class="line line1"></div>
                   <span>DAPP广场</span>
                   <div class="line line2"></div>
               </div>

               <div class="searchIn" :class="{'search_now':isSearch}">
                   <input placeholder="请输入关键词" v-model="KeyWords"/>
                   <a class="a-search pointer" @click="search"></a>
               </div>

           </div>
       </div>

       <div class="h-page-content">
          <div class="h-container">
              <div class="content-middle">
                  <ul class="navIconList">
                     <li v-for="(item,index) in iconList" :key="index" >
                        <a class="pointer" @click="routeLink(item.title,item.link)">
                         <div class="p-logo">
                             <img :src="item.icon"/>
                         </div>
                          <div class="p-title">{{item.title}}</div>
                        </a>
                     </li>
                  </ul>
              </div>
           </div>
       </div>

       <!--
       <router-link target="_blank" to='/publicWelfare'>公益</router-link>
       <router-link target="_blank" to='/finance'>金融</router-link>
       <router-link target="_blank" to='/logistics'>物流</router-link>
       <router-link target="_blank" to='/assets'>资产</router-link>
       <router-link target="_blank" to='/medicalTreatment'>医疗</router-link>
       <router-link target="_blank" to='/Insurance'>保险</router-link>
       <router-link target="_blank" to='/musicCopyright'>音乐版权</router-link>
       <router-link target="_blank" to='/bookCopyright'>版权</router-link>
       <router-link target="_blank" to='/welding'>焊接</router-link>
       <router-link target="_blank" to='/shopping'>购物</router-link>
       <router-link target="_blank" to='/cryptoBear'>加密熊</router-link>
       <router-link target="_blank" to='/chat'>聊天</router-link>
       <router-link target="_blank" to='/addressBook'>通讯录</router-link>
       <router-link target="_blank" to='/album'>相册</router-link>
       <router-link target="_blank" to='/issueCoins'>发行代币</router-link>
       <router-link target="_blank" to='/crowdFunding'>项目众筹</router-link>
       <router-link target="_blank" to='/vote'>投票</router-link>
    <router-link target="_blank" to='/authority'>TDOS权限</router-link>
        <router-link target="_blank" to='/flashLoan'>闪电贷</router-link>
        <router-link target="_blank" to='/coinExchange'>资产互换</router-link>
        -->

    </div>
</template>
<script>
 import {utils} from '@/assets/js/pattern'
export default {
    data(){
        return{
            isSearch:false,//搜索是否展开
            iconList:[
               {title:'登记',icon:require('../assets/img/logo_bookCopyright.png'),link:'/register'},
               {title:'病历共享',icon:require('../assets/img/logo_medicalTreatment.png'),link:'/medicalTreatment'},
               {title:'物流',icon:require('../assets/img/logo_logistics.png'),link:'/logistics'},
               {title:'金融',icon:require('../assets/img/logo_finance.png'),link:'/finance'},
               {title:'公益慈善',icon:require('../assets/img/logo_publicWelfare.png'),link:'/publicWelfare'},
               {title:'音乐版权',icon:require('../assets/img/logo_musicCopyright.png'),link:'/musicCopyright'},
               {title:'保险理赔',icon:require('../assets/img/logo_insurance.png'),link:'/Insurance'},
               //{title:'著作版权',icon:require('../assets/img/logo_bookCopyright.png'),link:'/bookCopyright'},
               {title:'购物溯源',icon:require('../assets/img/logo_shopping.png'),link:'/shopping'},
               {title:'焊接查证',icon:require('../assets/img/logo_welding.png'),link:'/welding'},
               {title:'资产继承',icon:require('../assets/img/logo_assets.png'),link:'/assets'},
                {title:'资产互换',icon:require('../assets/img/logo_coinExchange.png'),link:'/coinExchange'},
               {title:'发行代币',icon:require('../assets/img/logo_issueCoins.png'),link:'/issueCoins'},
               {title:'投票',icon:require('../assets/img/logo_vote.png'),link:'/vote'},
               {title:'众筹',icon:require('../assets/img/logo_crowdFunding.png'),link:'/crowdFunding'},
               {title:'聊天Talk',icon:require('../assets/img/logo_chat.png'),link:'/chat'},
               {title:'闪电贷',icon:require('../assets/img/logo_flashLoan.png'),link:'/flashLoan'},
               {title:'加密熊',icon:require('../assets/img/logo_cryptoBear.png'),link:'/cryptoBear'},
               {title:'通讯录',icon:require('../assets/img/logo_addressBook.png'),link:'/addressBook'},
               {title:'相册',icon:require('../assets/img/logo_album.png'),link:'/album'},
               {title:'TDOS权限',icon:require('../assets/img/logo_authority.png'),link:'/authority'},

           ],
           KeyWords:''//搜索关键词
        }
    },
    methods:{
        routeLink(title,path){
            let that = this;
            if(title=='登记'){
                if(that._isMobile()){
                   that.$router.push({path:'/register_wap'}).catch(err => { console.log(err) })
                }else{
                    that.$router.push({path:path}).catch(err => { console.log(err) })
                }
            }
            else{
               that.$router.push({path:path}).catch(err => { console.log(err) })
            }
            
        },
        search(){
            let that = this;
          return that.$toast('暂未开放，敬请期待！', 3000)
            // if(!that.isSearch){
            //    that.isSearch = true
            // }else{
            //    if( utils.isNullOrEmpty(that.KeyWords)){
            //         return that.$toast('请输入搜索关键词', 3000)
            //     }
            // }
        },
        _isMobile() {
        let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
           return flag;
        }
    }
}
</script>
<style scoped lang="less">
  @import url(../assets/less/index.less);
</style>
