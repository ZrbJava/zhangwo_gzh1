<template>
    <div>
            <!-- 每个赛区的轮播如展示 -->
            <!-- 轮播图 -->
        <yd-slider autoplay="3000">
              <yd-slider-item v-for="(imgItem,key) in imgs" :key="key">
                      <img :src="imgItem">
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
                <div class="num ">2115</div>
                <div class="drc">参赛选手</div>
              </div>
            <div class="fcc">
                <div class="num">16.3 <span>万</span> </div>
                <div class="drc">累计投票</div>
              </div>
            <div class="fcc">
                <div class="num">89.6 <span>万</span> </div>
                <div class="drc">访问量</div>
            </div>
          </div>
          </div>   
          <!-- 区域数据 -->
          <div class="area_data pr">
            <!-- title -->
            <div class="phc title">湖北赛区数据</div>
            <!-- 数据展示 -->
            <div class="frc box">
              <div class="fcc">
                <div class="num">2115</div>
                <div class="drc">参赛选手</div>
              </div>
            <div class="fcc">
                <div class="num">16.3 <span>万</span> </div>
                <div class="drc">累计投票</div>
              </div>
            <div class="fcc">
                <div class="num">89.6 <span>万</span> </div>
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
            <span class="time">活动报名中</span>
            <div class="line pa"></div>
          </div>
          <!-- tab栏 -->
          <div class="tab frc pb10 pr10 pl10">
            <div :class="current==0?'active':''" @click="tabToggle(0)">最新选手</div>
            <div :class="current==1?'active':''" @click="tabToggle(1)">赛区排名</div>
          </div>
          <!-- 选手列表 -->
          <div class="playerList clearfix">
            <component :is="current==0?'appPlayer':'appRank'"></component>
          </div>
        </div>
        <!-- 加载更多 -->
        <div class="more_info">
              <div v-show="false">加载更多</div>
              <div>已经到底啦~</div>
        </div>
    </div>
</template>

<script>
// 导入最新选手组件
import areaRanking from "../areaRanking/areaRanking";
import newPlayer from "../newPlayer/newPlayer";
export default {
   components: {
    appRank: areaRanking,
    appPlayer: newPlayer,
  },
  
  data() {
    return {
      imgs: [
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4039509840,2143753227&fm=200&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1921509411,2196017138&fm=200&gp=0.jpg",
        "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=826982853,3219394138&fm=200&gp=0.jpg"
      ],
      current: 0
    };
  },
  methods: {
    // tab栏切换
    tabToggle(num) {
      this.current = num;
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