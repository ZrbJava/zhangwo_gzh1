<template>
 <scroller class="scroller"   :on-infinite="infinite" refreshText="释放刷新" :noDataText="noDataText" ref="my_scroller"> 
    <div class="voting">
          <!-- 每个赛区的轮播如展示 -->
          <!-- 轮播图 -->
        <yd-slider autoplay="3000">
              <yd-slider-item v-for="(item,key) in zoneData.banner" :key="key">
                <div style="height:188px;width:100%" >
                      <img :src="item">                  
                </div>
              </yd-slider-item>
        </yd-slider>
        <!-- <router-view></router-view> -->
        <!-- 赞助商 -->
        <div class="zzdw pr">
            <img class="zzdw_logo" src="../../../assets/index/zzdw_logo.png" alt="">
            <!-- 赞助商家 -->
            <router-link to="/Sponsor">
              <img class="zzdw_name" src="../../../assets/index/zzdw.png" alt="">
            </router-link>
            <div class="line pa"></div>
        </div>
        
        <!-- 参赛数据 -->
        <div class="race_data mb20">
          <!-- 总数据 -->
          <div class="all_data pr">
            <!-- title -->
            <div class="phc title">参赛总数据</div>
            <!-- 数据展示 -->
            <div class="frc box">
              <div class="fcc">
                <!-- <div class="num ">{2115}</div> -->
                <div class="num ">{{zoneData.matchData.player_count}}</div>
                <div class="drc">参赛选手</div>
              </div>
            <div class="fcc">
                <div class="num">{{zoneData.matchData.vote_count}}</div>
                <div class="drc">累计投票</div>
              </div>
            <div class="fcc">
                <div class="num">{{zoneData.matchData.visitor_count}}</div>
                <div class="drc">访问量</div>
            </div>
          </div>
          </div>   
          <!-- 区域数据 -->
          <div class="area_data pr">
            <!-- title -->
            <!-- <div class="phc title">湖北赛区数据</div> -->
            <div class="phc title">{{zoneData.zone.name}}数据</div>
            <!-- 数据展示 -->
            <div class="frc box">
              <div class="fcc">
                <div class="num">{{zoneData.zoneMatchData.player_count}}</div>
                <div class="drc">参赛选手</div>
              </div>
            <div class="fcc">
                <div class="num">{{zoneData.zoneMatchData.vote_count}}</div>
                <div class="drc">累计投票</div>
              </div>
            <div class="fcc">
                <div class="num">{{zoneData.zoneMatchData.visitor_count}}</div>
                <div class="drc">访问量</div>
            </div>
          </div>
          </div>      
        </div>
        <!-- 最新选手 - 赛区排名 -->
        <div class="Player">
          <!-- 头部 -->
          <div class="zzdw pr title pr10 pl10">
            <img class="zzdw_logo" src="../../../assets/index/time.png" alt="">
            <span class="time">{{zoneData.zone.start_time|start_time}}至{{zoneData.zone.end_time|end_time}}</span>
            <div class="line pa"></div>
          </div>
          <!-- tab栏 -->
          <div class="tab frc pb10 pr10 pl10">
            <div :class="current==0?'active':''" @click="tabToggle(0)">最新选手</div>
            <div :class="current==1?'active':''" @click="tabToggle(1)">赛区排名</div>
          </div>
          <!-- 选手列表 -->
          <div class="playerList clearfix">
            <keep-alive>
              <component :is="current==0?'appPlayer':'appRank'"  :playerlist = "playerlist" :zoneId = "zoneId" ></component>
            </keep-alive>
          </div>
        </div>
        <!-- 加载更多 -->
        <!-- <div class="more_info">
              <div v-show="false">加载更多</div>
              <div>已经到底啦~</div>
        </div> -->
    </div>
 </scroller>
</template>

