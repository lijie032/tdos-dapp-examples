<template>
 <div class="right-header">
    
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
