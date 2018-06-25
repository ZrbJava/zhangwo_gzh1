<template>
<!-- " -->
  <div>
      <!-- <img v-if="loadimg" src="http://cdn.uedna.com/201402/1392662587108_1140x0.gif" alt="" class="loadingImg">  -->
      <!--  -->
      <div class="index" v-if="loading" >
          <button @click="test" style="margin-top:79px">预览图片测试</button>
          <button @click="shareFriend" style="margin-top:79px">分享到朋友测试</button>
          <div class="pf topBox">
              <div class="form">
                <div class="frc searchBox ">
                  <div class="pr" style="width:100%">
                    <!-- 左边的搜索logo -->
                    <img v-show="searchBlur" src="../../assets/index/search.png" alt="" class="fouce_search_icon pa">                  
                    <input type="text"  class=" search_inp" @focus="focus" @blur="blur" style="padding-left:30px" v-model="Searchvalue">
                    <div v-show="!searchBlur" class="pa placeholder" @click="Letfoucus">
                      <img src="../../assets/index/search.png" alt="" class="search_icon">搜索选手名称或编号
                    </div>
                    <!-- 中间定位位置 -->
                  </div>
                  <button  :class="{'searchBtn':true,'SearchActive':Searchvalue.length!=0}" @click="goSearchList" :isPlayer="isPlayer">搜索</button>
                </div>
                
              </div>
            <!-- tab栏目 -->
            <div class="frc navTab" v-if="isTab" >
              <!-- currentNav==0?'navActive':'' -->
              <!-- <div @click="NavtabToggle(index)" :class="{navActive:currentNav==index}" v-for="(item,key,index) in zoneData.zoneList" :key="key" >{{item.name}}</div> -->
              <div @click="NavtabToggle(index,item.name,item.id)" :class="{navActive:currentNav==index}" v-for="(item,index) in zoneData.zoneNav" :key="index" >{{item.name}}</div>
              <!-- <div @click="NavtabToggle(2)" :class="{navActive:currentNav==2}">历史赛区</div> -->
              <!-- 这里接口有问题有问题我暂时先写死 -->
            </div>
          </div>
        <div class="wraper">        
          <keep-alive>
            <!-- <router-view></router-view> -->
            <component  :is="currentView" :zoneData="zoneData" :zoneId="zoneId" :playerlist="playerlist" ></component>
            <!-- <component v-if="currentNav==1" is="Enrolment" :areaID="zoneData.zoneList[1].id"></component> -->
            <!-- <component v-if="currentNav==2" is="HistoryArea"></component> -->
              <!-- 这里接口有问题有问题我暂时先写死 -->          
          </keep-alive>
        </div>
          
            <!-- <component  :is="Voting"></component> -->
          <!-- 底部导航栏 -->
          <div class="pd_tabBar pf frc">
            <!-- <div class="left frc"> -->
                  <div class="home fcc" @click="goIndex">
                    <img src="../../assets/tabbar/home.png" alt="home" class="tab_icon">
                    <span class="pt3 tab_text tabBarActive" >首页</span>            
                  </div>  
                  <div class="signup pr" @click="goSignup" v-show="!isPlayer">
                    <img src="../../assets/tabbar/sign.png" alt="signup" class="tab_sign pa">             
                    <span class="pt3 tab_text sign_text pa">报名</span>        
                </div>
                  <div class="signup pr" @click="goMe" v-show="isPlayer">
                    <img  src="../../assets/tabbar/me.png" alt="我的" class="tab_sign pa">                         
                    <span class="pt3 tab_text sign_text pa">我的</span>        
                </div>
                <div class="home fcc" @click="goRule">
                    <img src="../../assets/tabbar/rule.png" alt="rule" class="tab_icon">             
                    <span class="pt3 tab_text">活动规则</span>        
                </div>
            <!-- </div> -->
          </div>
      </div>
  </div>
</template>