<script>
// 导入最新选手组件
import areaRanking from "../areaRanking/areaRanking";
import newPlayer from "../newPlayer/newPlayer";
export default {
  props: ["zoneId", "zoneData","playerlist"],
  // props: {
  //   zoneData: {
  //     type: Object,
  //     default(){
  //       return {}
  //     }
  //   },
  // },
  components: {
    appRank: areaRanking,
    appPlayer: newPlayer
  },
  data() {
    return {
      current: 0,
      // playerlist: [],
      page: 2,
      noDataText: "",
      initLoaded: false
      // zoneData:"",
      // zoneId:""
    };
  },
  methods: {
    // 根据赛区获取不同的数据

    // tab栏切换
    tabToggle(num) {
      this.current = num;
    },
    // refresh(done) {
    //   setTimeout(() => {}, 1500);
    // },
    infinite(done) {
      console.log(this.initLoaded);
      if (!this.initLoaded) {
        console.log(11);
        this.$refs.my_scroller.finishInfinite(true);
        return;
      }
      if (this.noDataText === "") {
        this.getPlayerlist();
        setTimeout(() => {
          this.$refs.my_scroller.finishInfinite(true);
        }, 3000);
      }
    },
    // 选手列表
    getPlayerlist() {
      // var zone_id = this.zoneId || 5;
      alert("执行到这里了",this.zoneId);
      var zone_id = this.zoneId;
      var page = this.page || 1;
      this.$http
        .post(this.$api.playerlist, this.$qs.stringify({ zone_id, page }))
        .then(res => {
          // console.log(1111111,res.data.data);
          if (res.data.status == 1) {
            var moreList = res.data.data.playerlist;
            if (moreList.length == 0) {
              this.noDataText = "暂无更多数据";
              console.log(this.noDataText);
              return;
            }
            this.playerlist = this.playerlist.concat(moreList);
            this.page = ++page;
            // this.$vux.loading.hide()
          }
        });
    }
  },
  filters: {
    // 格式化单位
    // formatNum(num) {
    //   if (num < 10000) {
    //     return num;
    //   } else {
    //     return Math.round(num / 10000 * 10) / 10 + "万";
    //   }
    // },
    // 时间格式化
    start_time: function(time) {
      var time = time * 1000;
      var h = new Date(time);
      var year = h.getFullYear();
      var month = h.getMonth() + 1;
      var day = h.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      var date = year + "年" + month + "月" + day + "日";
      return date;
    },
    end_time: function(time) {
      var time = time * 1000;
      var h = new Date(time);
      var month = h.getMonth() + 1;
      var day = h.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      var date = month + "月" + day + "日";
      return date;
    }
  },

  created() {
     this.initLoaded = true;
    // this.getIndex();
    // console.log("数据父传子拿到的ID", this.zoneData,this.zoneId);
    // this.getIndex();
    // this.$vux.loading.show({
    //   text: 'Loading'
    // })
    // this.getIndex();
    // this.$vux.loading.show({
    //   text: 'Loading',
    //   mask:true,
    // })
    // this.getPlayerlist();
    // console.log(zoneId);
    // var zoneId = this.$route.params.id;
    // console.log("路由过来的zoneid为：" + zoneId);
  },
  watch: {
    $route(to, from) {
      console.log(this.$route.params.id);
      // var zoneId = this.$route.params.id;
      // this.zoneId = this.$route.params.id;
      // this.getIndex();
    }
  }
};
</script>

<style scoped>
.voting {
  height: 100%;
}
.zzdw {
  background: #ffffff;
  width: 100%;
  height: 40px;
  line-height: 40px;
  margin-bottom: 27px;
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
.race_data {
  background: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.15);
  height: 206px;
}

.race_data .num {
  font-size: 20px;
  margin-bottom: 2px;
}
.race_data .drc {
  font-size: 12px;
  color: #999999;
}
.race_data .title {
  width: 121px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  transform: translate(-50%, -50%);
  border-radius: 100px;
}
.race_data .box {
  justify-content: space-around;
  height: 104px;
}
.race_data .box div {
  justify-content: space-between;
}
.all_data .title {
  background: #f05b29;
  box-shadow: 0 1px 5px 0 #ff5000;
}
.area_data .title {
  background: #4a90e2;
  box-shadow: 0 1px 5px 0 #4a90e2;
}
/* 最新选手 */
.Player {
  background: #fff;
  /* padding: 0 10px; */
}
.Player .title {
  box-sizing: border-box;
  margin-bottom: 0;
  line-height: 40px;
}
.Player .time {
  font-size: 15px;
  color: #666666;
  /* padding-top:4px; */
  vertical-align: baseline;
}
.Player .tab {
  height: 40px;
  /* background: red; */
  justify-content: space-between;
  padding: 0 42px;
}
.Player .tab div {
  font-size: 15px;
  color: #666666;
  height: 40px;
  line-height: 40px;
}
.Player .tab div.active {
  border-bottom: 3px solid #f05b29;
  color: #f05b29;
}

.more_info div {
  text-align: center;
  color: #999999;
  letter-spacing: 0.59px;
  padding: 10px 0 20px 0;
  font-size: 13px;
  color: #999999;
}
</style>