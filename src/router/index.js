import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// 解决重复点击路由报错的BUG
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}



export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',//金融
      name: 'index',
      component: resolve=>(require(["@/views/index"],resolve))
    },
    {
      path: '/finance',//金融
      name: 'finance',
      component: resolve=>(require(["@/views/finance/index"],resolve))
    },
    {
      path: '/finance/onChain',//金融上链
      name: 'financeOnChain',
      component: resolve=>(require(["@/views/finance/onChain"],resolve))
    },
    {
      path: '/finance/success',//金融上链成功
      name: 'financeSuccess',
      component: resolve=>(require(["@/views/finance/success"],resolve))
    },

    {
      path: '/finance/confirmInfo',//金融上链信息确认
      name: 'financeConfirmInfo',
      component: resolve=>(require(["@/views/finance/confirm"],resolve))
    },
    {
      path: '/finance/search',//金融哈希搜索
      name: 'financeSearch',
      component: resolve=>(require(["@/views/finance/search"],resolve))
    },
    {
      path: '/finance/search_bank',//金融哈希核心企业搜索
      name: 'financeSearchBank',
      component: resolve=>(require(["@/views/finance/search_bank"],resolve))
    },
    {
      path: '/finance/searchResult',//金融哈希搜索结果
      name: 'financeSearchResult',
      component: resolve=>(require(["@/views/finance/searchResult"],resolve))
    },
    {
      path: '/publicWelfare',//公益
      name: 'publicWelfare',
      component: resolve=>(require(["@/views/publicWelfare/index"],resolve))
    },
    {
      path: '/publicWelfare/onChain',//公益上链
      name: 'publicWelfareOnChain',
      component: resolve=>(require(["@/views/publicWelfare/onChain"],resolve))
    },
    {
      path: '/publicWelfare/search',//公益查询
      name: 'onChain',
      component: resolve=>(require(["@/views/publicWelfare/search"],resolve))
    },
    {
      path: '/publicWelfare/result',//公益查询
      name: 'publicWelfareResult',
      component: resolve=>(require(["@/views/publicWelfare/searchResult"],resolve))
    },
    {
      path: '/logistics',//物流
      name: 'logistics',
      component: resolve=>(require(["@/views/logistics/index"],resolve))
    },
    {
      path: '/logistics/onChain',//物流上链
      name: 'logistics_onChain',
      component: resolve=>(require(["@/views/logistics/onChain"],resolve))
    },
    {
      path: '/logistics/search',//物流搜索
      name: 'logistics_Search',
      component: resolve=>(require(["@/views/logistics/search"],resolve))
    },
    {
      path: '/logistics/searchResult',//物流搜结果
      name: 'logistics_Result',
      component: resolve=>(require(["@/views/logistics/searchResult"],resolve))
    },
    {
      path: '/assets',//资产
      name: 'assets',
      component: resolve=>(require(["@/views/assets/index"],resolve))
    },
    {
      path: '/assets/onChain',//资产上链
      name: 'assets_onChain',
      component: resolve=>(require(["@/views/assets/onChain"],resolve))
    },
    {
      path: '/assets/search',//资产查询
      name: 'assets_search',
      component: resolve=>(require(["@/views/assets/search"],resolve))
    },
    {
      path: '/assets/searchResult',//资产结果
      name: 'assets_searchResult',
      component: resolve=>(require(["@/views/assets/searchResult"],resolve))
    },
    {
      path: '/medicalTreatment',//医疗
      name: 'medicalTreatment',
      component: resolve=>(require(["@/views/medicalTreatment/index"],resolve))
    },

    {
      path: '/medicalTreatment/onChain',//医疗上链
      name: 'medicalTreatment_onChain',
      component: resolve=>(require(["@/views/medicalTreatment/onChain"],resolve))
    },
    {
      path: '/medicalTreatment/search',//医疗上链查询
      name: 'medicalTreatment_search',
      component: resolve=>(require(["@/views/medicalTreatment/search"],resolve))
    },
    {
      path: '/medicalTreatment/searchResult',//医疗上链结果页
      name: 'medicalTreatment_searchResult',
      component: resolve=>(require(["@/views/medicalTreatment/searchResult"],resolve))
    },
    {
      path: '/Insurance',//保险
      name: 'Insurance',
      component: resolve=>(require(["@/views/Insurance/index"],resolve))
    },
    {
      path: '/Insurance/onChain',//保险上链
      name: 'Insurance_onChain',
      component: resolve=>(require(["@/views/Insurance/onChain"],resolve))
    },
    {
      path: '/Insurance/search',//保险搜索
      name: 'Insurance_search',
      component: resolve=>(require(["@/views/Insurance/search"],resolve))
    },
    {
      path: '/Insurance/searchResult',//保险搜索结果
      name: 'Insurance_searchResult',
      component: resolve=>(require(["@/views/Insurance/searchResult"],resolve))
    },
    {
      path: '/musicCopyright',//音乐版权
      name: 'musicCopyright',
      component: resolve=>(require(["@/views/musicCopyright/index"],resolve))
    },
    {
      path: '/musicCopyright/onChain',//音乐版权上链
      name: 'musicCopyright_onChain',
      component: resolve=>(require(["@/views/musicCopyright/onChain"],resolve))
    },
    {
      path: '/musicCopyright/search',//音乐版权搜索
      name: 'musicCopyright_search',
      component: resolve=>(require(["@/views/musicCopyright/search"],resolve))
    },
    {
      path: '/musicCopyright/searchResult',//音乐版权搜索结果
      name: 'musicCopyright_searchResult',
      component: resolve=>(require(["@/views/musicCopyright/searchResult"],resolve))
    },
    {
      path: '/bookCopyright',//书版权
      name: 'bookCopyright',
      component: resolve=>(require(["@/views/bookCopyright/index"],resolve))
    },
    {
      path: '/bookCopyright/onChain',//书版权上链
      name: 'bookCopyright_onChain',
      component: resolve=>(require(["@/views/bookCopyright/onChain"],resolve))
    },
    {
      path: '/bookCopyright/search',//书版权查询
      name: 'bookCopyright_search',
      component: resolve=>(require(["@/views/bookCopyright/search"],resolve))
    },
    {
      path: '/bookCopyright/searchResult',//书查询结果
      name: 'bookCopyright_searchResult',
      component: resolve=>(require(["@/views/bookCopyright/searchResult"],resolve))
    },
    {
      path: '/shopping',//购物
      name: 'shopping',
      component: resolve=>(require(["@/views/shopping/index"],resolve))
    },
    {
      path: '/shopping/onChain',//购物上链
      name: 'shopping_onChain',
      component: resolve=>(require(["@/views/shopping/onChain"],resolve))
    },
    {
      path: '/shopping/search',//购物搜索
      name: 'shopping_search',
      component: resolve=>(require(["@/views/shopping/search"],resolve))
    },
    {
      path: '/shopping/searchResult',//购物搜索
      name: 'shopping_searchResult',
      component: resolve=>(require(["@/views/shopping/searchResult"],resolve))
    },
    {
      path: '/welding',//焊接
      name: 'shopping_welding',
      component: resolve=>(require(["@/views/welding/index"],resolve))
    },
    {
      path: '/welding/onChain',//焊接上链
      name: 'welding_onChain',
      component: resolve=>(require(["@/views/welding/onChain"],resolve))
    },
    {
      path: '/welding/search',//焊接查询
      name: 'welding_search',
      component: resolve=>(require(["@/views/welding/search"],resolve))
    },
    {
      path: '/welding/searchResult',//焊接查询结果
      name: 'welding_searchResult',
      component: resolve=>(require(["@/views/welding/searchResult"],resolve))
    },
    {
      path: '/cryptoBear',//加密熊首页
      name: 'cryptoBear',
      component: resolve=>(require(["@/views/cryptoBear/index"],resolve))
    },
    {
      path: '/cryptoBear/bearInfo',//加密熊信息
      name: 'cryptoBear_bearInfo',
      component: resolve=>(require(["@/views/cryptoBear/bearInfo"],resolve))
    },
    {
      path: '/chat',//聊天首页
      name: 'chat',
      component: resolve=>(require(["@/views/chat"],resolve))
    },
    {
      path: '/chat/group',//聊天交流群啊
      name: 'chat_group',
      component: resolve=>(require(["@/views/chat/chatGroup"],resolve))
    },
    {
      path: '/addressBook',//通讯录
      name: 'addressBook',
      component: resolve=>(require(["@/views/addressBook/index"],resolve))
    },
  ]
})
