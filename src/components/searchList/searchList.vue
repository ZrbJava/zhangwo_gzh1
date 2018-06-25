<template>
  <div class="searchList">
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
                  <button  :class="{'searchBtn':true,'SearchActive':Searchvalue.length!=0}" @click="goSearchList">搜索</button>
                </div>
              </div>
          </div>
      <div>
      <!-- +++++++++++ -->
       <div class="playBox clearfix">
                <div class="fl item pr" v-for="(item,index) in playerlist" :key="index">
                      <div>
                        <router-link :to="{path:'playDetail',query:{player_id:item.id}}">                                         
                            <div class="pa playerNum">{{item.id}}</div>
                            <img :src="item.head_image" alt="">
                        </router-link>
                        <div class="play_info pr">
                            <div class="frc info_top">
                                <div class="name">{{item.name}}</div>
                                <div class="piaoshu">{{item.votes}}票</div>
                            </div>
                            <div class="info_place">{{item.province}}·{{item.city}}</div>
                           
                            <div v-if="item.vote_time == 0">
                              <yd-button size="large"  bgcolor='#b4b4b4' >活动未开始</yd-button>
                            </div>
                            <div v-if="item.vote_time == 1">
                              <yd-button v-if="item.isvote == 0" size="large" @click.native="addVote(index)"  bgcolor='#f05b29' ref="toupiao" :data-vote="item.votes">投TA一票</yd-button>
                               <yd-button v-else size="large"  bgcolor='#f3a88f'>已投</yd-button>
                            </div>
                           <div v-if="item.vote_time == 2">
                              <yd-button size="large"  bgcolor='#b4b4b4' >活动已结束</yd-button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
        <!-- 没有选手 -->
         <div class="pr" style="width:100%;height:100vh;" v-if="playerlist.length == 0"> 
                  <div class="search_empty pa">
                    <img src="../../assets/index/search/empty.png" >
                    <div class="empty_text">没有搜索到相关选手信息</div>
                  </div>

          </div>
      <!-- =========== -->
      </div>
        <!-- 底部导航栏 -->
        <div class="pd_tabBar pf frc">
          <!-- <div class="left frc"> -->
                <div class="home fcc" @click="goIndex">
                  <img src="../../assets/tabbar/home.png" alt="home" class="tab_icon">
                  <span class="pt3 tab_text" >首页</span>            
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
   
</template>

<script>
let totalNum = 0; //暂时使用，到时用vuex全局管理
export default {
  props: ["areaID,isPlayer"],
  data() {
    return {
      beging: true,
      playerId: 1000,
      ending: true,
      playerlist: "",
      Searchvalue: "",
      searchBlur: false,
      isPlayer: false,
      page: 1
      // isTouPiao:false,
    };
  },
  methods: {
    // 搜索
    goSearchList() {
      if (this.Searchvalue.length != 0) {
        this.$router.push({
          path: "/searchList",
          query: { search: this.Searchvalue }
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
    // 选手列表
    getSearchlist() {
      this.$http
        .post(
          this.$api.search,
          this.$qs.stringify({
            keyword: this.$route.query.search,
            page: this.page
          })
        )
        .then(res => {
          this.playerlist = res.data.data;
          this.zoneName = res.data.data.zoneName;
          console.log(res.data.data);
        });
    },
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
    addVote(index) {
      totalNum += 1;
      console.log(totalNum);
      if (totalNum > 4) {
        this.$vux.toast.show({
          text: "您今日的投票次数已用完",
          type: "text",
          position: "middle",
          width: "180px",
          time: "5000"
        });
        return;
      }
      var player_id = this.playerlist[index].id;
      var user_id = 556; //暂时写死
      this.$http
        .post(this.$api.vote, this.$qs.stringify({ player_id, user_id }))
        .then(res => {
          if (res.data.status == 1) {
            var votes = this.playerlist[index].votes + 1;
            this.playerlist[index].isvote = 1; //投票状态 1 为已投
            this.playerlist[index].votes = votes;
            console.log(res);

            this.$dialog.confirm({
              title: `<p style='text-align:center;font-size:18px;color:#000'>感谢您为其投出的第<span style='color:#f05f2e;font-size:20px'>${votes}</span>票<p>`,
              mes: `<img src="//img1.shikee.com/try/2016/06/23/15395220917905380014.jpg" style="width:100%;height:187px;"> 
            <p style='text-align:center;font-size:16px;color:#ccc;padding-top:20px'>找挖机配件.上掌窝APP<p>`,
              opts: [
                {
                  txt: "取消", //按钮文字
                  color: "#000", //按钮颜色
                  // stay: Boolean, //是否保留提示框
                  callback: function() {
                    console.log("取消");
                  } //按钮回调函数
                },
                {
                  txt: "立即下载", //按钮文字
                  color: "#f05b29", //按钮颜色
                  // stay: Boolean, //是否保留提示框
                  callback: function() {
                    console.log("确定");
                    location.href =
                      "https://m.palmar.cn/index/index/index.html";
                  } //按钮回调函数
                }
              ]
            });
          } else {
            this.$vux.toast.show({
              text: res.data.message,
              type: "text",
              position: "middle",
              width: "180px",
              time: "5000"
            });
          }
        });
    }
  },
  created() {
    this.getSearchlist();
    this.isPlayer = this.$route.query.isPlayer;
  }
};
</script>

<style scoped lang="less">
.search_empty {
  margin-bottom: 11px;
  transform: translateX(-50%);
  left: 50%;
  top: 106px;
  width: 265px;
  height: 163px;
}
.empty_text {
  font-size: 15px;
  color: #797979;
  text-align: center;
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
// 搜索内容
.playBox {
  // padding-bottom: 14px;
  margin:40px 0;
}
.playBox > div {
  width: 50%;
  padding: 6px;
  box-sizing: border-box;
}
.item > div {
  height: 308px;
  overflow: hidden;
}
.item img {
  width: 100%;
  height: 206px;
  display: block;
}
.item .play_info {
  background: #f5f5f5;
  height: 102px;
  padding: 8px;
}
.item .play_info .info_top {
  justify-content: space-between;
}
.play_info .info_top .name {
  font-size: 16px;
  color: #1a191e;
  font-weight: 500;
}
.play_info .info_top .piaoshu {
  font-size: 14px;
  color: #f05b29;
}
.play_info .info_place {
  font-size: 10px;
  color: #666666;
  padding-top: 10px;
}
.play_info .yd-btn-block {
  width: 100%;
  display: block;
  font-size: 13px;
  color: #ffffff;
  letter-spacing: 0.59px;
  height: 30px;
  margin-top: 10px;
}
.playerNum {
  background: #f05b29;
  color: #fff;
  border-radius: 0 100px 100px 0;
  width: 54px;
  height: 18px;
  left: 6px;
  top: 6px;
  text-align: center;
  line-height: 18px;
}
</style>