<template>
    <div>
                
            <!-- <group>
                <cell title="公司地址" icon="safe-success" value="请输入" inline-desc="1111"></cell>
            </group> -->

          <!-- <x-address style="display:none;" title="title" v-model="value" :list="addressData" placeholder="请选择地址" :show.sync="showAddress"></x-address> -->
            <!-- <group>
    <x-address title="title" v-model="value" :list="addressData"></x-address>
  </group> -->
 
        
        <div class="signup">
            <div class="container">
               <div style="background:#fff">
                    <img src="../../assets/signup/banner.png" alt="" class="banner">
                <div class="addPhoto mb10">
                    <div class="title pl10 pr10">工作现场图片（{{uploadImg.length}}/5）</div>
                    <div class="upload pl10 pr10">
                        <div class="pr uploadImgBox fl" v-for="(item,index) in uploadImg" :key="index" style="width:20%;">
                             <img :src="item" alt="" class="upload_img">
                             <!-- <img src="../../assets/index/avator.png" alt="" class="upload_img"> -->
                             <div class="delImg pa">x</div>
                             <div class="pa hidden"  @click="delImg(index)"></div>
                             
                        </div>
                        <div class="photoLogo fcc" v-if="uploadImg.length<5">
                            <img src="../../assets/signup/camera.png" alt="" class="camera mb3">
                            <span @click="choseImage">添加照片</span>
                        </div>
                    </div>
                </div>
               </div>
                <!-- 表单域 -->
                <div class="form">
                     <div class="bgf">
                        <div class="frc pr inpBox pl10"><span>姓名</span><input type="text" placeholder="请输入"  v-model="name"></div>
                        <div class="frc pr inpBox pl10"><span>联系电话</span><input type="number" placeholder="请输入" onkeyup="value=value.replace(/[^\d]/g,'') " onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))" maxlength="11"  v-model="number"></div>
                        <div class="frc pr inpBox pl10"><span>公司名称（选填）</span><input type="text" placeholder="请输入" v-model="company_name"></div>
                        <div class="frc pr inpBox pl10"><span>参赛地区</span><input type="text"  placeholder="请输入" @click="test(1)" v-model="area"><img src="../../assets/signup/right.png" class="pa right_img"  alt=""></div>
                        <div class="frc pr inpBox pl10"><span>从业时间</span><input type="text"  placeholder="请输入" @click="test(2)" v-model="time"><img src="../../assets/signup/right.png" class="pa right_img"  alt=""></div>
                        <div class="frc pr inpBox pl10"><span>主修类型</span><input type="text"  placeholder="请输入" @click="test(3)" v-model="major"><img src="../../assets/signup/right.png" class="pa right_img"  alt=""></div>
                        <div class="frc pr inpBox pl10"><span>维修场地</span><input type="text"  placeholder="请输入" @click="test(4)" v-model="space"><img src="../../assets/signup/right.png" class="pa right_img"  alt=""></div>
                        <div class="frc pr inpBox pl10"><span>维修团队</span><input type="text"  placeholder="请输入" @click="test(5)" v-model="team"><img src="../../assets/signup/right.png" class="pa right_img"  alt=""></div>
                     </div>
                    <div class="addPhoto mt10 bgf"   style="margin-bottom:40px">
                        <div class="title pl10 pr10">参赛描述</div>
                        <textarea class="pl10 pr10" name="" id="" placeholder="分享每天我们与挖掘机修理的那些点点滴滴…" v-model="desc"></textarea>
                    </div>
                    <div class="sign_btn pf">
                        <button @click="submit">报名</button>
                    </div>
                </div>
                <actionsheet v-model="typePic" :show-cancel="true" cancel-text="取消"  :menus="menus" @on-click-menu="test1" :close-on-clicking-mask="false"></actionsheet>
                <actionsheet v-model="spacePic" :show-cancel="true" cancel-text="取消"  :menus="menus" @on-click-menu="test2" :close-on-clicking-mask="false"></actionsheet>
                <actionsheet v-model="teamPic" :show-cancel="true" cancel-text="取消"  :menus="menus" @on-click-menu="test3" :close-on-clicking-mask="false" ></actionsheet>
                <popup-picker :show="areaPic" :data="addressData" :columns="2" @on-hide="test4" @on-shadow-change= "test5"></popup-picker>
                <popup-picker :show="timePic" :data="timeData" :columns="2" @on-hide="test6" @on-shadow-change= "test7"></popup-picker>
            </div>
        </div>
    </div>
</template>