<script>
import HistoryArea from "@/components/index/raceArea/HistoryArea/HistoryArea";
import Enrolment from "@/components/index/raceArea/Enrolment";
import Voting from "@/components/index/raceArea/Voting";
export default {
  components: {
    Voting: Voting,
    // Enrolment:Enrolment,
    HistoryArea: HistoryArea,
  },
  data() {
    return {
      currentNav: 0,
      isHistoryHome: true,
      isPlayer: false,
      searchBlur: false,
      Searchvalue: "",
      zoneData: "",
      loading: false,
      isTab: true,
      // jsApiList: ["previewImage","chooseImage"],
      currentView: "Voting",
      loadimg: true,
      // zoneId:this.zoneData.zone.id
      zoneId: "",
      page: 1,
      playerlist: []
    };
  },
  methods: {
    // 赛区数据切换
    getIndex(zoneId = "") {
      // var zone_id = this.zoneId||"";
      //  this.$vux.loading.show({
      //     text: 'Loading'
      //   })
      // this.loadimg = true;
      var zone_id = zoneId;
      console.log("tab对应的赛区id为" + zone_id);
      this.$http
        .post(this.$api.index, this.$qs.stringify({ zone_id }))
        .then(res => {
          if (res.data.status == 1) {
            var zoneId = res.data.data.zone.id;
            this.zoneData = res.data.data;
            this.zoneId = zoneId;
            this.getPlayerlist(zoneId);
          }
          console.log(this.zoneData, this.zoneId);
        });
    },
    // 获取对应赛区的选手列表
    getPlayerlist(zoneId = "") {
      // var zone_id = this.zoneId || 5;
      var zone_id = zoneId;
      var page = this.page;
      this.$http
        .post(this.$api.playerlist, this.$qs.stringify({ zone_id, page }))
        .then(res => {
          if (res.data.status == 1) {
            this.playerlist = res.data.data.playerlist;
            // this.$vux.loading.hide()
            this.loading = true;
            this.loadimg = false;
          }
        });
    },
    // 是否登陆
    isplayer() {
      // this.$http.post(this.$api.isplayer, this.$qs.stringify({ user_id: 566 })).then((res)=>{
      this.$http.post(this.$api.isplayer).then(res => {
        if (res.data.status == 1) {
          this.isPlayer = true;
        }
        console.log(res.data);
      });
    },
    // 根据当前赛区请求对应的选手列表

    // 引入jssdk
    // getConfig() {
    //   this.$http
    //     .post(
    //       this.$api.getWechatShare,
    //       this.$qs.stringify({ url: "http://wx.palmar.cn/" })
    //     )
    //     .then(res => {
    //       if (res.data.status == 1) {
    //         console.log(res.data.data);
    //         var config = res.data.data;
    //         config.jsApiList = this.jsApiList;
    //         console.log(2222, config);

    //         this.$wechat.config(config);
    //         this.$wechat.ready(function() {
    //           // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //           console.log(res);
    //         });
    //         this.$wechat.error(function(res) {
    //           // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    //           console.log(res);
    //         });
    //         // console.log(this.$wechat);
    //       }
    //       console.log(res.data);
    //     });
    // },
    // 搜索
    goSearchList() {
      if (this.Searchvalue.length != 0) {
        this.$router.push({
          path: "/searchList",
          query: { search: this.Searchvalue, isPlayer: this.isPlayer }
        });
      }
    },
    focus() {
      if (this.Searchvalue.length == 0) {
        this.searchBlur = true;
      }
    },
    blur() {
      if (this.Searchvalue.length == 0) {
        this.searchBlur = false;
      }
    },
    Letfoucus() {},
    // 赛区数据切换结束符
    goIndex() {
      this.$router.push({ name: "index" });
    },
    goSignup() {
      this.$router.push({ name: "Signup" });
    },
    goRule() {
      console.log("ActiveRule");
      this.$router.push({ name: "ActiveRule" });
      // window.location.href = "http://wx.palmar.cn/vote/rule.html"
    },

    // 已报名去到我的
    goMe() {
      this.$router.push({ name: "me" });
    },
    NavtabToggle(num, name = "", zoneId) {
      this.currentNav = num;
      this.zoneId = zoneId;
      if (zoneId != 0) {
        // this.$router.push({ name: "Voting", params: { id: zoneId } });//这是通过路由的方式
        this.currentView = "Voting";
        this.getIndex(zoneId);
        // this.getPlayerlist(zoneId);
      } else {
        // this.$router.push({ name: "HistoryArea", params: { id: zoneId } });
        this.currentView = "HistoryArea";
      }

      console.log(this.currentView);

      // var currentView = this.currentView;
      // if(name != "历史赛区"){
      //   this.currentView = "Voting";
      // }else{
      //   this.currentView = "HistoryArea";
      // }
      console.log(this.currentView);
    },
    test() {
      console.log(11123123);
      this.$wechat.previewImage({
        current:
          "http://p1.music.126.net/GiRwf4KpezTDsCTcI3XiLQ==/109951163368287973.jpg", // 当前显示图片的http链接
        urls: [
          "http://p1.music.126.net/PkJdexSp9NEtZCUsk8ujLQ==/109951163368426762.jpg",
          "http://p1.music.126.net/CT4p-Mom6BTkTuerughp6w==/109951163368051278.jpg"
        ] // 需要预览的图片http链接列表
      });
    },
    // 分享测试
    shareFriend() {
      alert(1);

      this.$wechat.onMenuShareAppMessage({
        title: "分享标题", // 分享标题
        desc: "分享描述分享描述分享描述", // 分享描述
        link: "http://wx.palmar.cn/index.pnp", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: "https://www.baidu.com/img/baidu_jgylogo3.gif", // 分享图标
        type: "", // 分享类型,music、video或link，不填默认为link
        dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
        success: function(res) {
          // 用户点击了分享后执行的回调函数
          alert(res);
        }
      });
    }
  },
  created() {
    this.getIndex();
    this.isplayer();
    console.log(this.$wechat.onMenuShareAppMessage);
    // this.getConfig();
  },
 
};
</script>

