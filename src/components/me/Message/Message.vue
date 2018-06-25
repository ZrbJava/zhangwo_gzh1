<template>
    <div>
        <div class="detail_info mb10">
          <!-- 参赛信息 -->
          <div class="info_center pt10 pl22 pr10 mb10">
            <h3>参赛信息</h3>
            <div><span class="l_section">从业时间</span><span class="r_section">{{myData.workyear_start}}-{{myData.workyear_end == 1? '至今':myData.workyear_end}}</span></div>
            <div><span class="l_section">主修类型</span><span class="r_section">{{myData.major}}</span></div>
            <div><span class="l_section">维修场地</span><span class="r_section">{{myData.space}}</span></div>
            <div><span class="l_section">维修团队</span><span class="r_section">{{myData.team}}</span></div>
          </div>
          <!-- 参赛自述 -->
          <div class="info_bottom pl22 pr10">
             <h3>参赛自述</h3>
            <div class="text">
              {{myData.player_desc}}
            </div>
          </div>   
          <!-- 选手图片-->
        <div class="playImg pl10 pr10 mb10">
            <div class="title">-参赛图片-</div>
            <!-- 图片轮播 -->
            <div class="mb35">
              <yd-slider autoplay="3000"  style="z-index:0">
                <yd-slider-item v-for="imgItem in myData.images" :key="imgItem.index">
                  <yd-lightbox>
                        <!-- <yd-lightbox-img v-for="(item, key) in imgs" :key="key" :src="item"></yd-lightbox-img> -->
                        <yd-lightbox-img :src="imgItem" style=""></yd-lightbox-img>
                        <yd-lightbox-txt>
                          <div slot="content">{{myData.player_desc}}</div>
                        </yd-lightbox-txt>
                    </yd-lightbox>
                </yd-slider-item>
              </yd-slider>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["myData"],
    data() {
        return {
        imgs: [
            "http://static.ydcss.com/uploads/ydui/1.jpg",
            "http://static.ydcss.com/uploads/ydui/2.jpg",
            "http://static.ydcss.com/uploads/ydui/3.jpg"
        ],
        };
  },
};
</script>

<style scoped lang="less">
h3 {
  font-size: 15px;
  color: #000000;
  padding-bottom: 8px;
}
/* 参赛信息 */
.detail_info {
  background: #fff;
}
.info_center {
  font-size: 13px;
  line-height: 25px;
  .l_section {
    color: #666666;
    padding-right: 46px;
  }
  .r_section {
    color: #1a191e;
  }
}
.info_bottom .text {
  font-size: 13px;
  color: #1a191e;
  line-height: 25px;
}
.playImg {
  background: #fff;
  .title {
    font-size: 14px;
    color: #666666;
    text-align: center;
    height: 56px;
    line-height: 56px;
    background: #fff;
  }
}
</style>