<script>
import { PopupRadio, Picker, Actionsheet, AlertModule,Cell, XAddress, PopupPicker } from "vux";
export default {
  components: {
    PopupPicker,
    PopupRadio,
    Picker,
    Actionsheet,
    AlertModule,
    Cell,
     XAddress,
  },
  data() {
    return {
      name:'',
      number:'',
      company_name:'',
      desc:'',
      major:'',
      team:'',
      space:'',
      time:'',
      area:'',
      loading:false,
      uploadImg: [],
      value: [],
      areaPic:false,
      timePic:false,
      teamPic:false,
      typePic:false,
      spacePic:false,
      menus:[],
      addressData: [],
      timeData:[],
    };
  },
  methods: {
    getSignData() {
        this.$http.post(this.$api.sign).then((res)=>{
          if(res.data.status==1){
            this.signData = res.data.data;
            this.loading = true;
          }
          console.log(this.signData);
      });
   
    },
    delImg(index) {
      this.uploadImg.splice(index, 1);
    },
    // 打开对应的弹窗
    test(index) {
      console.log(index);
      if (index == 1) {
        this.addressData = [];
        this.areaPic = true;
        for (let i = 0; i < this.signData.area.length; i++) {
           var obj = {
             name:this.signData.area[i].text,
             value:this.signData.area[i].text,
             parent: 0
             } 
           this.addressData.push(obj)
           for (let j = 0; j < this.signData.area[i].children.length; j++) {
              var obj = {
                name:this.signData.area[i].children[j].text,
                value:this.signData.area[i].children[j].text,
                parent: this.signData.area[i].text} 
              this.addressData.push(obj)
           }
        }
      }else if(index == 2) {
        this.timeData = [];
        this.timePic = true;
        for (let i = 0; i < this.signData.time.length; i++) {
           var obj = {
             name:this.signData.time[i].text,
             value:this.signData.time[i].text+'',
             parent: 0} 
           this.timeData.push(obj)
           for (let j = 0; j < this.signData.time[i].children.length; j++) {
                var obj = {
                  name:this.signData.time[i].children[j].text,
                  value:this.signData.time[i].children[j].text+'',
                  parent: this.signData.time[i].text+''} 
                this.timeData.push(obj)
            }
        }
      }else if(index == 3 ) {
        this.typePic = true;
        this.menus = this.signData.major
      }else if(index == 4 ) {
        this.spacePic = true;
        this.menus = this.signData.space
      }else if(index == 5 ) {
        this.teamPic = true;
        this.menus = this.signData.team
      }
    },
    // 主修类型文字框
    test1(index,event) {
      console.log(event);
      if (index == 'cancel') {
        return
      }
      this.major = this.signData.major[index]
    },
    // 维修场地文字框
    test2(index) {
      if (index == 'cancel') {
        return
      }
      this.space = this.signData.space[index]
    },
    // 维修团队文字框
    test3(index) {
      if (index == 'cancel') {
        return
      }
      this.team = this.signData.team[index]
    },
    // 关闭参赛地区picker
    test4(closeType) {
      if (closeType) {
        this.area = this.pro + ' ' + this.city
      }
      this.areaPic = false;
    },
    // 变更参赛地区value值
    test5(names) {
      this.pro = names[0]
      this.city = names[1]
    },
    // 关闭从业时间picker
    test6(closeType) {
      if (closeType) {
        this.time = this.begin + '-' + this.end
      }
      this.timePic = false;
    },
    // 变更从业时间value值
    test7(names) {
      this.begin = names[0];
      this.end = names[1]
    },
    // 编辑选手资料
    edit(){
      var isEdit = Boolean(this.$route.query.isEdit);
      if(isEdit){
        this.$http.post(this.$api.edit,this.$qs.stringify({player_id:this.$route.query.player_id})).then((res)=>{
          if(res.data.status == 1){
            // console.log(res.data.data);
            // this.
            var player = res.data.data.player;
            this.uploadImg = player.images;
            this.name = player.name;
            this.number = player.number;
            this.company_name = player.company_name;
            this.desc = player.player_desc
            this.major = player.major
            this. team = player.team
            this.space = player.space
            this.begin = player.workyear_start;
            this.end = player.workyear_end == 1?"至今":player.workyear_end;
            this. time = this.formatTime(player.workyear_start,player.workyear_end)
            this. area = player.area
            console.log(this.uploadImg);
          }
        });
      }
    },
    formatTime(start_time,end_time){
    var end_time = end_time == 1 ? "至今":end_time;
     return start_time + "-" + end_time
    },
    choseImage(){
      alert(111);
      console.log(this.$wechat.chooseImage);
        this.$wechat.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    },
    uploadImage() {
      console.log("111111");
    },
     // 表单验证
    formValidate: function () {
      var warn = "";
      var flag = false;
      if (this.name == "") {
        warn = "请填写姓名";
      } else if (this.number == "") {
        warn = "请输入手机号码";
      } else if (!(/^1(3|4|5|7|8)\d{9}$/.test(this.number))) {
        warn = "手机号格式不正确";
      } else if (this.city == undefined){
        warn = "请选择参赛地区";
      } else if (this.begin == ""&&this.end == "") {
        warn = "请选择从业时间";
      }else if (this.major == "") {
        warn = "请选择主修行业";
      }else if (this.space == "") {
        warn = "请选择维修场地";
      } else if (this.team == "") {
        warn = "请选择团队信息";
      }else if (this.desc == "") {
        warn = "请输入参赛描述";
      }else{
        flag = true;
      }
      if (!flag) {
        this.$vux.toast.show({
            text:warn,
            type: "text",
            position: "middle",
            width: "180px",
            time: "1000"
        });
      }
      return flag
    },
    // 提交表单
    submit() {
      var flag = this.formValidate();
      console.log(flag);
      if(flag){
        let data = {
        images:["http://wx.palmar.cn/upload/images/d7f73b34a186f00cb4113d3420404756.jpg","http://wx.palmar.cn/upload/images/07173ad2d5016a1e341cbd0f3856d803.jpg"],
        name:this.name,
        number:this.number,
        company_name:this.company_name,
        desc:this.desc,
        major:this.major,
        team:this.team,
        space:this.space,
        pro:this.pro,
        city:this.city,
        begin:this.begin,
        end:this.end,
      };
      console.log(data);
      
      this.$http.post(this.$api.signup,this.$qs.stringify(data)).then((res)=>{
          if(res.data.status==1){
            console.log("OJBK");
            
          }
          console.log(this.res.data);
      });
      }
  
    },
  },
  created(){
    this.getSignData();
    this.edit();
    
  }
};
</script>
<style>
body{
  overflow-x: hidden;
}
</style>

