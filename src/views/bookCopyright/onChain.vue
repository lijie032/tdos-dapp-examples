<template>
  <div class="pageWrap f-wrap-table  a_onChain_wrap">


      <div class="page-main content-middle">
          <div class="a_form_box">
              <div class="marginlr60">
                  <h3 class="from_title">登记信息</h3>
                  <div class="d-in">
                      <div class="lab">登记姓名</div>
                     <input class="border-box" placeholder="请输入登记姓名" ref="name"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">著作标题</div>
                     <input class="border-box" placeholder="请输入著作标题" ref="title"/>
                  </div>
                  <div class="d-in">
                      <div class="lab">身份证号</div>
                     <input class="border-box" placeholder="请输入身份证号" ref="code"/>
                  </div>
                   <div class="d-in">
                      <div class="lab">创意说明</div>
                     <input class="border-box" placeholder="请输入创意说明" ref="info"/>
                  </div>

                  <div class="btnbox">
                       <a class="btn pointer" @click="submit">存证上链</a>
                  </div>
              </div>
          </div>

      </div>
  </div>
</template>



<style scoped lang="less">
@import url(../../assets/less/assets.less);
@import url(../../assets/less/bookCopyright.less);
</style>>

<script>
  import { saveBook } from '@/api/dapps'
export default {
    data(){
        return{

        }
    },
    components:{

    },
    methods:{
      async submit(){

        let name = this.$refs.name.value;
        let title = this.$refs.title.value;
        let code = this.$refs.code.value;
        let info = this.$refs.info.value;

        //todo 合约参数需要增加
        let payload = {
          name:name, title:title, cid:code, info:info
        };
        //todo 获取公钥
        let publickey = "02f9d915954e04107d11fb9689a6330c22199e1e830857bff076e033bbca2888d4";
        let Book = await saveBook(payload, publickey);
        console.log(Book);
        //todo 传给客户端
        this.$router.push({path:'/bookCopyright'})
      }
    }
}
</script>
