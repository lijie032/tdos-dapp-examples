<template>
    <div class="pageWrap bg-wrap dis-table chat-wrap">
        <explorer :type="type"></explorer>
        <div class="page-main content-middle">
            <div class="chat-container">
               <div class="chat-header">
                  <div class="logo"><img src="../../assets/img/tdos_chat.png"/></div> <span>TDOS交流群（{{num}}）</span>
                  <a class="abtn-exit pointer"></a>
               </div>
               <div class="record-box">
                  <el-scrollbar class="record-scroll" ref="myScrollbar">
                      <ul class="ul-record">
                          <li v-for='(item,index) in chartRecord' :key="index">
                             <div class="d-centent" :class="{'activecontent':item.userName==curuserName}">
                                 <div class="d-centent-userName" >{{item.userName}}：</div>
                                 <div class="d-centent-chat">{{item.content}}</div>
                                 <div class="d-content-time">
                                     <span>{{item.time}}</span>
                                     <a class="detail_icon pointer" @click="showDetail(index)"></a>

                                 </div>
                                 <div class="detail-box" v-show="detailIndex==index">
                                    <p>区块高度：{{item.height}}</p>
                                    <p>区块哈希：{{item.hash}}</p>
                                    <p>区块信息：{{item.info}}</p>
                                </div>
                             </div>
                          </li>
                      </ul>
                  </el-scrollbar>
                  <div class="r-chat-box">

                      <div class="r-chat-in-box">
                          <div class="r-chat-in"><input type="text"/></div>
                          <button type="button" class="pointer btn-send">发送</button>
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
           isOnchain:false,
           type:1,
           curuserName:'区块链专家',
           detailIndex:null,
           chartRecord:[
               {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'楼上这位小伙子说的很对，我觉得吹牛逼也是可以学到知识的，跟着各位大佬，我学到了很多装逼术语。',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'区块链专家',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'楼上这位小伙子说的很对，我觉得吹牛逼也是可以学到知识的，跟着各位大佬，我学到了很多装逼术语。',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'区块链专家',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'楼上这位小伙子说的很对，我觉得吹牛逼也是可以学到知识的，跟着各位大佬，我学到了很多装逼术语。',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'飞翔荷兰人',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              },
              {
               userName:'区块链专家',content:'有人吗？',time:'2020-07-08 14:45',height:'7854962',
               hash:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df',
               info:'a5sd4d45ad45asd48qwe8qw5e1fsd5fds8fgs54d1gdf2g1df'
              }
           ]
        }
    },
    components:{
        explorer
    },
    methods:{
        showDetail(num){
            //this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight;//这个是聊天记录滚动到底部写法
            // let that = this;
            // if(that.detailIndex!=null){
            //     if(that.detailIndex==num){
            //        that.detailIndex=null;
            //     }else{
            //         that.detailIndex=num
            //     }
            // }else{
            //      that.detailIndex=num
            // }
        }
    },
    mounted(){

    }
}
</script>
<style scoped lang="less">
   @import url(../../assets/less/chat.less);
</style>