<style lang="less" scoped>

.bgf {
  background: #fff;
}
.signup {
  // padding-bottom:50px;
 height: 100vh;
 
  .banner {
    height: 125px;
    width: 100%;
  }
  .addPhoto {
    background: #ffffff;
    height: 123px;
    .title {
      font-size: 13px;
      color: #333333;
      height: 35px;
      line-height: 35px;
      border-bottom: 1px solid #f5f5f5;
    }
    .upload {
      align-items: center;
      justify-content: space-between;
      height: 88px;
      .delImg {
        text-align: center;
        left: 45px;
        top: 0;
        background: #f05b29;
        color: #fff;
        width: 15px;
        height: 15px;
        border-bottom-left-radius: 14px;
        z-index: 1;
      }
      .hidden {
        width: 30px;
        height: 30px;
        left: 30px;
        top: 0;
        background: transparent;
        z-index: 2;
      }
      .upload_img {
        width: 60px;
        height: 60px;
      }
      .photoLogo {
        background: #f5f5f5;
        border: 1px dashed rgba(200, 200, 200, 0.5);
        width: 60px;
        height: 60px;
        justify-content: center;
      }
      .camera {
        width: 22px;
        height: 19px;
      }
    }
  }
  // 表单
  .form {
    input {
      // display:block;
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding-right: 26px;
      text-align: right;
    }
    input::-ms-input-placeholder {
      text-align: right;
      font-size: 13px;
      color: #999999;
    }

    input::-webkit-input-placeholder {
      text-align: right;
      font-size: 13px;
      color: #999999;
    }
    .inpBox {
      border-bottom: 1px solid #eee;
      height: 45px;
      line-height: 45px;
      font-size: 13px;
      color: #666666;
      span {
        flex: none;
      }
      .right_img {
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 4px;
        height: 8px;
      }
    }
    textarea {
      width: 100%;
      height: 88px;
      border: none;
      font-size: 12px;
      color: #999999;
      padding-top: 10px;
      line-height: 18px;
      letter-spacing: 1px;
    }
    .sign_btn {
      background: #ffffff;
      height: 50px;
      bottom: 0;
      width: 100%;
      max-width: 600px;
      left: 50%;
      transform: translateX(-50%);
      padding: 7px 14px;
      z-index: 10;
      button {
        border: none;
        width: 100%;
        background: #f05b29;
        color: #fff;
        border-radius: 2px;
        line-height: 35px;
        height: 35px;
        font-size: 14px;
      }
    }
  }
}
</style>