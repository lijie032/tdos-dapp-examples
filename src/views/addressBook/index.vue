<template>
    <div class="pageWrap bg-wrap dis-table">
        <explorer ></explorer>
        <div class="page-main content-middle">
             <div class="book-content">
                 <div class="d-title">
                     通讯录
                     <a class="add-btn pointer" @click="addAddressBook"></a>
                 </div>
                 <div class="addressbook_content">
                     <!--noData是没有数据的时候显示-->
                     <div  class="noData" v-if="!isData">
                         <div class="logo"></div>
                         <p class="functMess">当前暂无联系人，请点击右上方的按钮进行添加~</p>
                     </div>

                     <div class="data-box">
                        <div class="data-left">
                            <div class="data-content">
                                <div class="searchbox">
                                    <div class="search-in"><input placeholder="请输入姓名查找" v-model="searchKey"/></div>
                                    <a class="btnSearch pointer" @click="search">搜索</a>
                                </div>
                                <el-scrollbar class="record-scroll" ref="myScrollbar">

                                    <ul class="ab-list">
                                      <li v-for="(item,index) in addressList" :key="index" @click="showRight(item)" >
                                          <span class="li-userName">用户名：{{item.username}}</span>
                                          <span class="li-phone">电话号码：{{item.phone}}</span>
                                      </li>
                                    </ul>
                                    <p class="p-mess">-暂无更多联系人-</p>
                                </el-scrollbar>
                            </div>
                        </div>
                        <div class="data-right">
                            <div class="data-content" v-if="isShow">
                            <el-scrollbar class="record-scroll" ref="myScrollbar-right"  >
                               <div class="name p-line1">{{selectUser.username}}</div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col1">
                                        <p class="ppic">手机号码：+{{selectUser.phone}}</p>
                                    </div>
                                </div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col2">
                                        <p class="ppic">区块高度：+ {{selectUser.height}}</p>
                                    </div>
                                </div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col3">
                                        <p class="ppic">区块哈希：</p>
                                        <p>{{selectUser.affair_hash}}
                                          <span class="icon_copy pointer" v-clipboard:copy="message" v-clipboard:success="onCopy" v-clipboard:error="onError"></span></p>
                                    </div>
                                </div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col4">
                                        <p class="ppic">事务哈希：</p>
                                        <p>{{selectUser.hash}}<span class="icon_copy pointer" v-clipboard:copy="message2" v-clipboard:success="onCopy" v-clipboard:error="onError"></span></p>
                                    </div>
                                </div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col5">
                                        <p class="ppic">备注信息：</p>
                                        <p>{{selectUser.remark}}</p>
                                    </div>

                                </div>
                                <div class="btnbox">
                                    <a class="btn-back pointer" type="button" @click="back()">返回</a>
                                </div>
                            </el-scrollbar>
                            </div>
                        </div>
                     </div>


                 </div>
                  <div class="d-title"></div>
             </div>
        </div>

        <!--添加联系人-->
        <div class="trans" v-show="isAdd">
            <div class="addform">
                 <div class="header">
                     添加新的联系人
                     <a class="close pointer" @click="hideAdd"></a>
                 </div>
                 <div class="d-in">
                     <div class="lab">姓名：</div>
                     <input type="text" maxlength="15" v-model="userName" />
                 </div>

                <div class="d-in">
                     <div class="lab">电话：</div>
                     <input type="text" maxlength="11"  v-limitNum v-model="number"/>
                 </div>

                <div class="d-in d-in-textarea">
                    <div class="lab">备注：</div>
                    <textarea v-model="remark" rows="4"/>
                 </div>

                 <div class="btnbox">
                     <button class="btn-add" type="button" v-on:click="addBook()">确认添加</button>
                     <a ref="sendTx"></a>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import explorer from '@/components/browser1.vue'
