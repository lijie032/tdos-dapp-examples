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
                                    <div class="search-in"><input placeholder="请输入姓名查找"/></div>
                                    <a class="btnSearch pointer" >搜索</a>
                                </div>
                                <el-scrollbar class="record-scroll" ref="myScrollbar">
                                    
                                    <ul class="ab-list">
                                      <li v-for="(item,index) in addressList" :key="index">
                                          <span class="li-userName">用户名：{{item.username}}</span>
                                          <span class="li-phone">电话号码：{{item.phone}}</span>
                                      </li>
                                    </ul>
                                    <p class="p-mess">-暂无更多联系人-</p>
                                </el-scrollbar>
                            </div>
                        </div>
                        <div class="data-right">
                            <div class="data-content">
                            <el-scrollbar class="record-scroll" ref="myScrollbar-right">
                               <div class="name p-line1">陈慧</div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col1">
                                        <p class="ppic">手机号码：158149052</p>
                                    </div>
                                </div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col2">
                                        <p class="ppic">区块高度：7859654</p>
                                    </div>
                                </div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col3">
                                        <p class="ppic">区块哈希：</p>
                                        <p>da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw<span class="icon_copy pointer"></span></p>
                                    </div>
                                </div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col4">
                                        <p class="ppic">事务哈希：</p>
                                        <p>da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw<span class="icon_copy pointer"></span></p>
                                    </div>
                                </div>
                                <div class="detai-info-col">
                                    <div class="din-col din-col5">
                                        <p class="ppic">备注信息：</p>
                                        <p>此人极度危险，切勿擅自接近，切记！切记！切记！如有 危险请拨打电话报警</p>
                                    </div>

                                </div>
                                <div class="btnbox">
                                    <a class="btn-back pointer" type="button">返回</a>
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
                     <input type="text" maxlength="15" v-model="userName"/>
                 </div>

                <div class="d-in">
                     <div class="lab">电话：</div>
                     <input type="text" maxlength="11" v-model="number"/>
                 </div>

                <div class="d-in d-in-textarea">
                    <div class="lab">备注：</div>
                    <textarea v-model="remark" rows="4"/>
                 </div>

                 <div class="btnbox">
                     <button class="btn-add" type="button" v-on:click="addAddressBook()">确认添加</button>
                 </div>
            </div>
        </div>
    </div>
</template>
<script>
import explorer from '@/components/browser1.vue'
import { addBook } from "@/api/dapps";
export default {
    data(){
        return{
           isAdd:false,//是否显示添加
           isData:true,//是否有数据显示判断
           userName:'',
          remark:'',
          number:'',

          addressList:[
              {username:'陈慧',phone:'123488699',height:'7859654',hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',
              affair_hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',remark:'此人极度危险，切勿擅自接近，切记！切记！切记！如有 危险请拨打电话报警。'},
              {username:'陈慧',phone:'123488699',height:'7859654',hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',
              affair_hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',remark:'此人极度危险，切勿擅自接近，切记！切记！切记！如有 危险请拨打电话报警。'},
              {username:'陈慧',phone:'123488699',height:'7859654',hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',
              affair_hash:'da54sd54qw5eqw5e4f89sd87g87r4t5ertr5e1gdf251g d2weq6w5eqw6eqw',remark:'此人极度危险，切勿擅自接近，切记！切记！切记！如有 危险请拨打电话报警。'}
          ]
          
        }
    },
    components:{
        explorer
    },
    methods:{
       //添加通讯录显示
        async addAddressBook(){
            let that = this;
            that.isAdd=true;
            let payload = {
                username: that.userName,
                memo: that.remark,
                phone: that.number,
            };
            let pk = that.getPK();
            if (pk == "") {
                return that.$toast("获取账户失败，请打开TDOS插件", 3000);
            }
            let tx = await addBook(payload);
            that.$refs.sendTx.href =
                "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
            that.$refs.sendTx.click();
            return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
       },
       //隐藏显示
       hideAdd(){
         let that = this;
         that.isAdd=false;
       }
    },
    mounted(){
      
    }
}
</script>
<style scoped lang="less">
   @import url(../../assets/less/addressBook.less);
</style>