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
                <span class="s-nav flex1 pointer" :class="{'active':pageIndex==2}" @click="pageIndex=2">查询信息</span>
            </div>
        </div>
        <div v-if="pageIndex==1">
            <div class="logo"></div>
            <div class="frombox">
            
                <div class="din-box box-flex flex-middle">
                    <div class="lab">姓名：</div>
                    <div class="labin flex1">
                        <input placeholder="请输入姓名"/>
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
                        <input maxlength='11' placeholder="请输入手机号"/>
                    </div>
                </div>
                <div class="din-box box-flex flex-middle">
                    <div class="lab">公司名称</div>
                    <div class="labin flex1">
                        <input  maxlength='11' placeholder="请输入公司名称"/>
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
                     <input placeholder="请在此输入事务哈希"/>
                     <span class="search_btn"></span>
                </div>
            </div>
            <p class="mess">（您可输入事务哈希查询</br>或者访问:<a>浏览器你去地址</a>进行查询。）</p>
            <div class="search-result">
                <p>区块高度：785698</p>
                <p>区块哈希：da54sd4q8weqw14fsd5f4sdg4df5g41df5hgf8h4gf8hgf</p>
                <p>事务哈希：da54sd4q8weqw14fsd5f4sdg4df5g41df5hgf8h4gf8hgf</p>
                <p>姓名：李三思</p>
                <p>性别：男</p>
                <p>单位名称：常州市XXXXXXXXXXXXXXXXXXXXXXXXX</p>
            </div>
        </div>
    </div>
</template>

<script >
export default{


   data(){
       return{
        gender:1,
        pageIndex:1,
       }
   },
   methods:{
       linSuccess(){
           let that = this;
           that.$router.push({path:'/register_wap/success'}).catch(err => { console.log(err) })
       },
       linkList(){
           let that = this;
           that.$router.push({path:'/register_wap/userList'}).catch(err => { console.log(err) })
       }
   }
}
</script>

<style lang="less" scoped>
   @import url(../../assets/less/wap.less);
</style>