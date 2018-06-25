
<template>
    <div id="app" style="position:relative">
      <!-- <loading v-model="isLoading"></loading>         -->
      <!-- <app-index></app-index> -->
      <button @click="getConfig">选择图片</button>
      <button @click="test">选择图片2</button>
      <router-view></router-view>
    </div>
</template>

<script type="text/babel">
import Index from "@/components/index/Index.vue";

export default {
  components: {
    appIndex: Index,
    code: ""
  },
  data() {
    return {
      jsApiList: ["previewImage", "chooseImage", "previewImage", "openLocation"]
    };
  },
  methods: {
    // getCode() {
    //   var wxUserInfo = localStorage.getItem("wxUserInfo");
    //   if (!wxUserInfo) {
    //       if (this.code) {
    //         console.log("codecodecode");
    //         this.getToken();
    //       }else{
    //         window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
    //                         'appid=wxa1c336eda30f525f&' +
    //                         'redirect_uri=http://wx.palmar.cn/toupiao/index.html' +
    //                         'response_type=code&scope=snsapi_login&' +
    //                         'state=0&connect_redirect=1#wechat_redirect'
    //         console.log("noCode");
    //         alert("noCode");
    //       }
    //   }else{
    //       console.log("wxUserInfo");
    //       alert("wxUserInfo");
    //   }
    // },
    // getToken(){
    //   this.$http.post(this.$api.code_get_token,{ code:this.code }).then((res)=>{
    //        if(res.data.status==1){
    //          console.log(res.data);
    //          this.HistoryAreaData = res.data.data;
    //         //  this.loading = true,
    //         //  this.$vux.loading.hide()
    //        }
    //     });
    // },
    // 引入jssdk
    getConfig() {
      var that = this;
      var testUrl = "http://wx.palmar.cn/index.php" 
      let url = location.href.split('#')[0] //获取锚点之前的链接 
      alert(url);
      this.$http
        .post(
          this.$api.getWXConfig,
          this.$qs.stringify({ url:testUrl})
        )
        .then(res => {
          if (res.data.status == 1) {
            var config = res.data.data;
            console.log(this.jsApiList);
            config.jsApiList = this.jsApiList;
            this.$wechat.config(config);
            this.$wechat.ready(function() {
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
              // alert('进入ready方法')
              that.test();
            });
            this.$wechat.error(function(err) {
              // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
              // console.log(res);
              alert(JSON.stringify(err))
            });
            // console.log(this.$wechat);
          }
          console.log(res.data);
        });
    },
    test(){
      this.$wechat.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
      var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      }
      });
    }
  },
  created() {
    // this.getCode();
    this.getConfig();
  }
};
</script>

<style scoped>
#app {
  height: 100vh;
}
</style>
