<template>
    <div class="pageWrap bg-wrap dis-table">
        <explorer :type="type"></explorer>
        
        <div class="page-main content-middle">
            <!--图片上传最多四张-->
           <div class="album-list" :class="{'no-data-album-list':imgList.length==0}">
              <div class="album-col" v-for="(item,index) in imgList" :key="index">
                  <div class="pic">
                      <img :src="item.url"/>
                  </div>
                  <div class="picInfo">
                      <div class="time">{{item.createdAt | dateFormat}} 上传</div>
                      <div class="hash-value">
                          <p>该相片已存证上链，上链哈希为：</p>
                          <p>{{item.hash}}</p>
                      </div>
                  </div>
              </div>
              <div class="album-col ">
                 
                  <div class="album-add">
                      
                    <div class="content-middle">
                        <div class="add_btn"></div>
                        <p class="mess">点击添加相片上传，相片将会被存证上链。</p>
                        <a ref="sendTx"></a>
                    </div>
                  </div>
                   <input  class="add" @change="tirggerFile($event)" type="file" name="imgs[]" multiple accept="image/gif, image/png, image/jpg, image/jpeg">
<img src="" id="imgs">/>
              </div>
           </div>
        </div>
        
        <!--相册上传成功弹出框-->
       <div class="trans" v-if="isSuc">
           <div class="confrim-box">
               <div class="confrim-header">
                   相片上传成功
                   <a class="close pointer" @click="hideIsSuc()">
                       
                   </a>
               </div>
               <div class="confirm-body">
                   <p class="pt">相片已上传并上链存证成功！以下是您的事务哈希：</p>
                   <p  class="pt pt-hash">
                       <span>da65sd69qw9qwe612dasf14d5g48g4df8h4gf5h48re9ter9kjd5d5q4w8eq212fs1df5sd4g8dfhfgh4gfnj541gh5j4gh8hgj78ghj78gh</span>
                       <a class="btn-copy pointer"></a>
                   </p>
                   <p class="mess">您可复制事务哈希并点击右上角按钮至“TDS浏览器”查询。）</p>
               </div>
               <div class="btnbox">
                   <button class="btn-confrim pointer" @click="unploadConfirm">我知道了</button>
               </div>
           </div>
       </div>


    </div>
</template>
<script>
import explorer from '@/components/browser1.vue'
import TpScroll from '@/assets/js/tp-scroll.js'
import {publicKey2Address} from '@salaku/js-sdk'
import { addPhoto, getPhotos, getTransaction } from "@/api/dapps";
export default {
    data(){
        return{
         type:1,
          dialogImageUrl: '',
          dialogVisible: false,
          imgList:[],
          isSuc:false,
        }
    },
    components:{
        explorer
    },
    methods:{
        tirggerFile:  function(event) {
        let file = event.target.files[0];
        let url = "";
        var reader = new FileReader();
        reader.readAsDataURL(file);
        let that = this;
        let pk = that.getPK();
            if (pk == "") {
                return that.$toast("获取账户失败，请打开TDOS插件", 3000);
            }
        reader.onload = async function(e) {
            url = this.result.substring(this.result.indexOf(",") + 1);
            // that.imgList.push("data:image/png;base64," + url)
            let fix= file.name.substring(file.name.lastIndexOf("."), file.name.length);
            let payload  = {
                photo:    url,
                photofix: fix,
            }
            let tx = await addPhoto(payload, pk);
            let sendTx = JSON.stringify(tx);
            that.$refs.sendTx.href =
                "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
            that.$refs.sendTx.click();
            return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
        };
        // that.isSuc=true;
        TpScroll.RemoveScroll();
      },

      //上传之后确认
      unploadConfirm(){
          let that = this; 
         that.hideIsSuc();
      },

      hideIsSuc(){
          this.isSuc=false;
          TpScroll.AddScroll();
      },
      async getPhotos(){
            let that = this;
            let pk = that.getPK();
            if (pk == "") {
                return that.$toast("获取账户失败，请打开TDOS插件", 3000);
            }
            let addr = publicKey2Address(pk);
            let photos = await getPhotos(addr);
            if (photos.length == 0){
                return;
            }
            await Promise.all(photos.map(async item => {
                    await  getTransaction(item.hash).then(t => {
                     item.createdAt = new Date(t.createdAt * 1000);
                 });
            }))
            photos.sort(that.compare('createdAt'));
            photos.forEach((item)=>{
                that.imgList.push({url:"data:image/png;base64," + item.photo, hash:item.hash, createdAt:item.createdAt})
            });
            
            
      },
      timer_tx () {
        let that = this;
        let value = that.getRes()
        if (value != '') {
          return that.$toast('事务广播成功，事务哈希为：' + value, 3000)
        }
      },

      //时间排序
      compare(key){
        return function(value1,value2){
            var val1=value1.key;
            var val2=value2.key;
            return val1-val2;
        } 
     }
    },
    mounted(){
        let that = this;
        that.imgList= [];
        this.getPhotos();
        this.timer = setInterval(this.timer_tx, 1000)
    },
    beforeDestroy() {
      clearInterval(this.timer)
    }
}
</script>
<style scoped lang="less">
   @import url(../../assets/less/album.less);
</style>