import {publicKey2Address} from '@salaku/js-sdk'
import { addAddressBook, getAddressBooks, getTransaction } from "@/api/dapps"
import {showLoading, hideLoading} from '@/assets/js/loading'
import {utils} from '@/assets/js/pattern'
export default {
    data(){
        return{
           isAdd:false,//是否显示添加
           isData:true,//是否有数据显示判断
           userName:'',
            remark:'',
            number:'',
            isShow:false,
            selectUser: {},
            searchKey:'',
          addressList:[
            //   {username:'陈慧',phone:'123488699',height:'7859654',hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',
            //   affair_hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',remark:'此人极度危险，切勿擅自接近，切记！切记！切记！如有 危险请拨打电话报警。'},
            //   {username:'陈慧',phone:'123488699',height:'7859654',hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',
            //   affair_hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',remark:'此人极度危险，切勿擅自接近，切记！切记！切记！如有 危险请拨打电话报警。'},
            //   {username:'陈慧',phone:'123488699',height:'7859654',hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',
            //   affair_hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',remark:'此人极度危险，切勿擅自接近，切记！切记！切记！如有 危险请拨打电话报警。'}
          ],
          message:'dfdldfkld;flsfksl;df;lfd',
          message2:'dfdldfkld'

        }
    },
    components:{
        explorer
    },
    methods:{

        addAddressBook(){
            let that = this;
            that.isAdd=true;
            that.userName = '';
            that.remark = '';
            that.number = '';
        },

       //添加通讯录显示
        async addBook(){
            let that = this;
            let pk = that.getPK();
            if (pk == "") {
                return that.$toast("获取账户失败，请打开TDOS插件", 3000);
            }
            let payload = {
                username: that.userName,
                phone: that.number,
                memo: that.remark,
            };
            if( utils.isNullOrEmpty(that.userName)){
                return that.$toast('请输入姓名', 3000)
            }
            if( utils.isNullOrEmpty(that.number)){
                return that.$toast('请输入电话', 3000)
            }
            if( !utils.isMobile(that.number)){
                return that.$toast('电话格式不正确', 3000)
            }
            if( utils.isNullOrEmpty(that.remark)){
                return that.$toast('请输入备注', 3000)
            }
            that.isAdd=false;
            let tx = await addAddressBook(payload,pk);
            let sendTx = JSON.stringify(tx);
            that.$refs.sendTx.href =
                "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
            that.$refs.sendTx.click();
            return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
       },
       //隐藏显示
       hideAdd(){
         let that = this;
         that.isAdd=false;
       },
        async search(){
            let that = this;
            let pk = that.getPK();
            if (pk == "") {
                return that.$toast("获取账户失败，请打开TDOS插件", 3000);
            }
            let addr = publicKey2Address(pk);
            let books = await getAddressBooks(addr);


            that.addressList = [];
            await Promise.all(books.map(async item => {
                    await  getTransaction(item.hash).then(t => {
                    item.height = t.blockHeight;
                    item.affair_hash = t.blockHash;
                 });
            }))
            books.sort(function(a,b){
                return a.username.localeCompare(b.username);
            });
            if (that.searchKey != ""){
                books.forEach((item)=>{
                    if (that.searchKey == item.username){
                        that.addressList.push({username:item.username, phone:item.phone, remark:item.memo, hash:item.hash, height:item.height, affair_hash:item.affair_hash})
                    }
                });
            } else {
                books.forEach((item)=>{
                    that.addressList.push({username:item.username, phone:item.phone, remark:item.memo, hash:item.hash, height:item.height, affair_hash:item.affair_hash})
                });
            };

       },
       showRight(item){
        let that = this;
        that.isShow = true;
        that.selectUser = item;
        that.message = item.affair_hash;
        that.message2 = item.hash;
        },
        back(){
            let that = this;
            that.isShow = false;
        },
        timer_tx () {
        let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash+","+'\n' + '请等待上链...')
          this.timer1 = setInterval(function () {
            getTransaction(hash).then(tx => {
              if (tx.confirms != -1) {
                hideLoading()
                clearInterval(that.timer1)
                that.search();
              }

            })

          }, 1000)
        }
      },
      onCopy: function (e) {
        let that = this
        return that.$toast('复制成功', 2000)
      },
      onError: function (e) {
        let that = this
        return that.$toast('复制失败，请稍后重试', 2000)
      },
    },

    mounted(){
      let that = this;
      that.search();
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
   @import url(../../assets/less/addressBook.less);
</style>
