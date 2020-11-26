<template>
    <div class="pageWrap bg-wrap">
        <explorer></explorer>
        <div class="page-main">
            <div class="p-container">
                <h3 class="page-title">欢迎来到TDOS加密熊</h3>
                <div class="bear-content">
                   <div class="bc-left">
                       <div class="d-logo">                            
                           <div class="box-shadow"></div>
                           <div class="pic"></div>  
                       </div>
                       <div class="btnbox">
                               <!--等级升级到三级的时候按钮置灰不可再升级 添加class  c-btn-disable-->
                               <a class="pointer cb-btn upbtn ">升级</a>
                           </div>
                   </div>
                   <div class="bc-right">
                       <a class="pointer mark" @click="showInfo"></a>
                       <div class="detailInfo">
                            <h3 class="h-level">
                                当前等级<span class="s-level">1</span>
                            </h3>
                            <div class="info-col info-col1">
                                <span class="lab">姓名：</span>
                                <div class="d-info">
                                    <span class="st">加密熊</span>
                                </div>

                            </div>
                            <div class="info-col info-col2">
                                <span class="lab">出生：</span>
                                <div class="d-info">
                                    <span class="st">1997-06-09</span>
                                </div>
                            </div>
                            <div class="info-col info-col3">
                                <span class="lab">攻击：</span>
                                <div class="d-info">
                                    <span class="st">197</span>
                                </div>
                                <span class="upgrade"></span>
                            </div>
                            <div class="info-col info-col4">
                                <span class="lab">血量：</span>
                                <div class="d-info">
                                    <span class="st">200,000HP</span>
                                </div>
                                <span class="upgrade"></span>
                            </div>
                            <div class="info-col info-col5">
                                <span class="lab">身高：</span>
                                <div class="d-info">
                                    <span class="st">2.4M</span>
                                </div>
                                <span class="upgrade"></span>
                            </div>
                            <div class="info-col info-col6">
                                <span class="lab">吨位：</span>
                                <div class="d-info">
                                    <span class="st">2.8T</span>
                                </div>
                                <span class="upgrade"></span>
                            </div>
                            <div class="info-col info-col7">
                                <span class="lab">防御：</span>
                                <div class="d-info">
                                    <span class="st">2,800</span>
                                </div>
                                <span class="upgrade"></span>
                            </div>
                       </div>

                    
                       <!--等级上链信息-->
                       <div class="chinInfo" v-show="isOnchain">
                           <div>区块高度：7856954</div>
                           <div class="p-line1">
                               区块哈希：q5eq4w5e4qw5eq4w98fsdf26g9sdg9ds8fds56sdf26g9sdg9ds8fds5
                               <a class="pointer a-copy"></a>
                           </div>
                           <div class="p-line1">
                               事务哈希：q5eq4w5e4qw5eq4w98fsdf26g9sdg9ds8fds56
                               <a class="pointer a-copy"></a>
                            </div>
                       </div>
                   </div>
                </div>
            </div>
        </div>

       
    </div>
</template>
<script>
import explorer from '@/components/browser1.vue'
export default {
    data(){
        return{
           isOnchain:false
        }
    },
    components:{
        explorer
    },
    methods:{
     showInfo(){
         let that = this;
         that.isOnchain = !that.isOnchain
     }
    },
    mounted(){
           let text='1233'
     
      this.$refs.aa.href='javascript:sendMessageToContentScriptByPostMessage(\''+text+'\')';
    }
}
</script>
<style scoped lang="less">
   @import url(../../assets/less/cryptoBear.less);
</style>