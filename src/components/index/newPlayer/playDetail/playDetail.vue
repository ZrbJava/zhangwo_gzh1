<template>
    <div >
        <!-- 轮播图 -->
       <yd-slider autoplay="3000">
            <yd-slider-item v-for="(imgItem ,index) in player.banner" :key="index">
                    <img :src="imgItem">
            </yd-slider-item>
        </yd-slider>
        <!-- 赞助商 -->
        <div class="zzdw pr">
            <img class="zzdw_logo" src="../../../../assets/index/zzdw_logo.png" alt="">
            <!-- 赞助商家 -->
            <router-link to="/Sponsor">
            <img class="zzdw_name" src="../../../../assets/index/zzdw.png" alt="">
            </router-link>
            <div class="line pa"></div>
        </div>
        <!-- 选手信息 -->
        <div class="detail_info mb10">
          <!-- 选手个人信息 -->
          <div class="info_top mb10">
              <div class="frc section_box">
                <div class="avator mr20">
                  <img :src="player.head_image" alt="">
                </div>
                <div class="fcc">
                  <div class="mb12"><span class="num mr5">{{player.id}}</span><span class="name">{{player.name}}</span></div>
                  <div class="city">{{player.province}}·{{player.city}}</div>
                  <div class="time">{{player.year}}年维修经验</div>
                </div>
              </div>
              <!-- 票数及排名 -->
              <div class="frc info_top_buttom">
                <div class="fcc">
                  <div class="nums">{{player.votes}}</div>
                  <div>当前票数</div>
                </div>
                <div class="fcc">
                  <div class="nums">{{player.votes}}</div>
                  <div>当前排名</div>
                </div>
                <div class="fcc">
                  <div class="nums">{{player.votes}}</div>
                  <div>距上一名还差</div>
                </div>
              </div>
          </div>
          <!-- 参赛信息 -->
          <div class="info_center pl22 pr10 mb10">
            <h3>参赛信息</h3>
            <div><span class="l_section">从业时间</span><span class="r_section">{{player.workyear_start}}-{{workyear_end}}</span></div>
            <div><span class="l_section">主修类型</span><span class="r_section">{{player.major}}</span></div>
            <div><span class="l_section">维修场地</span><span class="r_section">{{player.space}}</span></div>
            <div><span class="l_section">维修团队</span><span class="r_section">{{player.team}}</span></div>
          </div>
          <!-- 参赛自述 -->
          <div class="info_bottom pl22 pr10">
             <h3>参赛自述</h3>
            <div class="text">
              {{player.player_desc}}
            </div>
          </div>   
        </div>
        <!-- 选手图片        -->
        <div class="playImg pl10 pr10 mb10">
            <div class="title">-选手图片-</div>
            <!-- 图片轮播 -->
            <div class="mb35">
              <yd-slider autoplay="3000"  style="z-index:0">
                <yd-slider-item v-for="imgItem in player.images" :key="imgItem.index">
                  <yd-lightbox>
                        <!-- <yd-lightbox-img v-for="(item, key) in imgs" :key="key" :src="item"></yd-lightbox-img> -->
                        <yd-lightbox-img :src="imgItem"></yd-lightbox-img>
                        <yd-lightbox-txt>
                          <div slot="content">{{player.player_desc}}</div>
                        </yd-lightbox-txt>
                    </yd-lightbox>
                </yd-slider-item>
              </yd-slider>
            </div>
            <div>
              <!-- 修理工印象 -->              
                <div class="xlgyx mb10"><h3 class="fl pl10">修理工印象</h3>大家对选手的印象是</div>
              <!-- 评分按钮 -->
                <div class="commentBox clearfix">
                    <!-- <div class="item mb15 clearfix fl" v-for="(item,key) in playerTags" :key="key" style="width:50%;"> -->
                    <div class="item mb15 clearfix fl" style="width:50%;" v-for="(item,index) in player.tags" :key="index"  >
                          <div class="pr8" style="box-sizing:border-box">
                            <div v-if="item.status == 0" class="commentBtn fl uncomment" @click="addtag(item.id,item.status,index)">{{item.name}}({{item.num}})</div>
                            <div v-else class="fl commentBtn commentedActive">{{item.name}}({{item.num}})</div>
                          </div>
                          <!-- <div class="pr8" style="box-sizing:border-box">
                            <div v-if="!isAddTag" class="commentBtn fl commentedActive" >{{item.name}}({{item.num}})</div>
                          </div> -->
                    </div>
                     <!-- <div class="item mb15 clearfix fl" style="width:50%;">
                          <div class="pr8" style="box-sizing:border-box">
                            <div class="commentBtn fl commentedActive">维修技术好（10）</div>
                          </div>
                    </div> -->
                </div>
            </div>
            <!-- 粉丝支持榜TOP5 -->
            <div class="xlgyx mb10 clearfix">
              <h3 class="fl pl10">粉丝支持榜TOP5</h3>每一票都是 <img class="top_love" src="../../../../assets/playerDetail/love.png" alt="" > 
            </div>            
            <!-- 4-10 -->
           <div class="topList clearfix">
              <div class="itemList frc"  v-for="(item,key) in fans" :key="key">
                <div class="frc f14" >
                        <span class="mr32 num">{{key+1}}</span>
                        <img :src="item.headimgurl" alt="" class="avator mr10">
                        <span class="mr10">{{item.nickname}}</span>
                </div>
                <div class="fcc">
                    <div class="mb5 f12">{{item.num}} <img class="top_love" src="../../../../assets/playerDetail/love.png" alt="" ></div>
                </div>
            </div>
           </div>
        </div>
        <!-- 引导下载 -->
        <!-- <router-link to="/"> -->
        <a href="https://m.palmar.cn/index/index/index.html">
          <div class="download fcc mb10">
             <div class="mb4">引导下载掌窝工程机械APP</div>
            <div>点击可以跳转到下载页</div>
          </div>
        </a>
        <div class="pd_tabBar pf frc">
          <div class="left frc">
                <div class="home fcc" @click="goIndex">
                  <img src="../../../../assets/tabbar/home.png" alt="home" class="tab_icon">
                  <span class="pt3 tab_text" >首页</span>            
                </div>  
                <div class="signup fcc" @click="goSignup">
                  <img src="../../../../assets/tabbar/sign.png" alt="home" class="tab_icon">             
                  <span class="pt3 tab_text">报名</span>        
              </div>
          </div>
          <div class="toupiao" v-if="vote == 1" @click="addVote">
            投TA一票
          </div>
          <div v-else class="toupiao">
            已投
          </div>
        </div>
        <!-- </router-link> -->
    </div>

