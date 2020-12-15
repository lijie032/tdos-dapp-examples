<template>
    <div class="pageWrap bg-wrap dis-table">
        <explorer :type="type"></explorer>

        <div class="page-main content-middle">
            <div class="page-container">
               
                <div class="coin-attribute">
                    <div class="coin-header">
                        <a class="icon_list pointer " @click="showList"></a>
                        <div class="searchIn" :class="{'noSearch': !isSearch}">
                            <input type="text" maxlength="250" placeholder="您可在此输入复制的哈希值以此查询" v-model="searchText"/>
                            <a class="asearch pointer "  @click="search"></a>
                        </div>


                    </div>
                    <h4 class="register-title">
                        请先登记您的个人信息
                    </h4>
                    <div class="coin-50 coin-100">
                        <div class="lab">姓名：</div>
                        <input class="border-box" axlength="15" v-model="name" v-removeSymbol  v-remembered/>
                    </div>

                     <div class="coin-50 coin-100 register-select">
                        <div class="lab">性别：</div>
                        <el-select v-model="gender" placeholder="请选择" class="coin-select" popper-class ="w-coin-select">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="coin-50 coin-100">
                        <div class="lab">手机号：</div>
                        <input class="border-box" maxlength="11" v-model="phone"/>
                    </div>
                     <div class="coin-50 coin-100">
                        <div class="lab">单位名称：</div>
                        <input class="border-box" maxlength="15 " v-model="companyName"/>
                    </div>
                    

                </div>

                <div class="btnbox">
                    <button type="button" class="btn-public pointer" @click="publicCoin">确认发布</button>
                     <a ref="sendTx"></a>
                </div>

            </div>
         </div>

    <div class="trans" v-if="publicSuc">
        <div class="dis-table">
         <div class="trans-main">
             <div class="info-main">
                 <div class="con-header">
                     登记成功！
                     <a class="close pointer" @click="hidepublicSuc()"></a>
                 </div>
                 <div class="con-text">
                     <p>恭喜您！登记成功！以下是您的事务哈希：</p>
                     <p class="p-hash"><span>{{hash}}</span><a class="copy pointer" v-clipboard:copy="hash" v-clipboard:success="onCopy"
                   v-clipboard:error="onError"></a></p>
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

 

   <div class="trans" v-if="searchResult">
      <div class="dis-table">
        <div class="popup-div dis-table">
          <div class="popup-main result-popup-main">
            <div class="popup-header">
              查询信息
              <a class="pointer close" @click="searchResult=false;addScroll()"></a>
            </div>
            <div class="popup-content result-content">
              <div class="result-col">
                <span class="lab">存证信息</span>
                <p>区块高度：{{height}}</p>
                <p>区块哈希：{{blockHash}}</p>
                <p>事务哈希：{{txHash}}</p>
              </div>
              <div class="result-col">
                <span class="lab">登记信息</span>
                <p>姓名：{{searchName}}</p>
                <p>性别：{{searchSex}}</p>
                <p>手机号：{{searchPhone}}</p>
                <!--公司名称有值显示，没有值不显示-->
                <p>公司名称:{{searchCompany}}</p>
              </div>
            </div>
            <div class="btnbox">
              <a class="cf-btn pointer bot-btn" @click="searchResult=false;addScroll()">我知道了</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="trans"  v-if="listResult">
        <div class="dis-table">
            <div class="list-box">
                <div class="register-list">
                    <div class="con-header">
                        登记成功！
                        <a class="close pointer" @click="hideList()"></a>
                    </div>
                    <div class="regi-tab-box">
                        <el-scrollbar style="height:100%">
                            <el-table
                            :data="tableData"
                            style="width: 100%">
                            
                            <el-table-column
                                prop="name"
                                label="姓名"  align="center"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="gender"  align="center"
                                label="性别">
                            </el-table-column>
                            
                            <el-table-column
                                prop="phone"  align="center"
                                label="电话">
                            </el-table-column>

                            <el-table-column
                                prop="companyName"  align="center"
                                label="公司名称">
                            </el-table-column>

                            </el-table>
                        </el-scrollbar>
                     </div>
                     <div class="pageBox">

                     
                     <el-pagination
                        layout="prev, pager, next"
                        :total="total"
                        :page-size="page_size"   
                         @current-change="handleCurrentChange"
                         :current-page.sync="currentPage" 
                    >
                    </el-pagination>
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
import { saveRegister, getRegister, getRegisterId, getRegisters, hasPhone} from "@/api/dapps.js";
import { getTransaction, sendTransaction } from '@/api/dapps'
import {showLoading, hideLoading} from '@/assets/js/loading'
import {utils} from '@/assets/js/pattern'
export default {
    data(){
        return{
            type:1,
            options:[{
            value: '1',
            label: '男'
            }, {
            value: '2',
            label: '女'
            }],
            name: '', //姓名
            phone: '',
            companyName:'',
            gender:'',//性别
           
           tableData:[
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
              //  {name:'李三思' ,gender:'男',phone:'18018209875',companyName:'常州市XXXXXXXXX'},
               
               ],


           page_size:10,//每页条数,
           currentPage:1,//当前页

            publicSuc:false,//发币是否成功
            searchText:'',//搜索内容
            isSearch:false,//是否搜索
            searchResult:false,//搜索结果是否显示
            code:'',
            owner:'',
            totalSupply:0,
            seo:false,
            info:'',

            listResult:false,//列表显示

            searchName:'',
            searchPhone:'',
            searchSex:'',
            searchCompany:'',
            height: 0,
            blockHash:'',
            txHash:'',
            hash:'',

            total:0,//条数

            totalData:[],
            waitingHash:'',
        }
    },
    components:{
        explorer
    },
    methods:{
       onCopy: function (e) {
        let that = this
        return that.$toast('复制成功', 2000)
      },
      onError: function (e) {
        let that = this
        return that.$toast('复制失败，请稍后重试', 2000)
      },

      addScroll () {
        TpScroll.AddScroll()
      },
       //分页点击
      handleCurrentChange(val) {
        let that = this;
    
        let currentPage = val;
        let PageSize = that.page_size;
        that.tableData=[];
        for(var i=(currentPage-1)*PageSize;i<PageSize*currentPage;i++){ 
            if(that.totalData[i]){
               that.tableData.push(that.totalData[i]);
             } 
        }
      },
       async publicCoin(){
            let that = this;
            if (utils.isNullOrEmpty(that.name)) {
              return that.$toast('请输入姓名', 3000)
            }
            if (utils.isNullOrEmpty(that.gender)) {
              return that.$toast('请输入性别', 3000)
            }
            if (utils.isNullOrEmpty(that.phone)) {
              return that.$toast('请输入手机号', 3000)
            }
            if (utils.isNullOrEmpty(that.companyName)) {
              return that.$toast('请输入单位名称', 3000)
            }
            let bool = await hasPhone(that.phone);
            if (bool){
              return that.$toast('手机号已经存在', 3000);
            }
            let payload = {
              username: that.name,
              sex: that.gender == 1?'男':'女',
              phone: that.phone,
              designation: that.companyName,
            }
            let tx = await saveRegister(payload)
            await sendTransaction(tx);
            that.hash = tx.getHash();
            that.waitingHash  = tx.getHash();
            that.publicSuc=true;
            TpScroll.RemoveScroll();
       },
       //发布结果页隐藏
       hidepublicSuc(){
         let that = this;
         that.publicSuc=false;
         TpScroll.AddScroll();
       },

       //结果
       hideList(){
         let that = this;
         that.listResult=false;
         TpScroll.AddScroll();
       },
        //结果
       async showList(){
         let that = this;
         that.listResult=true; 
         let registers = await getRegisters();
         if (registers.length == 0){
              return;
         }
         if (registers == ''){
           return this.$toast('暂无内容', 3000)
         }
        registers.sort(function(a,b){
                return a.username.localeCompare(b.username);
            });
        registers.forEach((item)=>{
            that.totalData.push({name:item.username, gender:item.sex, phone:item.phone, companyName:item.designation})
            that.total = that.totalData.length;


           
          

        });
           let currentPage = that.currentPage;
           let PageSize = that.page_size;
           that.tableData=[];
           for(var i=(currentPage-1)*PageSize;i<PageSize*currentPage;i++){ 
             if(that.totalData[i]){
               that.tableData.push(that.totalData[i]);
             } 
            }
       },

       //点击搜索调用事件
       async search(){
            let that = this;
            let user = await getRegister(that.searchText);
            if (user == '') {
              return this.$toast('暂无内容', 3000)
            }
            getTransaction(that.searchText).then(t =>{
               that.txHash = that.searchText;
               that.blockHash = t.blockHash;
               that.height = t.blockHeight;
               that.searchName = user.username;
               that.searchSex = user.sex; 
               that.searchPhone = user.phone; 
               that.searchCompany = user.designation; 
               that.searchResult = true; 
            })
       },
       hideSearch(){
           let that = this;
           that.searchResult = false;
           TpScroll.AddScroll();
       },
      async timer_tx () {
        let that = this
        if (that.waitingHash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + that.waitingHash+","+'\n' + '请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(that.waitingHash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
                that.waitingHash = '';
              }
            })

          }, 3000)
        }
      }

    },
    mounted(){
        let that = this;
        that.isSearch=true;
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
   @import url(../../assets/less/issueCoins.less);

   @import url(../../assets/less/register.less);
</style>
