<template>
    <div class="pageWrap bg-wrap dis-table chat-wrap">
        <explorer :type="type"></explorer>
        <div class="page-main content-middle">
            <div class="chat-container">
               <div class="chat-header">
                  <div class="logo"><img src="../../assets/img/tdos_chat.png"/></div> <span>TDOS交流群（{{num}}）</span>
               </div>
               <div class="record-box">
                  <el-scrollbar class="record-scroll" ref="myScrollbar">
                      <ul class="ul-record">
                          <li v-for='(item,index) in chartRecord' :key="index">
                             <div class="d-centent" :class="{'activecontent':item.userName==curuserName}">
                                 <div class="d-centent-userName" >{{item.nickname}}：</div>
                                 <div class="d-centent-chat">{{item.context}}</div>
                                 <div class="d-content-time">
                                     <span>{{item.time}}</span>
                                     <a class="detail_icon pointer" @click="showDetail(index,item)"></a>

                  </div>
                  <div class="detail-box" v-show="detailIndex==index">
                    <p>区块高度：{{height}}</p>
                    <p>区块哈希：{{item.hash}}</p>
                    <p>事务哈希：{{tx_hash}}</p>
                  </div>
                </div>
              </li>
            </ul>
          </el-scrollbar>
          <div class="r-chat-box">

            <div class="r-chat-in-box">
              <div class="r-chat-in"><input type="text" v-model="info"/></div>
              <button type="button" class="pointer btn-send" @click="submit">发送</button>
              <a ref="sendTx"></a>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
  import explorer from '@/components/browser1.vue'
  import {getUserId, saveChat, getChat, getTransaction} from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'
  export default {
    data () {
      return {
        isOnchain: false,
        type: 1,
        curuserName: '区块链专家',
        detailIndex: null,
        chartRecord: [

        ],
        info: '',
        num:'',
        height:'',
        tx_hash:''
      }
    },
    components: {
      explorer
    },
    methods: {
      showDetail (num,obj) {
        this.$refs['myScrollbar'].wrap.scrollTop = this.$refs['myScrollbar'].wrap.scrollHeight;//这个是聊天记录滚动到底部写法
        let that = this;
        if(that.detailIndex!=null){
            if(that.detailIndex==num){
               that.detailIndex=null;
            }else{
                that.detailIndex=num
            }
        }else{
             that.detailIndex=num
        }
        getTransaction(obj.hash).then(t => {
          that.height = t.blockHeight;
          that.tx_hash = t.blockHash;
        })
      },
      async get () {
        let that = this;
        let chat = await getChat();
        let num = await getUserId();
        that.num = num;
        that.chartRecord = chat.reverse().slice(0,20).reverse();
        // if (chat.length<20){
        //   for (let i = 0;i<chat.length;i++){
        //     console.log(chat[i])
        //     that.curuserName = chat[i].nickname;
        //     that.chartRecord[i].userName = chat[i].nickname;
        //     that.chartRecord[i].content = chat[i].context;
        //     that.chartRecord[i].time = chat[i].time;
        //   }
        // }else {
        //
        // }
      },
      async submit () {
        let that = this;
        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        let info = that.info;
        let time = this.timefilters();
        let payload = {
          context:info,
          time:time
        }
        let Chat = await saveChat(payload, pk);
        let sendTx = JSON.stringify(Chat);
        that.$refs.sendTx.href =
          "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
        that.$refs.sendTx.click();
        return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);

      },
      timefilters () {
        var myDate = new Date()
        var month = myDate.getMonth() <= 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
        var day = myDate.getDate() <= 9 ? '0' + (myDate.getDate()) : myDate.getDate()
        var dataToDate = myDate.getFullYear() + '-' + month + '-' + day
        var hours1 = myDate.getHours() <= 9 ? '0' + (myDate.getHours()) : myDate.getHours() // 获取系统时，
        var minutes1 = myDate.getMinutes() <= 9 ? '0' + (myDate.getMinutes()) : myDate.getMinutes() // 分
        var seconds1 = myDate.getSeconds() <= 9 ? '0' + (myDate.getSeconds()) : myDate.getSeconds() // 秒
        return myDate.getFullYear() + '-' + month + '-' + day + ' ' + hours1 + ':' + minutes1 + ':' + seconds1
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
                that.get();
              }

            })

          }, 1000)
        }
      }
    },

    mounted () {
      this.get();
      this.timer = setInterval(this.timer_tx, 1000);
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
  @import url(../../assets/less/chat.less);
</style>
