<template>
    <div>
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
    </div>
</template>

<script>
let totalNum = 0;
export default {
  // props:["areaID"],
  props: {
    playerlist: {
      type: Array,
      default() {
        [];
      }
    },
    zoneName: ["zoneName"]
  },
  data() {
    return {
      beging: true,
      playerId: 1000,
      ending: true
    };
  },
  methods: {
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
      var user_id = 556;//暂时写死
      this.$http
        .post(this.$api.vote, this.$qs.stringify({ player_id, user_id }))
        .then(res => {
          if (res.data.status == 1) {
            var votes = this.playerlist[index].votes + 1;
            this.playerlist[index].isvote = 1; //投票状态 0 为已投
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
          }else{
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
    // 选手列表
    // getPlayerlist(){
    //   this.$http.post(this.$api.playerlist, this.$qs.stringify({ zone_id: this.areaID,page:1 })).then((res)=>{
    //        if(res.data.status==1){
    //          this.playerlist = res.data.data.playerlist;
    //          this.zoneName = res.data.data.zoneName
    //         // console.log(res)
    //        }
    //         console.log(this.playerlist);
    //         console.log(this.zoneName);
    //     });
    // }
  },
  created() {
    // this.getPlayerlist();
  }
};
</script>

<style scoped>
.playBox {
  padding-bottom: 14px;
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