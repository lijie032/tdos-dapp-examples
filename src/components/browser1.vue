<template>
 <div class="right-header">
    <div class="back-home" v-if="isHome" :class="{'back-home-white':type==1}">
       <a class="aback-h pointer"></a>
    </div>
    <div class="back-index" :class="{'back-index-white':type==1}">
      <a class="aback pointer"></a>
    </div>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