<style scoped lang='less'>
.loadingImg {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10000000000000;
}
button.SearchActive {
  background: #f05b29;
  color: #fff;
}
.form {
  padding: 5px 10px;
}
.searchDialog {
  width: 100%;
  height: calc(100vh-40px);
  background: red;
  left: 0;
  top: 40px;
  z-index: 99999;
}
.index {
  padding-bottom: 50px;
  box-sizing: border-box;
  padding-top: 67px;
}
.topBox {
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  /* height:74px; */
  top: 0;
  background: #fff;
  z-index: 10000;
}
.searchBox {
  justify-content: space-between;
}
.placeholder {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  color: #666666;
}
.search_icon {
  width: 14px;
  height: 14px;
  vertical-align: middle;
  margin-right: 6px;
}
.fouce_search_icon {
  width: 14px;
  height: 14px;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
}
.search_inp {
  width: 100%;
  background: #ededed;
  border-radius: 4px;
  height: 30px;
  font-size: 13px;
  color: #666666;
  outline: none;
  border: 0;
}
.searchBtn {
  background: #ededed;
  border-radius: 4px;
  width: 40px;
  height: 29px;
  margin-left: 8px;
  font-size: 13px;
  color: #666666;
  border: none;
  outline: 0;
  // width:20%
}
/* 搜索框 */
.navTab {
  padding: 15px 10px 0 10px;
  justify-content: space-around;
  font-size: 14px;
  color: #666666;
  div {
    box-sizing: border-box;
    padding-bottom: 6px;
  }
}
.navActive {
  color: #f05b29 !important;
  border-bottom: 2px solid #f05b29;
}

/* tab栏激活 */
.tabBarActive {
  color: #f05b29 !important;
}
.pd_tabBar > div {
  width: 33.333%;
}

.pd_tabBar {
  justify-content: space-around;
  width: 100%;
  max-width: 600px;
  background: #fff;
  height: 50px;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  .tab_icon {
    width: 22px;
    height: 22px;
  }
  .tab_text {
    font-size: 10px;
    color: #333333;
  }
  .tab_sign {
    width: 35px;
    height: 35px;
    left: 50%;
    transform: translateX(-50%);
    top: -10px;
  }
  .sign_text {
    left: 50%;
    transform: translateX(-50%);
    bottom: 8px;
  }
}
.signup {
  text-align: center;
  height: 50px;
}
.wraper {
  height: calc(100vh - 129px);
  // height: calc(100% - 44px);
  width: 100%;
  overflow: auto;
  position: relative;
  top: 0;
  left: 0;
}
</style>