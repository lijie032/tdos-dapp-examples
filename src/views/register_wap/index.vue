<template>
    <div class="wap-wrap">
        <div class="wrapheader">
             <span class="close"></span>
            <div class="pageTitle line-ellipsis">{{pageIndex==1?'请先登记个人信息':'查询消息'}}</div>
            <span class="list-icon" @click="linkList"></span>
        </div>
        <div class="nav-function ">
            <div class="box-flex">
                <span class="s-nav flex1 pointer " :class="{'active':pageIndex==1}" @click="pageIndex=1">登记信息</span>
                <span class="s-nav flex1 pointer" :class="{'active':pageIndex==2}" @click="pageIndex=2,clearData()">查询信息</span>
            </div>
        </div>
        <div v-if="pageIndex==1">
            <div class="logo"></div>
            <div class="frombox">
            
                <div class="din-box box-flex flex-middle">
                    <div class="lab">姓名：</div>
                    <div class="labin flex1">
                        <input placeholder="请输入姓名" v-model="name" v-removeSymbol  v-remembered/>
                    </div>
                </div>
                <div class="din-box box-flex flex-middle">
                    <div class="lab">性别</div>
                    <div class=" flex1 box-flex flex-middle">
                        <div class="d-rad box-flex flex-middle">
                            <span class="radio " :class="{'radio_h':gender==1}"></span>
                            <label>男</label>
                        </div>
                        
                        <div class="d-rad box-flex flex-middle">
                        <span class="radio"></span>
                        <label>女</label>
                        </div>
                    </div>
                </div>
                <div class="din-box box-flex flex-middle">
                    <div class="lab">手机号码</div>
                    <div class="labin flex1">
                        <input maxlength='11' placeholder="请输入手机号" v-model="phone"/>
                    </div>
                </div>
                <div class="din-box box-flex flex-middle">
                    <div class="lab">公司名称</div>
                    <div class="labin flex1">
                        <input  maxlength='11' placeholder="请输入公司名称" v-model="companyName"/>
                    </div>
                </div>
                <div class="box-flex flex-middle flex-center btnbox">
                    <span class="pointer btn-register" @click="linSuccess">确认登记</span>
                </div>
            </div>
        </div>


        <!--查询结果-->
        <div class="div-search" v-if="pageIndex==2">
            <div class="searchBox">
                <div class="d-searchIn">
                     <input placeholder="请在此输入事务哈希" v-model="searchText"/>
                     <span class="search_btn" @click="search"></span>
                </div>
            </div>
            <p class="mess">（您可输入事务哈希查询</br>或者访问:<a>浏览器你去地址</a>进行查询。）</p>
            <div class="search-result">
                <p>区块高度：{{height}}</p>
                <p>区块哈希：{{blockHash}}</p>
                <p>事务哈希：{{txHash}}</p>
                <p>姓名：{{searchName}}</p>
                <p>性别：{{searchSex}}</p>
                <p>手机号：{{searchPhone}}</p>
                <!--公司名称有值显示，没有值不显示-->
                <p>单位名称:{{searchCompany}}</p>
            </div>
        </div>
    </div>
</template>

<script >
import {utils} from '@/assets/js/pattern'
import { saveRegister, getRegister, getRegisterId, getRegisters, hasPhone} from "@/api/dapps.js";
import { getTransaction, sendTransaction } from '@/api/dapps'
export default{


   data(){
       return{
        gender:1,
        pageIndex:1,
        name: '', //姓名
        phone: '',
        companyName:'',
            searchName:'',
            searchPhone:'',
            searchSex:'',
            searchCompany:'',
            height: '',
            blockHash:'',
            txHash:'',
            searchText:'',
       }
   },
   methods:{
       async linSuccess(){
           let that = this;
            if (utils.isNullOrEmpty(that.name)) {
              return that.$toast('请输入姓名', 3000)
            }

            if (utils.isNullOrEmpty(that.gender+'')) {
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
           that.$router.push({path:'/register_wap/success',query: {hash: tx.getHash()}}).catch(err => { console.log(err) })
       },
       linkList(){
           let that = this;
           that.$router.push({path:'/register_wap/userList'}).catch(err => { console.log(err) })
       },
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
            })
       },
       clearData(){
           let that = this;
            that.searchName='';
            that.searchPhone='';
            that.searchSex='';
            that.searchCompany='';
            that.height= '';
            that.blockHash='';
            that.txHash='';
            that.searchText='';
       }
   }
}
</script>

<style lang="less" scoped>
   @import url(../../assets/less/wap.less);
</style>