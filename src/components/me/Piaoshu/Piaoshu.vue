<template>
    <div class="piaoshu">
        <div class="title frc">
            <div>时间</div>
            <div>票数</div>
            <div>累计</div>
        </div>
        <!-- 列表 -->
        <div class="list">
            <div class="frc list_odd" v-for="(item,index) in piaoshuList" :key="index" :class="index%2==0?'':'bgc'">
                <div>{{item.date}}</div>
                <div>{{item.count}}</div>
                <div>{{item.sum}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props:["myData"],
        data() {
            return {
                page:1,
                piaoshuList:'',
            };
        },
        methods:{
            getPiaoShu() {
                console.log(this.myData);
                
                this.$http.post(this.$api.rise,{ playerId: this.myData.id , page :this.page }).then((res)=>{
                    if(res.data.status==1){
                        this.piaoshuList = res.data.data.list;
                    }  
                    console.log(res.data.data);
                });
            },
        },
        created(){
            this.getPiaoShu();
        }
    }
</script>

<style scoped>
.piaoshu{
    min-height: 450px;
}
.title{
    justify-content: space-between;
    height:45px;
    line-height: 45px;
    padding:0 46px;
    background: #fff;
    font-size:16px;
    color:#333333;

}
.list_odd{
      justify-content: space-between;
      padding:0 43px 0 25px;
      font-size:16px;
      color:#333333;
    height:45px;
    line-height: 45px;
    background: #fff;
        
}
.bgc{
    background:#f5f5f5;
}
</style>