<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer></explorer>

    <div class="page-main content-middle">
      <div class="p-title">
          <div class="logo"></div>
          <span>欢迎来到TDOS资产互换</span>
      </div>

      <div class="page-content">
        <div class="searchInBox border-box">
           <input type="text" placeholder="您可在此输入复制的哈希值以此查询"/>
           <a class="btn-search pointer" @click="showResult">

           </a>
        </div>
        <div class="coin-box" :class="{'coin-box-change':isExchange}">
          <div class="coin-col">
            <div class="f-col">
              <div class="coin_name">
                <div class="fr">{{coin1.nick}}</div>
                <span class="s1">{{coin1.name}}</span>
              </div>
              <div class="din-box">
                <div class="din"><input type="text" :placeholder="coin1.nick" v-limitNum v-model="amount"/></div>
              </div>
            </div>
            <p class="mess">{{coin1.proportion}}</p>
          </div>
          <a class="icon_exchange pointer" @click="coinExchange"></a>
          <div class="coin-col">
            <div class="f-col">
              <div class="coin_name">
                <div class="fr">{{coin2.nick}}</div>
                <span class="s2">{{coin2.name}}</span>
              </div>
              <div class="din-box">
                <div class="din">
                  <p>{{coin2.nick}}</p>
                </div>
              </div>
            </div>
            <p class="mess">{{coin2.proportion}}</p>
          </div>
        </div>

        <div class="btnbox">
          <a class="pointer btn-exchange" @click="confirmExchange">确认转换</a>
          <a ref="sendTx"></a>
        </div>

      </div>


    </div>

    <!--转换成功展示-->
    <div class="trans" v-if="exchangeSuc">
      <div class="dis-table">
        <div class="popup-div">
          <div class="popup-main">
            <div class="popup-header">
              代币转换成功
              <a class="pointer close" @click="exchangeSuc=false;addScroll()"></a>
            </div>
            <div class="popup-content chain-content">
              <p class="chain-title">恭喜您！转换成功！该笔交易已存证上链！以下是您的上链哈希：</p>
              <div class="hash-value">
                <span>da2d6qwe6q41qw51e4re49tre9g4er16et6re4tda2d6qwe6q41qw51e4re49tre9g4er16et6re4te4ere4er</span>
                <a class="copy pointer"></a>
              </div>
              <p class="p-mess">（您可复制上方哈希值并点击右上角按钮至“TDS浏览器”查询。）</p>
            </div>
            <div class="btnbox">
              <a class="cf-btn pointer bot-btn" @click="exchangeSuc=false;addScroll()">我知道了</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--查询结果-->
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
                <span class="lab">互换信息</span>
                <p>申请地址：d32qwe5q6we5f5ds4g84re8t48re4t8re4t8re4 g5df4g5dldksflds55</p>
                <p><span>ETH:56891</span><img class="arrow" src="../../assets/img/arrow.png"/><span>BTC:78594</span></p>
                <p>互换比率：1BTC=0.00052ETH</p>
              </div>
              
            </div>
            <div class="btnbox">
              <a class="cf-btn pointer bot-btn" @click="searchResult=false;addScroll()">我知道了</a>
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
  import { getETB, getBTE, saveChange } from '@/api/dapps'

  export default {
    data () {
      return {
        type: 1,//头部右上角浏览器

        exchangeSuc: false,//转换成功展示

        coin1: {
          name: '以太坊', nick: 'ETH', proportion: ''
        },
        coin2: {
          name: '比特币', nick: 'BTC', proportion: ''
        },

        isExchange: false,//货币顺序是否转换
        amount:'',
        searchResult:false,//查询结果
      }
    },
    components: {
      explorer
    },
    filters: {
      ellipsis (value) {
        if (!value) return ''
        if (value.length > 74) {
          return value.slice(0, 74) + '...'
        }
        return value
      }
    },
    methods: {

      //点击货币中间转换按钮
      coinExchange () {
        let that = this
        that.isExchange = !that.isExchange
        let obj1 = JSON.parse(JSON.stringify(that.coin2))
        let obj2 = JSON.parse(JSON.stringify(that.coin1))

        that.coin1 = obj1
        that.coin2 = obj2
      },
      //点击查询
      showResult(){
        let that =  this;
        that.searchResult = true;
        TpScroll.RemoveScroll()
      },
      //点击确认转换
      async confirmExchange () {
        let that = this
        TpScroll.RemoveScroll()

        let payload = {
          from: that.coin1.nick, to: that.coin2.nick, amount: that.amount, rate:that.coin1.proportion
        }

        let pk = that.getPK();
        if (pk == "") {
          return that.$toast("获取账户失败，请打开TDOS插件", 3000);
        }
        console.log(payload)
        let Change = await saveChange(payload, pk)
        console.log(Change)
        let sendTx = JSON.stringify(Change);
        that.$refs.sendTx.href =
          "javascript:sendMessageToContentScriptByPostMessage('" + sendTx + "')";
        that.$refs.sendTx.click();
        return that.$toast("事务已生成，请打开TDOS插件进行广播", 3000);
        console.log(that.coin1.nick)
      },

      addScroll () {
        TpScroll.AddScroll()
      },

      async get () {
        let that = this
        let Eth = await getETB();
        let Btc = await getBTE();
        that.coin2.proportion = "1BTC="+Eth+"Eth";
        that.coin1.proportion = "1ETH="+Btc+"Btc";
      }

    },
    mounted: function () {
      this.get();
    }
  }
</script>
<style scoped lang="less">
  @import url(../../assets/less/crowdFunding.less);
  @import url(../../assets/less/coinExchange.less);

</style>>
