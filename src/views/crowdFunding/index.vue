<template>
  <div class="pageWrap bg_wrap dis-table">
    <explorer :type="type"></explorer>

    <div class="page-main content-middle">
      <div class="page-content">
        <div class="pageTitle">欢迎来到TDOS众筹</div>
        <div class="p-container">
          <div class="searchIn">
            <input placeholder="可复制事务哈希至此查询" v-model="hash"/>
            <a class="pointer cf-btn a-search" @click="search()">查询</a>
            <a ref="sendTx"></a>
          </div>
          <div class="project-info" v-for="(item,index) in projectList" :key="index">
            <input style="display: none" >{{item.type}}</input>
            <div class="hot-icon cf-btn">
              <span class="">热门项目</span>
            </div>
            <div class="pi-col">
              <div class="main-col">
                <p class="p-line1 p-name">{{item.title}}</p>
                <div class="intro">{{item.intro | ellipsis}}</div>
                <div class="time">{{item.time}}</div>
              </div>
            </div>
            <div class="pi-col">
              <div class="main-col">
                <div class="amount-col">
                  <p class="pt">目标金额</p>
                  <p class="p-amount">{{item.targetAmount}}</p>
                </div>
                <div class="amount-col">
                  <p class="pt">已筹金额</p>
                  <p class="p-amount">{{item.raisedAmount}}</p>
                </div>
                <div class="amount-col">
                  <p class="pt">参与人数</p>
                  <p class="p-amount">{{item.partNumber}}</p>
                </div>
              </div>
            </div>
            <div class="pi-col">
              <a class="cf-btn pointer btn-rasie" @click="startRaise(item)">
                <span>开始募集</span>
              </a>
            </div>

            <div class="d-line d-line1"></div>
            <div class="d-line d-line2"></div>
          </div>
        </div>
      </div>

    </div>

    <!--开始募集-->
    <div class="trans" v-if="isRasie">
      <div class="dis-table">
        <div class="popup-div">
          <div class="popup-main">
            <div class="popup-header">
              开始募集
              <a class="pointer close" @click="isRasie=false;addScroll()"></a>
            </div>
            <div class="popup-content">
              <p class="p-title">目标金额:{{amount}}</p>
              <div class="d-in">
                <input placeholder="请输入募捐金额" v-model="input_amount" v-limitNum/>
              </div>
            </div>
            <div class="btnbox">
              <a class="cf-btn pointer bot-btn" @click="clickRasie(type)">确认募捐</a>
            </div>
          </div>
        </div>
      </div>
    </div>

<!--    &lt;!&ndash;募集成功展示&ndash;&gt;-->
<!--    <div class="trans" v-if="rasieSuc">-->
<!--      <div class="dis-table">-->
<!--        <div class="popup-div">-->
<!--          <div class="popup-main">-->
<!--            <div class="popup-header">-->
<!--              募集成功-->
<!--              <a class="pointer close" @click="rasieSuc=false;addScroll()"></a>-->
<!--            </div>-->
<!--            <div class="popup-content chain-content">-->
<!--              <p class="chain-title">恭喜您！募捐成功！以下是您的事务哈希：</p>-->
<!--              <div class="hash-value">-->
<!--                <span>da2d6qwe6q41qw51e4re49tre9g4er16et6re4tda2d6qwe6q41qw51e4re49tre9g4er16et6re4te4ere4er</span>-->
<!--                <a class="copy pointer"></a>-->
<!--              </div>-->
<!--              <p class="p-mess">（您可复制上方哈希值并点击右上角按钮至“TDS浏览器”查询，或在 此页面内点击查询。）</p>-->
<!--            </div>-->
<!--            <div class="btnbox">-->
<!--              <a class="cf-btn pointer bot-btn" @click="rasieSuc=false;addScroll()">我知道了</a>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <!--搜索结果展示-->

    <div class="trans" v-if="rasieResult">
      <div class="dis-table">
        <div class="popup-div dis-table">
          <div class="popup-main result-popup-main">
            <div class="popup-header">
              查询信息
              <a class="pointer close" @click="rasieResult=false;addScroll()"></a>
            </div>
            <div class="popup-content result-content">
              <div class="result-col">
                <span class="lab">您的募捐信息已上链</span>
                <p>区块高度：{{block_height}}</p>
                <p>区块哈希：{{block_hash}}</p>
                <p>事务哈希：{{tx_hash}}</p>
              </div>
              <div class="result-col">
                <span class="lab">募捐信息</span>
                <p>项目介绍：{{search_info}}</p>
                <p>目标金额：{{search_fundingGoal}}</p>
                <p>募捐金额：{{search_amount}}</p>
              </div>
            </div>
            <div class="btnbox">
              <a class="cf-btn pointer bot-btn" @click="rasieResult=false;addScroll()">我知道了</a>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style scoped lang="less">
  @import url(../../assets/less/crowdFunding.less);
