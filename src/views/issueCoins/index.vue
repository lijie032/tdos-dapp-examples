<template>
    <div class="pageWrap bg-wrap dis-table">
        <explorer ></explorer>
        
        <div class="page-main content-middle">
            <div class="page-container">
                <h3>欢迎来到TDOS发行代币</h3>
                <div class="coin-attribute">
                    <div class="coin-header">
                        请在下方设置代币属性
                        <div class="searchIn" :class="{'noSearch': !isSearch}">
                            <input type="text" maxlength="24" v-model="searchText"/>
                            <a class="asearch pointer "  @click="search"></a>
                        </div>

                        
                    </div>
                    <div class="coin-50">
                        <div class="lab">资产名称</div>
                        <input class="border-box" axlength="15" v-model="name"/>
                    </div>
                    <div class="coin-50">
                        <div class="lab">资产所有者</div>
                        <input class="border-box" axlength="15" v-model="owner"/>
                    </div>
                    <div class="coin-50">
                        <div class="lab">初期发行量</div>
                        <input class="border-box" maxlength="10" v-model="amount"/>
                    </div>
               
                    <div class="coin-50">
                        <div class="lab">是否允许增发</div>
                        <el-select v-model="isMore" placeholder="请选择" class="coin-select" popper-class ="w-coin-select">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="coin-50 coin-100">
                        <div class="lab">资产说明</div>
                        <el-input
                            type="textarea"
                            placeholder="请输入内容"
                            v-model="remark"
                            maxlength="200"
                            rows="4"
                            >
                            <!--show-word-limit-->
                        </el-input>
                    </div>
                </div>

                <div class="btnbox">
                    <button type="button" class="btn-public pointer" @click="publicCoin">确认发布</button>
                </div>

            </div>
         </div>
    
    <div class="trans" v-if="publicSuc">
        <div class="dis-table">
         <div class="trans-main">
             <div class="info-main">
                 <div class="con-header">
                     代币发布成功
                     <a class="close pointer" @click="hidepublicSuc()"></a>
                 </div>
                 <div class="con-text">
                     <p>您发布的代币已存证上链！以下是您的上链哈希：</p>
                     <p class="p-hash"><span>da6d56qw9eqwe26qw26f5d96g59fd7ghd4f1h5dfgfd2sf</span><a class="copy pointer"></a></p>
                     <p class="p-mess">
                         （您可复制上方哈希值并点击右上角按钮至“TDS浏览器”查询。）
                         
                     </p>
                 </div>
                 <div class="btn-box">
                     <a class="pointer btn-sure" @click="hidepublicSuc()">
                         我知道了
                     </a>
                 </div>
             </div>
         </div>
        </div>
    </div>
    
    <!--搜索结果页-->
    <div class="trans" v-if="searchResult">
        <div class="dis-table">
         <div class="trans-main  result-trans">
             <div class="info-main">
                 <div class="con-header">
                     资产属性
                     <a class="close pointer" @click="hideSearch()"></a>
                 </div>
                 <div class="con-text">
                    <p>资产名称：法特币</p>
                    <p>总发行量：200,000</p>
                    <p>初期发行量：200,000</p>
                    <p class="p-line1">创建者：dq51we4qwe41g4gsdgs84ssswsssss</p>
                    <p class="p-line1">所有者：dq51we4qwe4422gsdgs84sxxxxx</p>
                    <p>是否允许增发：允许增发</p>
                    <p>资产说明：颠三倒四多颠三倒四都说人物我带我去二群无颠三倒四多颠三倒四都说人物 CAD萨斯。</p>
                 </div>
                 <div class="btn-box">
                     <a class="pointer btn-sure" @click="hideSearch()">
                         我知道了
                     </a>
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
import { saveToken, getToken } from "@/api/tokendapp";
export default {
    data(){
        return{
            options:[{
            value: '1',
            label: '是'
            }, {
            value: '2',
            label: '否'
            }],
            name: '',
            owner: '',
            amount:'',
            isMore:'',//是否增发
            remark:'',//资产说明
            publicSuc:false,//发币是否成功
            searchText:'',//搜索内容
            isSearch:false,//是否搜索
            searchResult:false//搜索结果是否显示
        }
    },
    components:{
        explorer
    },
    methods:{
       publicCoin(){
            let that = this;
            let seo;
            if(that.isMore=='1')
            {seo =true}
            else{seo =false}
            let payload = {
                name:that.name, owner:that.owner, totalSupply:that.amount, seo: seo, info:that.remark
            };
            let pk = that.getPK();
            if (pk == "") {
                return that.$toast("获取账户失败，请打开TDOS插件", 3000);
            }
            let token = saveToken(payload, pk);
            let sendTx = JSON.stringify(token);
            that.$refs.sendTx.href =
            "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
            that.$refs.sendTx.click();
            return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
            that.publicSuc=true;
            TpScroll.RemoveScroll();
       },
       //发布结果页隐藏
       hidepublicSuc(){
         let that = this;
         that.publicSuc=false;
         TpScroll.AddScroll();
       },

       //点击搜索调用事件
       search(){
           let that = this;
          if(!that.isSearch){
            that.isSearch=true

          }else{
              that.searchResult = true;
              TpScroll.RemoveScroll();
          }
       },
       hideSearch(){
           let that = this;
           that.searchResult = false;
           TpScroll.AddScroll();
       }
     
    },
    mounted(){
      
    }
}
</script>
<style scoped lang="less">
   @import url(../../assets/less/issueCoins.less);
</style>