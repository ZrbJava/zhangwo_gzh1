<template>
  <div v-if="loading">
        <yd-slider autoplay="3000">
              <yd-slider-item v-for="(item,key) in HistoryAreaData.banner" :key="key">
                <div style="height:188px;width:100%" >
                      <img :src="item">                  
                </div>
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
        <!-- 参赛数据 -->
        <div class="race_data mb10">
          <!-- 总数据 -->
          <div class="all_data pr">
            <!-- title -->
            <div class="phc title">参赛总数据</div>
              <!-- 数据展示 -->
              <div class="frc box">
                <div class="fcc">
                  <div class="num ">{{HistoryAreaData.matchData.player_count}}</div>
                  <div class="drc">参赛选手</div>
                </div>
                <div class="fcc">
                    <div class="num">{{HistoryAreaData.matchData.vote_count}}</div>
                    <div class="drc">累计投票</div>
                </div>
                <div class="fcc">
                    <div class="num">{{HistoryAreaData.matchData.visitor_count}}</div>
                    <div class="drc">访问量</div>
                </div>
              </div>
            </div>   
        </div>
        <!-- 历史记录列表 -->
         <!-- <router-link to="/gd"> -->
          <div class="mb10" v-for="(item,key) in HistoryAreaData.list" :key="key" @click="goWinner(item.id)">
          
              <img :src="item.head" alt="" class="historyImg mb14">
          <div class="pr">
              <div class="frc pl10 pr10">
                <img src="../../../../assets/index/history/location.png" alt="" class="locationImg ">
                <div class="fontColor pr5 area pl8">{{item.name}}</div>
                <div class="pl6"><span class="fontColor">{{item.name}}</span>名参赛选手，累计投票<span class="fontColor">{{item.name}}</span>票，共<span class="fontColor">{{item.name}}</span>次访问量</div>
              </div>
              <div class="line pa"></div>
          </div>
          </div>
        <!-- </router-link> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      HistoryAreaData:[],
      loading:false,
      winners:"/gd"
    };
  },
  methods:{
    goHistoryHome(){
      this.$router.push({ name: 'HistoryHome'})
      // console.log(this.$router);
    },
    goWinner(id) {
      var currentName = `winner${id}`//当前赛区的路由名字
      this.$router.push({ name: currentName });
    },
    getHistoryArea() {
       this.$http.post(this.$api.historyZone).then((res)=>{
           if(res.data.status==1){
             var list = res.data.data.list;
             console.log(res.data);
             this.HistoryAreaData = res.data.data;   
             this.loading = true;
             this.$vux.loading.hide()    
             console.log(list);
             list.filter((v,i)=>{
               console.log(v,i)
             })
           }
        });
    },
    // 根据id跳转至对应赛区胜出的列表
    getwinners(){

    }
  },
  filters: {
      // 格式化单位
      formatNum(num) {
          if(num<10000){
            return num
          }else{
            return  Math.round((num /10000) * 10) / 10 + "万";
          }
      }
    },
  created(){
    this.$vux.loading.show({
      text: 'Loading'
    })
    this.getHistoryArea();
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
  height: 88px;
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
  height: 88px;
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
/* 历史赛区图片 */
.historyImg {
  width: 100%;
  height: 188px;
}
.locationImg {
  width: 10px;
  height: 13px;
}
.area {
  /* border-right: 1px solid #d8d8d8; */
  min-width: 36px;
  flex: none;
}
.fontColor {
  color: #f05b29;
}

.line {
  background: #d8d8d8;
  width: 1px;
  height: 18px;
  left: 70px;
  top: 50%;
  transform: translateY(-50%);
  /* margin-right:6px; */
}
.historyAreaBox {
  font-size: 12px;
  /* color:#f05b29; */
}
</style>