</template>

<script>
export default {
  data() {
    return {
      // loading:"true",
      player: "",
      fans: "",
      playerTags: "",
      tags: "",
      isAddTag: false,
      user_id: 556, //暂时写死
      SelectedTags: [],
      vote:1,
    };
  },
  methods: {
    goIndex() {
      this.$router.push({ name: "index" });
    },
    goSignup() {
      this.$router.push({ name: "Signup" });
    },
    getPlayer() {
      this.$http
        .post(
          this.$api.player,
          this.$qs.stringify({ player_id: this.$route.query.player_id })
        )
        .then(res => {
          if (res.data.status == 1) {
            this.player = res.data.data;
            // console.log(res)
             this.$vux.loading.hide()
          }
          console.log(this.player);
        });
    },
    getFans() {
      this.$http
        .post(
          this.$api.getTopFans,
          this.$qs.stringify({ player_id: this.$route.query.player_id })
        )
        .then(res => {
          if (res.data.status == 1) {
            this.fans = res.data.data;
            // console.log(res)
          }
          console.log(this.fans);
        });
    },
    getSelectedTags() {
      this.$http
        .post(
          this.$api.selected_tags,
          this.$qs.stringify({ user_id: this.user_id })
        )
        .then(res => {
          if (res.data.status == 1) {
            // this.player = res.data.data;
            this.SelectedTags = res.data.data;
            console.log(res);
            console.log(this.SelectedTags);
          }
        });
    },
    // 添加标签
    addtag(id, status,index) {
      var player_id = this.player.id;
      var tag_id = id;
      console.log(player_id, tag_id, status);
      this.player.tags[index].status = 1;
      this.player.tags[index].num = this.player.tags[index].num + 1;
    },
    // 投票
    addVote() {
      console.log(111);
      // totalNum += 1;
      // console.log(totalNum);
      // if (totalNum > 4) {
      //   this.$vux.toast.show({
      //     text: "您今日的投票次数已用完",
      //     type: "text",
      //     position: "middle",
      //     width: "180px",
      //     time: "5000"
      //   });
      //   return;
      // }
      var player_id = this.$route.query.player_id;
      console.log(player_id);
      var user_id = 556; //暂时写死
      this.$http
        .post(this.$api.vote, this.$qs.stringify({ player_id, user_id }))
        .then(res => {
          if (res.data.status == 1) {
            var votes = this.player.votes + 1;
            this.player.vote = 0; //投票状态 0 为已投
            this.player.votes = votes;
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
    },
  },
  created() {
    // this.getPlayerTags();
    this.$vux.loading.show({
      text: 'Loading'
    })
    this.getFans();
    this.getPlayer();
    this.getSelectedTags();
     var player_id = this.$route.query.player_id;
  },
  computed: {
    workyear_end() {
      if (this.player) {
        return this.player.workyear_end == 1
          ? "至今"
          : this.player.workyear_end;
      }
    }
  }
};
</script>

<style scoped>
.zzdw {
  background: #ffffff;
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-bottom: 10px;
  padding-left: 10px;
}
.zzdw_logo {
  width: 62px;
  height: 14px;
  vertical-align: middle;
  margin-right: 30px;
}
.zzdw_name {
  width: 96px;
  height: 24px;
  vertical-align: middle;
}
.zzdw .line {
  width: 1px;
  background: #eeeeee;
  left: 88px;
  top: 50%;
  height: 20px;
  transform: translateY(-50%);
}
/* 选手信息、 */
.detail_info {
  background: #fff;
  /* border-buttom:1px solid #ccc; */
}
.info_top {
  border-bottom: 1px solid #eee;
}
.info_top .section_box {
  padding: 18px 22px 0 10px;
}
.info_top .avator img {
  width: 70px;
  height: 70px;
  border-radius: 100%;
}
.info_top .num {
  padding: 2px 10px;
  background: #f05b29;
  border-radius: 100px;
  font-size: 13px;
  color: #ffffff;
}
.info_top .name {
  font-size: 18px;
  color: #1a191e;
  font-weight: 500;
}
.info_top .city,
.time {
  font-size: 12px;
  color: #999999;
  line-height: 18px;
}

.info_top .info_top_buttom {
  justify-content: space-around;
  font-size: 12px;
  color: #999999;
  margin-top: 25px;
  padding-bottom: 7px;
}

.info_top .info_top_buttom .nums {
  font-size: 22px;
  color: #333333;
  margin-bottom: 4px;
}
/* 参赛信息 */
.info_center {
  font-size: 13px;
  line-height: 25px;
}
.info_center .l_section {
  color: #666666;
  padding-right: 46px;
}
.info_center .r_section {
  color: #1a191e;
}
h3 {
  font-size: 15px;
  color: #000000;
  padding-bottom: 8px;
}
.info_bottom .text {
  font-size: 13px;
  color: #1a191e;
  line-height: 25px;
}
.playImg {
  background: #fff;
}
.playImg .title {
  font-size: 14px;
  color: #666666;
  text-align: center;
  height: 56px;
  line-height: 56px;
  background: #fff;
}
/* 修理工印象 */
.xlgyx {
  border-left: 2px solid #f05b29;
  font-size: 12px;
  color: #999999;
  text-align: right;
  height: 22px;
  line-height: 22px;
}
/* 评价按钮 */
.commentBtn {
  border: 1px solid #f05b29;
  border-radius: 2px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  box-sizing: border-box;
  font-size: 12px;
}
.uncomment {
  background: #fff1ed;
  color: #f05b29;
}
.commentedActive {
  color: #fff;
  background: #f05b29;
}

.top_love {
  width: 16px;
  height: 14px;
  vertical-align: middle;
  padding-left: 2px;
}
/* 增加 */
.topList .itemList {
  vertical-align: middle;
  height: 80px;
  justify-content: space-between;
}
.topList .itemList .avator {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}
.topList .itemList .num {
  background: #fff1ed;
  border-radius: 2px;
  width: 22px;
  height: 22px;
  font-size: 14px;
  color: #f05b29;
  line-height: 22px;
  text-align: center;
}
.download {
  background: #666666;
  height: 90px;
  font-size: 15px;
  color: #ffffff;
  justify-content: center;
  margin-bottom: 50px;
}
.pd_tabBar {
  width: 100%;
  max-width: 600px;
  background: #fff;
  height: 50px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.pd_tabBar .toupiao {
  width: 60%;
  height: 50x;
  line-height: 50px;
  background-image: linear-gradient(-90deg, #fb9a00 0%, #f95200 98%);
  text-align: center;
  color: #fff;
}
.pd_tabBar .left {
  width: 40%;
}
.pd_tabBar .left .home,
.pd_tabBar .left .signup {
  width: 50%;
  box-sizing: border-box;
  z-index: 99999999;
}
.tab_icon {
  width: 22px;
  height: 22px;
}
.tab_text {
  font-size: 10px;
  color: #333333;
}
</style>