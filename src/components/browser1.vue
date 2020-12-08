<template>
 <div class="right-header">
   <!--返回上一页-->
    <div class="back-home" v-if="isHome" :class="{'back-home-white':type==1}">
       <a class="aback-h pointer" @click="goBack"></a>
    </div>
    <!--返回总目录-->
    <div class="back-index" v-if="isIndex" :class="{'back-index-white':type==1}">
      <a class="aback pointer" @click="backIndex"></a>
    </div>
    <!--跳转浏览器-->
    <div class=" logo-browser " :class="{'logo-browser-white':type==1}">
        <a class=" pointer"></a>
    </div>
 </div>
</template>

<script>
export default {
  name: 'browser',
  data () {
    return {
      msg: ''
    }
  },props:{
    type:{
      type:null,
      default:0
    },
    isHome:{
      type:null,
      default:false
    },
    isIndex:{
      type:null,
      default:true
    },
    backPath:{
      type:null,
      default:''
    }
  },
  methods:{
    backIndex(){
      let that = this;
      that.$router.push({path:'/'}).catch(err => { console.log(err) })
    },
    goBack() {
         let that = this
         if(that.backPath!=''){
             this.$router.push({ path: that.backPath });
         }else{

            if (window.history.length <= 1) {
                this.$router.push({ path: "/" });
                return false;
            } else {
                this.$router.go(-1);
            }
         }
     },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