</style>>

<script>
  import explorer from '@/components/browser1.vue'
  import TpScroll from '@/assets/js/tp-scroll.js'
  import {transfer, getCrowdSaleInfo, getCrowdSale, getTransaction} from '@/api/dapps'
  import {showLoading, hideLoading} from '@/assets/js/loading'

  export default {
    data () {
      return {
        type: 1,//头部右上角浏览器
        projectList: [{
          title: '',
          intro: '',
          time: '',
          targetAmount: '',
          raisedAmount: '',
          partNumber: ''
        },
          {
            title: '',
            intro: '',
            time: '',
            targetAmount: '',
            raisedAmount: '',
            partNumber: ''
          }],
        isRasie: false, //点击募集展示
        // rasieSuc: false,//募集成功展示
        rasieResult: false,
        input_amount:'',
        hash:'',
        block_height:'',
        block_hash:''
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
      //点击募集
      startRaise (obj) {
        let that = this
        that.isRasie = true
        TpScroll.RemoveScroll()
        that.amount = obj.targetAmount
        that.type = obj.type
      },

      //查询
      async search () {
        let that = this
        let hash = that.hash
        let tx = await getCrowdSale(hash)
        if (tx == ""){
          return that.$toast('暂无信息', 3000)
        }
        that.rasieResult = true
        that.search_fundingGoal = tx.fundingGoal
        that.search_amount = tx.amount
        that.search_info = tx.info
        that.tx_hash = hash
        getTransaction(hash).then(t => {
            that.block_height = t.blockHeight
            that.block_hash = t.blockHash
        })

      },

      //募集确认
      async clickRasie (type) {
        let that = this
        that.isRasie = false
        let amount = parseInt(that.input_amount)
        if (that.input_amount >= 1000){
          return that.$toast('募捐金额不能超过1000', 3000)
        }
        TpScroll.RemoveScroll()
        let payload = {
          offset: type,
          amount: amount
        }
        let pk = that.getPK()
        if (pk == '') {
          return that.$toast('获取账户失败，请打开TDOS插件', 3000)
        }
        let tx = await transfer(payload, pk)
        let sendTx = JSON.stringify(tx)
        that.$refs.sendTx.href =
          'javascript:sendMessageToContentScriptByPostMessage(\'' + sendTx + '\')'
        that.$refs.sendTx.click()
        return that.$toast('事务已生成，请打开TDOS插件进行广播', 3000)
      },

      addScroll () {
        TpScroll.AddScroll()
      },

      async get(){
        let that = this
        let CrowdSaleInfo = await getCrowdSaleInfo();
        that.projectList = [{
          title: '由TDOS平台发布',
          intro: CrowdSaleInfo[0].info,
          time: '',
          targetAmount: CrowdSaleInfo[0].fundingGoal,
          raisedAmount: CrowdSaleInfo[0].amountRaised,
          partNumber: CrowdSaleInfo[0].people,
          type:0
        },
          {
            title: '由TDOS平台发布',
            intro: CrowdSaleInfo[1].info,
            time: '',
            targetAmount: CrowdSaleInfo[1].fundingGoal,
            raisedAmount: CrowdSaleInfo[1].amountRaised,
            partNumber: CrowdSaleInfo[1].people,
            type:1
          }]
      },
      timer_tx () {
        let that = this
        let hash = that.getRes().trim()
        if (hash != '') {
          showLoading('事务广播成功，事务哈希为：\n' + hash+'\n' + ',请等待上链...')
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
    mounted() {
      this.get();
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
