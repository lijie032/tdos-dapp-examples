<template>
  <div class="logo-explorer logo-browser " :class="{'logo-browser-white':type==1}">
      <a class=" pointer"></a>
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
