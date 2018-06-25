<template>
    <div  v-if="loading">
        <!-- 选手信息 -->
         <div class="info_top mb10">
              <div class="frc section_box">
                <div class="avator mr20">
                  <img :src="myData.head_image" alt="">
                </div>
                <div class="fcc">
                  <div class="mb12"><span class="num mr5">{{myData.id}}</span><span class="name">{{myData.name}}</span></div>
                  <div class="city">{{myData.province}}·{{myData.city}}</div>
                  <div class="time">{{myData.year}}年维修经验</div>
                </div>
              </div>
              <!-- 票数及排名 -->
              <div class="frc info_top_buttom">
                <div class="fcc">
                  <div class="nums">{{myData.votes}}</div>
                  <div>当前票数</div>
                </div>
                <div class="fcc">
                  <div class="nums">{{myData.rank}}</div>
                  <div>当前排名</div>
                </div>
                <div class="fcc">
                  <div class="nums">{{myData.gap}}</div>
                  <div>距上一名还差</div>
                </div>
              </div>
          </div>
        
         <!-- tab栏 -->
        <div class="tab frc pr10 pl10">
            <div :class="current==0?'active':''" @click="tabToggle(0)">参数资料</div>
            <div :class="current==1?'active':''" @click="tabToggle(1)">票数增长</div>
        </div>
        <keep-alive>
          <component :is="current==0?'Message':'Piaoshu'" :myData="myData"></component>
        </keep-alive>
        
           <!-- 底部导航栏 -->
        <div class="pd_tabBar pf frc">
          <!-- <div class="left frc"> -->
                <div class="home fcc" @click="goEditInfo">
                  <img src="../../assets/me/edit.png" class="tab_icon">
                  <span class="pt3 tab_text tabBarActive">编辑资料</span>            
                </div>  
                <div class="home fcc" @click="goDetail(myData.id)" >
                    <img  src="../../assets/me/detail.png" class="tab_icon">                         
                    <span class="pt3 tab_text" >参赛详情</span>               
                </div>
                <div class="home fcc" @click="goShare">
                    <img src="../../assets/me/poster.png" class="tab_icon">             
                    <span class="pt3 tab_text"  >拉票海报</span>        
                </div>
          <!-- </div> -->
        </div>
    </div>

</template>

<script>
import Message from "@/components/me/Message/Message";
import Piaoshu from "@/components/me/Piaoshu/Piaoshu";
export default {
  components: {
    Message: Message,
    Piaoshu: Piaoshu
  },
  data() {
    return {
      current: 0,
      loading:false,
      myData:'',
    };
  },
  methods: {
    getMyData() {
      this.$http.post(this.$api.my).then((res)=>{
          if(res.data.status==1){
            this.myData = res.data.data.playerInfo;
            this.loading = true;
          }
          console.log(res.data);
          console.log(this.myData);
          
          console.log("选手id" + this.myData.id);
      });
    },
    tabToggle(num) {
      this.current = num;
      console.log(this.current);
    },
    goEditInfo() {
      this.$router.push({ name: "Signup",query:{isEdit:true,player_id:this.myData.id} });
    },
    goDetail() {

      this.$router.push({ name: "playDetail", query:{player_id:this.myData.id}});
    },
    goShare(){
      this.$router.push({ name: "share" });
    }
  },
  created() {
    this.getMyData();
  }
};
</script>

<style scoped lang="less">
h3 {
  font-size: 15px;
  color: #000000;
  padding-bottom: 8px;
}
.info_top {
  background: #fff;
  border-bottom: 1px solid #eee;
  .section_box {
    padding: 18px 22px 0 10px;
  }
  .avator img {
    width: 70px;
    height: 70px;
    border-radius: 100%;
  }
  .num {
    padding: 2px 10px;
    background: #f05b29;
    border-radius: 100px;
    font-size: 13px;
    color: #ffffff;
  }
  .name {
    font-size: 18px;
    color: #1a191e;
    font-weight: 500;
  }
  .city,
  .time {
    font-size: 12px;
    color: #999999;
    line-height: 18px;
  }
  .info_top_buttom {
    justify-content: space-around;
    font-size: 12px;
    color: #999999;
    margin-top: 25px;
    padding-bottom: 7px;
  }
  .info_top_buttom .nums {
    font-size: 22px;
    color: #333333;
    margin-bottom: 4px;
  }
}

/* 新增加 */
.tab {
  height: 40px;
  /* background: red; */
  justify-content: space-between;
  padding: 0 42px;
  div {
    font-size: 15px;
    color: #666666;
    height: 40px;
    line-height: 40px;
  }
  div.active {
    border-bottom: 3px solid #f05b29;
    color: #f05b29;
  }
}

.tab {
  height: 40px;
  justify-content: space-between;
  padding: 0 42px;
  background: #fff;
  border-bottom:1px solid #eee;
}
/* 底部导航栏 */
.pd_tabBar {
  justify-content: space-around;
  width: 100%;
  max-width: 600px;
  background: #fff;
  height: 50px;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  .tab_icon {
    width: 22px;
    height: 22px;
  }
  .tab_text {
    font-size:12px;
    color:#666666;
  }
}
</style>